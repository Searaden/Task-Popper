const express = require('express');
const router = express.Router();
const { Task } = require('../model')

router.get('/', async (req, res) =>{
    try{
        const taskData = await Task.findAll();
        const tasks = taskData.map((task)=> task.get({plain: true}))

        res.render('homepage',{tasks});
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/login', (req, res) => {
    res.render('login');
});



module.exports = router;
//new file