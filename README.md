# Online Quiz & Exam Portal – Quality Engineering Audit

## Description
A comprehensive quality engineering audit and multi-dimensional testing suite for a web-based examination platform. This project demonstrates a transition from manual defect tracking to a sophisticated automated testing lifecycle, ensuring the portal is production-ready through rigorous functional, performance, and security validation.

## Features
- **Manual Defect Management**: Initial functional verification and lifecycle tracking of identified bugs using Redmine.
- **Functional UI Automation**: End-to-end regression testing using a dual-tool approach (Selenium & Cypress) for cross-tool consistency.
- **Performance Benchmarking**: Stress testing the application to measure stability and response times under a simulated load of 50 concurrent users.
- **Security Vulnerability Scanning**: Dynamic analysis (DAST) to identify critical risks like vulnerable libraries and missing security headers.
- **Whitebox Analysis**: Static code auditing using SonarQube to identify technical debt and maintainability issues.

## Testing Results
| Testing Category | Tools Used | Total Test Cases | Passed | Success Rate |
|------------------|------------|------------------|--------|--------------|
| Defect Tracking | Redmine | 2 | 1 | 50% |
| Functional Automation | Selenium & Cypress | 24 | 24 | 100% |
| Performance Testing | k6 | 1 | 1 | 100% |
| Security Audit | OWASP ZAP | 2 | 0 | 0% |
| Whitebox Analysis | SonarQube | 1 | 0 | 0% |
| **OVERALL TOTAL** | | **30** | **26** | **86.6%** |

## Tech Stack
- **Functional Automation**: Selenium (Python 3.11), Cypress (Node.js v20.x)
- **Performance Testing**: k6 CLI
- **Security Auditing**: OWASP ZAP Desktop
- **Code Quality**: SonarQube Scanner / SonarLint
- **Defect Tracking**: Redmine

## Notes
- **Performance KPI**: The portal maintained a 100% request success rate with an average response time of 595ms under load.
- **Security Findings**: The audit identified high-risk vulnerabilities including a vulnerable Axios library (CVE-2025-27152).
- **Quality Gate**: Static analysis was used to monitor code smells and complexity to ensure long-term maintainability.
