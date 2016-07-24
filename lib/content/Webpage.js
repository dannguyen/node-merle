import './../extractors/WebPageExtractor'

export default class Webpage{
  constructor(content, originalUrl){
    this.content = content;
    this.originalUrl = originalUrl;
    let extractor = this.extractor = new WebpageExtractor(this.content, this.originalUrl);

    ['title', 'description'].forEach(att => {
      this[att] = extractor[`${att}`]();
    })

  }
}
