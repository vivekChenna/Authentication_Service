const { User } = require("../models/index");

class UserRepository {

  async createUser(data) {
    try {
      const user = await User.create(data);

      return user;

    } catch (error) {
      console.log("something went wrong in the repository layer");
      throw { error };
    }
  }

  async deleteUser(userId)
  {
    
    try {
        await User.destroy({
            where : {
                id : userId,
            }
        })

        return true;
        
    } catch (error) {
        console.log("something went wrong in the repository layer");
      throw { error };
    }
  }


  async getUser(userId){


    try {

      const user = await User.findByPk(userId,{

        attributes : ['email'],


      });
      console.log(user);

      return user;
      
    } catch (error) {
      
      console.log('something went wrong in the repository layer');
      throw {error};
    }


  }
}

module.exports = UserRepository;
