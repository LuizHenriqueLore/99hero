const Hero = require('../models/hero');
const mongoose = require('mongoose');

const heroes = [
    new Hero({
        name: 'Steve Rogers',
        nickname: 'Capitão América',
        disasters: ['assalto a bancos', 'desastres naturais'],
        cities: ['New York']
    }),
    new Hero({
        name: 'Tommy Oliver',
        nickname: 'Power Ranger Branco',
        disasters: ['monstros gigantes', 'desastres naturais'],
        cities: ['New York', 'Tókio']
    }),
    new Hero({
        name: 'Logan',
        nickname: 'Wolverine',
        disasters: ['assalto a bancos','monstros gigantes', 'desastres naturais'],
        cities: ['New York', 'Tókio']
    }),
    new Hero({
        name: 'Clark Joseph Kent',
        nickname: 'Superman',
        disasters: ['assalto a bancos','monstros gigantes', 'desastres naturais'],
        cities: ['New York']
    }),
    new Hero({
        name: 'Touha Yamaji',
        nickname: 'Ninja Jiraya',
        disasters: ['monstros gigantes'],
        cities: ['Tókio']
    }),
    new Hero({
        name: 'Roberto da Costa',
        nickname: 'Macha Solar',
        disasters: ['assalto a bancos','monstros gigantes', 'desastres naturais'],
        cities: ['Rio de Janeiro','New York']
    }),
    new Hero({
        name: 'Amara Aquilla',
        nickname: 'Magma',
        disasters: ['desastres naturais'],
        cities: ['Rio de Janeiro']
    }),
]

mongoose.connect("mongodb://localhost:27017/99hero", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
    console.log('connection successful');
}).catch((err) => {
    console.log('something wrong', err);
});

heroes.map(async (hero, index) => {
    await hero.save((err, result) => {
        if(index === heroes.length - 1)
            console.log("Seed Done!");
            mongoose.disconnect();
    });
});