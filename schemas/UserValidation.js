const z = require('zod');
const userSchema = z.object({
    email: z.string({
        invalid_type_error: 'Your email is not valid',
        required_error: 'Your email is required'
    }),
    password: z.string({
        invalid_type_error: 'Your password is not valid format',
        required_error: 'Your password is obligatory'
    })
})

const validateUser = ( userObj ) =>{
    return userSchema.safeParse(userObj)
}


module.exports = validateUser;