# node-starwars
A StarWars REST API project

# Setup
The project needs node (v12.16.1) and the following dependencies to be installed previously:
* body-parser: "^1.19.0",
* express: "^4.17.1",
* mongoose: "^5.9.19",
* morgan: "^1.10.0",
* swapi-node: "^0.6.0"
* nodemon: "^2.0.4"

The application works with MongoDB. Setup a free account of MongoDB Atlas and connect the project following these instructions:
1. On main menu, on the created cluster, click on "Connect"
2. On the pop-up, select "Connect your application"
3. Copy the connection string
4. In the node-starwars project, go to app.js. Replace the current `moongose.connect()` string with yours. Make sure to insert your DB password after the username.

# Usage
to start the server, go to the directory where the project is stored and on terminal write `npm start`. The server will automatically preload data from SWAPI REST API once started.

Once the pre-load is finished, data can be accessed using Post-man or a browser page through `localhost:3000`.

Currently, the server only gets data that has been previouly loaded from SWAPI REST API. Some //TODO are allocated through the project to be implemented in the future.

* To have access to people, go to `localhost:3000/people`. To get people by ID go to `localhost:3000/people/[ID]`
* To have access to starships, go to `localhost:3000/starships`. To get starships by ID go to `localhost:3000/starships/[ID]`
