import Handlebars from 'handlebars';
import moment from 'moment';
import phantom from 'phantom';
import unfluff from 'unfluff';
import urlparse from 'url-parse';
import xregx from 'xregexp';
import _ from 'lodash';



export const merleTemplate = Handlebars.compile(`
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

export function slugify(string){
  return _.kebabCase(_.deburr(string))
};

export function metaMerle(original_url){
  let m = {original_url: original_url};
  m.requested_at = moment().toISOString();
  m.slug = slugify(original_url.split('//')[1]);

  return m;
};





function printOut(siteurl, response){
  let merle = metaMerle(siteurl);
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

export {slugify, printOut};
