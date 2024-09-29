terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  profile                     = "localstack"
  alias                       = "localstack"
  region                      = "us-east-1" # You can set this to any AWS region
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true
  access_key                  = "test"
  secret_key                  = "test"
  endpoints {
    dynamodb = "http://localhost:4566" # Use the LocalStack endpoint
  }
}
