import { App, CfnOutput, Duration, Expiration, Stack } from 'aws-cdk-lib'
import { GraphqlApi, SchemaFile, AuthorizationType, LambdaDataSource } from 'aws-cdk-lib/aws-appsync'
import { ManagedPolicy, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import path, { join } from 'path';

interface AppsyncProps {
  name: string
}

export class AppsyncStack extends Stack {
  constructor(app: App, id: string, props: AppsyncProps) {
    super(app, id)

    const api = new GraphqlApi(this, 'Api', {
      name: `${props.name}-Appsync`,
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
    });

    new CfnOutput(this, "GraphQLAPIURL", {
     value: api.graphqlUrl
    });

    new CfnOutput(this, "GraphQLAPIKey", {
      value: api.apiKey || ''
    });

    new CfnOutput(this, "Stack Region", {
      value: this.region
    })

    const excRole = new Role(this, `${props.name}-SocialMediaLambdaRole`, {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com')
    })

    excRole.addManagedPolicy(
      ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaBasicExecutionRole")
    )

    const nodeJsFunctionProps: NodejsFunctionProps = {
      role: excRole,
      bundling: { externalModules: ['aws-sdk'] },
      depsLockFilePath: join(__dirname, '../lambdas', 'package-lock.json'),
      environment: { Test: "Hi Dom" },
      runtime: Runtime.NODEJS_16_X,
    }

    const createConvo = new NodejsFunction(this, `${props.name}-CreateConvo`, {
      entry: join(__dirname, '../lambdas', 'createConvo.ts'),
      memorySize: 10240,
      timeout: Duration.minutes(5),
      ...nodeJsFunctionProps
    })

    new LambdaDataSource(this, `${props.name}-CreateConvoDS`, {
      api: api, lambdaFunction: createConvo
    })
  }
}