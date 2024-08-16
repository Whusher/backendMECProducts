const pool = require("../database/connection");

class Sale {
  static async insertSale({ data }) {
    const { dateSOLD, quantity, total, itineraryID } = data;
    try {
      await pool.query(
        "INSERT INTO sale (dateSOLD, quantity, total, itineraryID) VALUES (?, ?, ?, ?)",
        [dateSOLD, quantity, total, itineraryID]
      );
      return true;
    } catch (e) {
      console.error("Error during sale insertion:", e);
      return false;
    }
  }

  static async getSales() {
    try {
      const [rows] = await pool.query("SELECT * FROM sale");
      return rows;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async getSaleById(id) {
    try {
      const [rows] = await pool.query("SELECT * FROM sale WHERE sellID = ?", [id]);
      return rows.length > 0 ? rows[0] : false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async deleteSale(id) {
    try {
      await pool.query("DELETE FROM sale WHERE sellID = ?", [id]);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}

module.exports = Sale;
