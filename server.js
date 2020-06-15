const Express = require("express");
const dotenv = require("dotenv");
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");
const Cors = require("cors");
const UserRoute = require("./Routes/UserRoutes");

dotenv.config();

/////////DataBase Connectivity ////////////

Mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}); //connetor
Mongoose.connection.on("open", () =>
  console.log("DB CONNECTED AND HANDLE READY")
); //handle

//////////SERVER RELATED///////////
const app = Express();
const portNumber = 3001;

/////START SERVER/////////////////////
app.listen(portNumber, () => console.log(`SERVER STARTED AT ${portNumber}`));

/////////////MIDDLEWARE///////////////////
app.use(Express.json());
app.use(BodyParser.json());
app.use(Cors());

//////////ROUTES/////////////////////////
app.use("/user", UserRoute);
