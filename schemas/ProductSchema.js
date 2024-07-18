const z = require('zod');

const productSchema = z.object({
    title: z.string({
        required_error: 'Title is required',
        invalid_type_error: 'Must be a string'
    }),
    description: z.string({
        required_error: 'Description is required'
    }),
    offert: z.boolean({
        required_error: 'Must be a boolean',
        invalid_type_error: 'Just indicate id is available to offerts'
    }),
    brand: z.string({required_error: 'A brand is required', invalid_type_error: 'Must be an string'}),
    stock: z.number({
        required_error: 'Need a stock',
        invalid_type_error: 'Stock must be a number'
    }),
    image1: z.string({required_error: 'An images are strongly necessary', invalid_type_error: 'Must be an array of URLS'}),
    image2: z.string({required_error: 'An images are strongly necessary', invalid_type_error: 'Must be an array of URLS'}),
    image3: z.string({required_error: 'An images are strongly necessary', invalid_type_error: 'Must be an array of URLS'})
})

const validateProduct = (objProduct) =>{
    return productSchema.safeParse(objProduct);
}
module.exports = validateProduct;