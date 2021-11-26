const { Router } = require('express')
const router = Router()
const { Clients, validateClients } = require('../models/Clients')
const auth = require('../middleware/auth.middleware')

// /api/auth/clients/register
router.post('/register', auth, async (req, res) => {
    try {
        const { error } = validateClients(req.body)
        if (error) {
            return res.status(400).json({
                error: error,
                message: error.message
            })
        }
        const {
            firstname,
            lastname,
            fathername,
            id,
            gender,
            born,
            phone,
        } = req.body
        const clients = new Clients({
            firstname,
            lastname,
            fathername,
            id,
            gender,
            born,
            phone,
        })
        await clients.save()
        res.status(201).send(clients)

    } catch (e) {
        res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
    }
})

// /api/auth/clients/
router.get('/', auth, async (req, res) => {
    try {
        const clients = await Clients.find({}).sort({ _id: -1 })
        res.json(clients);

    } catch (e) {
        res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {

        const clients = await Clients.findById(req.params.id)
        res.json(clients)
    } catch (e) {
        res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
    }
})


// cashier get client by client id
router.get('/id/:id', auth, async (req, res) => {
    try {
        const clients = await Clients.find({ id: req.params.id })
        res.json(clients)
    } catch (e) {
        res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
    }
})

router.put('/:id', auth, async (req, res) => {
    try {
        const id = req.params.id
        const edit = await Clients.findByIdAndUpdate(id, {})
        res.json(edit);

    } catch (e) {
        res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
    }
})

router.patch('/:id', auth, async (req, res) => {
    try {
        const id = req.params.id
        const edit = await Clients.findByIdAndUpdate(id, req.body)
        res.json(edit);

    } catch (e) {
        res.status(500).json({ message: 'Serverda xatolik yuz berdi' })
    }
})


module.exports = router