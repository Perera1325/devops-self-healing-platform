# 🩺 The Self-Healing Flow Lifecycle

This outlines exactly how Kubernetes intercepts, detects, and fixes a disaster.

### 🔴 Phase 1: The Failure Event
1. **Container Deadlock**: A bad code update or overload causes a pod container to freeze.
2. **Probes Fail**: The `LivenessProbe` hits the `/` endpoint heavily, trying to verify the server heartbeat.
3. **Internal Unavailability**: The `ReadinessProbe` repeatedly fails to get a `200 OK` response. 

### 🔄 Phase 2: Defense Mechanisms
1. **Traffic Segregation**: Because the `ReadinessProbe` failed 3 consecutive times, Kubernetes instantly updates the master `Endpoints` object to slice the failed Pod out of the traffic array. The AWS Load Balancer automatically routes incoming web traffic away from the failing pod, causing **zero dropped packets** for end users.
2. **Termination Sequence**: Simultaneous to above, the `LivenessProbe` sends a SIGTERM, and then a SIGKILL, ripping down the frozen container completely.

### 🟩 Phase 3: Immediate Recovery
1. **ReplicaSet Gap**: The Kubernetes Master Controller notices that the requested replicas is `2`, but there is currently only `1` running pod.
2. **Re-creation**: A new, fresh Pod is scheduled onto an AWS Node.
3. **Traffic Integration**: The new Pod boots gracefully. Once its `ReadinessProbe` hits a green heartbeat, it is seamlessly reintegrated into the AWS Load Balancer Pool. 

System fully restored automatically!
