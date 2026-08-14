# 🔎 Nmap Scanning Methodology

**Category:** Cybersecurity · Network Reconnaissance
**Author:** Ashvin Chaudhary
**Environment:** Home Lab
**Tool:** Nmap
**Focus:** Host Discovery · Port Scanning · Service Enumeration

---

## 📌 Overview

Nmap is a network exploration and security auditing tool used to discover hosts, identify open ports, and gather information about network services.

In this lab, I used Nmap in my **home lab environment** to understand a structured network-scanning workflow.

The focus was on three main stages:

* Host discovery
* Port scanning
* Service and version enumeration

Nmap's official documentation describes host discovery as a way to identify active or interesting hosts before performing more detailed scanning.

---

## 🎯 Objectives

The main objectives of this lab were to:

* Understand the purpose of network reconnaissance.
* Discover active hosts within the authorized lab network.
* Identify open, closed, and filtered ports.
* Determine which services are associated with discovered ports.
* Perform basic service/version enumeration.
* Interpret Nmap output.
* Develop a systematic scanning methodology.
* Document findings clearly.

---

# 🧰 Lab Environment

The testing was performed against systems in my **home lab**.

```text
Scanner
  │
  │ Nmap
  ▼
Home Lab Network
  │
  ├── Host A
  ├── Host B
  ├── Host C
  └── Other Authorized Devices
```

> **Scope:** Only systems that I own or have explicit authorization to test should be scanned.

---

# 🔬 Scanning Methodology

A structured scanning process makes reconnaissance easier to understand and document.

```text
Define Scope
     │
     ▼
Host Discovery
     │
     ▼
Port Scanning
     │
     ▼
Service Detection
     │
     ▼
Analyze Results
     │
     ▼
Document Findings
```

Each stage answers a different question about the target environment.

---

# 1. 🖥️ Host Discovery

The first question is:

> **Which hosts are active?**

Host discovery reduces a larger IP range into a list of hosts that appear to be available for further analysis.

Nmap provides several discovery techniques and can perform discovery without proceeding to a port scan using the `-sn` option.

### Example

For an authorized home-lab subnet:

```bash
nmap -sn 192.168.1.0/24
```

The result can be used to identify which addresses responded to Nmap's discovery probes.

### Important observation

A host not responding to a discovery probe does **not necessarily mean the host is offline**. Firewalls and filtering can affect discovery results.

---

# 2. 🔌 Port Scanning

Once active hosts have been identified, the next question is:

> **Which network ports are accessible?**

Port scanning is one of Nmap's core functions. Nmap classifies ports into states such as:

* `open`
* `closed`
* `filtered`
* `unfiltered`
* `open|filtered`
* `closed|filtered`

The exact state depends on how the target responds to Nmap's probes.

### Basic lab scan

```bash
nmap 192.168.1.10
```

Example output structure:

```text
PORT     STATE    SERVICE
22/tcp   open     ssh
80/tcp   open     http
443/tcp  open     https
```

The actual results depend on the services running on the authorized target.

---

# 3. 🧩 Understanding Port States

Port states provide important information during analysis.

| State          | Meaning                                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------------------- |
| **Open**       | An application is listening and accepting connections.                                                  |
| **Closed**     | The port is reachable, but no application is currently listening.                                       |
| **Filtered**   | A firewall or other network obstacle prevents Nmap from determining whether the port is open or closed. |
| **Unfiltered** | The port responds, but Nmap cannot determine whether it is open or closed.                              |

Nmap can also report combined states when it cannot determine the exact condition.

---

# 4. 🔍 Service Enumeration

Finding an open port is only the beginning.

The next question is:

> **What service is actually running on that port?**

Nmap's service/version detection uses probes to interrogate discovered services and can identify application names and versions when sufficient information is available.

### Example

```bash
nmap -sV 192.168.1.10
```

Example result structure:

```text
PORT     STATE  SERVICE  VERSION
22/tcp   open   ssh      <detected version>
80/tcp   open   http     <detected version>
```

The `-sV` option enables version detection.

---

# 5. 📋 Reading Nmap Results

A useful way to interpret the output is:

```text
PORT
  ↓
STATE
  ↓
SERVICE
  ↓
VERSION
  ↓
ASSESSMENT
```

For each interesting result, I would record:

* Port number
* Protocol
* Port state
* Detected service
* Detected version
* Host address
* Notes or observations

---

# 🧪 Practical Analysis Workflow

For each authorized home-lab host:

### Step 1 — Identify the target

Confirm that the IP address belongs to the intended lab system.

### Step 2 — Discover the host

Determine whether the system appears reachable.

### Step 3 — Scan ports

Identify accessible TCP/UDP ports as required by the lab objective.

### Step 4 — Enumerate services

Use service detection to determine what software appears to be listening.

### Step 5 — Review results

Look for unexpected services, exposed management interfaces, or configurations that require attention.

### Step 6 — Document

Record the findings rather than relying only on the terminal output.

---

# 🛡️ Security Perspective

Nmap can also be useful from a defensive perspective.

A network administrator can use authorized scanning to understand the attack surface of systems they manage.

For example:

```text
Known Hosts
     │
     ▼
Open Ports
     │
     ▼
Running Services
     │
     ▼
Expected vs Unexpected
     │
     ▼
Security Review
```

An open port is **not automatically a vulnerability**.

It should be evaluated in context:

* Is the service expected?
* Is it required?
* Is it appropriately restricted?
* Is the software maintained?
* Should the service be accessible from this network?

---

# 🔎 Common Reasons for Unexpected Results

Nmap results can be affected by network conditions and configuration.

Possible factors include:

* Host firewall rules
* Network ACLs
* Routing
* Service configuration
* Port filtering
* Network segmentation
* Host availability

This is why scanning results should be interpreted rather than blindly treated as definitive.

---

# 🧠 What I Learned

This lab helped me understand that network reconnaissance is a process rather than simply running a scan command.

The main concepts I practiced were:

* Host discovery
* IP addressing and network ranges
* Port states
* TCP/UDP services
* Service detection
* Version enumeration
* Nmap output analysis
* Basic attack-surface awareness

The most important lesson was:

> **Scan first to understand the environment, then investigate what the results mean.**

---

# 📌 Key Takeaways

> **Host discovery identifies systems that appear to be active.**

> **Port scanning identifies accessible network ports.**

> **Service detection helps determine what is actually running.**

> **An open port is not automatically a vulnerability.**

> **Nmap results need to be interpreted in the context of the network and system.**

---

# 🧪 Verification Checklist

Before considering a scan complete:

```text
☐ Target is within authorized scope
☐ Correct IP/network range selected
☐ Active hosts identified
☐ Relevant ports identified
☐ Port states reviewed
☐ Services enumerated
☐ Unexpected services investigated
☐ Findings documented
```

---

## 🚀 Next Steps

For future home-lab exercises, I can build on this methodology with:

* Deeper service enumeration
* DNS analysis
* Web-service enumeration
* Network inventory
* Comparing Nmap results with Wireshark captures
* Correlating discovered services with system configuration
* Defensive network exposure reviews

---

## 📝 Lab Summary

This Nmap lab provided practical experience with a structured network-reconnaissance workflow.

Starting with **host discovery**, moving to **port scanning**, and then performing **service enumeration** helped me understand how Nmap can be used to build an initial picture of an authorized network environment.

**Discover → Scan → Enumerate → Analyze → Document**
