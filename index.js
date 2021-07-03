// index.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
//const task = require('./api/models/model.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//import routes
const routes = require('./api/routes/routes.js'); 

//register the route
routes(app);

app.listen(port, ()=> {
  console.log(`RESTful API server running on ${port}`);
});