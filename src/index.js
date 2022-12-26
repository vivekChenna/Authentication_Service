const express = require('express')

const bodyParser = require('body-parser')

const jwt = require('jsonwebtoken')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const { PORT, JWT_KEY } = require('./config/serverConfig')

const v1ApiRoutes = require('./routes/index')
// const UserService = require('./services/user-service')

app.use('/api', v1ApiRoutes)

const prepareAndStartServer = () => {

  // const userService = new UserService()

  // userService.createToken({email: 'vivekchenna@gmail.com',id: '1'})

 
  // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ.eyJlbWFpbCI6InZpdmVrY2hlbm5hQGdtYWlsLmNvbSIsImlkIjoiMSIsImlhdCI6MTY3MjAzNTU2MiwiZXhwIjoxNjcyMDM5MTYyfQ.cIach8qpZriAl0-z9DI49NlCMF_qftyHbVaas2hvZfg';
  // const result = userService.verifyToken(token,JWT_KEY);
  // console.log(result);

  app.listen(PORT, () => {
    console.log(`server started successfully on PORT ${PORT}`)
  })
}

prepareAndStartServer()
