const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require("path");
const cors = require("cors");
const logger = require("./utils/logger");
const morgan = require('morgan');
const override = require('method-override');
const config = require("./config/config");
const methodOverride = require('method-override');
const alert = require("alert");
dotenv.config();

//Import Routes
const viewRoutes = require("./routes/viewRoutes");

//Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
// app.use(override());
app.use(methodOverride('_method'));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));


//Route Handling
app.use("/", viewRoutes);


app.use(function(err, req, res, next) {
  // if error thrown from jwt validation check
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token');
    return;
  }

  logger.error(err.stack);
  res.status(500).send('Oops');
});

app.get('*', function(req, res){
  res.render("404");
});

app.listen(config.port, () => logger.log(`Server is running on port ${config.port}`));