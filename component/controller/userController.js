const user = require("../model/user");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
class Usercontroller {
  async createUser(req, res) {
    const { username, password, name } = req.body;
    if (!username && !password && !name) {
      return res
        .status(400)
        .json({ success: false, message: "input is required" });
    } else {
      const UserExit = await user.findOne({ username: username });
      if (UserExit) {
        return res
          .status(400)
          .json({ succes: false, message: "User name Already Exist" });
      } else {
        const hashpassword = await argon2.hash(password);
        const newUser = user({ username, password: hashpassword, name: name });
        await newUser.save();
        const Accesstoken = jwt.sign(
          { UserExit: newUser._id },
          process.env.Accestoken
        );
        res.status(200).json({
          success: true,
          message: "Create User success",
          Accesstoken: Accesstoken,
          user: newUser,
        });
      }
    }
  }
  async Login(req, res) {
    const { username, password } = req.body;
    if (!username) {
      return res
        .status(400)
        .json({ success: false, message: "input is required" });
    } else {
      const Userlogin = await user.findOne({ username: username });
      if (!Userlogin) {
        return res
          .status(500)
          .json({ succes: false, message: "username khong dung" });
      } else {
        const passwordValid = await argon2.verify(Userlogin.password, password);
        if (!passwordValid) {
          return res
            .status(400)
            .json({ success: false, message: "password Invalid" });
        } else {
          const Accesstoken = jwt.sign(
            { UserExit: Userlogin._id },
            process.env.Accestoken
          );
          res.status(200).json({
            success: true,
            user: Userlogin,
            Accesstoken: Accesstoken,
            message: "Dang nhap thanh cong",
          });
        }
      }
    }
  }
}

module.exports = new Usercontroller();
