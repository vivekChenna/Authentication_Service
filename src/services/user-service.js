const UserRepository = require("../repository/user-repository");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const { JWT_KEY } = require("../config/serverConfig");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.createUser(data);
      return user;
    } catch (error) {
      console.log("something went wrong in the service layer");
      throw { error };
    }
  }

  async destroy(userId) {
    try {
      const user = await this.userRepository.deleteUser(userId);
      return user;
    } catch (error) {
      console.log("something went wrong in the service layer");
      throw { error };
    }
  }

  async SignIn(email, PlainPassword) {
    try {
      // step1 -> fetch the user using email
      const user = await this.userRepository.getByEmail(email);

      if (!user) {
        throw {
          error: "email not registered ",
          message: "please first signup ",
        };
      }

      // step2 -> compare incoming password with the stored encrypted password
      const PasswordMatch = this.checkPassword(PlainPassword, user.password);

      if (!PasswordMatch) {
        console.log("password doesn't match ");
        throw { err: "Incorrect password" };
      }

      // if password matches then create a token and send it to the user
      const newJWT = this.createToken({
        email: user.email,
        id: user.id,
      });

      return newJWT;
    } catch (error) {
      console.log("something went wrong in the Sign in process");
      throw { error };
    }
  }

  async isAuthenticated(token) {
    try {
      const isTokenVerified = this.verifyToken(token);

      // console.log(isTokenVerified);

      if (!isTokenVerified) {
        throw { error: "Invalid Token " };
      }

      // console.log(isTokenVerified.id);

      const user = await this.userRepository.getUser(isTokenVerified.id);

      console.log(user);

      if(!user){
        throw {error : "No user with the corresponding token exist "}
      }

      return user.id;

    } catch (error) {
      console.log("something went wrong in the auth process");
      throw { error };
    }
  }

  async getUser(userId) {
    try {
      const user = await this.userRepository.getUser(userId);
      return user;
    } catch (error) {
      console.log("something went wrong in the service layer");
      throw { error };
    }
  }

  createToken(user) {
    try {
      const token = jwt.sign(user, JWT_KEY, { expiresIn: "1h" });

      // console.log(token)

      return token;
    } catch (error) {
      console.log("something went wrong in the token creation");
      throw { error };
    }
  }

  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);

      return response;
    } catch (error) {
      console.log("something went wrong in the validation of token");
      throw { error };
    }
  }

  checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);

      // returns true or false
    } catch (error) {
      console.log("something went wrong in password comparison");
      throw { error };
    }
  }
}

module.exports = UserService;
