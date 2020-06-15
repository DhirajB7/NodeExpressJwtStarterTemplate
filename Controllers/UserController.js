const JWT = require("jsonwebtoken");
const User = require("../Models/UserModel");
const Bcrypt = require("bcryptjs");

signToken = (user) => {
  return JWT.sign(
    {
      iss: "PROJECT NAME",
      sub: user.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    },
    process.env.TOKEN_SECRET
  );
};

module.exports = {
  signUp: async (req, res, next) => {
    try {
      const foundUser = await User.findOne({
        email: req.body.email,
      });

      if (foundUser) {
        res.status(403).json({ error: "USER ALREADY EXIXTS" });
      } else {
        const salt = await Bcrypt.genSalt(10);
        const hashPassword = await Bcrypt.hash(req.body.password, salt);

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: hashPassword,
        });
        await newUser.save();

        res.json({ message: `${req.body.name.toUpperCase()} CREATED.` });
      }
    } catch (error) {
      console.log(`ERROR ${error}`);
    }
  },

  signIn: async (req, res, next) => {
    try {
      const userFound = await User.findOne({
        email: req.body.email,
      });

      if (userFound) {
        const passwordVerify = await Bcrypt.compare(
          req.body.password,
          userFound.password
        );
        if (passwordVerify) {
          const jwToken = signToken(req.body.email);
          res.json({ token: jwToken });
        } else {
          res.status("403").json({ message: "Wrong Password" });
        }
      } else {
        res.status("404").json({ message: "USER DOES NOT EXIXTS" });
      }
    } catch (error) {
      console.log(`ERROR ${error}`);
    }
  },

  all: async (req, res, next) => {
    try {
      const allUsers = await User.find();
      res.json(allUsers);
    } catch (error) {
      console.log(`ERROR ${error}`);
    }
  },
};
