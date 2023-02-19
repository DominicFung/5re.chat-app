import { App, CfnOutput, Duration, Expiration, Fn, Stack } from 'aws-cdk-lib'
import { GraphqlApi, SchemaFile, AuthorizationType, FieldLogLevel } from 'aws-cdk-lib/aws-appsync'
import { ManagedPolicy, Policy, PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import path, { join } from 'path';

interface AppsyncProps {
  name: string
}

export class AppsyncStack extends Stack {
  constructor(app: App, id: string, props: AppsyncProps) {
    super(app, id)

    const userDynamoName = Fn.importValue(`${props.name}-UserTableName`)
    const userDynamoArn = Fn.importValue(`${props.name}-UserTableArn`)

    const convoDynamoName = Fn.importValue(`${props.name}-ConvoTableName`)
    const convoDynamoArn = Fn.importValue(`${props.name}-ConvoTableArn`)

    const api = new GraphqlApi(this, `${props.name}-Appsync`, {
      name: `${props.name}`,
      schema: SchemaFile.fromAsset(path.join(__dirname, "../", 'schema.graphql')),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: AuthorizationType.API_KEY,
          apiKeyConfig: {
            expires: Expiration.after(Duration.days(365))
          }
        },
      },
      xrayEnabled: true,
      logConfig: { excludeVerboseContent: true, fieldLogLevel: FieldLogLevel.ALL }, // remove later
    });

    new CfnOutput(this, "GraphQLAPIURL", { value: api.graphqlUrl })
    new CfnOutput(this, "GraphQLAPIKey", { value: api.apiKey || '' })
    new CfnOutput(this, "Stack Region", { value: this.region })
    new CfnOutput(this, `${props.name}-AppsyncId`, { value: api.apiId })

    new CfnOutput(this, `${props.name}-AppsyncArn`, {
      value: api.arn,
      exportName: `${props.name}-AppsyncArn`
    })

    const excRole = new Role(this, `${props.name}-SocialMediaLambdaRole`, {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com')
    })

    excRole.addManagedPolicy(
      ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaBasicExecutionRole")
    )

    excRole.attachInlinePolicy(
      new Policy(this, `${props.name}-InlinePolicy`, {
        statements: [
          new PolicyStatement({
            actions: [
              "secretsmanager:GetResourcePolicy",
              "secretsmanager:GetSecretValue",
              "secretsmanager:DescribeSecret",
              "secretsmanager:ListSecretVersionIds",
              "secretsmanager:ListSecrets"
            ],
            resources: ["*"]
          }),
          new PolicyStatement({
            actions: [ "dynamodb:*" ],
            resources: [ `${userDynamoArn}*`, `${convoDynamoArn}*` ]
          }),
          new PolicyStatement({
            actions: [ "lambda:InvokeFunction" ],
            resources: [ `*` ]
          })
        ]
      })
    )

    const nodeJsFunctionProps: NodejsFunctionProps = {
      role: excRole,
      bundling: { externalModules: ['aws-sdk'] },
      depsLockFilePath: join(__dirname, '../lambdas', 'package-lock.json'),
      environment: { 
        USER_TABLE_NAME: userDynamoName,
        CONVO_TABLE_NAME: convoDynamoName
      },
      runtime: Runtime.NODEJS_16_X,
    }

    const createConvo = new NodejsFunction(this, `${props.name}-CreateConvo`, {
      entry: join(__dirname, '../lambdas', 'createConvo.ts'),
      timeout: Duration.minutes(5),
      ...nodeJsFunctionProps
    })

    const createUser = new NodejsFunction(this, `${props.name}-CreateUser`, {
      entry: join(__dirname, '../lambdas', 'createUser.ts'),
      timeout: Duration.minutes(5),
      ...nodeJsFunctionProps
    })

    const createSession = new NodejsFunction(this, `${props.name}-CreateSession`, {
      entry: join(__dirname, '../lambdas', 'createSession.ts'),
      timeout: Duration.minutes(5),
      ...nodeJsFunctionProps
    })


    // issue with "-" in addLambdaDataSource, do not add
    const createConvoDS =  api.addLambdaDataSource(`${props.name}CreateConvoDS`, createConvo)
    const createUserDS = api.addLambdaDataSource(`${props.name}CreateUserDS`, createUser)
    const createSessionDS = api.addLambdaDataSource(`${props.name}CreateSessionDS`, createSession)

    createConvoDS.createResolver(`${props.name}-CreateConvoResolver`, {
      typeName: "Mutation",
      fieldName: "createConvo"
    })

    createUserDS.createResolver(`${props.name}-CreateUserResolver`, {
      typeName: "Mutation",
      fieldName: "createUser"
    })

    createSessionDS.createResolver(`${props.name}-CreateSessionResolver`, {
      typeName: "Mutation",
      fieldName: 'createSession'
    })
  }
}