const express = require('express');
const Hero = require('../models/hero');
const router = express.Router();

router.post('/registrar', async (req, res) => {
    const { name, nickname, disasters, cities, teamwork } = req.body;

    try{
        if(name == nickname)
            return res.status(403).send({ error: 'Name and Nickname cant be the same' });
        
        if(cities.length > 3)
            return res.status(403).send({ error: 'The maximum number of cities is 3' });
    

        //if(cities != 'New York' && cities != 'Rio de Janeiro' && cities != 'Tóquio')
        //    return res.status(403).send({ error: 'The possible cities are New York, Rio de Janeiro and Tóquio' });

        if(disasters.length > 3)
            return res.status(403).send({ error: 'The maximum number of disasters is 3' });

        //if(disasters != "assalto a bancos" && disasters != "monstros gigantes" && disasters != "desastres naturais")
        //    return res.status(403).send({ error: 'The possible disasters are assalto a bancos, monstros gigantes and desastres naturais' });

        if(teamwork != "sim" && teamwork != "nao" && teamwork != "indiferente")
            return res.status(403).send({ error: 'The possible values for teamwork are sim, nao and indiferente' });
        
        if(await Hero.findOne({ nickname }))
            return res.status(403).send({ error: 'Nickname already exists' });

        if(await Hero.findOne({ name }))
            return res.status(403).send({ error: 'Name already exists' });


        const hero = await Hero.create(req.body);

        hero.name = undefined;
    
        return res.status(201).send({ hero });
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});

router.get('/', async (req, res) => {
    try{
        const heroes = await Hero.find();

        return res.status(200).send({ heroes });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading Heroes' });
    }
});

router.get('/codinome/:nickname', async (req, res) => {
    try{
        const hero = await Hero.findOne({nickname : req.params.nickname});

        if(hero){
            return res.status(200).send({ hero });
        } else {
            return res.status(400).send({ error: 'Hero not found' });
        }
    } catch (err) {
        return res.status(400).send({ error: 'Get Error' });
    }
});

router.get('/cidade/:city', async (req, res) => {
    try{
        const heroes = await Hero.find({ cities: req.params.city});

        if(heroes){
            return res.status(200).send({ heroes });
        } else {
            return res.status(400).send({ error: 'There is no Hero on this area' });
        }
        
    } catch (err) {
        return res.status(400).send({ error: 'Get Error' });
    }
});

router.get('/desastre/:disaster', async (req, res) => {
    try{
        const heroes = await Hero.find({ disasters : req.params.disaster });

        if(heroes){
            return res.status(200).send({ heroes });
        } else {
            return res.status(400).send({ error: 'There is no Hero that can handle this disaster' });
        }
    } catch (err) {
        return res.status(400).send({ error: 'Get Error' });
    }
});

router.put('/:name', async (req, res) => {
    try{
        const hero = await Hero.findOneAndUpdate({name: req.params.name}, {
            name : req.body.name,
            nickname : req.body.nickname,
            disasters : req.body.disasters,
            cities : req.body.cities,
            teamwork : req.body.teamwork
        },{ new: true });

        if(hero){
            return res.status(200).send({ hero });
        } else {
            return res.status(400).send({ error: 'Update error' });
        }
    } catch (err) {
        return res.status(400).send({ error: 'Update error' });
    }
});

router.delete('/delete/:name', async (req, res) => {
    try{
        const hero = await Hero.findOneAndDelete({name : req.params.name});

        if(hero){
            return res.status(200).send({ message: `Hero ${req.params.name} removed` });
        } else {
            return res.status(400).send({ error: 'Hero not found' });
        }
        
    } catch (err) {
        return res.status(400).send({ error: 'Delete Error' });
    }
});

router.delete('/deleteall', async (req, res) => {
    try{
        await Hero.deleteMany()

        return res.status(200).send({ message: 'All heroes removed' });
        
    } catch (err) {
        return res.status(400).send({ error: 'Delete Error' });
    }
});

module.exports = app => app.use('/hero', router);