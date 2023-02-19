import { App } from 'aws-cdk-lib'

import { AppsyncStack } from './stacks/appsync-stack'
import { DynamoStack } from './stacks/dynamo-stack'
import { IamStack } from './stacks/iam-stack'

const PROJECT_NAME = 'fireChat'

const app = new App()

const dynamoStack = new DynamoStack(app, `${PROJECT_NAME}-DynamoStack`, { name: PROJECT_NAME })

const appsyncStack = new AppsyncStack(app, `${PROJECT_NAME}-AppsyncStack`, { name: PROJECT_NAME })
appsyncStack.addDependency(dynamoStack)

const iamStack = new IamStack(app, `${PROJECT_NAME}-IamStack`, { name: PROJECT_NAME })
iamStack.addDependency(dynamoStack)
iamStack.addDependency(appsyncStack)

app.synth()