#!/usr/bin/env node
const packageJson = require('./package.json');
import _ from 'lodash';
import Handlebars from 'handlebars';
import moment from 'moment';
import program from 'commander';
import request from 'request';
import unfluff from 'unfluff';
import urlparse from 'url-parse';
import xregx from 'xregexp';

program.version(packageJson.version)
  .usage("merle <url>")
  .description("Hello merle")
  .parse(process.argv);

let original_url = program.args[0];
console.log(`Working with ${original_url}`);
request({jar: true, url: original_url}, (err, resp) => {
  if(err){
    console.log(err);
  }else{
    let obj = {original_url: original_url, response: resp};
    printOut(obj)
  }
})

function slugify(string){
  return _.kebabCase(_.deburr(string))
}


function printOut(obj){
  let original_url = obj.original_url;
  let meta = unfluff(obj.response.body);
  console.log(`
merle:
  requested_at: ${moment().toISOString()}
  url: ${original_url}
  slug: ${slugify(original_url)}

title: ${meta.title}
published_at: ${meta.date}
canonical_url: ${meta.canonicalLink}
image_url: ${meta.image}
favicon: ${meta.favicon}
authors: |
  ${meta.author}
description: |
  ${meta.description}
excerpt: |
  ${_.truncate(meta.text.replace(/\s+/, ' '), {length: 250}).trim()}
`);
}
