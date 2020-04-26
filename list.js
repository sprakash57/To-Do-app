import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamoDb-lib";

export const main = handler(async (event, context) => {
    const params = {
        TableName: process.env.TableName,
        // 'KeyConditionExpression' defines the condition for the query
        // - 'userId = :userId': only return items with matching 'userId'
        //   partition key
        // 'ExpressionAttributeValues' defines the value in the condition
        // - ':userId': defines 'userId' to be Identity Pool identity id
        //   of the authenticated user
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": event.requestContext.identity.cognitoIdentityId
        }
    };
    const result = await dynamoDb.query(params);
    return result.Items;
});
