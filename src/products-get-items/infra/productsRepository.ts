import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

export class ProductsRepository {
    public async getProducts(): Promise<any> {
        const client = new DynamoDBClient({});
        const docClient = DynamoDBDocumentClient.from(client);
        const command = new ScanCommand({
            ProjectionExpression: "ItemName, Description, Price",
            TableName: "products-sample",
          });
        
          const response = await docClient.send(command);
          return response.Items?.map((item: any) => ({
            name: item.Name,
            description: item.Description,
          }));
    }    
}