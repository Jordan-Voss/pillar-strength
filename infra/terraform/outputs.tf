output "api_public_ip" {
  description = "The public IP of the API server"
  value       = aws_instance.api_server.public_ip
}