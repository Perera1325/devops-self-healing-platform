\# DevOps Self-Healing Platform (AWS + Kubernetes)



\## Overview

This project demonstrates a production-grade DevOps platform using AWS, Kubernetes, and GitOps principles.



The system automatically detects failures and performs self-healing actions such as:

\- Auto rollback deployments

\- Auto scaling services

\- Restarting failed pods



\## Tech Stack

\- AWS (EKS, ECR, IAM)

\- Kubernetes

\- Docker

\- GitHub Actions

\- ArgoCD

\- Prometheus \& Grafana



\## Project Structure

\- infrastructure/ → AWS \& Terraform configs

\- microservices/ → Application services

\- k8s-manifests/ → Kubernetes YAMLs

\- argocd/ → GitOps configs

\- monitoring/ → Observability setup

\- self-healing-engine/ → Automation logic



\## Status

Day 1: Project structure initialized

