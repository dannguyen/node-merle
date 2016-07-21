import phantom from 'phantom';

export default function phantomScrape(siteurl){
  let sitepage = null,
      phant = null,
      destScreenshotPath = '/tmp/phantom-test.png',
      destHtmlPath = '/tmp/phantom-test.html';

      phantom.create(['--ignore-ssl-errors=yes'])
             .then(instance => phant = instance)
             .then(ph => ph.createPage())
             .then(page => {
                 sitepage = page;
                 return sitepage;
             })
             .then(() => sitepage.property('viewportSize', {width: 1200, height: 800}))
             .then(() => sitepage.open(siteurl))
             .then(status => {
                console.log(`Opened ${siteurl}; ${status}`);
                if(status === 'success'){
                  setTimeout(() => {
                    sitepage.invokeMethod('render', destScreenshotPath)
                    .then(() => {
                               console.log(`Wrote to ${destScreenshotPath}`);
                               console.log("Exiting...")
                               sitepage.close();
                               phant.exit();
                               return {content: destHtmlPath, screenshotPath: destScreenshotPath}
                             });
                  }, 3000);
                }
             })
             .catch(error => {
              console.log(error);
              phant.exit();
            })



}



//https://gist.github.com/cjoudrey/1341747
