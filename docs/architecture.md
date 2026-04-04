# 🏗️ Self-Healing Platform Architecture

This document breaks down the components that make this platform incredibly resilient and autonomous.

## 🗺️ Architecture Diagram (Conceptual)

```text
       [ External Web Traffic ]
                 |
                 v
   [ AWS Network Load Balancer ]
                 |
      (Routes healthy targets only)
                 |
      +------------------------+
      |      EKS Cluster       |
      |                        |
      |   [ NGINX Service ]    |
      |                        |
      |   (ReplicaSet via      |
      |       Deployment)      |
      |                        |
      |  +-------+  +-------+  |
      |  | Pod 1 |  | Pod 2 |  |
      |  +-------+  +-------+  |
      |  (Liveness/Readiness)  |
      +------------------------+
                 |
 [ Horizontal Pod Autoscaler (HPA) ]
                 | (Reads metrics)
         [ Metrics Server ]
                 |
  [ Prometheus & Grafana Stack ] <--- Aggregates Logs, Alerts, and Metrics
```

## 🧠 Core Components

1. **AWS Network Load Balancer (NLB)**: Binds to EKS using the AWS Load Balancer Controller.
2. **Horizontal Pod Autoscaler**: Listens to the `metrics-server` and scales pods dynamically between 2 and 10 based on CPU usage.
3. **Liveness/Readiness Probes**: Acts as the autonomous healer system, terminating broken pods immediately and decoupling them from the Load Balancer before failure cascading.
4. **Monitoring Stack (Prometheus/Grafana)**: Scrapes Kubernetes resources to visually represent cluster health and trigger alerting webhooks if automated self-healing fails.
