const express = require('express')
const router = express.Router()
// Require user model
const User = require('../models/user.model')

// Add bcrypt to encrypt passwords
const bcrypt = require("bcrypt")
const bcryptSalt = 10

// Add passport

const passport = require("passport")



// const ensureLogin = require('connect-ensure-login')

// router.get('/private-page', ensureLogin.ensureLoggedIn(), (req, res) => {
// 	res.render('auth/private', { user: req.user })
	
// })

//const checkLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.render('index', { loginErrorMessage: 'Acceso restringido' })


//SIGNUP

router.get('/signup', (req,res) => res.render('auth/signup'))

router.post('/signup', (req, res, next) =>{
	const{username, password} = req.body

		if (username === "" || password === "") {
			res.render("auth/signup", {errorMSg: "Rellena los campos"})
			return
		}

		User 
			.findOne({username})
			.then(user => {
				
				if(user) {
					console.log('El usuario es', user)
					res.render("auth/signup", { errorMsg: "El usuario ya existe" })
					return
				}
	
				// Validación pwd
	
				const salt = bcrypt.genSaltSync(bcryptSalt)
				const hashPass = bcrypt.hashSync(password, salt)
	
				User
					.create({ username, password: hashPass })
					.then(() => res.redirect("/"))
					.catch(() => res.render("auth/signup", { errorMsg: "Error de servidor" }))
			})
			.catch(error => next(new Error(error)))

})



//LOGIN

router.get("/login", (req, res) => res.render("auth/login", { errorMsg: req.flash("error") }))

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
}))







module.exports = router
