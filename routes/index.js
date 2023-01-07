const express = require('express')
const items_array = require('../data-storage')

const router = express.Router()


router.get('/', (req, res)=>{
    res.status(200).json({items_array})
})

router.post('/', (req, res) => {
    const newItem = req.body
    newItem.id = items_array.length + 1
    if (newItem.name && newItem.qty && newItem.price) {
        items_array.push(newItem)
        res.status(201).json({ itemSummary: newItem })
    }
    else if ((newItem.name) && (!newItem.qty) || (!newItem.price)) {
        res.status(400).json({ incompleteDetails: newItem })
    }

    else res.status(404).send('kindly provide the details of the new item to add to the list')

})

router.get('/:id', (req, res) => {
    const item = items_array.find(item => item.id === parseInt(req.params.id))
    if (item) {
        res.status(200).send(`item details: name is ${item.name} and price $${item.price} per unit`)
    }
    else res.status(404).send('unknown id')
})

router.patch('/:id', (req, res) => {
    const item = items_array.find(item => item.id === parseInt(req.params.id))
    if (item) {
        for (keys in req.body) {
            if (keys === 'id') continue;
            item[keys] = req.body[keys]
        }
        res.status(200).json({message:"update successful", item })
    }
    else res.status(404).send('unknown id')
})

router.delete('/:id', (req, res) => {
    const itemIndex = items_array.findIndex(item => item.id === parseInt(req.params.id))
    if (itemIndex) {
      items_array.slice(itemIndex, 1)
        res.status(200).json({message:"item successfully deleted"})
    }
})


module.exports = router