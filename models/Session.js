const pool = require('../database/connection');


class Session{
    static async createAccount({userData}){
        const {email, enterpriseName, password } = userData;
     try{
        const [result] = await pool.query('INSERT INTO user(email, password, enterpriseName) VALUES(?,?,?)',[email,password,enterpriseName]);
        if(result){
            return true;
        }
        return false;
     }catch(e){
        return false;
     }
    }
    static async startSession({userCredentials}){
        const {email, password} = userCredentials
        try{
            const [result] = await  pool.query('SELECT id, email, enterpriseName, rol, lastLogin FROM user WHERE email = ? AND password = ? ',[email,password]);
            if(result.length === 0){
                return null;
            }
            return {token: result[0].id, email: result[0].email, name: result[0].enterpriseName, rol: result[0].rol}
        }catch(e){
            return null;
        }
    }
    static async closeSession({userToken}){
        const closed = new Date();
        const closedFormatted = closed.toISOString().slice(0, 10);
        try{
            const [result] = await pool.query('UPDATE user SET lastLogin = ? WHERE id = ?',[closedFormatted,userToken]);
            if(result){
                return true;
            }
        }catch(e){
            return false;
        }
    }
    static async myBrands() {
        try {
          const [rows] = await pool.query('SELECT id, enterpriseName, whatsappNumber FROM user');
          if (rows.length > 0) {
            return rows;
          }
          return false;
        } catch (e) {
          return false;
        }
      }
      

}


module.exports = Session;