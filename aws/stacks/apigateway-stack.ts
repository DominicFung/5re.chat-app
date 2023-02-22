import { App, Duration, Fn, Stack } from 'aws-cdk-lib'
import { Cors, LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway'
import { ManagedPolicy, Policy, PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam'
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Runtime } from 'aws-cdk-lib/aws-lambda'
import { join } from 'path'

import secret from '../../backend.secret.json'

//https://betterprogramming.pub/build-a-discord-bot-with-aws-lambda-api-gateway-cc1cff750292

interface ApiGatewayProps {
  name: string
}

export class ApiGatewayStack extends Stack {
  constructor(app: App, id: string, props: ApiGatewayProps) {
    super(app, id)

    const convoDynamoName = Fn.importValue(`${props.name}-ConvoTableName`)
    const convoDynamoArn = Fn.importValue(`${props.name}-ConvoTableArn`)

    const api = new RestApi(this, `${props.name}-DiscordAPI`, {
      restApiName: props.name,
      endpointExportName: `${props.name}-DiscordAPIUrl`,
      defaultCorsPreflightOptions: {
        allowHeaders: Cors.DEFAULT_HEADERS,
        allowMethods: Cors.ALL_METHODS,
        allowOrigins: Cors.ALL_ORIGINS,
      },
    })

    const excRole = new Role(this, `${props.name}-DiscordAPILambdaRole`, {
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
            resources: [`${convoDynamoArn}*` ]
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
        DISCORD_PUBLICKEY: secret.discord.publicKey,
        DISCORD_TOKEN: secret.discord.token,
        CONVO_TABLE_NAME: convoDynamoName,
      },
      runtime: Runtime.NODEJS_16_X,
    }

    const ping = new NodejsFunction(this, `${props.name}-DiscordPing`, {
      entry: join(__dirname, '../lambdas', 'discord', 'ping.ts'),
      memorySize: 10240,
      timeout: Duration.minutes(5),
      ...nodeJsFunctionProps
    })

    const pingIntegration = new LambdaIntegration(ping)

    const apiRoot = api.root.addResource('api')
    apiRoot.addResource('discord').addMethod('POST', pingIntegration, { apiKeyRequired: false })
  }
}