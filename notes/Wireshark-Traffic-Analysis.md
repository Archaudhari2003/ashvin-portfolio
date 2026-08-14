# 🌐 Wireshark Traffic Analysis

**Category:** Networking · Traffic Analysis
**Author:** Ashvin Chaudhary
**Tool:** Wireshark
**Focus:** TCP/IP · Protocol Analysis · Network Monitoring

---

## 📌 Overview

Network traffic analysis is the process of examining packets exchanged between devices to understand how a network is operating.

In this lab, I used **Wireshark** to capture and analyze network traffic, identify protocols, examine packet behavior, observe bandwidth patterns, and look for unusual activity that could indicate potential network or security issues.

The goal was to move beyond simply knowing networking concepts and understand what actual network communication looks like at the packet level.

---

## 🎯 Objectives

The main objectives of this lab were to:

* Capture live network traffic.
* Identify commonly used network protocols.
* Understand packet structure and communication flow.
* Analyze TCP/IP traffic.
* Use Wireshark display filters to isolate relevant packets.
* Observe traffic patterns and bandwidth usage.
* Look for unusual or unexpected network behavior.
* Develop a structured approach to packet analysis.

---

# 🧰 Tool & Environment

### Wireshark

Wireshark is a network protocol analyzer that allows captured network packets to be inspected in detail.

It can be used to examine:

* Source and destination addresses
* Protocols
* Ports
* Packet lengths
* TCP flags
* Packet timing
* Application-layer data where available
* Communication patterns

---

# 🔬 Traffic Analysis Workflow

The general analysis workflow used in this lab was:

```text
Start Capture
     │
     ▼
Generate / Observe Traffic
     │
     ▼
Stop Capture
     │
     ▼
Identify Protocols
     │
     ▼
Apply Display Filters
     │
     ▼
Inspect Packet Details
     │
     ▼
Analyze Communication Patterns
     │
     ▼
Look for Anomalies
     │
     ▼
Document Findings
```

---

# 📡 1. Packet Capture

The first step was to select the appropriate network interface and begin capturing traffic.

During a capture, Wireshark records packets exchanged through the selected interface.

A packet can then be examined at different protocol layers.

```text
Captured Packet
      │
      ├── Frame
      ├── Ethernet
      ├── IP
      ├── TCP / UDP
      └── Application Protocol
```

This layered view helped connect theoretical networking concepts with actual packet-level communication.

---

# 🌐 2. Protocol Identification

One of the first tasks during analysis was identifying which protocols appeared in the capture.

Depending on the traffic being generated, Wireshark can reveal protocols such as:

* ARP
* DNS
* ICMP
* TCP
* UDP
* HTTP
* TLS
* DHCP

Protocol identification provides an initial understanding of what is happening on the network.

---

# 🔎 3. Display Filters

Wireshark display filters make it easier to focus on specific traffic instead of manually inspecting every packet.

Examples:

### TCP Traffic

```text
tcp
```

### UDP Traffic

```text
udp
```

### DNS Traffic

```text
dns
```

### ICMP Traffic

```text
icmp
```

### HTTP Traffic

```text
http
```

### Traffic from a Specific Host

```text
ip.addr == 192.168.1.10
```

Filters can significantly reduce the amount of irrelevant traffic visible during analysis.

---

# 🔄 4. TCP/IP Analysis

TCP traffic can provide useful information about how two hosts establish and maintain communication.

Important TCP fields include:

* Source port
* Destination port
* Sequence number
* Acknowledgment number
* TCP flags
* Window size
* Payload length

The TCP three-way handshake can be represented as:

```text
Client                         Server
  │                              │
  │ -------- SYN --------------> │
  │                              │
  │ <------- SYN/ACK ----------- │
  │                              │
  │ -------- ACK --------------> │
  │                              │
  │       Connection Ready       │
```

Understanding this exchange makes it easier to recognize normal TCP communication and investigate unusual connection behavior.

---

# 📊 5. Bandwidth & Traffic Patterns

Traffic volume can provide useful information about network activity.

Wireshark provides tools that can help visualize traffic over time and identify periods of higher or lower network activity.

