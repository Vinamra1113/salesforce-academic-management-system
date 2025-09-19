# CSBS Academic Management

# Phase 1: Problem Understanding & Industry Analysis

This phase focuses on analyzing current academic management challenges and laying the foundation for a Salesforce-based solution for CSBS 4th-year students.

### Tasks in Phase 1

- Requirement Gathering
- Stakeholder Analysis
- Business Process Mapping
- Industry-specific Use Case Analysis
- AppExchange Exploration

## 1. Requirement Gathering

### Problem Statement

Currently, the CSBS branch relies on manual processes:

- Attendance tracked on paper or spreadsheets.
- Marks managed in multiple Excel files.
- Announcements sent via WhatsApp groups.
- Reports generated manually, leading to delays and errors.

### Solution

Implement a Salesforce-based centralized system to:

- Manage **student and faculty profiles**.
- Track **attendance and marks** in real-time.
- Provide a **single portal for announcements**.
- Generate **reports and dashboards** for analytics.
- Offer role-based access for Admin, Faculty, and Students.

### Functional Requirements

| Feature | Description |
| --- | --- |
| Student Management | Create and manage student records (Roll No, Name, Email, Batch, etc.) |
| Faculty Management | Manage faculty profiles and assigned subjects |
| Subject Management | Create and assign subjects to faculty and students |
| Attendance Tracking | Faculty can directly mark attendance in Salesforce |
| Marks Management | Update and view internal and external marks |
| Announcements | Faculty can post important updates |
| Reports & Dashboards | Visual representation of attendance, marks, and performance |

### Non-Functional Requirements

| Requirement | Goal |
| --- | --- |
| Scalability | Support all future batches and subjects |
| Security | Role-based access to protect sensitive data |
| Automation | Use Salesforce Flows to reduce manual tasks |
| Mobile Accessibility | Access via Salesforce mobile app |

### Initial Scope

- Start with **4th-year CSBS students** only.
- Core modules: Student, Faculty, Subjects, Attendance, Marks, Announcements.
- One admin user (HOD/Coordinator).

## 2. Stakeholder Analysis

| Stakeholder | Role in System | Access Level |
| --- | --- | --- |
| Admin (HOD/Coordinator) | Manages data, assigns faculty, generates reports | Full Access |
| Faculty | Adds attendance, updates marks, posts announcements | Edit Access |
| Student | Views attendance, marks, and announcements | Read-Only Access |
| System Developer | Builds and maintains the Salesforce system | Developer Access |

## 3. Business Process Mapping

| Action | Old Process | New Process (Salesforce) |
| --- | --- | --- |
| Attendance | Paper/Excel | Faculty directly updates Salesforce |
| Marks | Excel Sheets | Marks stored in Salesforce |
| Announcements | WhatsApp/Verbal | Centralized announcements portal |
| Reports | Manual Compilation | Auto-generated dashboards |
| Student Access | Delayed & indirect updates | Real-time access through Salesforce |

## 4. Industry-Specific Use Case Analysis

| Platform | Key Features | Gap Identified |
| --- | --- | --- |
| Blackboard | LMS, grading, communication | Complex setup, not department-specific |
| Coursera for Campus | Learning and skill development | Lacks attendance and marks tracking |
| Salesforce Education Cloud | Recruitment, alumni, lifecycle management | Too broad for small-scale department use |

## 5. AppExchange Exploration

| App Name | Key Features | Why Not Fully Suitable |
| --- | --- | --- |
| Salesforce Education Cloud | Full student lifecycle management | Overly complex for a single branch |
| Attendance Management System | Basic attendance and reporting | Lacks marks and announcement modules |

---

# **Phase 2: Org Setup & Configuration**

Phase 2 focuses on setting up and configuring the Salesforce environment for CSBS 4th-year students. This includes organization setup, user management, security, and deployment readiness.

## Tasks in Phase 2

- Salesforce Editions
- Company Profile Setup
- Business Hours & Holidays
- Fiscal Year Settings
- User Setup & Licenses
- Profiles
- Roles
- Permission Sets
- Organization-Wide Defaults (OWD)
- Sharing Rules
- Login Access Policies
- Developer Org Setup
- Sandbox Usage
- Deployment Basics

## Salesforce Editions

- **Developer Edition (Free)** will be used for the project.
- Provides access to all necessary features for development, testing, and customization.
- Supports custom objects, automation, reports, and GitHub integration.

## Company Profile Setup

| Setting | Configuration |
| --- | --- |
| Company Name | GGITS CSBS Academic Management System |
| Default Currency | INR (₹) |
| Default Language | English |
| Default Time Zone | IST (Indian Standard Time) |
| Default Locale | English (India) |

## Business Hours Setup

| Field | Configuration |
| --- | --- |
| Business Hours Name | College Hours |
| Default Business Hours | Yes |
| Status | Active |
| Time Zone | (GMT+05:30) India Standard Time (Asia/Kolkata) |

### Working Hours Schedule

| Day | Start Time | End Time | Notes |
| --- | --- | --- | --- |
| Sunday | 12:00 AM | 12:00 AM | Closed / Non-working day |
| Monday | 10:00 AM | 5:00 PM | Working day |
| Tuesday | 10:00 AM | 5:00 PM | Working day |
| Wednesday | 10:00 AM | 5:00 PM | Working day |
| Thursday | 10:00 AM | 5:00 PM | Working day |
| Friday | 10:00 AM | 5:00 PM | Working day |
| Saturday | 10:00 AM | 5:00 PM | Working day |

**Holidays:** TBD (To Be Decided)

## Fiscal Year Settings

| Setting | Configuration |
| --- | --- |
| Fiscal Year Type | Custom Fiscal Year |
| Start Date | July 1st |
| End Date | June 30th |
| Standard Fiscal Year | Not Selected |
| Purpose | Align Salesforce reporting with academic sessions |

