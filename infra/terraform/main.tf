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
  description = "Allow SSH and HTTP/HTTPS traffic"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
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
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = "t3.micro"
  key_name               = "pillar-key"
  iam_instance_profile   = aws_iam_instance_profile.ec2_profile.name
  vpc_security_group_ids = [aws_security_group.api_sg.id]

  user_data = <<EOF
#!/bin/bash
apt-get update
apt-get install -y ca-certificates curl gnupg unzip
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" > /etc/apt/sources.list.d/docker.list
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
./aws/install
rm -rf awscliv2.zip ./aws
systemctl enable --now docker
usermod -aG docker ubuntu
EOF

  tags = {
    Name    = "Pillar-API-Instance-v2"
    Project = "PillarStrength"
  }
}

resource "aws_eip" "api_static_ip" {
  instance = aws_instance.api_server.id
  domain   = "vpc"
}

output "api_public_ip" {
value = aws_eip.api_static_ip.public_ip}