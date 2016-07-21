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



const merleTemplate = Handlebars.compile(`
merle:
  requested_at: {{merle.requested_at}}
  url: {{merle.original_url}}
  slug: {{merle.slug}}

title: {{title}}
published_at: {{published_at}}
image_url: {{image_url}}
authors: {{authors}}
description: |
  {{description}}
favicon: {{favicon}}
canonical_url: {{canonical_url}}
word_count: {{word_count}}
excerpt: |
  {{excerpt}}
`)


function slugify(string){
  return _.kebabCase(_.deburr(string))
}


function metaMerle(original_url){
  let m = {original_url: original_url};
  m.requested_at = moment().toISOString();
  m.slug = slugify(original_url.split('//')[1]);

  return m;
}

function printOut(merle, response){
  let webpage = unfluff(response.body);
  let obj = {merle: merle};
  obj.title = new Handlebars.SafeString(JSON.stringify(webpage.title));
  obj.description = new Handlebars.SafeString(webpage.description);
  obj.published_at = new Handlebars.SafeString(JSON.stringify(webpage.date));
  obj.canonical_url = webpage.canonicalLink;
  obj.image_url = webpage.image;
  obj.authors = JSON.stringify(webpage.author);
  obj.excerpt = new Handlebars.SafeString(_.truncate(webpage.text.replace(/\s+/, ' '), {length: 250}).trim()),
  obj.favicon = webpage.favicon;
  obj.word_count = 0;

  let output = merleTemplate(obj);
  console.log(output);
}


program.version(packageJson.version)
  .usage("merle <url>")
  .description("Hello merle")
  .parse(process.argv);

let original_url = program.args[0];
console.log(`Working with ${original_url}`);
request({jar: true, url: original_url}, (err, response) => {
  if(err){
    console.log(err);
  }else{
    printOut(metaMerle(original_url), response)
  }
})
