import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class Cdk8983634ProjectStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 Bucket
    const myBucket = new s3.Bucket(this, 'ShivanshS3Bucket8983634', {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Lambda Function with updated runtime
    const myLambda = new lambda.Function(this, 'ShivanshLambda8983634', {
      runtime: lambda.Runtime.NODEJS_18_X,   // <-- Updated here
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        exports.handler = async function(event) {
          console.log('Lambda invoked!');
          return { statusCode: 200, body: 'Hello from Shivansh Lambda!' };
        }
      `),
      environment: {
        BUCKET_NAME: myBucket.bucketName,
      },
    });

    // DynamoDB Table
    const myTable = new dynamodb.Table(this, 'ShivanshDynamoTable8983634', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      tableName: 'ShivanshTable8983634',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
  }
}