## User Setup & Licenses

| User Type | Example | License Type | Purpose |
| --- | --- | --- | --- |
| System Administrator | Project Owner | Salesforce License | Full access for configuration and administration |
| Head of Department | Department Head | Salesforce Platform License | Manage faculty, subjects, and departmental reports |
| Class Incharge | Faculty assigned as coordinator | Salesforce Platform License | Manage student class data and attendance |
| Faculty | Professors, Lecturers | Salesforce Platform License | Manage attendance, marks, and subjects |
| Student | View-only access | Salesforce Platform / Community License | View own marks, attendance, and announcements |

## Profiles

| Profile Name | Purpose / Permissions |
| --- | --- |
| System Administrator | Full access to all objects, settings, and configurations. |
| Head of Department | Manage faculty, subjects, departmental reports, and students. |
| Class Incharge | Manage students in assigned classes, attendance, and marks. |
| Faculty | Manage assigned subjects, attendance, and marks. |
| Student | Read-only access to own attendance, marks, and announcements. |

## Roles

**Role Hierarchy:**

```
Head of Department
   └── Class Incharge
        └── Faculty
             └── Student

```

- Roles control record visibility; profiles control permissions.
- Students see only their own records; faculty and HOD see relevant records below them.

## Permission Sets

| Permission Set Name | Purpose / Use Case |
| --- | --- |
| Extra Subject Access | Grants faculty access to manage multiple subjects beyond primary assignment. |
| Report Generation | Allows HOD, Class Incharge, or Faculty to generate and export custom reports. |
| Bulk Data Management | Grants admins ability to import/export data using Data Loader. |
| Attendance Management | Allows Class Incharge/Faculty to update attendance for multiple classes. |
| Marks Management | Allows Faculty to update marks beyond default object permissions. |
| Announcement Management | Allows authorized users to create and manage announcements. |
| Student Data Access | Grants read-only access to specific student records for cross-class purposes. |
| Subject Assignment Update | Allows HOD to assign/reassign faculty to subjects. |
| Report Export to Excel | Enables export of reports for offline analysis. |
| Event & Calendar Management | Allows faculty/HOD to manage academic events and schedules. |
| Custom App Access | Grants access to any custom apps or tabs created for the project. |

## Organization-Wide Defaults (OWD)

| Object | Default Access Level | Notes |
| --- | --- | --- |
| Students | Private | Only assigned Faculty/Class Incharge can view/edit. Students see only own records. |
| Faculty | Public Read/Write | HOD can view/edit all faculty records. |
| Subjects | Public Read/Write | Faculty can view assigned subjects; HOD manages all subjects. |
| Attendance | Private | Only relevant Faculty/Class Incharge can manage. Students see only own attendance. |
| Marks | Private | Only relevant Faculty/Class Incharge can manage. Students see only own marks. |
| Announcements | Public Read Only | All users can view; only authorized users can create/edit. |

## Sharing Rules

| Sharing Rule Name | Object | Type | Access Granted To | Access Level | Purpose |
| --- | --- | --- | --- | --- | --- |
| Faculty → Students | Student | Criteria-Based | Faculty assigned to the class | Read/Write | Faculty can manage assigned students' records. |
| HOD → Faculty Records | Faculty | Role-Based | Head of Department (HOD) | Read/Write | HOD can manage all faculty records. |
| Students → Announcements | Announcement | Public | All Students | Read Only | Students can view all announcements. |
| Class Incharge → Marks | Marks | Role-Based | Class Incharge | Read/Write | Manage marks for their classes. |
| Faculty → Attendance | Attendance | Criteria-Based | Faculty assigned to subject/class | Read/Write | Manage attendance for assigned students. |
| HOD → Subjects | Subject | Role-Based | Head of Department | Read/Write | Manage all subjects. |
| Faculty → Subjects | Subject | Criteria-Based | Faculty assigned to subject | Read/Write | Manage only their assigned subjects. |
| Admin → All Records | All Objects | Role-Based | System Administrator | Full Access | Admins manage all records. |
| Report Generation Access | Students/Marks/Attendance | Role-Based | HOD, Class Incharge, Faculty | Read Only / Export | Generate reports securely. |
| Event/Calendar Management | Event | Role-Based | Faculty, HOD | Read/Write | Manage academic events. |

## Login Access Policies

| Policy | Configuration / Details | Purpose |
| --- | --- | --- |
| Multi-Factor Authentication (MFA) | Enabled for Admin and Faculty | Adds extra layer of security. |
| Password Policies | Strong password enforcement (length, complexity, expiration) | Secure accounts. |
| Session Timeout | 2 hours | Auto-logout after inactivity. |
| Login IP Ranges | Optional: restrict certain profiles to specific IPs | Security measure. |
| Login Hours | Optional: restrict student access to specific hours | Control login times. |
| Login History Monitoring | Enabled for all users | Tracks login attempts for auditing. |

## Developer Org Setup

- Create Salesforce Developer Edition account.
- Configure Company Profile, Users, Roles, Profiles, Business Hours, and Security settings.
- Enable required features: custom objects, automation, reports.
- Integrate with GitHub/Salesforce CLI for version control.

## Sandbox Usage

- Use **Developer Sandbox** for building and testing changes safely.
- Optionally, use **Full Sandbox** for testing production-level scenarios.
- Always test major changes in a sandbox before deploying to production.

## Deployment Basics

- **Change Sets**: Simple point-and-click deployment between orgs.
- **Salesforce CLI (SFDX)**: Advanced deployment with version control and automation.
- **GitHub Integration**: Track changes, collaborate, and maintain version control.
- Always document deployment steps and maintain backups.

---

