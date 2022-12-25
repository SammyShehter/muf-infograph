const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/', (req, res) => {
    fs.readFile('state.json', 'utf8', (err, data) => {
        if (err) {
            res.status(400).send(err)
        } else {
            const state = JSON.parse(data)
            res.status(200).send(state)
        }
    })
})

module.exports = router
