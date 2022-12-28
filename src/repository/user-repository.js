const { User,Role } = require('../models/index')
const  ValidationError = require('../utils/validation-error');

class UserRepository {
  async createUser(data) {
    try {
      const user = await User.create(data)

      return user;
    } catch (error) {
      if(error.name = 'SequelizeValidationError'){

        // const validationError = new ValidationError(error);
        // console.log(validationError);

        throw new ValidationError(error);
      }


      console.log(error);
      console.log('something went wrong in the repository layer');
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      await User.destroy({
        where: {
          id: userId,
        },
      })

      return true
    } catch (error) {
      console.log('something went wrong in the repository layer')
      throw { error }
    }
  }

  async getUser(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ['email','id'],
      })
      // console.log(user)

      return user
    } catch (error) {
      console.log('something went wrong in the repository layer')
      throw { error }
    }
  }


  async getByEmail(UserEmail)
  {

    try {

      const user  = await User.findOne({
        where :{
          email : UserEmail,
        }
      })


      return user;
      
    } catch (error) {
      console.log('something went wrong in the repository layer')
      throw { error }
    }

  }


  async isAdmin(userId){

try {

  
  const user = await User.findByPk(userId);
  const AdminRole = await Role.findOne({
    where : {
      name : 'ADMIN',
    },

  });

   return user.hasRole(AdminRole);

  
} catch (error) {
  
  console.log('something went wrong in the repository layer');
   throw {error};
}
        




  }
}

module.exports = UserRepository
