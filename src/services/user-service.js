const UserRepository = require("../repository/user-repository");
const jwt = require("jsonwebtoken");

const bcrypt = require('bcrypt');

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
      
      console.log(token);


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

  checkPassword(userInputPlainPassword,encryptedPassword)
  {
    try {

      return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
      
      
    } catch (error) {
      console.log('something went wrong in password comparison');
      throw {error};
    }
  }
}

module.exports = UserService;
