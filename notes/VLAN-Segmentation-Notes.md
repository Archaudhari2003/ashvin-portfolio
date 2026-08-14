# 🌐 VLAN Segmentation & Inter-VLAN Routing

**Project/Lab Focus:** Computer Networking · Enterprise Campus Topology
**Author:** Ashvin Chaudhary
**Tools Used:** Cisco Packet Tracer / GNS3 · Cisco IOS CLI

---

## 📌 Overview

A flat network can become difficult to manage as the number of users and departments increases. VLAN segmentation provides a way to logically separate departments into different broadcast domains while keeping the infrastructure manageable.

In this lab, I designed a segmented multi-department campus network using:

* **VLANs**
* **802.1Q Trunking**
* **Inter-VLAN Routing**
* **Router-on-a-Stick**
* **Access Control Lists (ACLs)**

The objective is to create logical network separation between departments and apply controlled communication between different network segments.

---

## 🎯 Lab Objectives

* Create separate VLANs for different departments and network functions.
* Assign end devices to the appropriate VLANs.
* Use trunking to carry multiple VLANs across network links.
* Configure inter-VLAN routing using Router-on-a-Stick.
* Apply ACLs to control communication between VLANs.
* Use a dedicated management VLAN for network infrastructure.
* Verify connectivity and access-control behavior.

---

## 🏗️ Network Segmentation

The campus network is divided into the following VLANs:

| VLAN ID     | Network           | Purpose                   | Default Gateway |
| ----------- | ----------------- | ------------------------- | --------------- |
| **VLAN 10** | `192.168.10.0/24` | HR & Administration       | `192.168.10.1`  |
| **VLAN 20** | `192.168.20.0/24` | Engineering / IT          | `192.168.20.1`  |
| **VLAN 30** | `192.168.30.0/24` | Guest / Public Wi-Fi      | `192.168.30.1`  |
| **VLAN 99** | `10.99.99.0/24`   | Management — Switches/APs | `10.99.99.1`    |

### Why VLANs?

VLANs provide logical separation even when devices share the same physical switching infrastructure.

For this campus design:

```text
                 Campus Network
                       │
        ┌──────────────┼──────────────┐
        │              │              │
     VLAN 10        VLAN 20        VLAN 30
       HR/AD        Engineering        Guest
        │              │              │
        └──────────────┼──────────────┘
                       │
                  VLAN 99
                  Management
```

---

## 🔐 Security Approach

The network follows a **least-privilege** approach.

Instead of allowing every VLAN to communicate freely, inter-VLAN communication can be controlled through ACL policies.

The intended segmentation is:

* **HR & Administration** → internal departmental network
* **Engineering / IT** → technical/internal network
* **Guest** → isolated public-access network
* **Management VLAN** → dedicated network for infrastructure administration

This separation improves network organization and provides a foundation for applying security policies.

---

# ⚙️ Cisco IOS Configuration

## 1. Create the VLANs

The first step is to create the required VLANs on the switch.

```text
Switch(config)# vlan 10
Switch(config-vlan)# name HR

Switch(config-vlan)# vlan 20
Switch(config-vlan)# name Engineering

Switch(config-vlan)# vlan 30
Switch(config-vlan)# name Guest
```

These VLANs provide logical separation for the HR, Engineering/IT, and Guest networks.

---

## 2. Assign Access Ports

End devices are connected to access ports and assigned to their respective VLANs.

Example:

```text
Switch(config)# interface range FastEthernet 0/1 - 5
Switch(config-if-range)# switchport mode access
Switch(config-if-range)# switchport access vlan 10
```

This assigns the selected access interfaces to **VLAN 10 (HR)**.

The same approach can be used to assign other access interfaces to VLAN 20 or VLAN 30 according to the topology.

---

## 🔗 3. 802.1Q Trunking

Trunk links are used to transport traffic from multiple VLANs across a single physical connection.

In this design, trunking is required where the switch connects to the device responsible for inter-VLAN routing.

```text
             Multiple VLANs
          ┌──────────────────┐
          │ VLAN 10          │
          │ VLAN 20          │
          │ VLAN 30          │
          │ VLAN 99          │
          └────────┬─────────┘
                   │
                TRUNK
                   │
             Routing Device
```

---

## 🌐 4. Inter-VLAN Routing

Devices belonging to different VLANs are placed in different IP networks.

Because different IP networks cannot communicate directly at Layer 2, a Layer 3 routing function is required.

This lab uses the **Router-on-a-Stick** approach, where one physical router interface can handle multiple VLANs using 802.1Q-tagged subinterfaces.

The documented default gateways are:

```text
VLAN 10 → 192.168.10.1
VLAN 20 → 192.168.20.1
VLAN 30 → 192.168.30.1
VLAN 99 → 10.99.99.1
```

---

## 🛡️ 5. Access Control Lists (ACLs)

ACLs are used to control traffic between network segments.

The purpose of applying ACLs in this design is to prevent unnecessary or unauthorized communication between departments while allowing required traffic.

For example, the Guest network can be treated as a separate trust zone rather than giving guest devices unrestricted access to internal departmental networks.

> **Note:** The original lab file documents the ACL-based design objective but does not currently contain the tested ACL command set. I would add the exact ACL rules here after testing them in Packet Tracer/GNS3 rather than documenting unverified commands.

---

# 🧪 Verification & Testing

After completing the configuration, the network should be tested systematically.

### VLAN Verification

Confirm that the required VLANs exist and that access ports are assigned correctly.

```text
show vlan brief
```

### Interface Verification

Check interface status and configuration:

```text
show interfaces status
```

### Trunk Verification

Check whether the required links are operating as trunks:

```text
show interfaces trunk
```

### Connectivity Testing

Use `ping` to verify communication between hosts and their configured gateways.

Example:

```text
ping 192.168.10.1
ping 192.168.20.1
ping 192.168.30.1
```

### Routing Verification

Check the routing information on the routing device:

```text
show ip route
```

### ACL Verification

After ACLs are configured, verify their behavior and counters:

```text
show access-lists
```

The goal is to confirm both:

* **Allowed traffic works**
* **Restricted traffic is blocked**

---

# 🧠 What I Learned

This lab helped me understand how VLANs can be used to divide a campus network into logical segments instead of maintaining one large flat network.

Key concepts practiced:

* VLAN creation and segmentation
* Access-port configuration
* 802.1Q trunking
* Inter-VLAN routing
* Router-on-a-Stick architecture
* IP addressing between VLANs
* ACL-based traffic control
* Network verification and troubleshooting

---

# 🔍 Troubleshooting Checklist

When inter-VLAN communication does not work, check the configuration layer by layer:

```text
End Device
    ↓
Access Port
    ↓
Correct VLAN
    ↓
Trunk Link
    ↓
Router Subinterface
    ↓
Default Gateway
    ↓
Routing
    ↓
ACL Policy
```

A failure at any stage can prevent successful communication.

---

# 📌 Key Takeaways

> **VLANs provide segmentation.**
> **Trunks transport multiple VLANs.**
> **Inter-VLAN routing enables communication between VLANs.**
> **ACLs control which communication is allowed.**

Together, these technologies provide a structured foundation for designing a more manageable and security-conscious enterprise campus network.

---

## 🚀 Next Improvements

Possible extensions for this lab include:

* Add complete Router-on-a-Stick configuration.
* Implement and document tested ACL policies.
* Add DHCP scopes for each VLAN.
* Add a dedicated management configuration for VLAN 99.
* Test failure scenarios and troubleshoot them systematically.
* Document the complete topology with a network diagram.
