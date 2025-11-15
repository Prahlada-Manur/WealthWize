const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 3050;
const app = express();
app.use(cors());
app.use(express.json());

//-------------------------configuring DB---------------------------------------------------------
const configureDB = require('./config/db');
configureDB();

//----------------------importing middleware and controller---------------------------------------
const userCltr = require('./app/controllers/user-controller')
const authenticateUser=require('./app/middleware/authenticateUser');
const categoryCltr = require('./app/controllers/category-controller');
const expenseCltr = require('./app/controllers/expense-controller');
const authorizeUser=require('./app/middleware/authorizeUser')

//----------------------------api routes----------------------------------------------------------
app.post('/user/register', userCltr.register);
app.post('/user/login', userCltr.login);

//-------------------------Protected route--------------------------------------------------------
app.get('/user/account',authenticateUser,userCltr.account);
app.post('/user/changePassword',authenticateUser,userCltr.changePassword)
app.get('/users',authenticateUser,authorizeUser(['admin','moderator']),userCltr.display)
app.delete('/users/:id',authenticateUser,authorizeUser(['admin','moderator']),userCltr.remove)
//------------------------category apis-------------------------------------------------------------
app.post('/user/account/category',authenticateUser,categoryCltr.create)
app.get('/user/account/category',authenticateUser,categoryCltr.list)
app.delete('/user/account/category/:id',authenticateUser,categoryCltr.remove)
app.put('/user/account/category/:id',authenticateUser,categoryCltr.update);
app.get('/user/category/:id',authenticateUser,categoryCltr.show)


//---------------------------expense api-----------------------------------------------------------
app.post('/user/account/expense',authenticateUser,expenseCltr.create)
app.get('/user/account/expense',authenticateUser,expenseCltr.list);
app.put('/user/account/expense/:id',authenticateUser,expenseCltr.update);
app.delete('/user/account/expense/:id',authenticateUser,expenseCltr.remove);
app.get('/user/expenses/:id',authenticateUser,expenseCltr.show)

//--------------------------server running-------------------------------------------------------
app.listen(port, () => {
    console.log('Server running on port', port)
});
