/**
 * @author Marc TONYE
 * @description user API
 */

const express   = require('express')

const User      = require('../schema/user')
const auth      = require('../middleware/auth')

const router = express.Router();
router.use( express.json() );

/**
 *  POST /users
 * Create a new User 
*/
router.post('/users', async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
});

/** 
 * POST /users/login
 * Authenticate User
*/
router.post('/users/login', async(req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
});

/** 
 * GET /users/me
 * display Current User Profile
*/
router.get('/users/me', auth, async(req, res) => {
    // View logged in user profile
    res.send( req.user )
})

/** 
 * POST /users/me/logout
 * Log user out of the application
*/
router.post('/users/me/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter( (token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status( 500 ).send( error )
    }
});

module.exports = router