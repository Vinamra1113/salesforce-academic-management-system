# CSBS Academic Management System (Salesforce Project)

## Project Overview
The **CSBS Academic Management System** is a Salesforce-based solution designed to **digitize and centralize academic operations** for the CSBS branch, starting with **4th-year students**.  
The goal is to streamline processes like **attendance tracking**, **marks management**, and **announcements**, providing real-time access to students and faculty while enabling department-level insights.

---

## Phase 1: Problem Understanding & Industry Analysis

This phase focuses on analyzing the current academic management challenges and laying the groundwork for building an efficient Salesforce solution.

### **Tasks in Phase 1**
1. Requirement Gathering  
2. Stakeholder Analysis  
3. Business Process Mapping  
4. Industry-Specific Use Case Analysis  
5. AppExchange Exploration  

---

## 1️. Requirement Gathering

### **Problem Statement**
Currently, the CSBS branch relies on **manual processes**:
- Attendance tracked on paper or spreadsheets.
- Marks managed in multiple Excel files.
- Announcements sent via WhatsApp groups.
- Reports generated manually, which is **time-consuming** and **error-prone**.

This lack of a **centralized system** causes inefficiencies, delays, and difficulty in tracking student performance.

### **Solution**
A Salesforce-based centralized system to:
- Manage **student and faculty profiles**.
- Track **attendance and marks** in real-time.
- Provide a **single portal for announcements**.
- Generate **reports and dashboards** for analytics.
- Offer role-based access for Admin, Faculty, and Students.

### **Functional Requirements**

| **Feature**            | **Description** |
|-------------------------|-----------------|
| Student Management      | Create and manage student records (Roll No, Name, Email, Batch, etc.) |
| Faculty Management      | Manage faculty profiles and assigned subjects |
| Subject Management      | Create and assign subjects to faculty and students |
| Attendance Tracking     | Faculty can directly mark attendance in Salesforce |
| Marks Management        | Update and view internal and external marks |
| Announcements           | Faculty can post important updates |
| Reports & Dashboards    | Visual representation of attendance, marks, and performance |

### **Non-Functional Requirements**

| **Requirement**       | **Goal** |
|-----------------------|----------|
| Scalability           | Support all future batches and subjects |
| Security              | Role-based access to protect sensitive data |
| Automation            | Use Salesforce Flows to reduce manual tasks |
| Mobile Accessibility  | Access via Salesforce mobile app |

**Initial Scope:**  
- Start with **4th-year CSBS students** only.  
- Core modules: Student, Faculty, Subjects, Attendance, Marks, Announcements.  
- One admin user (HOD/Coordinator).

---

## 2️. Stakeholder Analysis

Identifying stakeholders and defining their roles is essential for designing permissions and profiles in Salesforce.

| **Stakeholder**        | **Role in System**                              | **Access Level** |
|------------------------|-------------------------------------------------|-----------------|
| Admin (HOD/Coordinator) | Manages data, assigns faculty, generates reports | Full Access |
| Faculty                | Adds attendance, updates marks, posts announcements | Edit Access |
| Student                | Views attendance, marks, and announcements | Read-Only Access |
| System Developer (You) | Builds and maintains the Salesforce system | Developer Access |

---

## 3️. Business Process Mapping

### **Current Manual Process**
1. Faculty marks attendance on paper/Excel.
2. Marks are stored in separate Excel files.
3. Announcements are made via WhatsApp or verbally.
4. HOD compiles data manually for reports.
5. Students receive updates indirectly and often late.

### **Proposed Salesforce Process**

| **Action**      | **Old Process**            | **New Process (Salesforce)** |
|-----------------|---------------------------|------------------------------|
| Attendance      | Paper/Excel               | Faculty directly updates Salesforce |
| Marks           | Excel Sheets              | Marks stored in Salesforce |
| Announcements   | WhatsApp/Verbal           | Centralized announcements portal |
| Reports         | Manual Compilation        | Auto-generated dashboards |
| Student Access  | Delayed & indirect updates | Real-time access through Salesforce |

---

## 4️. Industry-Specific Use Case Analysis

Studying existing academic management systems to understand industry trends.

| **Platform**            | **Key Features**                  | **Gap Identified** |
|-------------------------|-----------------------------------|--------------------|
| Blackboard              | LMS, grading, communication       | Complex setup, not department-specific |
| Coursera for Campus     | Learning and skill development    | Lacks attendance and marks tracking |
| Salesforce Education Cloud | Recruitment, alumni, lifecycle management | Too broad for small-scale department use |

**Why Our Project Stands Out:**  
- Tailored specifically for **CSBS 4th-year students**.  
- Lightweight and simple compared to large-scale education platforms.  
- Department-level customization.

---

## 5️. AppExchange Exploration

| **App Name**                  | **Key Features**                      | **Why Not Fully Suitable** |
|-------------------------------|---------------------------------------|----------------------------|
| Salesforce Education Cloud    | Full student lifecycle management     | Overly complex for a single branch |
| Attendance Management System  | Basic attendance and reporting        | Lacks marks and announcement modules |

**Conclusion:**  
Existing solutions are either too broad or lack necessary features.  
This project will fill the gap by **combining attendance, marks, and announcements** into a single, easy-to-use platform.

---



## Author
**Vinamra Jain**  
B.Tech CSBS - Gyan Ganga Institute of Technology and Sciences  
📍 Jabalpur, India  
