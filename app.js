const express = require('express')
const path = require('path')
const {v4} = require('uuid')
const app = express()


let CONTACTS = [
    {id: v4(), name: 'Lion', value: '89612249552', marked: false}
]

app.use(express.json()) //request json

//end points
app.get('/api/contacts', (req, res) => {
    res.status(200).json(CONTACTS)
})

app.post('/api/contacts', (req, res) => {
    const contact = {...req.body, id: v4(), marked: false}
    CONTACTS.push(contact)
    res.status(201).json(contact)
});

app.delete('/api/contacts/:id', (req, res) => {
    CONTACTS = CONTACTS.filter(c => c.id !== req.params.id);
    res.status(200).json({message: 'Контакт был удален'})
})

app.put('/api/contacts/:id', (req, res) => {
    const index = CONTACTS.findIndex(c => c.id === req.params.id)

    CONTACTS[index] = req.body
    res.status(200).json(CONTACTS[index])
})

app.use(express.static(path.resolve(__dirname, 'client')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(3000, () => console.log('Server has been started on port 3000...'))
