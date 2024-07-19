const z = require('zod');

const productSchema = z.object({
    user: z.string({
        required_error: 'Is required to create a product'
    }),    
    category: z.string({
        required_error: 'Is required to create a product'
    }),
    productName: z.string({
        required_error: 'Title is required',
        invalid_type_error: 'Must be a string'
    }),
    productDesc: z.string({
        required_error: 'Description is required'
    }),
    offert: z.boolean({
        required_error: 'Must be a boolean',
        invalid_type_error: 'Just indicate id is available to offerts'
    }),
    brand: z.string({required_error: 'A brand is required', invalid_type_error: 'Must be an string'}),
    stock: z.string({
        required_error: 'Need a stock',
        invalid_type_error: 'Stock must be a string number'
    }),
    image1: z.string({required_error: 'An images are strongly necessary', invalid_type_error: 'Must be a string of URL'})
})

const validateProduct = (objProduct) =>{
    return productSchema.safeParse(objProduct);
}
module.exports = validateProduct;