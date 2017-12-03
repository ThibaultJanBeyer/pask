import express from "express";

const routes = express.Router();

routes.get('/user', (req, res) => {
    res.send('GET handler for /dogs route.');
});

routes.post('/login', (req, res) => {
    res.send('GET handler for /dogs route.');
});

routes.post('/register', (req, res) => {
    res.send('GET handler for /dogs route.');
});

export default routes;
