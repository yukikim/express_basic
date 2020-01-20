const router = require('express').Router()

router.get('/', (req, res) => {
    var data = {
        items: [
            {name: 'りんご'},
            {name: 'バナナ'},
            {name: 'みかん'}
        ]
    }
    res.render('./index.ejs', data)
})

module.exports = router