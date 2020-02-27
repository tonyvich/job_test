/**
 * @author Marc TONYE
 * @description Database Mongoose Configuration
 */

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL + '/' + process.env.MONGODB_NAME, {
    useNewUrlParser: true,
    useCreateIndex: true,
})