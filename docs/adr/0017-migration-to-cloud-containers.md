# ADR 0017: Migration to Containerized Cloud Infrastructure

## Context
Initial development intended to use a local Raspberry Pi as the production host, managed via Ansible. However, the migration to AWS was triggered by several critical blockers:
- **Hardware/OS Constraints**: The legacy OS and older ARM architecture of the Pi made it difficult to stabilize the GitHub Actions self-hosted runner.
- **Security & Networking**: Ensuring production-grade security (SSL termination, firewalling, and secret management) on a home network proved to be high-maintenance compared to cloud-native alternatives.
- **Deployment Reliability**: Ansible playbooks were prone to "environment drift" between the local dev machine and the Pi's specific hardware configuration.

## Decision
We migrated the entire infrastructure stack to **AWS** using **Docker** and **Terraform**.

## Rationale
- **Environment Parity**: Using Docker ensures the Spring Boot API runs in the exact same environment locally as it does in production, eliminating "it works on my machine" issues.
- **AWS ECR for Image Storage**: We chose Amazon ECR to store our private images. This allows the EC2 instance to pull images using **IAM Instance Profiles** (role-based access) rather than storing static passwords or Docker Hub credentials on the server.
- **Terraform for Portability**: By using Terraform, the infrastructure is now "disposable" and reproducible, allowing us to spin up or tear down the entire environment in minutes.

## Consequences
- **Improved Security**: Secrets are no longer baked into files (like Jasypt) but injected via GitHub Secrets into the container memory at runtime.
- **Operational Scalability**: The system is now ready for horizontal scaling (ECS/Fargate) which would have been impossible on the original hardware.