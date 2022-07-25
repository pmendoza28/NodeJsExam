const express = require("express");
const passport = require("passport");
const routes = require("./routes");
const http = require("http");
const { connect } = require("mongoose");
const { DB, PORT } = require("./config")
const cors = require("cors");

const exp = express();
exp.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}))
exp.use(express.json({ limit: '50mb' }))
exp.use(express.urlencoded({ extended: true }))


exp.use(passport.initialize())
require("./middlewares/passport")(passport)

/** Routes */
exp.use("/api", routes)

/** Create the server */
const httpServer = http.createServer(exp);

/** Start Server */
new Promise(resolve => {
    resolve(
        connect(DB, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
    )
}).then(() => httpServer.listen(PORT, () => console.log(`Server running on PORT ${PORT}`)));