# **Phase 3: Data Modeling & Relationships**

Phase 3 focuses on **Data Modeling & Relationships**, where we design the structure of our Salesforce application.

In this phase, we define **objects, fields, relationships, and layouts** to ensure that all academic data can be stored, linked, and accessed effectively.

This step lays the groundwork for **automation, reporting, and user interfaces** in the later phases.

## **Tasks in Phase 3**

- Standard & Custom Objects
- Fields
- Record Types
- Page Layouts
- Compact Layouts
- Schema Builder
- Lookup vs Master-Detail vs Hierarchical Relationships
- Junction Objects
- External Objects

## **1. Standard & Custom Objects**

### **Standard Objects**

These are Salesforce-provided objects that come prebuilt and will be utilized in this project:

| Standard Object | Purpose |
| --- | --- |
| **User** | Represents all users in the system (Admin, Faculty, Student) |
| **Report** | Used for generating analytical data reports |
| **Dashboard** | Provides visual representation of key performance metrics |

### **Custom Objects**

Custom objects are created to store academic-related data that is unique to this project.

| Object Name | API Name | Purpose |
| --- | --- | --- |
| **Student** | `Student__c` | Stores all details about students like name, roll number, contact info, and status |
| **Faculty** | `Faculty__c` | Holds faculty details such as designation, subjects assigned, and joining date |
| **Subject** | `Subject__c` | Represents academic subjects offered by the department |
| **Attendance** | `Attendance__c` | Tracks attendance records for each student per subject |
| **Marks** | `Marks__c` | Records internal and external examination marks for students |
| **Announcement** | `Announcement__c` | Used for announcements like exams, events, and important updates |
| **Enrollment** | `Enrollment__c` | Acts as a junction object to link students and subjects for many-to-many relationships |

## **2. Fields**

Each object will contain **custom fields** to capture required academic information.

### **2.1 Student Object (`Student__c`)**

| Field Label | API Name | Data Type | Description |
| --- | --- | --- | --- |
| Name | `Name` | Text | Full name of the student |
| Roll Number | `Roll_Number__c` | Text (Unique) | Unique identifier for each student |
| Email | `Email__c` | Email | Student's email address |
| Phone | `Phone__c` | Phone | Contact number |
| Status | `Status__c` | Picklist | Active, Alumni, Inactive |

### **2.2 Faculty Object (`Faculty__c`)**

| Field Label | API Name | Data Type | Description |
| --- | --- | --- | --- |
| Name | `Name` | Text | Faculty member's name |
| Email | `Email__c` | Email | Faculty email |
| Phone | `Phone__c` | Phone | Faculty contact number |
| Designation | `Designation__c` | Picklist | Example: Professor, Assistant Professor, Lecturer |
| Subjects Assigned | `Subjects_Assigned__c` | Picklist (Multi-select) | Subjects allocated to faculty |
| Joining Date | `Joining_Date__c` | Date | Faculty joining date |
| Status | `Status__c` | Picklist | Active, Resigned, On Leave |

### **2.3 Subject Object (`Subject__c`)**

| Field Label | API Name | Data Type | Description |
| --- | --- | --- | --- |
| Name | `Name` | Text | Name of the subject |
| Code | `Code__c` | Text | Subject code |
| Department | `Department__c` | Picklist | Example: CSBS, CSE, IT |
| Status | `Status__c` | Picklist | Active, Inactive |

### **2.4 Attendance Object (`Attendance__c`)**

| Field Label | API Name | Data Type | Description |
| --- | --- | --- | --- |
| Date | `Date__c` | Date | Date of attendance |
| Status | `Status__c` | Picklist | Present, Absent, Leave |
| Notes | `Notes__c` | Text Area | Additional remarks |
| Student | `Student__c` | Master-Detail | Links attendance to a specific student |
| Subject | `Subject__c` | Master-Detail | Links attendance to a specific subject |

### **2.5 Marks Object (`Marks__c`)**

| Field Label | API Name | Data Type | Description |
| --- | --- | --- | --- |
| Exam Type | `Exam_Type__c` | Picklist | Internal, External |
| Marks Obtained | `Marks_Obtained__c` | Number(5,1) | Marks scored by the student |
| Maximum Marks | `Maximum_Marks__c` | Number(5,1) | Total marks for the exam |
| Student | `Student__c` | Master-Detail | Links marks to a specific student |
| Subject | `Subject__c` | Lookup | Associates marks with a subject |

### **2.6 Announcement Object (`Announcement__c`)**

| Field Label | API Name | Data Type | Description |
| --- | --- | --- | --- |
| Title | `Title__c` | Text | Announcement title |
| Description | `Description__c` | Long Text Area | Detailed description |
| Type | `Type__c` | Picklist | General, Exam, Event |
| Posted By | `Posted_By__c` | Lookup (Faculty) | Faculty who posted the announcement |
| Date | `Date__c` | Date | Date of announcement |

### **2.7 Enrollment Object (`Enrollment__c`)**

| Field Label | API Name | Data Type | Description |
| --- | --- | --- | --- |
| Enrollment Date | `Enrollment_Date__c` | Date | Date of enrollment |
| Student | `Student__c` | Master-Detail | Links to student record |
| Subject | `Subject__c` | Master-Detail | Links to subject record |
| Status | `Status__c` | Picklist | Active, Dropped |

## **3. Record Types**

Record types are used to differentiate data behavior like page layouts and picklist values.

| Object | Record Type Name | Purpose |
| --- | --- | --- |
| Announcement | General | General department announcements |
| Announcement | Exam | Exam-related updates |
| Announcement | Event | Events like seminars and workshops |
| Marks | Internal | Internal assessments |
| Marks | External | External university exams |

## **4. Page Layouts**

