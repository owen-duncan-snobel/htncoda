const fs = require('fs');
const ics = require('ics');
const canada_holidays = require('./response.json');

//console.log(canada_holidays.holidays);

const holidays = [];

canada_holidays.holidays.map((holiday) => {
    const [year,month,day] = holiday.date.split('-').map(el => Number(el));
    
    holidays.push({
        title: holiday.name,
        start: [year, month, day, 0, 0],
        duration: {hours: 23, minutes: 59, seconds: 59},
        uid: holiday.uuid,
    })
})

const { error, value } = ics.createEvents(holidays)
  
  if (error) {
    console.log(error)
    return
  }

  fs.writeFile('holidays.ics', value, function(err){
    if (err) return console.log(err);
    console.log('Hello World > helloworld.txt');
  });




