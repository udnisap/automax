const Promise = require('bluebird');
const fs = require('fs');
const _ = require('lodash');
const readPage = browser => browser
  .getHTML('#objBody_content_0_pagecontent_0_UpdatePanel1 ul li')
  .then(values => {
    const bullseye = values.filter(v => v.indexOf('bullseye') > 0)[0].replace(/<[^>]*>/g, "");
    const numbers = values.map(v => v.replace(/<[^>]*>/g, ""));
    console.log('numbers', [bullseye, ...numbers])
  })

const getAllDraws = browser => browser
  .getValue('#objBody_content_0_pagecontent_0_ddlDraws option')


module.exports = function ({vorpal, driver: {current}}){

  vorpal
    .command('hotspot <date> [start]', 'hotspot winning numbers for the draw in the given date')
    .action(async function ({date, start}){
      await current
        // .url("http://www.calottery.com/play/draw-games/hot-spot/draw-results")
        .waitForVisible('//*[@id="objBody_content_0_pagecontent_0_ddlDates"]', 2000)
        .selectByValue('//*[@id="objBody_content_0_pagecontent_0_ddlDates"]', date)
        .pause(2000)
        .waitForVisible('//*[@id="objBody_content_0_pagecontent_0_ddlDraws"]', 2000)

      let allDraws = await getAllDraws(current);
			start = start || allDraws[1];
      allDraws = _(allDraws)
        .tail()
        .dropWhile(i => i > start)
        .value();

      const results = await Promise.mapSeries(allDraws, draw => current
        .selectByValue('//*[@id="objBody_content_0_pagecontent_0_ddlDraws"]', draw)
        .pause(2000)
        .getHTML('#objBody_content_0_pagecontent_0_UpdatePanel1 ul li')
        .then(values => {
          const bullseye = values.filter(v => v.indexOf('bullseye') > 0)[0].replace(/<[^>]*>/g, "");
          const numbers = values.map(v => v.replace(/<[^>]*>/g, ""));
          const data = [draw, bullseye, ...numbers];
          fs.appendFile('lottery.csv', `${date}, ${data.join(', ')}\n`);
          return data;
        })
      )

      results.forEach( i => console.log(i.join(', ')))
      // const data = results.map(r => r.join(', ') + '\n')
      // fs.appendFile('lottery.csv', data);
      return results;

    });
}
