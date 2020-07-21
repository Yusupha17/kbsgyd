const express = require('express')
const Graduate = require('../models/graduate')
const bcrypt = require('bcrypt')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('signin')
})

router.post('/', getGraduate, async (req, res) => {
    // if(res.graduate.phoneVerified && res.graduate.emailVerified){
    // res.render('done', { errorMessage: `${res.graduate.firstName}` })
    // console.log(res.graduate.firstName)
    // } else if(res.graduate.phoneVerified){
    //     res.render('sigin', { loginError: 'you have verified your phone number please verify your email to login'})
    // } else if(res.graduate.emailVerified) {
    //     res.render('sigin', { loginError: 'you have verified your email please verify your phone number to login'})
    // } else {
    //     res.render('sigin', { loginError: 'you need to verify both your email and password to login'})
    // }
    try {
        const check = await bcrypt.compare(req.body.passWord, res.graduate.passWord)
        if(check){
        res.render('done', { errorMessage: `${res.graduate.firstName}` })
        console.log(res.graduate.firstName) 
        }
        else {
            console.log('incorrect password')
            res.render('done', {errorMessage: 'incorrect password'})
        }
    }
    catch (err) {
        console.error(err)
    }

})

async function getGraduate(req, res, next) {
    req.body.email = new RegExp(req.body.email, 'i')
    let graduate
    try {
        graduate = await Graduate.findOne({ email: req.body.email })
        if(graduate == null) {
            return res.status(404).render('signin', { loginError: 'cannot find email'})
        }
    }
    catch (err) {
        console.error(err)
        return res.status(500)
    }

    res.graduate = graduate
    next()
}


module.exports = router
