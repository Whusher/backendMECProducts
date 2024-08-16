const pool = require("../database/connection");

class User {
  static async insertUser({ data }) {
    const { email, rol, password, enterpriseName, whatsappNumber } = data;
    try {
        // Encriptacion de contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Inserción en la base de datos con la contraseña encriptada
        await pool.query(
            "INSERT INTO user (id, email, rol, password, enterpriseName, whatsappNumber) VALUES (UUID(), ?, ?, ?, ?, ?)",
            [email, rol, hashedPassword, enterpriseName, whatsappNumber]
        );
        return true;
    } catch (e) {
        console.error("Error during user insertion:", e);
        return false;
    }
  }

  static async getUsers() {
    try {
      const [rows] = await pool.query("SELECT * FROM user");
      return rows;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async getUserById(id) {
    try {
      const [rows] = await pool.query("SELECT * FROM user WHERE id = ?", [id]);
      return rows.length > 0 ? rows[0] : false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async deleteUser(id) {
    try {
      await pool.query("DELETE FROM user WHERE id = ?", [id]);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async updateUser({ id, data }) {
    const { email, rol, password, enterpriseName, whatsappNumber } = data;
    try {
      await pool.query(
        "UPDATE user SET email = ?, rol = ?, password = ?, enterpriseName = ?, whatsappNumber = ? WHERE id = ?",
        [email, rol, password, enterpriseName, whatsappNumber, id]
      );
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

module.exports = User;
