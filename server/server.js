const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const fs = require("fs");

const morgan = require("morgan");
const { register} = require("./controllers/auth");
const { login } = require('./controllers/LoginAuth');
require("dotenv").config();

const app = express();

//DB
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    
    useUnifiedTopology: true
  
}).then(() => console.log("DB Connected"))
.catch((err) => console.log("DB CONNECTION ERROR =>", err));

//Middlewares

app.use(express.json({limit: "5mb"}));
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: ["http://localhost:3000"],
})
);

//Autoload routes

//fs.readdirSync("./routes").map((r) => app.use("/api", require(`.routes/${r}`)) );
app.use("/api/", require("./routes/auth"))
app.use("/api/", require("./routes/post"))

const port = process.env.PORT || 8000;
app.listen(port, () =>console.log(`Server running on port ${port}`));
