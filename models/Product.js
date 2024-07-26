const pool = require('../database/connection');

class Product {
    static async insertProduct({ data }) {
        // First of all insert our Product
        const {
            image1, image2, image3, anioCompatibilityFin, anioCompatibilityIni,
            brand, category, id, facebookUri, motorCompatibility, offert, productDesc, productName,
            productPrice, stock, user, whatsappUri 
        } = data;

        // Variables needed
        let mainImageID = '';

        // Insert in our first relational necessary (Image table)
        const images = [image1, image2, image3];
        const promises = images.map(image => {
            if (image) {
                return pool.query('INSERT INTO image (photo_URL, productID) VALUES(?,?)', [image, id]);
            } else {
                // Return a resolved promise to keep array consistency
                return Promise.resolve();
            }
        });

        try {
            const results = await Promise.allSettled(promises);
            const allSuccess = results.every(result => result.status === 'fulfilled');

            if (allSuccess) {
                const [rows, fields] = await pool.query('SELECT imageID FROM image WHERE photo_URL = ?', [image1]);
                if (rows.length > 0) {
                    mainImageID = rows[0].imageID;
                }
                console.log('Main Image ID:', mainImageID);
                console.log('Result Image ID:', rows);
                console.log('LOOOK AT MEEEEE:', rows[0]);
            } else {
                console.error('Some insertions failed:', results);
                return false;
            }

            // Insert the product
            const productInsert = await pool.query(`
                INSERT INTO product (
                    productID, imageID, title, description, brandID, price, anioInCompt, 
                    facebookUri, whatsappUri, anioOutCompt, offert, categoryID, motorCompatibility
                ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
            `, [id, mainImageID, productName, productDesc, brand, productPrice, anioCompatibilityIni, 
                facebookUri, whatsappUri, anioCompatibilityFin, offert, category, motorCompatibility]);

            console.log('Product Insert Result:', productInsert);

            //Insert an itinerary of the product
            const itineraryUpload = await pool.query('INSERT INTO itinerary(stock,productID,userID) VALUES(?,?,?)',[stock,id,user]);
            console.log('Itinerary Upload: ', itineraryUpload);
            return true;
        } catch (e) {
            console.error('Error during insertion:', e);
            return false;
        }
    }

    static async getProducts(user,category) {
        // Implementation
        try{
            const [rows, config] = await pool.query('CALL ProductsPerCategory(?,?)',[user,category]);
            console.log(rows);
            return rows[0];
        }catch(e){
            console.log(e);
            return false;
        }
    }

    static async getIndividual(id){
        try{
            const [rows,config] = await pool.query('CALL GetIndividualProductByID(?)',[id]);
            if(rows.length>0){
                return rows[0];
            }else{
                return false;
            }
        }catch(e){
            return false;
        }
    }

    static async updateProduct({ data }) {
        // Implementation
    }

    static async deleteProduct({ product }) {
        // Implementation
    }
}

module.exports = Product;