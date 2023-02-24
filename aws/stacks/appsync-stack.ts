import { App, CfnOutput, Duration, Expiration, Fn, Stack } from 'aws-cdk-lib'
import { GraphqlApi, SchemaFile, AuthorizationType, FieldLogLevel } from 'aws-cdk-lib/aws-appsync'
import { ManagedPolicy, Policy, PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import path, { join } from 'path';

import secret from '../../backend.secret.json'

interface AppsyncProps {
  name: string
}

export class AppsyncStack extends Stack {
  constructor(app: App, id: string, props: AppsyncProps) {
    super(app, id)

    const userDynamoName = Fn.importValue(`${props.name}-UserTableName`)
    const userDynamoArn = Fn.importValue(`${props.name}-UserTableArn`)

    const appDynamoName = Fn.importValue(`${props.name}-UserAppsTableName`)
    const appDynamoArn = Fn.importValue(`${props.name}-UserAppsTableArn`)

    const sessionDynamoName = Fn.importValue(`${props.name}-SessionTableName`)
    const sessionDynamoArn = Fn.importValue(`${props.name}-SessionTableArn`)

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

    const excRole = new Role(this, `${props.name}-AppsyncLambdaRole`, {
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
            resources: [ `${userDynamoArn}*`, `${appDynamoArn}*`, `${convoDynamoArn}*`, `${sessionDynamoArn}*` ]
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
        DISCORD_TOKEN: secret.discord.token,

        USER_TABLE_NAME: userDynamoName,
        APP_TABLE_NAME: appDynamoName,
        CONVO_TABLE_NAME: convoDynamoName,
        SESSION_TABLE_NAME: sessionDynamoName
      },
      runtime: Runtime.NODEJS_16_X,
    }

    const createUser = new NodejsFunction(this, `${props.name}-CreateUser`, {
      entry: join(__dirname, '../lambdas', 'appsync', 'createUser.ts'),
      timeout: Duration.minutes(5),
      ...nodeJsFunctionProps
    })
    const createSession = new NodejsFunction(this, `${props.name}-CreateSession`, {
      entry: join(__dirname, '../lambdas', 'appsync', 'createSession.ts'),
      timeout: Duration.minutes(5),
      ...nodeJsFunctionProps
    })
    const addApp = new NodejsFunction(this, `${props.name}-AddApp`, {
      entry: join(__dirname, '../lambdas', 'appsync', 'addApp.ts'),
      timeout: Duration.minutes(5),
      ...nodeJsFunctionProps
    })
    const removeApp = new NodejsFunction(this, `${props.name}-RemoveApp`, {
      entry: join(__dirname, '../lambdas', 'appsync', 'removeApp.ts'),
      timeout: Duration.minutes(5),
      ...nodeJsFunctionProps
    })
    const refreshApiKey = new NodejsFunction(this, `${props.name}-RefreshApiKey`, {
      entry: join(__dirname, '../lambdas', 'appsync', 'refreshApiKey.ts'),
      timeout: Duration.minutes(5),
      ...nodeJsFunctionProps
    })
    const addCustomerMessage = new NodejsFunction(this, `${props.name}-AddCustomerMessage`, {
      entry: join(__dirname, '../lambdas', 'appsync', 'addCustomerMessage.ts'),
      timeout: Duration.minutes(5),
      ...nodeJsFunctionProps
    })

    // issue with "-" in addLambdaDataSource, do not add
    const createUserDS = api.addLambdaDataSource(`${props.name}CreateUserDS`, createUser)
    const createSessionDS = api.addLambdaDataSource(`${props.name}CreateSessionDS`, createSession)
    const addAppDS = api.addLambdaDataSource(`${props.name}AddAppDS`, addApp)
    const removeAppDS = api.addLambdaDataSource(`${props.name}RemoveAppDS`, removeApp)
    const refreshApiKeyDS = api.addLambdaDataSource(`${props.name}RefreshApiKeyDS`, refreshApiKey)
    const addCustomerMessageDS =  api.addLambdaDataSource(`${props.name}AddCustomerMsgDS`, addCustomerMessage)

    createUserDS.createResolver(`${props.name}-CreateUserResolver`, {
      typeName: "Mutation",
      fieldName: "createUser"
    })
    createSessionDS.createResolver(`${props.name}-CreateSessionResolver`, {
      typeName: "Mutation",
      fieldName: 'createSession'
    })
    addAppDS.createResolver(`${props.name}-CreateSessionResolver`, {
      typeName: "Mutation",
      fieldName: 'addApp'
    })
    removeAppDS.createResolver(`${props.name}-CreateSessionResolver`, {
      typeName: "Mutation",
      fieldName: 'removeApp'
    })
    refreshApiKeyDS.createResolver(`${props.name}-CreateSessionResolver`, {
      typeName: "Mutation",
      fieldName: 'refreshApiKey'
    })
    addCustomerMessageDS.createResolver(`${props.name}-AddCustomerMsgResolver`, {
      typeName: "Mutation",
      fieldName: "addCustomerMessage"
    })
  }
}