Different **page layouts** ensure users see only relevant information.

| Object | Page Layouts |
| --- | --- |
| Student | Admin Layout, Faculty Layout, Student Layout |
| Faculty | Admin Layout, Faculty Layout |
| Subject | Admin Layout |
| Marks | Faculty Layout, Admin Layout |
| Attendance | Faculty Layout |
| Announcement | Admin Layout, Faculty Layout |

## **5. Compact Layouts**

Compact layouts define the key fields shown in Salesforce mobile app previews.

**Example: Student Compact Layout**

- Name
- Roll Number
- Email
- Status

## **6. Relationships**

### **Types of Relationships Used**

| Relationship Type | Example | Usage |
| --- | --- | --- |
| **Lookup** | `Announcement → Faculty` | Optional association without data dependency |
| **Master-Detail** | `Marks → Student` | Parent-Child with dependency |
| **Master-Detail** | `Attendance → Student` | Ensures attendance is deleted if the student is deleted |
| **Master-Detail** | `Attendance → Subject` | Connects attendance to subjects |
| **Master-Detail** | `Enrollment → Student` | Many-to-many relationship management |
| **Master-Detail** | `Enrollment → Subject` | Many-to-many relationship management |

## **7. Junction Object**

The `Enrollment__c` object is the junction between `Student__c` and `Subject__c`.

- **Use Case:**
    - A single student can be linked to multiple subjects.
    - A single subject can be linked to multiple students.
- **Solution:**
    - `Enrollment__c` has two **Master-Detail Relationships**:
        - Master-Detail with **Student__c**
        - Master-Detail with **Subject__c**

This ensures a **clean many-to-many relationship**.

## **8. Schema Builder**

The **Schema Builder** visually displays all objects and their relationships.

**Diagram should include:**

- Core objects: *Student, Faculty, Subject*
- Dependent objects: *Marks, Attendance*
- Junction object: *Enrollment*
- Optional objects: *Announcement*

## **9. External Objects**

Currently, **no external objects** are required.

However, if future integration with external university databases or APIs is planned, **External Objects** will be used for read-only or real-time data connections.

---

# **Phase 4: Process Automation (Admin)**

Phase 4 focuses on **automating academic operations** to minimize manual work, reduce errors, and improve the overall efficiency of the CSBS Academic Management System.

By leveraging Salesforce automation tools like **Flows, Workflow Rules, Validation Rules, Process Builder, and Custom Notifications**, this phase ensures smooth handling of attendance, marks, enrollments, and communications.

## **Tasks in Phase 4**

- Validation Rules
- Workflow Rules
- Process Builder
- Approval Process
- Flow Builder (Screen, Record-Triggered, Scheduled, Auto-launched)
- Email Alerts
- Field Updates
- Tasks
- Custom Notifications

## **1. Validation Rules**

### **Purpose**

Validation rules are used to **ensure data accuracy and consistency**.

They prevent users from entering incorrect or incomplete data.

| Object | Validation Rule Name | Description |
| --- | --- | --- |
| **Marks__c** | Marks_Within_Limit | Ensures Marks Obtained ≤ Maximum Marks |
| **Attendance__c** | Valid_Attendance | Attendance cannot exceed total working days |
| **Enrollment__c** | Duplicate_Enrollment_Check | Prevents a student from enrolling in the same subject twice |

### **Example: Marks Validation Rule**

- **Rule Name:** `Marks_Within_Limit`
- **Formula:**
    
    ```
    Marks_Obtained__c > Maximum_Marks__c
    
    ```
    
- **Error Message:**
    
    `"Marks Obtained cannot be greater than Maximum Marks."`
    
- **Error Location:** Marks Obtained Field

## **2. Workflow Rules**

> Note:
> 
> 
> Workflow rules are only used for **simple, one-step automation**.
> 
> Since Salesforce is moving towards Flows, Workflow Rules are **limited to basic legacy needs**.
> 

**Use Cases:**

| Workflow Rule Name | Trigger | Action |
| --- | --- | --- |
| **Notify Faculty on Enrollment Approval** | Enrollment status = Approved | Send email to faculty |
| **Notify Student on Marks Update** | Marks updated | Send email to student |

## **3. Process Builder**

**Purpose:**

Process Builder is used for **multi-step automation**, handling scenarios where multiple actions need to occur.

**Example Use Case: Marks Approval Flow**

| Trigger | Criteria | Actions |
| --- | --- | --- |
| Faculty submits marks (`Status = Pending Approval`) | Status = Pending Approval | - Create Task for HOD  - Send Custom Notification to HOD |

## **4. Approval Process**

### **Purpose**

Approval processes streamline reviews and approvals for academic workflows like:

- Marks approval by HOD
- Faculty leave request approval
- Enrollment request approval

**Example: Marks Approval Flow**

| Step | Approver | Action |
| --- | --- | --- |
| **Step 1** | HOD | Approve/Reject Marks |
| **Step 2** | System auto-updates Marks record status |  |
| **Step 3** | Custom notification sent to faculty |  |

## **5. Flow Builder**

Flow Builder replaces older automation tools for **complex, modern automation**.

| Flow Type | Purpose |
| --- | --- |
| **Screen Flow** | Faculty leave request form |
| **Record-Triggered Flow** | Automatically create tasks when marks are submitted |
| **Scheduled Flow** | Remind HOD if enrollment request pending > 2 days |
| **Auto-launched Flow** | Trigger custom notifications for announcements |

### **Examples of Record-Triggered Flows**

| Object | Trigger Event | Flow Action |
| --- | --- | --- |
| **Marks__c** | Marks.Status = Pending Approval | Create Task for HOD |
| **Attendance__c** | Adjustment requested | Create Task for Class Incharge |
| **Student__c** | Attendance < 75% | Notify Student and Faculty Advisor |

