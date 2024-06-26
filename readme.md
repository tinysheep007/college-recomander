# College Recomander

# Some Useful Links

- [Showcase the project with pictures](#showcase)
- [Functionality](#Functionality)
- [Database setup](#sql-tables)

### What is this project about?

This is a full stack web application built using React as front end, back end with Node and express, and database with MySQL. This project is suppose to be a college recomannder that helps high shool student or anyone else to pick their desired college to apply. You would be able to search for college by name and ranges of SAT and GPA. You can save the college like in a list, comment on your favorite choice to discuss with others, browse all the recent decisions with students' stats of grades.

### How to run the application?

To run the application, first ensure you have MySQL database set up properly. We need to start both front end and back end individually. For front end, use any IDE go to the front-end folder, and "npm start" in the terminal or powershell. For backend, use any IDE go to the backend folder, on your terminal o powershell type in "nodemon app.js"

## Functionality

### More Detailed Configuration for Database

Tasks

restyle home details page

### Admin

* control panel
  * [X] manage all user accounts
    * [X] add
    * [X] delete
    * [X] edit
    * [X] logout
  * [X] CRUD user notice
    * [X] change adminID to current useAuth admin ID
  * [X] CRUD college
    * [X] CRUD basic infos
    * [X] CRUD college details
  * [X] approve add school request from basic users

### Basic users

* [X] login
* [X] register
  * [X] when register also create a academic profile

* Main home page
  * [X] browse all college
    * [X] make buttons to split page
  * [X] search all college
    * [X] based on name
    * [X] based on range of SAT
    * [X] based on range of GRE
  * [X] add selected college unit to your favorite list
  * [X] read user notice
  * [X] suggest to add new school not in database
* user profile
  * [X] edit username, password
    * [X] after update the username or any info, the useAuth should update as well
  * [X] CRUDemic information: SAT, GPA, extra, others, majors
* school selection page
  * [ ] match current academic profile with fav college saved by that user
  * [ ] suggest closest match college outside of user saved college
* User’s liked/saved college
  * [X] delete liked college

* [X] College Details Page
  * [X] display basics
  * [X] display colelge info/details
  * [X] user can comment on a post
    * [X] delete / edit his own comment
  * [X] College decision graph

### SQL tables

* admin
  * admin id - admin (int)
  * username - usermname (string)
  * password - password (string)
* student / use
  * student id - idusers (int)
  * username - username (string)
  * password - password (int)
  * academic profile
* academic profile  - useracademic
  * academic id (PK) - iduseracademic (int)
  * student id (PK) - idusers  (int)
  * SAT - SAT (int)
  * GPA - GPA (float)
  * Extracurricular - extra (String)
  * comments - others (string)
  * majors - majors (string)
* college basic record - collegebasics
  * basics
    * college id - idCollege
    * college name - collegeName
    * picture - picURL
    * average SAT - aveSAT
    * average GPA - aveGPA
    * tuition - tuition
    * acceptance rate - accRate
    * rank - ranks
    * collge details id - idCollegeDetails
* college infos - collegeinfo
  * academic - academic (string)
  * value - value (string)
  * safety - safety (string)
  * location - location (string)
  * athletics - athletics (string)
  * student life - life (string)
  * details id - idCollegeDetails (PK)
  * college id - idCollege(FK)
* college comments - collegecomments
  * idcollegecomments (int, unique, auto cre)
  * idusers (int)
  * idCollege (int)
  * message (string)
* College Suggests - collegesuggest
  * idcollegesuggest - int
  * college name - collegeName (string)
  * picture - picURL (string)
  * average SAT - aveSAT (INT)
  * average GPA - aveGPA (float)
  * tuition - tuition (int)
  * acceptance rate - accRate (float)
  * rank - ranks (int)
  * approve - approve (string)
* College decisions - collegedecisions
  * idcollegedecisions - int
  * idusers - int
  * idCollege - int
  * SAT - int
  * GPA - float
  * extra - string
  * decision - string
* user’s liked college - userlikedcolleges
  * record id (PK) - iduserlikedcolleges
  * student id -  idusers
  * college id - idCollege
* notice - notice
  * notice id - idnotice
  * title - title
  * info - content
  * date -date

'admin_tls_version', 'TLSv1.2,TLSv1.3'
'immediate_server_version', '999999'
'innodb_version', '8.0.28'
'original_server_version', '999999'
'protocol_version', '10'
'replica_type_conversions', ''
'slave_type_conversions', ''
'tls_version', 'TLSv1.2,TLSv1.3'
'version', '8.0.28'
'version_comment', 'MySQL Community Server - GPL'
'version_compile_machine', 'x86_64'
'version_compile_os', 'Win64'
'version_compile_zlib', '1.2.11'

# Showcase

Main Page:

![image](https://github.com/tinysheep007/college-recommender/assets/58338071/3c325614-34cd-4b48-897a-249b392f3d6d)

College details page (need more styling):

![image](https://github.com/tinysheep007/college-recommender/assets/58338071/a734323f-ada9-4fb5-8955-1011b284cce7)

![image](https://github.com/tinysheep007/college-recommender/assets/58338071/4c89666a-a9da-4d37-a705-8ed53290259a)

![image](https://github.com/tinysheep007/college-recommender/assets/58338071/84a23201-3de9-415f-b8a0-d23c7a93f1d9)

Users can acess all admin posted notices:

![image](https://github.com/tinysheep007/college-recommender/assets/58338071/7735ea19-3f09-4383-b460-6579df2dfb57)

User's saved/liked colleges:

![image](https://github.com/tinysheep007/college-recommender/assets/58338071/d2602b35-a806-4e69-b91c-795e729fc9af)

Suggested colleges that closely matches with the status of the user:

![image](https://github.com/tinysheep007/college-recommender/assets/58338071/7e75ca28-ad41-4b0f-afab-a5b59541c6e0)

User can suggest to add a new college that is not in the current database:

![image](https://github.com/tinysheep007/college-recommender/assets/58338071/2c85ebdb-e264-43ec-ae42-8d6e889a3dc8)

Usercan update their own profiles:

![image](https://github.com/tinysheep007/college-recommender/assets/58338071/0c1f498f-92d4-4326-a08c-673f57e018a0)

![image](https://github.com/tinysheep007/college-recommender/assets/58338071/2b72c612-a856-457b-b78a-ba2400bbb8aa)

Login page for both admin and users:

![image](https://github.com/tinysheep007/college-recommender/assets/58338071/0fbfaa5f-9566-48f7-ac08-ec77e1f5b861)

Admin panel:

![image](https://github.com/tinysheep007/college-recommender/assets/58338071/ca670535-5dfe-475f-85b1-8f2bf2e87f3d)

Admin can create new notices:

![1717110100482](image/readme/1717110100482.png)

Admin can manage all colleges:

![image](https://github.com/tinysheep007/college-recommender/assets/58338071/34b0ba1a-556b-4ec6-b35d-313bdf9b940b)

Admin can edit all infos about colleges:

![image](https://github.com/tinysheep007/college-recommender/assets/58338071/db92f252-3aab-4571-984c-cdeb2960f084)

![image](https://github.com/tinysheep007/college-recommender/assets/58338071/316a0a61-1a5e-4bf1-aa81-7cea13a3e17e)
