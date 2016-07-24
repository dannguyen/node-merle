import phantom from 'phantom';

/*
let req = require('./lib/requestUrl');
let o = null;
req.default('http://example.com').then(p => o = p)
*/

export default function requestUrl(siteurl){
  let collectedResources = [],
      phantomInstance = null,
      sitepage = null;
  return phantom.create(['--ignore-ssl-errors=yes'])
    .then(ph => {
      phantomInstance = ph;
      return ph.createPage();
    })
    .then(page => {
      sitepage = page;
      sitepage.setting('userAgent', "Merle Request");
      sitepage.on('onResourceReceived', response => {
        // easiest way to collect the response object for the initial request of siteurl
        // http://stackoverflow.com/questions/30221204/how-can-i-see-the-http-status-code-from-the-request-made-by-page-open
        if (response.stage !== "end"){ return }
        collectedResources.push(response);
      });
      return sitepage;
    })
    .then(() => {
      return sitepage.open(siteurl);
    })
    .then(status => {
        if (status !== "success"){
          throw `HTTP Request error: ${status}`
        }
    })
    .then(() => sitepage.property('content'))
    .then(content => {
        sitepage.close(); // TODO: return sitepage to allow screenshotting
        phantomInstance.exit();
        return {content: content, response: collectedResources[0]};
    });
};
