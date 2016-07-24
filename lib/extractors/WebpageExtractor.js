import cheerio from 'cheerio';

const defaultCheerioParams = {
  withDomLvl1: true,
  normalizeWhitespace: true,
  decodeEntities: true,
  xmlMode: false
}


export default class WebpageExtractor{
  constructor(content, originalUrl){
    this.content = content;
    this.originalUrl = originalUrl;
    this.$ = cheerio.load(this.content, defaultCheerioParams);
  }

  titleFromTag(){
    return this.$('title').text();
  }

  descriptionFromMetaTag(){
    return this.$(`meta[name="description"]`).attr('content');
  }

  canonicalUrlFromLink(){
    // https://www.mattcutts.com/blog/canonical-link-tag/
    return this.$(`link[rel="canonical"]`).attr('href')
  }

  favIconFromLink(){
    return this.$(`link[rel="shortcut icon"]`).attr('href')
  }

}
