
import { App, CfnOutput, RemovalPolicy, Stack } from 'aws-cdk-lib'
import { AttributeType, BillingMode, StreamViewType, Table } from 'aws-cdk-lib/aws-dynamodb'

interface DynamoProps {
  name: string
}

const RPOLICY = RemovalPolicy.DESTROY

export class DynamoStack extends Stack {
  constructor(app: App, id: string, props: DynamoProps) {
    super(app, id)

    // const chatTable = new Table(this, `${props.name}-ChatTable`, {
    //   tableName: `${props.name}-ChatTable`,
    //   partitionKey: {
    //     name: `chatId`,
    //     type: AttributeType.STRING
    //   },
    //   billingMode: BillingMode.PAY_PER_REQUEST,
    //   stream: StreamViewType.NEW_IMAGE,
    //   removalPolicy: RPOLICY
    // })

    // new CfnOutput(this, `${props.name}-ChatTableName`, {
    //   value: chatTable.tableName,
    // })

    // new CfnOutput(this, `${props.name}-ChatTableArn`, {
    //   value: chatTable.tableArn,
    // })

    const userTable = new Table(this, `${props.name}-UserTable`, {
      tableName: `${props.name}-UserTable`,
      partitionKey: {
        name: `userId`,
        type: AttributeType.STRING
      },
      billingMode: BillingMode.PAY_PER_REQUEST,
      stream: StreamViewType.NEW_IMAGE,
      removalPolicy: RPOLICY
    })

    userTable.addGlobalSecondaryIndex({
      indexName: 'apiKey',
      partitionKey: {
        name: 'apiKey',
        type: AttributeType.STRING
      }
    })

    new CfnOutput(this, `${props.name}-UserTableName`, {
      value: userTable.tableName,
      exportName: `${props.name}-UserTableName`
    })

    new CfnOutput(this, `${props.name}-UserTableArn`, {
      value: userTable.tableArn,
      exportName: `${props.name}-UserTableArn`
    })
  }
}