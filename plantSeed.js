const db = require('./models');

plants = [
    {
        plantName: 'Lettuce',
        quantity: 0,
        ph: 6.5, // ph scale
        temp: 68, // fahrenheit. Do NOT reach abouve 75 because it will flower
        spacing: 9, // inches. Wiggle room here
        growthTime: 4, // weeks. can be varied depending on variety
        flag: 'calcium' // may need treatment
    },
    {
        plantName: 'Basil',
        quantity: 0,
        ph: 6, // ph scale
        temp: 73, //fahrenheit
        spacing: 7, //inches
        growthTime: 6, // weeks or when plant is 15cm

    },
    {
        plantName: 'Tomatoes',
        quantity: 0,
        ph: 6,
        temp: 74,
        spacing: 8, // inches
        growthTime: 8, // weeks on FIRST vine harvest
        flags: 'vine' // vine plant
    },
    {
        plantName: 'Cucumbers',
        quantity: 0,
        ph: 6, // ph scale
        temp: 77, // fahrenheit
        spacing: 9, // inches
        growthTime: 8, // weeks or fruits are at 250-400g
        flags: 'vine' // vine plant
    },
    {
        plantName: 'Chard',
        quantity: 0,
        ph: 7, // ph scale
        temp: 68, // fahrenheit
        spacing: 12, // inches
        growthTime: 4, // weeks
        flags: 'calcium' // may need treatment
    }
]

db.Plants.deleteMany((err, deleted)=>{
    for(plant of plants) {
                db.Plants.create(plant, (err, createdPlant) => {
                  if (err) {
                    console.log(err);
                  }
                  console.log(createdPlant);
                });
            
        }
})
