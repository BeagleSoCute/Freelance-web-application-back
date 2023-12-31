const express = require("express");
const connectDB = require("./config/db");
const app = express();
const port = 5000;
const user = require("./routes/user.route");
const auth = require("./routes/auth.route");
const service = require("./routes/service.route");
const admin = require("./routes/admin.route");
const project = require("./routes/project.route");
const escrow = require("./routes/escrow.route");
const cookieParser = require("cookie-parser");

app.disable("etag");

app.use(express.json({ extended: false })); //NOTE Allow us to read the request.body
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

connectDB();
app.use("/api/user", user);
app.use("/api/auth", auth);
app.use("/api/service", service);
app.use("/api/admin", admin);
app.use("/api/project", project);
app.use("/api/escrow", escrow);



//NOTE listen to function to make our server application listen to client requests
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
