
import { App, CfnOutput, RemovalPolicy, Stack } from 'aws-cdk-lib'
import { AttributeType, BillingMode, StreamViewType, Table } from 'aws-cdk-lib/aws-dynamodb'

interface DynamoProps {
  name: string
}

const RPOLICY = RemovalPolicy.DESTROY

export class DynamoStack extends Stack {
  constructor(app: App, id: string, props: DynamoProps) {
    super(app, id)

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
      indexName: 'githubId',
      partitionKey: {
        name: 'githubId',
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

    const userAppsTable = new Table(this, `${props.name}-UserAppsTable`, {
      tableName: `${props.name}-UserAppsTable`,
      partitionKey: {
        name: `appId`,
        type: AttributeType.STRING
      },
      billingMode: BillingMode.PAY_PER_REQUEST,
      stream: StreamViewType.NEW_IMAGE,
      removalPolicy: RPOLICY
    })

    userAppsTable.addGlobalSecondaryIndex({
      indexName: 'apiKey',
      partitionKey: {
        name: 'apiKey',
        type: AttributeType.STRING
      }
    })

    new CfnOutput(this, `${props.name}-UserAppsTableName`, {
      value: userAppsTable.tableName,
      exportName: `${props.name}-UserAppsTableName`
    })

    new CfnOutput(this, `${props.name}-UserAppsTableArn`, {
      value: userAppsTable.tableArn,
      exportName: `${props.name}-UserAppsTableArn`
    })

    const convoTable = new Table(this, `${props.name}-ConvoTable`, {
      tableName: `${props.name}-ConvoTable`,
      partitionKey: {
        name: `convoId`,
        type: AttributeType.STRING
      },
      billingMode: BillingMode.PAY_PER_REQUEST,
      stream: StreamViewType.NEW_IMAGE,
      removalPolicy: RPOLICY
    })

    convoTable.addGlobalSecondaryIndex({
      indexName: 'apiKey',
      partitionKey: {
        name: 'apiKey',
        type: AttributeType.STRING
      }
    })

    new CfnOutput(this, `${props.name}-ConvoTableName`, {
      value: convoTable.tableName,
      exportName: `${props.name}-ConvoTableName`
    })

    new CfnOutput(this, `${props.name}-ConvoTableArn`, {
      value: convoTable.tableArn,
      exportName: `${props.name}-ConvoTableArn`
    })
  }
}