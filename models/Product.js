const pool = require("../database/connection");

class Product {
  static async insertProduct({ data }) {
    // First of all insert our Product
    const {
      image1,
      image2,
      image3,
      anioCompatibilityFin,
      anioCompatibilityIni,
      brand,
      category,
      id,
      facebookUri,
      motorCompatibility,
      offert,
      productDesc,
      productName,
      productPrice,
      stock,
      user,
      whatsappUri,
      modelCompatibility
    } = data;

    // Variables needed
    let mainImageID = "";

    // Insert in our first relational necessary (Image table)
    const images = [image1, image2, image3];
    const promises = images.map((image) => {
      if (image) {
        return pool.query(
          "INSERT INTO image (photo_URL, productID) VALUES(?,?)",
          [image, id]
        );
      } else {
        // Return a resolved promise to keep array consistency
        return Promise.resolve();
      }
    });

    try {
      const results = await Promise.allSettled(promises);
      const allSuccess = results.every(
        (result) => result.status === "fulfilled"
      );

      if (allSuccess) {
        const [rows, fields] = await pool.query(
          "SELECT imageID FROM image WHERE photo_URL = ?",
          [image1]
        );
        if (rows.length > 0) {
          mainImageID = rows[0].imageID;
        }
      } else {
        console.error("Some insertions failed:", results);
        return false;
      }

      // Insert the product
      const productInsert = await pool.query(
        `
                INSERT INTO product (
                    productID, imageID, title, description, brandID, price, anioInCompt, 
                    facebookUri, whatsappUri, anioOutCompt, offert, categoryID, motorCompatibility,modelCompatibility
                ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
            `,
        [
          id,
          mainImageID,
          productName,
          productDesc,
          brand,
          productPrice,
          anioCompatibilityIni,
          facebookUri,
          whatsappUri,
          anioCompatibilityFin,
          offert,
          category,
          motorCompatibility,
          modelCompatibility
        ]
      );

      //Insert an itinerary of the product
      const itineraryUpload = await pool.query(
        "INSERT INTO itinerary(stock,productID,userID) VALUES(?,?,?)",
        [stock, id, user]
      );
      return true;
    } catch (e) {
      console.error("Error during insertion:", e);
      return false;
    }
  }

  static async getProducts(user, category) {
    // Implementation
    try {
      const query = category && parseInt(category) ? `SELECT title, product.productID AS id,
     photo_URL AS photo, offert, price, whatsappUri, brandID, stock,categoryID,
     modelCompatibility,
     anioInCompt,
     anioOutCompt,
     motorCompatibility
     FROM product 
     INNER JOIN image ON (image.imageID=product.imageID) 
     INNER JOIN itinerary ON(itinerary.productID = product.productID) 
     WHERE itinerary.userID = ?
     AND categoryID=${category};`
     :
     `SELECT title, product.productID AS id,
     photo_URL AS photo, offert, price, whatsappUri, brandID, stock,categoryID,
     modelCompatibility,
     anioInCompt,
     anioOutCompt,
     motorCompatibility
     FROM product 
     INNER JOIN image ON (image.imageID=product.imageID) 
     INNER JOIN itinerary ON(itinerary.productID = product.productID) 
     WHERE itinerary.userID = ?;`
      const [rows, config] = await pool.query(query, [
         user
      ]);
      return rows;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async getIndividual(id) {
    try {
      const [rows,] = await pool.query(
        `
           SELECT 
    product.productID, 
    product.title,
    description, 
    brandID, 
    price,
    anioInCompt, 
    anioOutCompt,
    facebookUri, 
    whatsappUri, 
    offert, 
    motorCompatibility,
    modelCompatibility,
    stock,
    (SELECT photo_URL FROM image WHERE productID = ? LIMIT 1 OFFSET 0) AS main,
    (SELECT photo_URL FROM image WHERE productID = ? LIMIT 1 OFFSET 1) AS second,
    (SELECT photo_URL FROM image WHERE productID = ? LIMIT 1 OFFSET 2) AS third
FROM product 
INNER JOIN itinerary ON itinerary.productID = product.productID
WHERE product.productID = ?;
                
                `,
        [id, id, id, id]
      );
      if (rows.length > 0) {
        return rows[0];
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }

  static async getProductsByUser(user) {
    try {
      const [rows, config] = await pool.query(`
        SELECT title, product.productID AS id, photo_URL AS photo, offert, price, whatsappUri, brandID, stock, itineraryID
        FROM product 
        INNER JOIN image ON (image.imageID = product.imageID) 
        INNER JOIN itinerary ON (itinerary.productID = product.productID) 
        WHERE itinerary.userID = ?;
      `, [user]);
      return rows;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  static async updateProduct({ data }) {
    // Implementation
  }

  static async deleteProduct(id) {
    // Implementation
      const connection = await pool.getConnection();
      try {
        await connection.beginTransaction();
    
        // Eliminar el producto
        await connection.query('DELETE FROM product WHERE productID = ?', [id]);
        console.log('Dropped product record');
    
        // Eliminar las imágenes relacionadas
        await connection.query('DELETE FROM image WHERE productID = ?', [id]);
        console.log('Dropped image record');
    
        // Eliminar el itinerario relacionado
        await connection.query('DELETE FROM itinerary WHERE productID = ?', [id]);
        console.log('Dropped itinerary record');
    
        // Confirmar la transacción
        await connection.commit();
        return true;
      } catch (error) {
        // Revertir la transacción en caso de error
        await connection.rollback();
        console.error('Error deleting product:', error);
        return false;
      } finally {
        connection.release();
      }
  }
    
}

module.exports = Product;
