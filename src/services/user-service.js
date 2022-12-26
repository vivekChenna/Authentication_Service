const UserRepository = require("../repository/user-repository");
const jwt = require('jsonwebtoken');

const {JWT_KEY} = require('../config/serverConfig');

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

  async getUser(userId)
  {
    try {

      const user = await this.userRepository.getUser(userId);
      return user;
      
    } catch (error) {

      console.log('something went wrong in the service layer');
      throw {error};
      
    }
  }


  createToken(user)
  {

try {
  
  const token = jwt.sign(user,JWT_KEY);

  console.log(token);
  
} catch (error) {

  console.log('something went wrong in the token creation');
  throw {error};
  
}

  }


}

module.exports = UserService;
