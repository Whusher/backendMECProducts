const validateProduct = require('../schemas/ProductSchema');
const ProductModel = require('../models/Product');
class ProductController {
    static async newProduct(req,res){
        const data = req.body;
        const statusIntegrity = validateProduct(data);
        if(statusIntegrity.success){
            //UNIQUE ID CREATION
            data.id = `${data.user.slice(1,7)+Date.now()+data.productName.slice(1,4)}`;
            //Data already to model
            try {
                const insertionResult = await ProductModel.insertProduct({ data });
                if (insertionResult) {
                    res.status(201).json(data);
                } else {
                    res.status(500).json({ message: 'Product insertion failed' });
                }
            } catch (e) {
                console.error('Error during product insertion:', e);
                res.status(500).json({ message: 'Internal Server Error' });
            }

        }else{
            return res.status(404).json({statusIntegrity});
        }
    }
    static async getProducts(req,res){
        const {user} = req.body;
        const {category} =req.params;
        const products = await ProductModel.getProducts(user,category);
        console.log(products);
        if(products){
            res.status(200).json(products);
        }else{
            res.status(403).json({message: 'Service not available'})
        }
    }
    static async getIndividual(req,res){
        const {id} = req.params;
        if(id){
            const response = await ProductModel.getIndividual(id);
            res.status(200).json(response);
        }else{
            res.status(404).json({message: 'NOT PRODUCT SELECTED'})
        }
    }
    static async saleProduct(req,res){

    }
}

module.exports = ProductController;