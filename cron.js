const express = require('express');
const app = express();
const CronJob = require('cron').CronJob;
const CODABaseball = require('./baseball');

const job = new CronJob({
  cronTime: '00 00 00 * * *',
  onTick: function() {
      CODABaseball.gamesInProgress()
  },
  start: false,
  timeZone: 'America/New_York'
});
job.start();

//this does nothing except tell now we're alive 
const port = process.env.PORT || 2345;
app.listen(port, function () {
  console.log('app listening on port: ', port);
});