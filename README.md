# 🚀 Kubernetes Self-Healing DevOps Platform

![AWS EKS](https://img.shields.io/badge/AWS-EKS-FF9900?logo=amazonaws&style=for-the-badge)
![Kubernetes](https://img.shields.io/badge/Kubernetes-blue?logo=kubernetes&style=for-the-badge)
![Helm](https://img.shields.io/badge/Helm-0f1689?logo=helm&style=for-the-badge)
![Prometheus](https://img.shields.io/badge/Prometheus-e6522c?logo=prometheus&style=for-the-badge)
![ArgoCD](https://img.shields.io/badge/ArgoCD-ef7b4d?logo=argo&style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Day%202%20Completed-brightgreen?style=for-the-badge)

## 📖 Overview

> **"I didn't just 'use AWS'. I built a system that detects failures and recovers automatically."**

This repository contains a **production-grade DevOps platform** demonstrating advanced Kubernetes deployment strategies. Rather than simply hosting an application, this project proves the ability to architect a fully resilient, self-healing system that autonomously monitors its own health, reacts to unexpected crashes, and dynamically scales resources during extreme traffic spikes without manual intervention.

## 🏗️ Architecture & Features

### 🛠️ Day 1: Foundation & Load Balancing
- **AWS EKS Infrastructure**: A fully managed Kubernetes cluster (`devops-cluster`) deployed in `eu-north-1`.
- **AWS Load Balancer Controller**: Bound via IAM Roles to Kubernetes ServiceAccounts (IRSA). Exposes internal Kubernetes services natively to the external web utilizing AWS Network Load Balancers.

### 🛡️ Day 2: Self-Healing & Resilience
- **Liveness Probes**: Continuously runs health-checks on the application. If the container enters a deadlocked or broken state, Kubernetes automatically terminates and replaces it.
- **Readiness Probes**: Guarantees zero downtime by removing struggling pods temporarily from the Load Balancer, ensuring users never see a `500 Server Error`.
- **Horizontal Pod Autoscaling (HPA)**: Integrated with the Kubernetes Metrics Server to dynamically scale NGINX web servers from `2` up to `10` replicas during CPU traffic spikes (>50%).

## 📁 Repository Structure

```text
/
├── k8s/                # Kubernetes Native Configurations
│   ├── deployment.yaml # App deployment, Liveness & Readiness Probes, CPU requests
│   ├── service.yaml    # AWS Network Load Balancer (internet-facing) annotations
│   └── hpa.yaml        # Horizontal Pod Autoscaler policies
├── infrastructure/     # AWS & Terraform configs
├── argocd/             # GitOps CI/CD delivery 
├── monitoring/         # Observability setup (Prometheus/Grafana)
└── README.md
```

## 🧪 Testing the Self-Healing Capabilities

Feel free to run these commands sequentially to simulate different disaster scenarios and watch Kubernetes autonomously heal the system!

### 1️⃣ Simulating a Pod Crash
If a container dies natively, the Kubernetes `ReplicaSet` detects it and replaces it.
```bash
# Watch the pod die and be immediately recreated by Kubernetes
kubectl delete pod -l app=nginx --grace-period=0 --force
```

### 2️⃣ Simulating a Massive Traffic Spike (HPA in Action)
A sudden influx of traffic will push the application CPU usage over 50%. The autoscaler will instantly react to keep latency low.
```bash
# Open Terminal 1: Watch the Autoscaler metrics update
kubectl get hpa --watch

# Open Terminal 2: Run a separate isolated pod to spam DDOS the LoadBalancer!
kubectl run -i --tty load-generator --rm --image=busybox:1.28 --restart=Never -- /bin/sh -c "while sleep 0.01; do wget -q -O- http://nginx-service; done"
```
> Watch the `REPLICAS` count rise automatically up to 10. Once you terminate the load generator (`Ctrl+C`), it will gently scale back down to 2!
