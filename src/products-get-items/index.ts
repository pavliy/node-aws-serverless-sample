import { Handler, APIGatewayProxyEventV2 } from 'aws-lambda';
import { ProductsRepository } from './infra/productsRepository';
import { Logger } from '@aws-lambda-powertools/logger';
import { isDevEnvironment } from '@products/shared/tools';

const repo = new ProductsRepository();
const logger = new Logger();

export const handler: Handler = async (event: APIGatewayProxyEventV2): Promise<any> => {
    try {
        logger.info('event: ', { event, isDev: isDevEnvironment });
        const products = await repo.getProducts();
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ products })
        };
    } catch (error: any) {
        logger.error('FAILED: ', JSON.stringify(error));
        return null;
    }
};