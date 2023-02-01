
import { App, CfnOutput, RemovalPolicy, Stack } from 'aws-cdk-lib'
import { AttributeType, BillingMode, StreamViewType, Table } from 'aws-cdk-lib/aws-dynamodb'

interface DynamoProps {
  name: string
}

const RPOLICY = RemovalPolicy.DESTROY

export class DynamoStack extends Stack {
  constructor(app: App, id: string, props: DynamoProps) {
    super(app, id)

    const chatTable = new Table(this, `${props.name}-ChatTable`, {
      tableName: `${props.name}-ChatTable`,
      partitionKey: {
        name: `chatId`,
        type: AttributeType.STRING
      },
      billingMode: BillingMode.PAY_PER_REQUEST,
      stream: StreamViewType.NEW_IMAGE,
      removalPolicy: RPOLICY
    })

    new CfnOutput(this, `${props.name}-ChatTableName`, {
      value: chatTable.tableName,
      exportName: `ChatTableName`
    })

    new CfnOutput(this, `${props.name}-ChatTableArn`, {
      value: chatTable.tableArn,
      exportName: `ChatTableArn`
    })

  }
}