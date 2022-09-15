const express = require("express");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const signup_query = require("./queries/signup_query");
const login_query = require("./queries/login_query");
const formidable = require("formidable");
const fss = require("fs-extra");
const fs = require("fs");

const multer = require("multer");
require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// !Serving static files
app.use(express.static("images"));
app.use("/images", express.static("images"));
// __________________________________________

app.get("/", (req, res) => {
  res.send("Server running ... ");
});
//! multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const parsedRecipeId = JSON.parse(req.body.recipeImage);
    console.log(parsedRecipeId);
    console.log(parsedRecipeId.imageFolderKey);
    if (parsedRecipeId) {
      const path = `./images/recipe/${parsedRecipeId.imageFolderKey}`;
      fs.mkdirSync(path, { recursive: true });
      cb(null, path);
    }
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    console.log(file);

    cb(null, fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      req.error = "Only .png, .jpg and .jpeg allowed";
      return cb(
        null,
        false,
        new Error("Only .png, .jpg and .jpeg format allowed!")
      );
    }
  },
});
// signup query execute
const signup_execute = async (variables) => {
  const fetchResponse = await fetch("http://localhost:8080/v1/graphql", {
    method: "POST",
    headers: { "x-hasura-admin-secret": "myadminsecretkey" },
    body: JSON.stringify({
      query: signup_query,
      variables,
    }),
  });
  const data = await fetchResponse.json();
  console.log("DEBUG: ", data);
  return data;
};

// login query execute
const login_execute = async (variables) => {
  const fetchResponse = await fetch("http://localhost:8080/v1/graphql", {
    method: "POST",
    headers: { "x-hasura-admin-secret": "myadminsecretkey" },
    body: JSON.stringify({
      query: login_query,
      variables,
    }),
  });
  const data = await fetchResponse.json();
  console.log("DEBUG: ", data);
  return data;
};
// !_______________________________________________
app.post("/imageUpload", upload.any(), async (req, res) => {
  res.sendStatus(200);
});

app.post("/deleteImage", (req, res) => {
  const parsedRecipeId = JSON.parse(req.body.recipeImage);
  console.log(parsedRecipeId.id);
  const path = `./images/recipe/${parsedRecipeId.id}/`;
  const fileName = file.originalname.toLowerCase().split(" ").join("-");
  const file = `${path}/fileName`;
  fs.rmSync(file, { recursive: true, force: true });
  res.sendStatus(200);
});

// app.post("/save", function (req, res) {
//   console.log("BEGIN /save");
// console.log(`req: ${JSON.stringify(req)}`);
// let fileData = fs.readFileSync(reqipeImage);
// console.log(fileData.toString());
//   console.log(req);
// });
// !______________________________________________
// Sign Up Request Handler
app.post("/signup", async (req, res) => {
  // get request input
  const { first_name, last_name, email, id } = req.body.input;

  // run some business logic
  const password = await bcrypt.hash(req.body.input.password, 10);
  // execute the Hasura operation

  const { data, errors } = await signup_execute({
    email,
    first_name,
    last_name,
    password,
  });
  // if Hasura operation errors, then throw error
  if (errors) {
    return res.status(400).json(errors[0]);
  }

  const tokenContents = {
    sub: data.insert_user_one.id,
    first_name: first_name,
    last_name: last_name,
    iat: Date.now() / 1000,
    iss: "https://myapp.com/",
    "https://hasura.io/jwt/claims": {
      "x-hasura-allowed-roles": ["user", "anonymous"],
      "x-hasura-user-id": data.insert_user_one.id,
      "x-hasura-default-role": "user",
      "x-hasura-role": "user",
    },
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
  };

  // token claim for users
  const usertokenContents = {
    sub: data.insert_user_one.id,
    first_name: first_name,
    last_name: last_name,
    iat: Date.now() / 1000,
    iss: "https://myapp.com/",
    "https://hasura.io/jwt/claims": {
      "x-hasura-allowed-roles": ["user", "anonymous", "author"],
      "x-hasura-user-id": data.insert_user_one.id,
      "x-hasura-default-role": "user",
      "x-hasura-role": "user",
    },
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
  };

  const token = jwt.sign(
    usertokenContents,
    process.env.HASURA_JWT_SECRET_KEY || "z8pXvFrDjGWb3mRSJBAp9ZljHRnMofLF"
  );

  console.log(token);
  // success

  return res.json({
    ...data.insert_user_one,
    token: token,
  });
});

// Login Request Handler
app.post("/Login", async (req, res) => {
  // get request input
  const { email, password } = req.body.input;

  const { data, errors } = await login_execute({ email });
  // if Hasura operation errors, then throw error
  if (errors) {
    return res.status(400).json(errors[0]);
  }
  if (data.user.length === 0) {
    return res
      .status(400)
      .json({ message: "Account not found, Please Sign Up." });
  }
  const validPassword = await bcrypt.compare(password, data.user[0].password);
  if (!validPassword)
    return res.status(400).json({ message: "Invalid Email or Password." });
  console.log("The password is " + validPassword);

  // token claim for users
  const usertokenContents = {
    sub: data.user[0].id,
    first_name: data.user[0].first_name,
    last_name: data.user[0].last_name,
    iat: Date.now() / 1000,
    iss: "https://myapp.com/",
    "https://hasura.io/jwt/claims": {
      "x-hasura-allowed-roles": ["user", "anonymous"],
      "x-hasura-user-id": data.user[0].id,
      "x-hasura-default-role": "user",
      "x-hasura-role": "user",
    },
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
  };

  const token = jwt.sign(
    usertokenContents,
    process.env.HASURA_JWT_SECRET_KEY || "z8pXvFrDjGWb3mRSJBAp9ZljHRnMofLF"
  );

  console.log("......................");
  console.log(token);
  console.log("......................");

  // success
  return res.json({
    ...data.user[0],
    token: token,
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
