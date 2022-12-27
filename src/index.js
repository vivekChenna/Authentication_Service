const express = require('express')

const bodyParser = require('body-parser')

const jwt = require('jsonwebtoken')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const { PORT, JWT_KEY } = require('./config/serverConfig');

const {User ,Role} = require('./models/index');

const db = require('./models/index');

const dotenv = require('dotenv');

dotenv.config();

const v1ApiRoutes = require('./routes/index')
// const UserService = require('./services/user-service')

app.use('/api', v1ApiRoutes)

const prepareAndStartServer = async() => {

  // const userService = new UserService()

  // userService.createToken({email: 'vivekchenna@gmail.com',id: '1'})

 
  // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ.eyJlbWFpbCI6InZpdmVrY2hlbm5hQGdtYWlsLmNvbSIsImlkIjoiMSIsImlhdCI6MTY3MjAzNTU2MiwiZXhwIjoxNjcyMDM5MTYyfQ.cIach8qpZriAl0-z9DI49NlCMF_qftyHbVaas2hvZfg';
  // const result = userService.verifyToken(token,JWT_KEY);
  // console.log(result);

  if(process.env.DB_SYNC)
  {
    db.sequelize.sync({alter:true});
  }

  const user1 = await User.findByPk(2);
  const role1 = await Role.findByPk(1);

  user1.addRole(role1);

  const response = await user1.hasRole(role1);

  console.log(response);



  app.listen(PORT, () => {
    console.log(`server started successfully on PORT ${PORT}`)
  })
}

prepareAndStartServer()
