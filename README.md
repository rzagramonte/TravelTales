# NomadNotes
NomadNotes is a full-stack web application designed for travel enthusiasts to create, share, and explore travel blogs. Users can seamlessly log in, compose personalized blogs, view and like posts from other users, and enjoy a collaborative platform for sharing their unique travel experiences.

## How It's Made:

**Tech used:** Node.js, Express.js, MongoDB, Passport.js, EJS

NomadNotes follows the Model-View-Controller (MVC) architecture, with key technologies and features including:

Server (Node.js and Express.js):
- Utilizes Express.js for server setup
- MongoDB with Mongoose as the Object Document Mapper (ODM) for efficient data storage
- Implements Passport.js for user authentication
- Employs EJS for server-side rendering, enhancing dynamic content presentation

Frontend (HTML, CSS, JavaScript):
- Leverages client-side JavaScript to facilitate actions like blog deletion and likes
- Utilizes EJS templates for rendering dynamic content seamlessly

## Packages/Dependencies used: 

bcrypt, connect-mongo, dotenv, ejs, express, express-flash, express-session, mongodb, mongoose, morgan, nodemon, passport, passport-local, validator

Install all the dependencies or node packages used for development via Terminal:

`npm install` 

## Things to add:

- Create a `.env` file and add the following as `key: value` 
  - PORT: 2121 (can be any port example: 3000) 
  - DB_STRING: `your database URI` 

## Future Optimizations:

1. Frontend Framework Integration:

I plan to integrate a front-end framework like React to enhance the user interface's interactivity and responsiveness.

2. Caching Strategies:

Implementing both client-side and server-side caching strategies will reduce redundant data requests and enhance the application's speed.

3. WebSockets for Real-Time Updates:

Exploring WebSockets integration will provide real-time updates, enhancing features like live blog feeds and notifications.

4. Security Enhancements:

Strengthening security measures with Content Security Policy (CSP), input validation, and secure cookie attributes is a priority. Regularly updating dependencies will address potential security vulnerabilities.

5. User Analytics:

I plan to integrate analytics tools to gain insights into user behavior, enabling data-driven optimizations and feature enhancements.

6. Progressive Web App (PWA) Features:

Implementing PWA features, including offline capabilities and push notifications, will ensure a seamless user experience, even in challenging network conditions.

## Lessons Learned:

Creating NomadNotes was a transformative experience that deepened my understanding of full-stack web development. I navigated challenges, honed my problem-solving skills, and gained proficiency in building a feature-rich application from the ground up. This project empowered me to embrace the complexities of web development and solidify my passion for creating robust, user-centric experiences.
