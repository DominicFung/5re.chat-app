import { App } from 'aws-cdk-lib'

import { AppsyncStack } from './stacks/appsync-stack'

const PROJECT_NAME = 'fireChat'

const app = new App()

new AppsyncStack(app, `${PROJECT_NAME}-AppsyncStack`, {
  name: PROJECT_NAME
})

app.synth()