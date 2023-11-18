require("dotenv").config();
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'url-info',
    resave: true,
    saveUninitialized: true
}));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/views/index.html"));
});
app.post("/", (req, res) => {
    const selectedCity = req.body.city;
    req.session.selectedCity = selectedCity;
    console.log(`City: ${selectedCity}`);
    res.redirect(`/${selectedCity}/`);
});


app.get("/:city", (req, res) => {
    const city = req.session.selectedCity;
    res.render("city", { city });
});
app.post("/:city", (req, res) => {
    const selectedEntity = req.body.entity;
    req.session.selectedEntity = selectedEntity;
    console.log(`Selected Entity: ${selectedEntity}`)
    res.redirect(`/${req.session.selectedCity}/${selectedEntity}`);
});


app.get("/:city/:entity", (req, res) => {
    res.sendFile(path.join(__dirname + "/views/table.html"));
});


app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});