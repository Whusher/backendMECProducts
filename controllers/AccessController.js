  const SessionModel = require("../models/Session");
  const validateUser = require("../schemas/UserValidation");

  class AccessController {
    static async signIn(req, res) {
    //Destructuring and data validation from request body
      const { email, password } = req.body;
      try {
        //Object to the model
        const userCredentials = { email, password }; //Until the data will be sanitazed to Mysql inyection prevention
        const validation = validateUser(userCredentials);
        if(validation.error){
          return res.status(400).json(validation.error);
        }
        //Call the model to do something with sanitazed data
        const response = await SessionModel.startSession({ userCredentials });
        if (response) {
          return res.status(200).json(response);
        }
        return res.status(403).json({ status: 0, message: "Access Denied" });
      } catch (e) {
          return res.status(500).json({message: 'Internal Error'})
      }
    }
    static async signOut(req, res){
      const {token} = req.body;
      try{
          const response = await SessionModel.closeSession({userToken: token});
          response 
          ? 
              res.status(200).json({message: 'Session closed'})
          :
              res.status(500).json('Cannot close session')

      }catch(e){
          return res.status(500).json('Cannot close session')
      }
    }
    static async signUp(req, res){
      const USER = req.body;
      const validation = validateUser(USER);
      if(validation.error){
          return res.status(500).json(validation.error);
      }
      try{
          const registro = await SessionModel.createAccount({userData: USER});
          if(registro){
              return res.status(201).json({message: 'User created successful'});
          }
          return res.status(500);
      }catch(e){
          return res.status(500).json({message: 'Internal Error'});
      }

    }
    static async brands(req, res) {
    try {
      const response = await SessionModel.myBrands();
      if (response) {
        return res.status(200).json( response );
      } else {
        return res.status(500).json({ message: 'ERROR RESPONSE' });
      }
    } catch (e) {
      return res.status(500).json({ message: 'Something went wrong' });
    }
  }
  }

  module.exports = AccessController;
