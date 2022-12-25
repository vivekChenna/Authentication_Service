const express = require("express");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { PORT } = require("./config/serverConfig");

const v1ApiRoutes = require("./routes/index");

app.use("/api", v1ApiRoutes);

const prepareAndStartServer = () => {
  app.listen(PORT, () => {
    console.log(`server started successfully on PORT ${PORT}`);
  });
};

prepareAndStartServer();
