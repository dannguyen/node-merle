#!/usr/bin/env node
const packageJson = require('./package.json');
import _ from 'lodash';
import program from 'commander';
import request from 'request';
import requestUrl from './lib/requestUrl';
import unfluff from 'unfluff';
import ArticleParser from './lib/parsers/Parser';



program
  .version(packageJson.version);

program
  .command('content <url>')
  .description('Get the body of the URL as rendered by PhantomJS')
  .action(siteUrl => {
    requestUrl(siteUrl).then(me => {
      console.log(me.content)
    });
  });

program
  .command('head <url>')
  .description('Get the headers (as JSON) as received by PhantomJS')
  .action(siteUrl => {
    requestUrl(siteUrl).then(me => {
      console.log(me.response)
    });
  });



program
  .command('tab <url>')
  .description('Get the metadata for a URL in tab-delimited format')
  .action(siteUrl => {
    requestUrl(siteUrl).then(me => {
      let page = ArticleParser(me.content, siteUrl);
      console.log([page.title(), siteUrl].join("\t"))
    });
  });


program
  .command('text <url>')
  .description('Get the body text of a URL')
  .action(siteUrl => {
    requestUrl(siteUrl).then(me => {
      let page = ArticleParser(me.content, siteUrl);
      console.log(page.text)
    });
  });




  program
    .command('test <url>')
    .description('Get the test  URL')
    .action(siteUrl => {
      requestUrl(siteUrl).then(me => {
        let page = new ArticleParser(me.content, siteUrl);
        console.log(`
title:
  ${page.title}
description:
  ${page.description}
`)
      });
    });



program.parse(process.argv);
