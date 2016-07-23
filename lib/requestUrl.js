import phantom from 'phantom';

/*
let req = require('./lib/requestUrl');
let o = null;
req.default('http://example.com').then(p => o = p)
*/

export default function requestUrl(siteurl){
  let collectedResources = [],
      sitepage = null;
  return phantom.create(['--ignore-ssl-errors=yes'])
    .then(ph => ph.createPage())
    .then(page => {
      sitepage = page;
      sitepage.on('onResourceReceived', response => {
        if (response.stage !== "end"){ return }
        console.log('> ' + response.id + ' - ' + response.url);
        collectedResources.push(response);
      });
      return sitepage;
    }).then(() => {
      console.log(`Requesting ${siteurl}`)
      return sitepage.open(siteurl);
    }).then(status => {
        if (status !== "success"){
          throw `HTTP Request error: ${status}`
        }
    }).then(() => sitepage.property('content'))
    .then(content => {
//        sitepage.close(); // TODO: return sitepage to allow screenshotting
        return {content: content, response: collectedResources[0]};
    });
};
