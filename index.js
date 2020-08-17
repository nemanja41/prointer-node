const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = require("./db");

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const PORT = process.env.PORT || 3322;

app.post("/signup", (req, res) => {
  const { firstName, lastName, phoneNumber, email, password } = req.body;

  const user = db.insertUser({
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
  });

  return res.json({
    user,
    message: "Novi korisnik napravljen",
  });
});

app.get("/user/:userId", (req, res) => {
  res.send({
    user: db.findUserById(req.params.userId),
  });
});

app.delete("/user/:userId", (req, res) => {
  const index = db.deleteUser(req.params.userId);
  res.send({
    message: index >= 0 ? "Korisnik obrisan" : "Korisnik ne postoji",
  });
});

app.post("/user/:userId", (req, res) => {
  //ovde mozes da napravis akciju za editovanje korisnika
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  req.query.email;
  const user = db.findUserByEmail(email);

  if (!user) {
    return res.json({
      user: null,
      message: "Nema korisnika sa poslanim emailom",
    });
  }

  const isPasswordOk = password === user.password;

  return res.send({
    user: isPasswordOk ? user : null,
    message: isPasswordOk ? "Sve u redu" : "Pogresan password",
  });
});

app.listen(PORT, () =>
  console.log(`Example app listening on port http://localhost:${PORT}!`)
);
