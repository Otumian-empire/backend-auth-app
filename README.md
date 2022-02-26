<!-- Please update value in the {}  -->

<h1 align="center">backend-auth-app</h1>

<div align="center">
   Solution for a challenge from  <a href="https://investondaba.notion.site/Fullstack-Intermediate-Test-2-c911eab2a18446d4a87eb5ca938f13ad" target="_blank">daba full stack intermediate coding exercise</a>.
</div>

<div align="center">
  <h3>
    <a href="https://{your-demo-link.your-domain}">
      Demo
    </a>
    <span> | </span>
    <a href="https://github.com/Otumian-empire/backend-auth-app">
      Solution
    </a>
    <span> | </span>
    <a href="https://investondaba.notion.site/Fullstack-Intermediate-Test-2-c911eab2a18446d4a87eb5ca938f13ad">
      Exercise
    </a>
  </h3>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Overview](#overview)
  - [Built With](#built-with)
- [Features](#features)
- [How to use](#how-to-use)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- OVERVIEW -->

## Overview

![screenshot](https://github.com/Otumian-empire/backend-auth-app/blob/main/Screenshot%202022-02-26%20at%2004-19-14%20Backend-Auth-App.png)

- Where can I see your demo?
  I will host this application on heroku and make use of [mongodb atlas](https://www.mongodb.com/atlas) for persistent data storage. Now, since sometimes things happen unexpected, this repo's `main` branch could be the source of the demo else it is the `deploy` branch.
- What was your experience building it.
  As a backend developer, try out some frontend activity was really brain-stretching. Even though I had to struggle and couple of times with sizing and designing, I decided to go with a minimal version of everything. This way I had more time to make the application work - meet the requirement.

  I also learnt that as engineers we are kind responsible for the bugs and security risks in the software that we build. For someone like me, trying to do what I know how to do the usual, using some tools I am not familiar with means, I have to make it work. This is can lead to some of the issues aforementioned.

  Graphql really save me sometime since I was racing to make things work. I skipped a lot of routes and controllers that i had to implement. I had only one endpoint that did most of the job.

### Built With

- [express](http://expressjs.com/)
- [graphql](https://graphql.org/graphql-js/)
- [express-graphql](https://graphql.org/graphql-js/express-graphql/)
- [express-session](https://www.npmjs.com/package/express-session)
- [bootstrap](https://getbootstrap.com)
- [jQuery](https://jquery.com/)
- [ejs](https://ejs.co/)

## Features

What features did you develop?

- User can sign up
- User can login
- User can logout after login or sign up
- User can update the profile details

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/Otumian-empire/backend-auth-app.git

# Change directory into the project folder
$ cd backend-auth-app

# create a `.env` file in the root directory where `package.json` is and add the following lines
SESSION_SECRET=YOUR_SESSION_SECRET
URI=MONGO_DB_UR_FROM_ATLAS
PORT=3000
ROUNDS=11

# Install dependencies
$ npm install

# Run the app
$ npm start
```