## **6. Email Alerts**

| Email Alert Name | Trigger Event | Recipients |
| --- | --- | --- |
| **Marks Approval Notification** | Marks approved by HOD | Faculty |
| **Enrollment Status Update** | Enrollment approved/rejected | Student |
| **Leave Request Decision** | Leave request approved/rejected | Faculty |

## **7. Field Updates**

Field updates automatically modify field values during automation.

| Use Case | Field Updated | Example |
| --- | --- | --- |
| **Marks Approval** | Status__c | Status updated to "Approved" |
| **Enrollment Completion** | Status__c | Status updated to "Completed" |
| **Attendance Adjustment** | Adjustment_Status__c | Status updated to "Reviewed" |

## **8. Tasks**

Tasks ensure follow-up actions are clearly assigned and tracked.

| Scenario | Triggering Event | Task Owner | Purpose |
| --- | --- | --- | --- |
| Marks Review | Faculty submits marks | HOD | Review marks submission |
| Attendance Adjustment | Adjustment requested | Class Incharge | Verify and approve |
| Enrollment Request Follow-Up | Pending > 2 days | HOD | Prevent delays |
| Leave Approval | Faculty leave request submitted | HOD | Review and decide |
| Subject Inactivation Cleanup | Subject marked inactive | Admin | Cleanup related records |
| Low Attendance Alert | Attendance < 75% | Faculty Advisor | Notify student and intervene |

## **9. Custom Notifications**

Custom notifications provide **real-time alerts** within Salesforce and on mobile.

| Event | Trigger | Target Users | Example Message |
| --- | --- | --- | --- |
| New Announcement Posted | Record created on Announcement__c | All Students | `"New announcement: Mid-semester exams begin on 20th Sept."` |
| Marks Approved | Marks.Status = Approved | Faculty | `"Marks for DBMS approved by HOD."` |
| Enrollment Approved | Enrollment.Status = Approved | Student | `"Your enrollment for AI has been approved."` |
| Low Attendance Alert | Attendance < 75% | Student & Faculty Advisor | `"Your attendance dropped below 75%."` |
| Leave Request Decision | Leave request approved/rejected | Faculty | `"Your leave request was approved by HOD."` |

---

# **Phase 5: Apex Programming (Developer)**

Phase 5 focuses on **custom backend logic** using Apex in Salesforce.

This ensures advanced automation for academic processes such as **attendance tracking, student status updates, and notifications**, which cannot be fully handled by declarative tools alone.

## **Tasks in Phase 5**

- Classes & Objects
- Apex Triggers (Before/After Insert/Update/Delete)
- Trigger Design Pattern
- SOQL & SOSL Queries
- Collections: List, Set, Map
- Control Statements
- Batch Apex
- Queueable Apex
- Scheduled Apex
- Future Methods
- Exception Handling
- Test Classes
- Asynchronous Processing

## **1. Classes & Objects**

Apex follows **Object-Oriented Programming (OOP)** concepts.

**Example: StudentHandler Class**

```
public class StudentHandler {
    public static void updateStudentStatus(List<Student__c> students) {
        for (Student__c s : students) {
            if(s.Attendance__c >= 75) {
                s.Status__c = 'Active';
            } else {
                s.Status__c = 'Inactive';
            }
        }
    }
}

```

- **Purpose:** Updates `Status__c` of students based on attendance.
- **Benefit:** Centralized logic, reusability, and cleaner triggers.

## **2. Apex Triggers**

Triggers allow actions **before or after record changes**.

**Example: Auto-update Student Status on Attendance Change**

```
trigger StudentTrigger on Student__c (before insert, before update) {
    StudentHandler.updateStudentStatus(Trigger.new);
}

```

**Trigger Events:**

| Event | When It Runs |
| --- | --- |
| `before insert` | Before record creation |
| `after insert` | After record creation |
| `before update` | Before record update |
| `after update` | After record update |
| `before delete` | Before record deletion |
| `after delete` | After record deletion |

## **3. Trigger Design Pattern**

Structured triggers prevent messy, unmaintainable code.

**Trigger:**

```
trigger StudentTrigger on Student__c (before insert, before update) {
    StudentTriggerHandler.handleAttendanceUpdate(Trigger.new);
}

```

**Handler Class:**

```
public class StudentTriggerHandler {
    public static void handleAttendanceUpdate(List<Student__c> students) {
        for(Student__c s : students) {
            if(s.Attendance__c < 0 || s.Attendance__c > 100) {
                s.addError('Attendance must be between 0 and 100.');
            }
        }
    }
}

```

## **4. SOQL & SOSL**

### **SOQL**

```
List<Student__c> lowAttendanceStudents = [SELECT Name, Attendance__c FROM Student__c WHERE Attendance__c < 75];

```

### **SOSL**

```
List<List<SObject>> searchResults = [FIND 'Vinamra' IN ALL FIELDS RETURNING Student__c(Name, Attendance__c)];

```

## **5. Collections**

| Collection Type | Description |
| --- | --- |
| **List** | Ordered collection |
| **Set** | Unique values |
| **Map** | Key-value pairs |

**Example:**

```
List<String> studentNames = new List<String>{'John', 'Alice'};
Set<String> lowAttendanceIds = new Set<String>{'a01', 'a02'};
Map<Id, Student__c> studentMap = new Map<Id, Student__c>([SELECT Id, Name, Attendance__c FROM Student__c]);

```

## **6. Control Statements**

```
for(Student__c s : students) {
    if(s.Attendance__c < 75) {
        s.Status__c = 'Inactive';
    } else {
        s.Status__c = 'Active';
    }
}

```

## **7. Batch Apex**

Batch Apex handles **large data volumes**.

**Example:** Update student status for all students based on attendance.

