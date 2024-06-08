import { jest } from '@jest/globals';

jest.unstable_mockModule('@aws-sdk/client-dynamodb', () => ({
    DynamoDBClient: jest.fn().mockReturnValue({}),
}));

jest.unstable_mockModule('@aws-sdk/lib-dynamodb', () => {
    const actual = jest.requireActual('@aws-sdk/lib-dynamodb');
    return {
        ...actual as any,
        DynamoDBDocumentClient: {
            from: jest.fn().mockReturnValue({
                send: jest.fn().mockImplementation(() => ({
                    Items: [
                        {
                            Name: 'product1',
                            Description: 'description1',
                        },
                        {
                            Name: 'product2',
                            Description: 'description2',
                        },
                    ],
                })),
            }),
        }
    }
});

const { ProductsRepository } = await import('./productsRepository');

describe('productsRepository tests', () => {
    it('should return products from dynamodb storage', async () => {
        const repo = new ProductsRepository();
        const products = await repo.getProducts();
        expect(products).toEqual([
            {
                name: 'product1',
                description: 'description1',
            },
            {
                name: 'product2',
                description: 'description2',
            },
        ]);
    });
});