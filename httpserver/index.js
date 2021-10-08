//Imports
const express = require("express");
const UserRepository = require('./UserRepository')
const cors = require('cors')

//Declarations
const app = express();
const port = 8080;
const userRepository = new UserRepository("./users.json")


// Middlewares
app.use(cors({
    origin: "*"
}))
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});


//Routes
app.get("/users", (req, res) => {
    res.status(200).json(userRepository.retrieveAll());
});

app.get("/users/:id", (req, res) => {
    const { id } = req.params;
    try {
        res.status(200).json(userRepository.findOne(id))
    } catch (error) {
        res.status(500).json({ message: "Error" })
    }
});

app.post("/users", (req, res) => {
    //validations | Middleware or function
    const { body } = req

    const id = userRepository.create(body)
    res.status(201).setHeader("location", id).send()

})

app.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    userRepository.deleteOne(id)
    res.status(200).send()
})


//Serving
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
