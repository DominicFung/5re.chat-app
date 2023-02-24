
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

    const appsTable = new Table(this, `${props.name}-UserAppsTable`, {
      tableName: `${props.name}-UserAppsTable`,
      partitionKey: {
        name: `appId`,
        type: AttributeType.STRING
      },
      billingMode: BillingMode.PAY_PER_REQUEST,
      stream: StreamViewType.NEW_IMAGE,
      removalPolicy: RPOLICY
    })

    appsTable.addGlobalSecondaryIndex({
      indexName: 'apiKey',
      partitionKey: {
        name: 'apiKey',
        type: AttributeType.STRING
      }
    })

    new CfnOutput(this, `${props.name}-UserAppsTableName`, {
      value: appsTable.tableName,
      exportName: `${props.name}-UserAppsTableName`
    })

    new CfnOutput(this, `${props.name}-UserAppsTableArn`, {
      value: appsTable.tableArn,
      exportName: `${props.name}-UserAppsTableArn`
    })

    const TTL = "ttl"
    const sessionTable = new Table(this, `${props.name}-SessionTable`, {
      tableName: `${props.name}-SessionTable`,
      partitionKey: {
        name: `sessionToken`,
        type: AttributeType.STRING
      },
      billingMode: BillingMode.PAY_PER_REQUEST,
      stream: StreamViewType.NEW_AND_OLD_IMAGES,
      removalPolicy: RPOLICY,
      timeToLiveAttribute: TTL
    })

    new CfnOutput(this, `${props.name}-SessionTableName`, {
      value: sessionTable.tableName,
      exportName: `${props.name}-SessionTableName`
    })

    new CfnOutput(this, `${props.name}-SessionTableArn`, {
      value: sessionTable.tableArn,
      exportName: `${props.name}-SessionTableArn`
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