A basic analysis approach is:

```text
Low Traffic
     │
     ▼
Normal Activity
     │
     ▼
Traffic Increase
     │
     ▼
Investigate Cause
```

A traffic spike is not automatically malicious. It should be investigated in context.

Possible explanations include:

* File transfers
* Software updates
* Web activity
* Backups
* Streaming
* Network discovery
* Other legitimate application activity

The important part of traffic analysis is distinguishing expected behavior from activity that requires further investigation.

---

# 🚨 6. Anomaly Identification

Network anomalies are deviations from expected traffic behavior.

During analysis, useful indicators to investigate include:

* Unexpected protocols
* Unusual communication between hosts
* Unexpected destination addresses
* Repeated connection attempts
* Unusual traffic volumes
* Unexpected port activity
* Abnormal packet patterns

An anomaly should be treated as an **indicator for investigation**, not automatically classified as an attack.

```text
Unusual Traffic
      │
      ▼
Identify Source
      │
      ▼
Identify Destination
      │
      ▼
Identify Protocol
      │
      ▼
Understand Context
      │
      ▼
Determine Whether Behavior Is Expected
```

---

# 🧪 7. Practical Analysis Method

For each interesting packet or traffic pattern, I used a structured approach:

### Step 1 — Identify

Determine the source, destination, protocol, and relevant ports.

### Step 2 — Inspect

Open the packet details and examine the protocol fields.

### Step 3 — Filter

Apply a display filter to isolate related traffic.

### Step 4 — Follow the Conversation

Where appropriate, examine packets belonging to the same communication flow.

### Step 5 — Compare

Compare the observed behavior with what would normally be expected.

### Step 6 — Document

Record the observation, possible explanation, and whether additional investigation is required.

---

# 🛡️ Security Perspective

Packet analysis can support security monitoring by helping identify suspicious communication patterns.

For example:

```text
Network Traffic
      │
      ▼
Protocol Analysis
      │
      ▼
Behavior Analysis
      │
      ├── Expected → Normal Activity
      │
      └── Unexpected
             │
             ▼
       Further Investigation
```

Wireshark is therefore useful not only for troubleshooting networking problems but also for developing an understanding of network security monitoring.

---

# 🧠 What I Learned

This lab helped me understand that network communication becomes much easier to troubleshoot when it can be observed directly at the packet level.

Key concepts reinforced through the exercise include:

* TCP/IP communication
* Protocol identification
* Packet structure
* TCP connection establishment
* Source and destination addressing
* Ports and services
* Display filtering
* Traffic patterns
* Basic anomaly analysis

The biggest takeaway was learning to move from **“the network is not working”** to a more structured question:

> **What exactly are the packets doing?**

---

# 🔍 Troubleshooting Approach

When investigating a networking problem, packet capture can help answer questions such as:

```text
Is traffic being generated?
        ↓
Is it reaching the destination?
        ↓
Which protocol is being used?
        ↓
Is the expected response returning?
        ↓
Where does the communication fail?
```

This approach can help narrow down whether a problem is related to the host, protocol, routing, service, or network configuration.

---

# 📌 Key Takeaways

> **Packets provide direct evidence of network communication.**

> **Protocol analysis helps explain how devices communicate.**

> **Filters make large packet captures easier to investigate.**

> **Unusual traffic should be investigated in context rather than immediately classified as malicious.**

> **Wireshark is useful for both network troubleshooting and security analysis.**

---

## 🚀 Next Steps

Future traffic-analysis exercises can focus on:

* TCP connection analysis
* DNS traffic investigation
* HTTP and TLS traffic
* ARP behavior
* ICMP traffic
* TCP retransmissions
* Network latency
* Suspicious communication patterns
* Larger packet captures
* Correlating Wireshark observations with other security tools

---

## 📝 Lab Summary

This Wireshark lab provided practical experience with observing and analyzing network traffic at the packet level.

By identifying protocols, examining TCP/IP communication, applying filters, and studying traffic patterns, I developed a more practical understanding of how network communication can be monitored and investigated.

**Capture → Filter → Inspect → Analyze → Document**