```
global class UpdateAttendanceBatch implements Database.Batchable<SObject> {
    global Database.QueryLocator start(Database.BatchableContext BC) {
        return Database.getQueryLocator('SELECT Id, Attendance__c FROM Student__c');
    }
    global void execute(Database.BatchableContext BC, List<Student__c> scope) {
        for(Student__c s : scope) {
            s.Status__c = (s.Attendance__c >= 75) ? 'Active' : 'Inactive';
        }
        update scope;
    }
    global void finish(Database.BatchableContext BC) {
        System.debug('Student attendance status updated.');
    }
}

```

## **8. Queueable Apex**

Queueable Apex can handle **asynchronous updates**, like sending notifications to students with low attendance.

```
public class LowAttendanceNotificationQueueable implements Queueable {
    public void execute(QueueableContext context) {
        List<Student__c> students = [SELECT Id, Name, Email__c FROM Student__c WHERE Attendance__c < 75];
        // Logic to send notification/email
    }
}
System.enqueueJob(new LowAttendanceNotificationQueueable());

```

## **9. Scheduled Apex**

Run jobs periodically to **check attendance and update statuses**.

```
global class DailyAttendanceCheck implements Schedulable {
    global void execute(SchedulableContext sc) {
        UpdateAttendanceBatch batch = new UpdateAttendanceBatch();
        Database.executeBatch(batch);
    }
}

```

Schedule:

```
System.schedule('Daily Attendance Check', '0 0 1 * * ?', new DailyAttendanceCheck());

```

*(Runs daily at 1 AM)*

## **10. Future Methods**

Used for **asynchronous tasks**, e.g., sending notifications to students with low attendance.

```
public class NotificationHandler {
    @future
    public static void sendLowAttendanceAlert(Id studentId) {
        Student__c s = [SELECT Name, Email__c FROM Student__c WHERE Id = :studentId];
        System.debug('Notification sent to: ' + s.Email__c);
    }
}

```

## **11. Exception Handling**

```
try {
    update studentList;
} catch (DmlException e) {
    System.debug('Error updating attendance status: ' + e.getMessage());
}

```

## **12. Test Classes**

**Example:**

```
@isTest
public class StudentHandlerTest {
    @isTest
    static void testUpdateStudentStatus() {
        Student__c s = new Student__c(Name='Test Student', Attendance__c=70);
        insert s;

        s.Attendance__c = 80;
        update s;

        Student__c updated = [SELECT Status__c FROM Student__c WHERE Id = :s.Id];
        System.assertEquals('Active', updated.Status__c);
    }
}

```

## **13. Asynchronous Processing**

| Type | Best For |
| --- | --- |
| **Future Method** | Sending notifications asynchronously |
| **Queueable Apex** | Processing complex updates like multiple student alerts |
| **Batch Apex** | Updating large number of records (attendance/status) |
| **Scheduled Apex** | Periodic attendance checks and reporting |

---

# **Phase 6: User Interface Development**

Phase 6 focuses on creating a **user-friendly and efficient interface** for the CSBS Academic Management System using **Lightning Experience**.

It ensures that students, faculty, and admin can **interact with Salesforce effectively**, with clear navigation and responsive design.

### **Tasks in Phase 6**

- Lightning App Builder
- Record Pages
- Tabs
- Home Page Layouts
- Utility Bar
- LWC (Lightning Web Components)
- Apex with LWC
- Events in LWC
- Wire Adapters
- Imperative Apex Calls
- Navigation Service

## **1. Lightning App Builder**

**Purpose:** Create custom apps, pages, and experiences using a **drag-and-drop interface**.

**Use Cases:**

- Create a **Student App** with tabs for Attendance, Marks, and Announcements.
- Create a **Faculty App** for managing subjects, marking attendance, and posting announcements.
- Customize **HOD/Admin App** with reports and dashboards.

## **2. Record Pages**

**Purpose:** Customize how individual records appear.

**Examples:**

- Student Record Page: Shows student profile, attendance, marks, and notifications.
- Subject Record Page: Shows assigned faculty, enrolled students, and schedules.
- Faculty Record Page: Shows subjects assigned, attendance and leave status.

**Components:**

- Related Lists
- Tabs
- Lightning Components (LWC or Standard Components)

## **3. Tabs**

**Purpose:** Provide navigation within apps.

**Examples:**

- **Student App Tabs:** Home, Attendance, Marks, Announcements
- **Faculty App Tabs:** Home, Subject Management, Attendance, Marks Entry
- **Admin App Tabs:** Home, Reports, Users, Settings

## **4. Home Page Layouts**

Custom home pages improve user productivity.

**Components to include:**

- **Key Metrics:** Attendance percentage, pending approvals
- **Quick Actions:** Mark attendance, post announcements
- **Recent Records:** Recent marks, enrollments, or notifications

## **5. Utility Bar**

**Purpose:** Provide quick access to important tools and actions.

**Examples:**

- Search students
- Quick announcement creation
- Notifications
- Reports & Dashboards

## **6. Lightning Web Components (LWC)**

**Purpose:** Build reusable, responsive, and modern UI components.

**Example Components:**

- Attendance Tracker LWC: Faculty can mark attendance.
- Marks Input LWC: Faculty can enter marks.
- Notifications Panel LWC: Students receive real-time alerts.

## **7. Apex with LWC**

Apex allows LWCs to **fetch, update, or delete Salesforce data**.

**Example:**

```jsx
// JS Controller
import { LightningElement, wire } from 'lwc';
import getStudentAttendance from '@salesforce/apex/StudentController.getStudentAttendance';

export default class AttendanceLWC extends LightningElement {
    @wire(getStudentAttendance) attendanceData;
}

```

**Apex Controller:**

