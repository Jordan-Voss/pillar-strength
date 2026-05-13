output "api_public_ip" {
  value = aws_eip.api_ip.public_ip
}

output "api_ecr_repository_url" {
  value = aws_ecr_repository.api.repository_url
}