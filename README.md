# Onramp Fullstack Take Home Project
## Megan McDevitt's Blog Project

### Installation
  - Clone or download the repo from https://github.com/mcdevittbass/onramp-blend

  - On the command line in the project root folder, cd to server => run npm install
  - Move back up to the root directory (cd ..) and into the client folder => run yarn 
  - In the server directory, add a file named "config.ts" and add a module.exports = {}
  - In the empty object you just created, add the keys and values I have sent you separately (ask me if you don't have them!)

Now you are ready to run the project with npm start in the server directory and yarn start in the client directory.

## Summary
  This project allows users to login and create an account via the landing page. A JSON Web Token is stored in localStorage to be used in the headers of all subsequent api calls. 
  The first page renders all of the blogs from the database. Users can add favorites or remove them by clicking the heart icon. 
  A delete and edit icon appear on all blog posts that the user has created.
  Clicking the edit icon will open a component (the same one used to write a post, but prepopulated with the values from the post they are editing.)
  Clicking the trash icon will immediately delete the post (with more time I would have prompted the user for confirmation)
  The "Create Post" button opens the same page as the edit one, but with empty fields.
  Users can select whether to search by title or author, and the blogs that match their search will render. 
  Users can click a "Show favorites" checkbox to see all of their favorite blog posts.
  Users can sign out with the "sign out" button at the top.

  # Architecture
    I used an MVC architecture model for this, with axios calls to the Node backend, that then communicated with the PostGreSQL server via queries using node-postgres. Rather than organize files by function, I prefer to organize them by area. The authRouter and authController, for example, are in the same folder.

  # Conclusion
    I had never used PostGres or TypeScript before this project, so there was a bit of a learning curve for me! Because I took the time to try to learn to use these the best I could, I ran out of time to implement unit tests. I made one for the Header component (which is imperfect) to meet the basic requirements. Despite the time pressure, this project was really interesting, and I am looking forward to improving it in the future, as well as taking my skills to the next level. Thanks for your consideration!



## Overview 🤖

Congratulations for making it this far in the interview process for the Blend Apprenticeship!

This project seeks to better inform the Onramp team of your experience with programming  as well as prepare you for your interview at Blend.

You have seven days to complete this project. We expect those who have a moderate level of development experience to spend between 30 and 40 hours to design, implement, document, and submit the project to us. Depending on your level, it may take more or less time, so please plan accordingly.

**The project is due on Wednesday, January 13 at 9:00am PST/12:00pm EST**

#### Project Summary 

- Total time available to complete: 7 days
- Due date/time: Wednesday, January 13 at 9:00am PST/12:00pm EST
- Expected development time to complete: 30 - 40 hours 

## Description and Details 🔎

For this project, we want you to build a simple blog post web application that meets the following requirements:

### Technical/Architectural Requirements:

- Build the blog application using TypeScript on the frontend. You can use either TypeScript or Go on the backend. 
- Implement a database using PostGreSQL.
- Write Unit Tests

### Feature Requirements: 

At a minimum, your app should allow for users to be able to:
- Create an account, login, and log out.
- CRUD functionality:
  - Create a new blog post
  - Read a blog post
  - Update a post
  - Delete a post
- Search for blog posts based on at least 2 factors (date, title, etc.)
- Favorite one or more blog posts at the same time.
- View all of their favorites.

**Note: you will need to detail where and how your app meets these requirements in your repository's README file when you submit your project. 

### Researching and Plagiarism

You are actively encouraged to research the web, books, videos, or tutorials for this project. That said, we expect all code that is submitted to be your own (e.g. this project should NOT be completed with another person). That means that we expect each candidate to refrain from copying and/or pasting code into the project. If we find copied code in your project, we will have to disqualify you. Web and video resources are available at the end of this document.

## What we're looking for 🌟

We will evaluate your project by assessing the overall strength and quality of the following five factors:

#### UI Design

A UI that converts all the requirements into user-friendly features. Assume the user is not tech savvy and needs the site to be intuitive. That said, do not focus all of your efforts on making a beautiful interface, it’s more important that the app works as expected and that you implement all of the requirements.

#### Architecture Pattern

You may select any architectural design pattern you want to implement for this application (MVC, etc.) You must use one and identify the one you chose to use and why in the README when you submit.

An architecture pattern enables you to define a guide for how a piece of software should function, such that it can be scalable, maintainable, and testable.

#### Version Control

Make sure to use version control with your app using a Github repository. 
A large part of building a successful project is showing us the versions you had of the project so we can see the progress that you made.

#### Unit Testing 

Unit testing is an important component of development. For this project, you will need to utilize a unit testing framework of your choice on at least one specific module of your application. You do not need to write integration tests or include other types of tests. 


#### Web Devlopment Best Practices 

It's important to subscribe to a set of best practices when designing and implementing a web app. Be mindful of these widely accepted principles:
Keep your code [DRY](https://code.tutsplus.com/tutorials/3-key-software-principles-you-must-understand--net-25161) (don't repeat yourself). 
Understand the big picture.
Start with the user experience.
Make sure your code is clean and simple.
Using these principles will result in a high quality user experience and ensuring other developers can easily navigate through your code.

#### Web Application Description 

Each project submission must include a README file providing an overview of the application and details the app's overall architecture as well as your design decisions. Screenshots of the web app taken from the browser (localhost is fine) are also required. This task assesses the critical competency of communicating and documenting technical concepts.

## What we are NOT Evaluating

#### Feature depth

You won’t be earning extra points for having a bunch of features. Focus on creating a clean, simple application that addresses all of the requirements, has well-tested features, and is documented properly for submission.

## Submission Information

#### Submission Format

This repository will be your starting point. Please download (not clone or fork) this Github repository ((onramp-fullstack-CRUD-project)[https://github.com/onramp-io/onramp-fullstack-CRUD-project/edit/main/README.md]) and upload changes to a newly created repository. Once the web application has been completed, you'll be submitting a link to the new repository you created. Prior to submitting your project, you should update the README file to provide the following information:
- A high level architectural overview of your web application. e.g. names, relationships and purposes of all UI Components.
- Brief description of the architectural design pattern that you leveraged.
- An overview of the best practices you implemented.
- Screenshots of each page in your application and descriptions of the overall user flow.


#### Submission Deadline + Process 

You must submit your project by 9:00am PST/12:00pm EST on Wednesday, January 13 using [this form](https://docs.google.com/forms/d/e/1FAIpQLSdtHMQzqCd1o8aVcFRbNfXOGTzijTJBMSaWvtNnx6CJbDEmJQ/viewform). Be sure that your project is viewable by the Onramp team as a **public** repository. You can make it private after 1/28/21.

Once you’ve submitted your project, you are expected to stop working on it. Any commits that occur after submission or the deadline will not be reviewed. 

## Additional Resources

### Onramp Resources: 

Please use the modules and resources in the [Blend Training Plan](https://www.onramp.io/training/5fce6ab55cd2a500174dc937) for resources and exercises on TypeScript and Version Control. 

### Other Resources: 

- [Website Design & Development](https://envisionitagency.com/blog/2018/04/best-practices-for-web-development/)
- [Development in Go](https://go.dev/solutions/webdev/)
- [Typescript Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Typescript Best Practices](https://engineering.zalando.com/posts/2019/02/typescript-best-practices.html)
- [Separation of Concerns](https://youtu.be/VtF6aebWe58)





