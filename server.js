const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const bcrypt = require("bcryptjs");
const app = express();

const db = require("./models");

require("dotenv").config();
/* Change to .env variable later	 */
const PORT = process.env.PORT || 4000;
const routes = require("./routes");

//---------------------------------MIDDLEWARE----------------------------------------//

const corsOptions = {
    origin: ["http://localhost:3000"],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(bodyParser.json());


app.use(
  session({
    store: new MongoStore({ url: process.env.MONGO_URI }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 // Expire in 1 hour
    }
  })
);

// app.get("/api/v1/users", (req, res) => {
//   db.User.find({}, (err, foundUsers) => {
//     if (err) {
//       return res.json({ err });
//     }
//     res.json({ foundUsers });
//   });
// });


/* Auth API Routes */
app.use("/api/v1/auth", routes.auth);

/* User API Routes */
app.use("/api/v1/user", routes.user);

/* Plots API Routes */
app.use("/api/v1/plots", routes.plots);

/* Plants API Routes */
app.use("/api/v1/plants", routes.plants);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
