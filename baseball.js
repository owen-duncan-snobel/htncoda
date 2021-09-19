var axios = require("axios").default;
require('dotenv').config();
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

function gamesInProgress(){
    var options = {
        method: 'GET',
        url: 'https://api.sportsdata.io/v3/mlb/scores/json/AreAnyGamesInProgress',
        headers: {
            'Ocp-Apim-Subscription-Key': process.env.OCP_KEY_MLB
        }
      };
      
      axios.request(options).then(function (response) {
          return response.data;
      }).then((res) => {
          if (res){
              const data = GamesByDate();
              return data;
          }
          return res;
      })
      .catch(function (error) {
          console.error(error);
      });
}

function todaysDate(){
    const date = new Date();
    const year = date.getFullYear().toString();
    const monthNum = (date.getMonth() + 1).toString();
    const day = (date.getDate()).toString();
    const month = months[monthNum];

    const datestr = year + '-' + month + '-' + day;
    return datestr;
}
function GamesByDate(){

    const datestr = Date();
    /*
        * Date format is 
        * The date of the game(s). 
        * Examples: 2015-JUL-31, 2015-SEP-01.
    */
    var options = {
        method: 'GET',
        url: `https://api.sportsdata.io/v3/mlb/scores/json/GamesByDate/${datestr}`,
        headers: {
            'Ocp-Apim-Subscription-Key': process.env.OCP_KEY_MLB
        }
      };
      
      
    axios.request(options).then(function (response) {
          //console.log(response.data);
          return response.data;
      }).then((res) => {
            //console.log(res)
            const games = res;
            const rows = [];

                games.map((game) => {
                    const cells = [];
                    let hometeam = {'column': 'c-kXNUNeQRK-', 'value': game.HomeTeam};
                    let awayteam = {'column': 'c-DXf1FL4u4N', 'value': game.AwayTeam};
                    let time = {'column': 'c-3XjDrgPtuA', 'value': game.DateTime};
                    cells.push(hometeam,awayteam,time);
                    let cellObj = {
                        "cells": cells
                    }
                    rows.push(cellObj);
                })


           
            const config = {
                headers: { 
                    Authorization: `Bearer ${process.env.BEARER}`,
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Connection': 'keep-alive'

                }
            };
            
            const bodyParameters = {
                "rows": rows
            };
            
            axios.post( 
              'https://coda.io/apis/v1/docs/A6usZ9fqD5/tables/grid-egwZ5Zr3MO/rows?disableParsing=true',
              bodyParameters,
              config     
            ).then(console.log).catch(console.log);

      })
      
      .catch(function (error) {
          console.error(error);
      });
}

//gamesInProgress();


function BaseballNews(){


    var options = {
        method: 'GET',
        url: `https://api.sportsdata.io/v3/mlb/scores/json/News`,
        headers: {
            'Ocp-Apim-Subscription-Key': process.env.OCP_KEY_MLB
        }
      };
      
      
    axios.request(options).then(function (response) {
          //console.log(response.data);
          return response.data;
      }).then((res) => {
            //console.log(res)
            const newsArticles = res;
            const rows = [];

                newsArticles.map((article) => {
                    const cells = [];
                    let title = {"column": "c-topEGqFVlj", "value": article.Title};
                    let source = {"column": "c-YFvKb-N_GX", "value": article.Source};
                    let content = {"column": "c-u9TA5rle6S", "value": article.Content};
                    let link = {"column": "c-x3UYQ-IRBh", "value": article.Url};
                    let updated = {"column": "c-CjWT-9YxLz", "value": article.Updated}
                    cells.push(title,source,content,link,updated);
                    let cellObj = {
                        "cells": cells
                    }
                    rows.push(cellObj);
                })


           
            const config = {
                headers: { 
                    Authorization: `Bearer ${process.env.BEARER}`,
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Connection': 'keep-alive'

                }
            };
            
            const bodyParameters = {
                "rows": rows
            };
            
            axios.post( 
              'https://coda.io/apis/v1/docs/A6usZ9fqD5/tables/grid-DSbcvFX4SP/rows?disableParsing=true',
              bodyParameters,
              config     
            ).then(console.log).catch(console.log);

      })
      
      .catch(function (error) {
          console.error(error);
      });
}

BaseballNews();