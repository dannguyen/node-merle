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


  ////////////////
  // canonicalUrl

  canonicalUrlFromLink(){
    // https://www.mattcutts.com/blog/canonical-link-tag/
    return this.$(`link[rel="canonical"]`).attr('href')
  }
  canonicalUrlFromOg(){
    // <meta property="og:url" content="http://www.imdb.com/title/tt0117500/" />
    return this.$(`meta[property="og:url"]`).attr('content')
  }


  ////////////////
  // description

  descriptionFromMetaTag(){
    return this.$(`meta[name="description"]`).attr('content')
  }
  descriptionFromOg(){
    return this.$(`meta[property="og:description"]`).attr('content')
  }

  descriptionFromTwitterCard(){
    return this.$(`meta[name="twitter:description"]`).attr('content')
  }


  ////////////////
  // icon

  iconFromLinkShortcut(){
    return this.$(`link[rel="shortcut icon"]`).attr('href')
  }

  ////////////////
  // imageUrl

  imageUrlFromOg(){
    return this.$(`meta[property="og:image"]`).attr('content')
  }

  imageUrlFromTwitterCard(){
    return this.$(`meta[name="twitter:image"]`).attr('content')
  }


  ////////////////
  // publishedAt

  publishedAtFromMetaArticleProperty(){
    return this.$(`meta[property="article:published"]`).attr('content');
  }

  publishedAtFromMicroData(){
    // https://schema.org/datePublished
    return this.$(`meta[itemprop="datePublished"]`).attr('content')
  }

  ////////////////
  // title

  titleFromTag(){
    return this.$('title').text();
  }
  titleFromOg(){
    // <meta property="og:title" content="The Rock" />
    return this.$(`meta[property="og:title"]`).attr('content')
  }
  titleFromTwitterCard(){
    return this.$(`meta[name="twitter:title"]`).attr('content')
  }
}




/*
Examples:

http://ogp.me/
http://stackoverflow.com/questions/6644684/do-you-have-to-include-link-rel-icon-href-favicon-ico-type-image-x-icon

ld+json https://developers.google.com/search/docs/guides/intro-structured-data
microdata https://www.w3.org/TR/microdata/
https://dev.twitter.com/cards/markup
*/
