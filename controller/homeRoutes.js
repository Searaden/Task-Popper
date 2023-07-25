const express = require('express');
const router = express.Router();
const { Task } = require('../model')
const withAuth = require('../utils/auth')

//Loading HOMEPAGE handlebar if logged in...
router.get('/', withAuth, async (req, res) =>{

    try{
        const taskData = await Task.findAll({
            where: {user_id: req.session.user_id}
        });
        const tasks = taskData.map((task)=> task.get({plain: true}))

        // Allowing session variable to be visible to handlebars
        const username = req.session.username;
        console.log(username)
        const logged_in = req.session.logged_in;
        res.render('homepage',{
            username,
            tasks,
            logged_in
        });
    }catch(err){
        res.status(500).json(err);
    }
});

//Loading SIGNUP handlebar...
router.get('/signup', (req, res) => {
    res.render('signup');
});

//Loading LOGIN handlebar...
router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;