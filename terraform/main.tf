module "core" {
  source = "./core"
  providers = {
    aws = aws
  }
}
