provider "aws" {
  region = "eu-west-1"
}

data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"]
  }
}

resource "aws_security_group" "api_sg" {
  name        = "pillar-api-sg"
  description = "Allow SSH and API traffic"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] 
  }

  ingress {
    from_port   = 8335
    to_port     = 8335
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_iam_role" "ec2_ecr_role" {
  name = "pillar-ec2-ecr-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "ecr_read" {
  role       = aws_iam_role.ec2_ecr_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

resource "aws_iam_instance_profile" "ec2_profile" {
  name = "pillar-ec2-instance-profile"
  role = aws_iam_role.ec2_ecr_role.name
}

resource "aws_instance" "api_server" {
  ami                  = data.aws_ami.ubuntu.id
  instance_type        = "t3.micro"
  key_name             = "pillar-key"
  iam_instance_profile = aws_iam_instance_profile.ec2_profile.name
  vpc_security_group_ids = [aws_security_group.api_sg.id]


user_data = <<-EOF
              #!/bin/bash
              # Update and install dependencies
              apt-get update
              apt-get install -y apt-transport-https ca-certificates curl software-properties-common
              
              # Install Docker
              curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
              add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
              apt-get update
              apt-get install -y docker-ce
              
              # Install AWS CLI
              apt-get install -y awscli
              
              # Start Docker and set permissions
              systemctl start docker
              systemctl enable docker
              usermod -aG docker ubuntu
              
              # Force a group refresh for the current shell session
              newgrp docker
              EOF

  tags = {
    Name    = "Pillar-API-Instance"
    Project = "PillarStrength"
  }
}