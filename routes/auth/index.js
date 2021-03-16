const router = require('express').Router();

router.get('/', (req, res) => {
    console.log('hit login route')
    res.status(200).send();
})

module.exports = router;