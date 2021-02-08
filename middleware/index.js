module.exports = {
    checkLoggedIn: (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Inicia sesión para acceder' }),
    
}