```
public with sharing class StudentController {
    @AuraEnabled(cacheable=true)
    public static List<Student__c> getStudentAttendance() {
        return [SELECT Name, Attendance__c FROM Student__c];
    }
}

```

## **8. Events in LWC**

**Purpose:** Allow components to communicate with each other.

**Types of events:**

- **Custom Events:** Pass data from child to parent component
- **Application Events:** Notify unrelated components

**Example:** Notify parent component when attendance is updated.

## **9. Wire Adapters**

Wire adapters **retrieve Salesforce data reactively**.

**Example:**

```jsx
@wire(getStudentAttendance) students;

```

- Updates automatically when the underlying data changes.

## **10. Imperative Apex Calls**

Used when **manual invocation of Apex methods** is required.

**Example:** Fetch student attendance on a button click.

```jsx
handleButtonClick() {
    getStudentAttendance()
        .then(result => { this.students = result; })
        .catch(error => { this.error = error; });
}

```

## **11. Navigation Service**

**Purpose:** Navigate programmatically in Salesforce apps.

**Example:** Navigate to a record page or external URL.

```jsx
import { NavigationMixin } from 'lightning/navigation';

export default class NavigateToStudent extends NavigationMixin(LightningElement) {
    navigateToRecord() {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: '001XXXXXXXXXXXX',
                objectApiName: 'Student__c',
                actionName: 'view'
            }
        });
    }
}

```

---

# **Phase 7: Integration & External Access**

Phase 7 focuses on enabling **secure integration** between Salesforce and external systems.

It ensures real-time or scheduled data exchange for advanced use cases such as automated notifications, third-party attendance tools, and external analytics.

### **Tasks in Phase 7**

- Named Credentials
- External Services
- Web Services (REST/SOAP)
- Callouts
- Platform Events
- Change Data Capture
- Salesforce Connect
- API Limits
- OAuth & Authentication
- Remote Site Settings

## **1. Named Credentials**

**Purpose:** Store authentication and endpoint information securely for external systems.

**Example Use Case:**

- Connect to an external student portal API to fetch attendance data.

**Steps:**

1. Setup → Security → Named Credentials
2. Enter **URL, authentication type, and certificate (if needed)**
3. Reference the named credential in Apex callouts

```
HttpRequest req = new HttpRequest();
req.setEndpoint('callout:StudentAPI/attendance');
req.setMethod('GET');
HttpResponse res = new Http().send(req);

```

## **2. External Services**

**Purpose:** Easily integrate **API services** into Salesforce without writing extensive code.

**Use Case:**

- Import external grading system API into Salesforce Flow or Apex.

**Steps:**

1. Register API schema (OpenAPI/Swagger)
2. Generate named actions
3. Call actions in Flow or LWC

## **3. Web Services (REST/SOAP)**

**Purpose:** Enable Salesforce to communicate with external systems via **standard protocols**.

**REST Example:**

```
@HttpGet
global static Student__c getStudentRecord(String studentId) {
    return [SELECT Name, Attendance__c FROM Student__c WHERE Id = :studentId];
}

```

**SOAP Example:**

- Expose Apex class as SOAP service for legacy systems.

## **4. Callouts**

**Purpose:** Make **HTTP requests to external systems**.

**Steps:**

- Define endpoint (Named Credential or Remote Site)
- Use HttpRequest/Http classes
- Handle responses and errors

```
HttpRequest req = new HttpRequest();
req.setEndpoint('https://example.com/api/students');
req.setMethod('GET');
Http http = new Http();
HttpResponse res = http.send(req);
System.debug(res.getBody());

```

## **5. Platform Events**

**Purpose:** Real-time **event-driven architecture** within Salesforce.

**Use Cases:**

- Notify other systems when a student’s attendance drops below 75%
- Trigger external actions for low attendance or marks alerts

**Steps:**

1. Define Platform Event object
2. Publish events via Apex or Flow
3. Subscribe using CometD, Apex triggers, or external systems

## **6. Change Data Capture (CDC)**

**Purpose:** Track record changes and send notifications to external systems automatically.

**Use Cases:**

- Notify LMS or analytics system whenever attendance records change.

**Steps:**

1. Enable CDC on Student__c or Attendance__c objects
2. Subscribe via **CometD** or **Lightning Platform Events**

## **7. Salesforce Connect**

**Purpose:** Access **external data objects** as if they were Salesforce objects without storing the data in Salesforce.

**Use Cases:**

- Connect to external student databases
- Read-only access to third-party academic records

## **8. API Limits**

**Purpose:** Track **governor limits** to avoid exceeding Salesforce daily API limits.

**Key Points:**

- Daily limit varies by edition (Developer Edition: 15,000 API calls/day)
- Monitor usage via Setup → System Overview or REST API

## **9. OAuth & Authentication**

**Purpose:** Securely authenticate Salesforce with external systems.

**Use Cases:**

- Connect to external LMS using OAuth 2.0
- Ensure proper token refresh and role-based access

**Steps:**

1. Setup → Named Credentials → Authentication Protocol → OAuth 2.0
2. Provide Client ID, Client Secret, and Callback URL
3. Use in Apex Callouts or External Services

## **10. Remote Site Settings**

**Purpose:** Allow Salesforce to **call external endpoints** securely.

**Steps:**

1. Setup → Security → Remote Site Settings
2. Add external URL for API access
3. Use in Apex HTTP callouts if Named Credentials aren’t used

---

# **Phase 8: Data Management & Deployment**

Phase 8 focuses on **managing data efficiently** and deploying Salesforce customizations across environments.

This phase ensures **data integrity, smooth migration, and version control** during the development and deployment lifecycle.

### **Tasks in Phase 8**

