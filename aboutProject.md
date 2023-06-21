# crm-backend
url to access API: https://cust-suppt-app.onrender.com/cs/api/v1/auth/signin

Customer Support Application:

Designed a customer support application with distinct scopes for admin, engineer, and customer.
Implemented authentication and authorization using JWT (JSON Web Tokens) for secure access to different functionalities.

Customer Functionality:
Customers can create support tickets and view all tickets raised by them.
Implemented CRUD operations for managing tickets and established a relationship between customers and tickets.
Utilized pagination, filters, and sorting options for efficient ticket management.

Engineer Functionality:
Engineers require approval from the admin to access support tickets.
Approved engineers can view tickets assigned to them, work on solving them, and update the ticket status.
Ensured proper relationship and aggregation between engineers and tickets for efficient ticket assignment and tracking.

Admin Functionality:
Admins have access to all tickets in the database and can make changes to ticket priorities.
Implemented CRUD operations for managing users and provided admin control to change engineer status from pending to approved or rejected.
Established proper data relationships and aggregation between admins, engineers, and tickets.
Additional Features:

Implemented email functionality to send registration and password reset emails to customers.
Incorporated caching mechanisms to optimize performance and reduce database queries.
Implemented various security measures, including password hashing and validation.
