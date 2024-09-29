resource "aws_sqs_queue" "audit-events-queue" {
  name =  "audit-events"

  tags = {
    "application" = "audit"
  }
}