- Data Import Wizard
- Data Loader
- Duplicate Rules
- Data Export & Backup
- Change Sets
- Unmanaged vs Managed Packages
- ANT Migration Tool
- VS Code & SFDX

## **1. Data Import Wizard**

**Purpose:** Easily import **standard and custom objects** data via a **web interface**.

**Use Cases:**

- Import student or faculty records
- Upload subject assignments or attendance data

**Steps:**

1. Setup → Data → Data Import Wizard
2. Select object (Student__c, Faculty__c, etc.)
3. Map CSV fields to Salesforce fields
4. Run import and review results

## **2. Data Loader**

**Purpose:** Bulk insert, update, delete, or export Salesforce records.

**Use Cases:**

- Import 100+ student records at once
- Update marks or attendance in bulk

**Steps:**

1. Install Data Loader (Windows/Mac)
2. Log in using Salesforce credentials
3. Choose operation: Insert, Update, Upsert, Delete, Export
4. Map CSV fields to Salesforce fields
5. Run process and check success/failure files

## **3. Duplicate Rules**

**Purpose:** Prevent duplicate records for students, faculty, or subjects.

**Steps:**

1. Setup → Duplicate Management → Duplicate Rules
2. Define **matching rules** for key fields like Email, Roll No
3. Action: Block or Alert when duplicates are found

## **4. Data Export & Backup**

**Purpose:** Regularly back up Salesforce data to prevent data loss.

**Options:**

- **Manual Export:** Setup → Data → Data Export
- **Scheduled Export:** Weekly or monthly backup
- Store backups in secure cloud or local storage

## **5. Change Sets**

**Purpose:** Deploy metadata changes between **Sandbox and Production** environments.

**Steps:**

1. Create Outbound Change Set in Sandbox
2. Add components (Objects, Fields, Layouts, Apex Classes, etc.)
3. Upload to Production
4. Validate and deploy

## **6. Unmanaged vs Managed Packages**

| Type | Description | Use Case |
| --- | --- | --- |
| **Unmanaged** | Open-source or custom package, editable in org | Internal department use |
| **Managed** | Locked package from AppExchange, supports upgrades | Third-party apps integration |

## **7. ANT Migration Tool**

**Purpose:** Command-line tool for **automated deployments** between orgs.

**Use Cases:**

- Version control integration
- Mass deployment of metadata

**Steps:**

1. Install **ANT Migration Tool**
2. Configure `build.xml` and `build.properties`
3. Run `ant deploy` to move components from Sandbox → Production

## **8. VS Code & SFDX**

**Purpose:** Salesforce Developer Experience (SFDX) provides **modern development workflows**.

**Features:**

- Pull/push metadata from/to orgs
- Create **scratch orgs** for testing
- Integrate with **GitHub** for version control

**Example Commands:**

```bash
# Authorize org
sfdx force:auth:web:login -a DevOrg

# Pull metadata
sfdx force:source:pull

# Deploy metadata
sfdx force:source:deploy -p force-app/main/default

```

---

# **Phase 9: Reporting, Dashboards & Security Review**

Phase 9 focuses on **visualizing data, generating insights, and reviewing security settings**.

It ensures that students, faculty, and admin can **access meaningful reports**, track performance, and maintain **data security**.

### **Tasks in Phase 9**

- Reports (Tabular, Summary, Matrix, Joined)
- Report Types
- Dashboards
- Dynamic Dashboards
- Sharing Settings
- Field Level Security
- Session Settings
- Login IP Ranges
- Audit Trail

## **1. Reports**

**Purpose:** Display Salesforce data in **readable formats**.

**Types:**

- **Tabular:** Simple list, best for CSV exports
- **Summary:** Grouped by rows, includes subtotals
- **Matrix:** Grouped by rows and columns, best for comparisons
- **Joined:** Combine multiple report blocks in one report

**Example Use Case:**

- Attendance report by student
- Marks summary by subject
- Faculty workload report

## **2. Report Types**

**Purpose:** Define the objects and relationships available for reporting.

**Steps:**

1. Setup → Report Types → New Custom Report Type
2. Primary Object: e.g., Student__c
3. Related Object: e.g., Attendance__c
4. Make report type **deployable** to users

## **3. Dashboards**

**Purpose:** Visual representation of key metrics.

**Components:**

- Charts (Bar, Pie, Line)
- Tables
- Metrics (Number cards)

**Example Use Cases:**

- Average attendance per class
- Marks distribution per subject
- Pending announcements

## **4. Dynamic Dashboards**

**Purpose:** Show personalized metrics **based on user role**.

**Use Case:**

- Faculty sees only their students’ data
- Admin/HOD sees entire department data

## **5. Sharing Settings**

**Purpose:** Control **record visibility** using OWD, roles, and sharing rules.

**Use Case:**

- Students view only their records
- Faculty sees only assigned students
- Admin has full access

## **6. Field Level Security**

**Purpose:** Restrict sensitive fields at the **profile level**.

**Example:**

- Students cannot view faculty salary
- Faculty cannot edit other faculty’s records
- Admin can access all fields

## **7. Session Settings**

**Purpose:** Configure **session timeout, login hours, and security policies**.

**Example:**

- Session timeout: 2 hours
- Require secure connections (HTTPS)
- Restrict access from specific IP ranges

## **8. Login IP Ranges**

**Purpose:** Control **login access** based on trusted IP ranges for profiles.

**Use Case:**

- Students can log in only from college network
- Faculty can log in from college or home network

## **9. Audit Trail**

**Purpose:** Track **administrative changes** in Salesforce for compliance.

**Steps:**

1. Setup → Security → View Setup Audit Trail
2. Monitor changes in profiles, permission sets, fields, and objects
3. Export history for documentation or compliance

---
>>>>>>> 2a67cd8e896ccd1f179a555fb45919bc38713e7e
