/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import { LocalstackContainer } from '@testcontainers/localstack';
import { execSync } from 'child_process';
import fs from 'fs';
import { StartedTestContainer } from 'testcontainers';

let firstRun = true;
// eslint-disable-next-line no-array-constructor
global.containers = new Array<StartedTestContainer>();

const globalBefore = async (): Promise<void> => {
 process.env.SYSTEM_TEST_FIRST_RUN = firstRun ? 'yes' : 'no';

 if (!firstRun) {
  console.info('\n', 'Test containers setup skipped, already started');
  return;
 }

 console.info('\n', 'Setup started');

    if(fs.existsSync('./terraform/integration-test')) {
        fs.rmdirSync('./terraform/integration-test', { recursive: true });
    }
    fs.cpSync('./terraform/local/', './terraform/integration-test/', { recursive: true});
    fs.rmSync('./terraform/integration-test/terraform.tfstate', { force: true });

 const localstackContainer = await new LocalstackContainer('localstack/localstack:latest')
        .withBindMounts([
        { 
            source: '/var/run/docker.sock', 
            target: '/var/run/docker.sock'
        },
    ]).start();

    console.log('Started localstack container on endpoint: ', localstackContainer.getConnectionUri());  

 global.containers.push(localstackContainer);

    process.env.AWS_ACCESS_KEY_ID = 'test';
    process.env.AWS_SECRET_ACCESS_KEY = 'test'
    process.env.AWS_ENDPOINT_URL = localstackContainer.getConnectionUri();
    process.env.AWS_REGION = 'us-east-1';

    const terraformDirectory = './terraform/integration-test';

    console.info('Running terraform init...');
    execSync('terraform init', { stdio: 'inherit', cwd: terraformDirectory });
    console.info('Terraform init completed');
        
    console.info('Running terraform plan...');
    execSync('terraform plan', { stdio: 'inherit', cwd: terraformDirectory, env: process.env });
    console.info('Terraform plan completed');

    console.info('Running terraform apply...');
    execSync('terraform apply -lock -auto-approve', { stdio: 'inherit', cwd: terraformDirectory, env: process.env });
    console.info('Terraform apply completed')

 console.info('Setup is completed')

 firstRun = false;
};

export default globalBefore;