Assignment Submission Portal
An Express.js-based backend system for assignment submission with User and Admin roles.

Features
Users: Register, login, and upload assignments.
Admins: Register, login, view assignments, accept/reject submissions.
Role-Based Access Control: Secure routes for roles.
Validation: Input and token validation with express-validator.
Authentication: JWT-based.
Setup Instructions
Clone the repository:
bash

git clone https://github.com/your-username/assignment-portal.git
cd assignment-portal
Install dependencies:
bash

npm install
Create a .env file:
env


PORT=4160
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/
DB_NAME=user_assignment
ACCESS_TOKEN_SECRET=your_secret_key
ACCESS_TOKEN_EXPIRY=7d
Start the server:
bash

npm start
Endpoints
User
Method	Endpoint	Action	Auth	Role
POST	/api/register	Register new user	No	None
POST	/api/login	Login as user	No	None
POST	/api/upload	Upload assignment	Yes	User
Admin
Method	Endpoint	Action	Auth	Role
GET	/api/assignments	View assignments	Yes	Admin
POST	/api/assignments/:id/accept	Accept assignment	Yes	Admin
POST	/api/assignments/:id/reject	Reject assignment	Yes	Admin
Project Structure
bash

project/
├── src/
│   ├── controllers/       # Business logic
│   ├── models/            # Database schemas
│   ├── routes/            # API routes
│   ├── middlewares/       # Validation/Auth
│   ├── utils/             # Database config
│   └── app.js             # App entry point
├── .env                   # Environment variables
├── package.json           # Dependencies
└── README.md              # Documentation
How to Run
Start the server:

bash

npm start
Server URL:

arduino
http://localhost:4160
Test APIs using Postman or similar tools.