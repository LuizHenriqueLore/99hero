const express = require('express');
const Hero = require('../models/hero');
const router = express.Router();

router.post('/registrar', async (req, res) => {
    const { nickname } = req.body;

    try{
        if(await Hero.findOne({ nickname }))
            return res.status(400).send({ error: 'Nickname already exists' });

        const hero = await Hero.create(req.body);

        hero.name = undefined;
    
        return res.send({ hero });
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});

router.get('/', async (req, res) => {
    try{
        const heroes = await Hero.find();

        return res.send({ heroes });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading Heroes' });
    }
})

router.get('/codinome/:nickname', async (req, res) => {
    try{
        const hero = await Hero.findOne({nickname : req.params.nickname});

        return res.send({ hero });
    } catch (err) {
        return res.status(400).send({ error: 'Hero not found' });
    }
})

router.get('/cidade/:city', async (req, res) => {
    try{
        const heroes = await Hero.find({ cities: req.params.city});
        return res.send({ heroes });
    } catch (err) {
        return res.status(400).send({ error: 'There is no Hero on this area' })
    }
})


router.get('/desastre/:disaster', async (req, res) => {
    try{
        const heroes = await Hero.find({ disaster : req.params.disaster });

        return res.send({ heroes });
    } catch (err) {
        return res.status(400).send({ error: 'There is no Hero that can handle this disaster' })
    }
})


router.put('/:name', async (req, res) => {
    try{
        const hero = await Hero.findOneAndUpdate({name: req.params.name}, {
            name : req.body.name,
            nickname : req.body.nickname,
            disasters : req.body.disasters,
            cities : req.body.cities,
            teamwork : req.body.teamwork
        });

        await hero.save();
    } catch (err) {
        return res.status(400).send({ error: 'Update error' });
    }
})

router.delete('/:name', async (req, res) => {
    try{
        await Hero.findOneAndDelete({name : req.params.name});

        return res.send({ message: `Hero ${req.params.name} removed` });
    } catch (err) {
        return res.status(400).send({ error: 'Hero not found' });
    }
})

module.exports = app => app.use('/hero', router);