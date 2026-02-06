plugin "aws" {
    enabled = true
    version = "0.34.0"
    source  = "github.com/terraform-linters/tflint-ruleset-aws"
}

rule "aws_security_group_world_rules" {
    enabled = true
}

rule "aws_instance_invalid_type" {
    enabled = true
}