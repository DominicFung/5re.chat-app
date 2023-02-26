import { App } from 'aws-cdk-lib'
import { ApiGatewayStack } from './stacks/apigateway-stack'

import { AppsyncStack } from './stacks/appsync-stack'
import { DynamoStack } from './stacks/dynamo-stack'
import { IamStack } from './stacks/iam-stack'

const PROJECT_NAME = 'fireChat'

const app = new App()

const dynamoStack = new DynamoStack(app, `${PROJECT_NAME}-DynamoStack`, { name: PROJECT_NAME })

const appsyncStack = new AppsyncStack(app, `${PROJECT_NAME}-AppsyncStack`, { name: PROJECT_NAME })
appsyncStack.addDependency(dynamoStack)

const gatewayStack = new ApiGatewayStack(app, `${PROJECT_NAME}-GatewayStack`, { name: PROJECT_NAME })
gatewayStack.addDependency(dynamoStack)
gatewayStack.addDependency(appsyncStack)

const iamStack = new IamStack(app, `${PROJECT_NAME}-IamStack`, { name: PROJECT_NAME })
iamStack.addDependency(dynamoStack)
iamStack.addDependency(appsyncStack)

app.synth()