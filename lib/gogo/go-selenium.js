#!/usr/bin/env node
import program from 'commander';
import webdriver from 'selenium-webdriver';
import fs from 'fs';

const By = webdriver.By,
      until = webdriver.until;

program.usage("s <url>")
  .description("Hello sel")
  .parse(process.argv);

let url = program.args[0];

let driver = new webdriver.Builder().forBrowser('chrome').build();

let destHtmlPath = '/tmp/selpage.html',
    destScreenshotPath = '/tmp/selpage.png';

console.log(`Hi ${url}`);
driver.get(url)
      .then(() => console.log(`...sleeping`));

driver.sleep(3000)
      .then(() => console.log(`...awaking`));

driver.getPageSource()
      .then(src => fs.writeFileSync(destHtmlPath, src));

driver.takeScreenshot()
      .then(png => fs.writeFile(destScreenshotPath, new Buffer(png, 'base64')))

driver.quit();
