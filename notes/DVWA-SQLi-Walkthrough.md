# 🛡️ DVWA SQL Injection (SQLi) — Lab Walkthrough

**Category:** Cybersecurity · Web Application Security
**Author:** Ashvin Chaudhary
**Target Environment:** Damn Vulnerable Web Application (DVWA)
**Tools Used:** Burp Suite Community Edition · `sqlmap` · Kali Linux · Firefox Developer Tools

---

## 📌 Overview

SQL Injection (SQLi) is a web application vulnerability that can occur when user-controlled input is incorporated into database queries without appropriate validation or parameterization.

In this lab, I studied SQL Injection using **Damn Vulnerable Web Application (DVWA)** in a controlled environment.

The exercise covered both:

* Manual vulnerability identification
* Request and parameter analysis
* Automated vulnerability assessment
* Database and application behavior analysis
* Security impact assessment
* Basic mitigation concepts

> **Lab Scope:** This work was performed against DVWA, an intentionally vulnerable application, in a controlled testing environment.

---

## 🎯 Lab Objectives

* Understand how SQL Injection can occur in a web application.
* Identify potentially vulnerable input parameters.
* Observe how malformed input affects application/database responses.
* Analyze HTTP requests during testing.
* Understand the role of Burp Suite in web security testing.
* Use automated assessment tools in an authorized lab.
* Understand the potential impact of SQL Injection.
* Document defensive measures that can prevent SQLi.

---

## 🧪 Lab Environment

### Target

**Damn Vulnerable Web Application (DVWA)**

The application was configured at:

```text
Security Level: Low
```

DVWA provides intentionally vulnerable functionality that can be used to understand common web application security weaknesses.

### Testing Workflow

```text
DVWA
  │
  ▼
Identify Input
  │
  ▼
Manual Testing
  │
  ▼
Inspect HTTP Request
  │
  ▼
Burp Suite Analysis
  │
  ▼
Automated Assessment
  │
  ▼
Document Findings
  │
  ▼
Understand Mitigation
```

---

# 🔬 Phase 1 — Reconnaissance

The first step was to understand the target functionality before testing it.

I navigated to the **SQL Injection** section of DVWA, where the application provides an input field requesting a `User ID`.

The important testing point was the user-controlled parameter because input handling is a key factor in SQL Injection vulnerabilities.

---

## 🔎 Phase 2 — Initial Manual Testing

I began with a basic syntax-error test using malformed input.

The application returned a database-related SQL syntax error.

This behavior was an important indication that user input was reaching the database query layer without being handled safely.

The original lab observation recorded a MySQL-related syntax error response.

### Observation

```text
User Input
    │
    ▼
DVWA Application
    │
    ▼
Database Query
    │
    ▼
Database Error Response
```

The error response provided useful information during reconnaissance because it indicated that the application was exposing database behavior to the user.

---

# 🕵️ Phase 3 — Burp Suite Analysis

Burp Suite was used to understand how the application sends user input to the server.

### What I focused on

* HTTP request method
* Target endpoint
* User-controlled parameters
* Request headers
* Server response
* Parameter behavior

The purpose was not simply to generate requests, but to understand the communication flow between the browser and the vulnerable application.

```text
Browser
   │
   │ HTTP Request
   ▼
Burp Suite
   │
   │ Forward / Inspect
   ▼
DVWA
   │
   ▼
Database
   │
   │ Response
   ▼
Burp Suite
   │
   ▼
Browser
```

---

# 🤖 Phase 4 — Automated Assessment

After understanding the application manually, `sqlmap` was used as an automated assessment tool against the authorized DVWA target.

The purpose of this phase was to compare automated vulnerability assessment with the observations made during manual testing.

### Automated Testing Workflow

```text
Identify Target
      ↓
Capture Request
      ↓
Analyze Parameter
      ↓
Automated Assessment
      ↓
Review Findings
      ↓
Document Results
```

Automation can help identify injection points efficiently, but understanding the underlying HTTP request and application behavior remains important.

---

# 📊 Phase 5 — Findings

### Finding: SQL Injection

**Vulnerability:** SQL Injection
**Target:** DVWA SQL Injection module
**Environment:** Controlled DVWA lab
**Severity:** High potential impact in real-world applications

### Evidence Observed

* User-controlled input was accepted by the application.
* Malformed input produced a database syntax error.
* The response exposed information about the underlying database behavior.
* The application was intentionally configured to demonstrate this vulnerability.

The original lab specifically records the syntax-error response during the initial manual test.

---

# ⚠️ Potential Impact

If SQL Injection exists in a real application, an attacker may potentially manipulate database queries and access information beyond what the application intended to expose.

Depending on the application's database privileges and implementation, possible consequences can include:

* Unauthorized access to database information
* Exposure of sensitive application data
* Authentication-related risks
* Modification of database records
* Loss of data integrity
* Increased impact when combined with other vulnerabilities

The actual impact depends on the vulnerable application's architecture, database permissions, and security controls.

---

# 🛡️ Mitigation

The most important defense against SQL Injection is to prevent user input from being interpreted as part of a SQL query.

Recommended defensive practices include:

### 1. Parameterized Queries

Use prepared statements and parameterized queries instead of constructing SQL statements directly from user input.

### 2. Input Validation

Validate input according to the expected data type and application requirements.

For example, if an application expects a numeric identifier, it should validate that input appropriately.

### 3. Least-Privilege Database Accounts

The application's database account should have only the permissions required for its functionality.

### 4. Safe Error Handling

Applications should not expose detailed database errors to end users.

Detailed errors should instead be recorded securely in server-side logs.

### 5. Security Testing

Regularly test applications using code review, automated security testing, and authorized penetration testing.

---

# 🧠 What I Learned

This lab helped me understand the relationship between:

```text
User Input
     ↓
HTTP Request
     ↓
Web Application
     ↓
SQL Query
     ↓
Database
     ↓
Application Response
```

The main lessons from the exercise were:

* SQL Injection is closely related to unsafe input handling.
* HTTP request analysis is important during web security testing.
* Burp Suite is useful for inspecting and understanding web traffic.
* Automated tools can assist with vulnerability assessment.
* Manual understanding should come before relying completely on automation.
* Database errors can unintentionally reveal implementation details.
* Secure coding practices are essential for preventing SQL Injection.

---

# 🔍 Troubleshooting & Testing Notes

When performing security testing in a lab, I would verify:

* The target is intentionally vulnerable or explicitly authorized.
* The correct DVWA security level is configured.
* The correct application module is being tested.
* HTTP requests are reaching the expected endpoint.
* Burp Suite is correctly capturing traffic.
* Automated tools are being used only against the authorized target.
* Findings are manually reviewed before being documented.

---

# 📌 Key Takeaways

> **Understand the application before testing it.**

> **Inspect the HTTP request, not just the final result.**

> **Use automation to assist analysis, not replace understanding.**

> **Always perform security testing against authorized targets.**

---

## 🚀 Next Steps

For future web-security labs, I plan to explore:

* Cross-Site Scripting (XSS)
* Authentication vulnerabilities
* Session security
* Access-control weaknesses
* Burp Suite request analysis
* Secure coding and SQL Injection prevention
* Additional controlled DVWA security modules

---

## 📝 Lab Summary

This DVWA exercise provided practical experience with identifying and analyzing SQL Injection behavior in an intentionally vulnerable web application.

The combination of **manual analysis, Burp Suite inspection, and automated assessment** helped me understand both the technical behavior of the vulnerability and the importance of defensive application security.
