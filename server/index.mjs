import express from "express";
import path from "path";
import http from "http";
import bodyparser from "body-parser";
import { tracker, users } from "./routes";
const server = express();

const PUBLICFOLDER = "./public";
const DEFAULTSOCKET = "8080";

server.use(bodyparser.json());
server.use("/public", express.static(path.resolve(PUBLICFOLDER)));
server.use("/api/tracker", tracker);
server.use("/api/users", users);

server.get("*", (req, res) => {
  res.sendFile(path.resolve("./public/index.html"));
});

http.createServer(server).listen(DEFAULTSOCKET, "localhost");
