# CSBS Academic Management System (Salesforce Project)

## Project Overview
The **CSBS Academic Management System** is a Salesforce-based solution designed to **digitize and centralize academic operations** for the CSBS branch, starting with **4th-year students**.  
The goal is to streamline processes like **attendance tracking**, **marks management**, and **announcements**, providing real-time access to students and faculty while enabling department-level insights.

---

# Phase 1: Problem Understanding & Industry Analysis

## Tasks in Phase 1
- Requirement Gathering  
- Stakeholder Analysis  
- Business Process Mapping  
- Industry-Specific Use Case Analysis  
- AppExchange Exploration

## Requirement Gathering
### Problem Statement
Currently, the CSBS branch relies on **manual processes**:
- Attendance tracked on paper or spreadsheets.
- Marks managed in multiple Excel files.
- Announcements sent via WhatsApp groups.
- Reports generated manually, which is **time-consuming** and **error-prone**.

### Solution
A Salesforce-based centralized system to:
- Manage **student and faculty profiles**.
- Track **attendance and marks** in real-time.
- Provide a **single portal for announcements**.
- Generate **reports and dashboards** for analytics.
- Offer role-based access for Admin, Faculty, and Students.

### Functional Requirements
| Feature            | Description |
|-------------------|-------------|
| Student Management | Create and manage student records (Roll No, Name, Email, Batch, etc.) |
| Faculty Management | Manage faculty profiles and assigned subjects |
| Subject Management | Create and assign subjects to faculty and students |
| Attendance Tracking| Faculty can directly mark attendance in Salesforce |
| Marks Management   | Update and view internal and external marks |
| Announcements      | Faculty can post important updates |
| Reports & Dashboards| Visual representation of attendance, marks, and performance |

### Non-Functional Requirements
| Requirement       | Goal |
|------------------|------|
| Scalability       | Support all future batches and subjects |
| Security          | Role-based access to protect sensitive data |
| Automation        | Use Salesforce Flows to reduce manual tasks |
| Mobile Accessibility | Access via Salesforce mobile app |

### Initial Scope
- Start with **4th-year CSBS students** only.  
- Core modules: Student, Faculty, Subjects, Attendance, Marks, Announcements.  
- One admin user (HOD/Coordinator).

## Stakeholder Analysis
| Stakeholder        | Role in System                              | Access Level |
|-------------------|---------------------------------------------|--------------|
| Admin (HOD/Coordinator) | Manages data, assigns faculty, generates reports | Full Access |
| Faculty            | Adds attendance, updates marks, posts announcements | Edit Access |
| Student            | Views attendance, marks, and announcements | Read-Only Access |
| System Developer   | Builds and maintains the Salesforce system | Developer Access |

## Business Process Mapping
| Action      | Old Process            | New Process (Salesforce) |
|------------|----------------------|--------------------------|
| Attendance | Paper/Excel          | Faculty directly updates Salesforce |
| Marks      | Excel Sheets         | Marks stored in Salesforce |
| Announcements | WhatsApp/Verbal     | Centralized announcements portal |
| Reports    | Manual Compilation    | Auto-generated dashboards |
| Student Access | Delayed & indirect updates | Real-time access through Salesforce |

## Industry-Specific Use Case Analysis
| Platform                 | Key Features                  | Gap Identified |
|-------------------------|-------------------------------|----------------|
| Blackboard               | LMS, grading, communication    | Complex setup, not department-specific |
| Coursera for Campus      | Learning and skill development | Lacks attendance and marks tracking |
| Salesforce Education Cloud | Recruitment, alumni, lifecycle management | Too broad for small-scale department use |

## AppExchange Exploration
| App Name                  | Key Features                      | Why Not Fully Suitable |
|----------------------------|----------------------------------|----------------------|
| Salesforce Education Cloud | Full student lifecycle management | Overly complex for a single branch |
| Attendance Management System | Basic attendance and reporting   | Lacks marks and announcement modules |

---

# Phase 2: Org Setup & Configuration

## Objective
Establish a well-structured Salesforce environment by configuring essential organizational settings, security models, user roles, and deployment mechanisms. This ensures a strong foundation before building custom applications, objects, and automations for the academic management system.

## Salesforce Editions
- **Developer Edition (Free)** will be used for this project.
- Provides access to all necessary features for development and testing.
- Ideal for academic and small-scale projects.
- Supports custom objects, automation, and GitHub integration.

## Company Profile Setup
| Setting               | Configuration                     |
|----------------------|-----------------------------------|
| Company Name         | GGITS CSBS Academic Management System |
| Default Currency     | INR (₹)                           |
| Default Language     | English                            |
| Default Time Zone    | IST (Indian Standard Time)        |
| Default Locale       | English (India)                   |

## Business Hours
| Field                  | Configuration                               |
|------------------------|---------------------------------------------|
| Business Hours Name    | College Hours                               |
| Default Business Hours | Yes                                         |
| Status                 | Active                                      |
| Time Zone              | (GMT+05:30) India Standard Time (Asia/Kolkata) |

## Fiscal Year Settings
| Field                  | Configuration          |
|------------------------|----------------------|
| Fiscal Year Type        | Custom Fiscal Year   |
| Start Date              | July 1st             |
| End Date                | June 30th            |
| Standard Fiscal Year    | Not Selected         |
| Purpose                 | Align Salesforce reporting with academic sessions |

## User Setup & Licenses
| User Type              | Example                             | License Type                        | Purpose |
|------------------------|-------------------------------------|------------------------------------|---------|
| System Administrator   | Project Owner                        | Salesforce License                  | Full system access |
| Head of Department     | Department Head                      | Salesforce Platform License         | Manage faculty, subjects, departmental reports |
| Class Incharge         | Faculty assigned as class coordinator | Salesforce Platform License         | Manage student class data and attendance |
| Faculty                | Professors, Lecturers                | Salesforce Platform License         | Manage attendance, marks, and subjects |
| Student                | View-only access                     | Salesforce Platform / Community License | View personal marks, attendance, and announcements |

Profiles, Roles, Permission Sets, OWD, Sharing Rules, Login Access Policies, Developer Org Setup, Sandbox Usage, and Deployment Basics will be configured as per the project needs.

---

## Author
**Vinamra Jain**  
B.Tech CSBS - Gyan Ganga Institute of Technology and Sciences  
📍 Jabalpur, India

