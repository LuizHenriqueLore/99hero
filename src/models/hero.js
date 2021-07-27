const mongoose = require('../database');

const HeroSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        select: false
    },
    nickname: {
        type: String,
        required: true,
        unique: true
    },
    disasters: [{
        type: String,
        required: true
    }],
    cities: [{
        type: String,
        required: true
    }],
    teamwork: {
        type: String,
        default: 'passive'
    }
});

const Hero = mongoose.model('Hero', HeroSchema);

module.exports = Hero;