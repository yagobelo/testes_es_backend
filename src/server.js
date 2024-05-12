require("dotenv").config();
const express = require("express");
const cors = require("cors");

const routes = require("./routes/routes");

const server = express();

server.use(express.json());
server.use(cors());

server.use(routes);

server.listen(process.env.PORT || 3000, () =>
  console.log(`Server running in port: ${process.env.PORT}`)
);
