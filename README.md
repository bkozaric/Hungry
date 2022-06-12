# Hungry
Hungry is a food ordering web app inspired by the Glovo web app. Developed in MERN stack.

## Features

- Responsive layout, both desktop and mobile friendly
- Form validation using Formik & Yup
- Register an account, with email confirmation using JWT
- Change account info & password after registration
- Preview food items, add them to cart & order. You also have the ability to cancel orders that haven't been shipped.
- User classes: admin & regular user
- Admins have access to an admin dashboard
- As an admin you can: change status order & filter orders by date & status
- Hide/unhide & edit food items
- Promote/demote & enable/disable users

## Tech

Hungry uses a number of open source projects to work properly:

- React - frontend
- node.js - backend
- Express - node.js backend framework
- MongoDB - document-oriented database program
- Mongoose - library that creates a connection between MongoDB and the Express web application framework
- Nodemailer - a module for Node.js applications to allow email sending
- Dotenv - a zero-dependency module that loads environment variables from a .env file
- bcyprt - a library used to hash passwords
- Formik - open source form library used to build forms in React
- Yup - a JavaScript schema builder for value parsing and validation
- Scss - Sass is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets
- nodemon - a tool that automatically restarts the node application when file changes in the directory are detected
- concurrently - run multiple commands concurrently (in this case start the frontend and backend at the same time) 
- Font Awesome - font and CSS framework, contains a suite of 675 pictographic icons for easy scalable vector graphics on websites

## Main page
![Main page](https://i.imgur.com/gaBrMeI.png)

## Login/registration
![Login & registration](https://i.imgur.com/KAkJSdz.png)

# Cart system
## Empty Cart
![Cart empty](https://i.imgur.com/1iVrCPg.png)
## Cart as guest
![Cart as guest](https://i.imgur.com/ynsksw7.png)
## Cart as logged in user
![Cart as logged in user](https://i.imgur.com/1Ay0n0A.png)

## Admin dashboard
## Orders
![Orders](https://i.imgur.com/jKx06Rx.png)
## Food items
![Food items](https://i.imgur.com/8brwJYX.png)
## Adding new food
![Adding new food](https://i.imgur.com/kwFncr1.png)
## Users list
![Users list](https://i.imgur.com/bPgzWRN.png)
## Edit user
![Edit user](https://i.imgur.com/enFXNKq.png)