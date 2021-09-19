var axios = require("axios").default;

const months = {
    '1':'JAN',
    '2':'FEB',
    '3':'MAR',
    '4':'APR',
    '5':'MAY',
    '6':'JUN',
    '7':'JUL',
    '8':'AUG',
    '9':'SEP',
    '10':'OCT',
    '11':'NOV',
    '12':'DEC',
}

function inProgress(){
    var options = {
        method: 'GET',
        url: 'https://api.sportsdata.io/v3/nba/scores/json/AreAnyGamesInProgress',
        headers: {
            'Ocp-Apim-Subscription-Key': process.env.OCP_NBA_KEY
        }
      };
      
      
      axios.request(options).then(function (response) {
          console.log(response.data)
      }).catch(function (error) {
          console.error(error);
      });
}


function GamesByDate(date=new Date()){

    if (typeof date === Date){
        const month = months[date.getMonth()];
        const day = date.getDay();
        const year = date.getFullYear();
        const ds = year + '-' + month + '-' + day;
    } else {
        ds = date;
    }

    /*
        * Date format is 
        * The date of the game(s). 
        * Examples: 2015-JUL-31, 2015-SEP-01.
    */
    var options = {
        method: 'GET',
        url: `https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/${ds}`,
        headers: {
            'Ocp-Apim-Subscription-Key': OCP_NBA_KEY
        }
      };
      
      
      axios.request(options).then(function (response) {
          console.log(response.data)
      }).catch(function (error) {
          console.error(error);
      });

}

GamesByDate('2021-OCT-03');


function TeamsActive(){
    var options = {
        method: 'GET',
        url: 'https://api.sportsdata.io/v3/nba/scores/json/AreAnyGamesInProgress',
        headers: {
            'Ocp-Apim-Subscription-Key': process.env.OCP_NBA_KEY
        }
      };
      
      
      axios.request(options).then(function (response) {
          console.log(response.data)
      }).catch(function (error) {
          console.error(error);
      });
}
//Find active players not working / updated yet prior to season start
//https://api.sportsdata.io/v3/nba/stats/json/Players/%7Bteam%7D?key=

/**
 *   MLB GAMES TODAY 
 *   https://api.sportsdata.io/v3/mlb/scores/json/GamesByDate/2021-SEP-18?key=
 *   
 *   returns [{games}]
 * 
 *    for each game object => game.DateTime (gametime) 
 *                         => AwayTeam (CLE)
 *                         => HomeTeam (NYY) 
 * 
 */
