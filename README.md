# FreelanceFinder – SB Works

Welcome to **FreelanceFinder (SB Works)** – a full-stack freelancing platform designed to streamline project collaboration between **clients** and **freelancers**, with a robust **admin** system for management and integrity.

## Features

-  User authentication with JWT (Register/Login)
-  Clients can post projects and view applications
-  Freelancers can browse projects and submit proposals
-  Real-time-like chat system (basic)
-  Portfolio uploads (extendable)
-  Admin access for user monitoring and moderation

---

##  Tech Stack

| Layer        | Technology                  |
|--------------|------------------------------|
| Frontend     | React.js, Axios, Bootstrap, Material UI |
| Backend      | Node.js, Express.js         |
| Database     | MongoDB (Local or Atlas)    |
| Auth         | JWT (JSON Web Tokens)       |
| Communication| RESTful API                 |

---

##  Project Structure
FreelanceFinder/
├── client/ # React frontend
│ ├── public/
│ └── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Route-based pages
│ └── App.js
├── server/ # Node + Express backend
│ ├── models/ # Mongoose models
│ ├── routes/ # API route handlers
│ ├── controllers/
│ └── server.js
└── README.md

---

## Installation

### Prerequisites:
- Node.js
- MongoDB (local or cloud via MongoDB Atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/Bhavya-Sri-B/FreelanceFinder-Discovering-Opportunities-Unlocking-Potential.git
cd FreelanceFinder
2. Setup Backend

cd server
npm install
Create a .env file in /server:

env
PORT=5000
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
Start the backend server:

npm start
3. Setup Frontend
bash
Copy code
cd ../client
npm install
npm start
Frontend will run at: http://localhost:3000
Backend will run at: http://localhost:5000

 User Roles
 Freelancer
Browse projects

Submit proposals

Chat with clients

Submit project work

 Client
Post projects

View freelancer proposals

Select freelancers

Chat and give feedback

 Admin
Monitor users

Moderate content

Maintain platform rules

 Future Enhancements
Real-time messaging with Socket.io

File uploads and previews

Payment integration (Stripe/Razorpay)

Admin analytics dashboard

Email notifications

License
This project is open-source and free to use under the MIT License.

