import { paginateListQueues, SQSClient } from '@aws-sdk/client-sqs';

describe('infra tests', () => {
    it('should have 1 queue created', async () => {
        const client = new SQSClient({});
        const paginatedListQueues = paginateListQueues({ client }, {});
        // eslint-disable-next-line functional/prefer-readonly-type
        const queueNames: string[] = [];
        for await (const page of paginatedListQueues) {
            const nextUrls = page.QueueUrls?.filter((qurl) => !!qurl) || [];
            queueNames.push(...nextUrls.map((url) => url.split('/').pop() || ''));
        }

        expect(queueNames.length).toBe(1);
    });
});