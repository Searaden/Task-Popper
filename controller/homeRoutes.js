const express = require('express');
const router = express.Router();

router.get('/', async (req, res) =>{
    try{
        // on load content
        res.render('test')
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;
//new file