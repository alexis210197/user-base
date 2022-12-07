const jwt = require('jsonwebtoken')
const {checkUserCredentials} = require('./auth.controller')

const JwtSecret = require('../../config').api.jwtSecret


const postLogin = (req, res) =>{

    const {email, password} = req.body

    if(email && password){
        checkUserCredentials(email, password)
            .then((data)=>{
                if(data){
                    const token = jwt.sign({
                        id: data.id,
                        user_name: data.user_name,
                        rol: data.rol
                    },JwtSecret)
                    res.status(200).json({
                        message: 'Correct credentials',
                        token
                    })
                }else{
                    res.status(401).json({message: 'Invalid credentials'})
                }
            })
            .catch((err)=>{
                res.status(400).json({message: err.message})
            })
    }else{
        res.status(400).json({
            message: 'Missing data', 
            fields: {
            email: 'example@example.com',
            password: 'string'
        }})
    }

}

module.exports = {
    postLogin
}