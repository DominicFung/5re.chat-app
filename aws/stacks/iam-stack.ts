import { App, CfnOutput, Stack, Fn } from 'aws-cdk-lib'
import { AccessKey, Policy, PolicyStatement, User } from 'aws-cdk-lib/aws-iam'

interface IamProps {
  name: string,
}

export class IamStack extends Stack {
  constructor(app: App, id: string, props: IamProps) {
    super(app, id)

    const user = new User(this, `${props.name}-User`)

    const userTableArn = Fn.importValue(`${props.name}-UserTableArn`)
    const appsyncArn = Fn.importValue(`${props.name}-AppsyncArn`)

    user.attachInlinePolicy(new Policy(this, `${props.name}-InlinePolicy`, {
      statements: [
        new PolicyStatement({
          resources: [
            userTableArn, `${userTableArn}*`,
          ],
          actions: ['dynamodb:*']
        }),
        new PolicyStatement({
          resources: [ `${appsyncArn}/*` ],
          actions: ["appsync:GraphQL"]
        }),
        new PolicyStatement({
          resources: ["*"],
          actions: ["ses:SendEmail"]
        })
      ]
    }))
    
    const accessKey = new AccessKey(this, `${props.name}-AccessKey`, { user })
    
    new CfnOutput(this, `${props.name}-AccessKeyId`, {
      value: accessKey.accessKeyId,
    })

    new CfnOutput(this, `${props.name}-SecretKey`, {
      value: accessKey.secretAccessKey.unsafeUnwrap(),
    })
  }
}