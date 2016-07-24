jest.disableAutomock();
import WebpageExtractor from './../../../lib/extractors/WebpageExtractor';

const HtmlFixture = `
<!doctype html>
<html>
<head>
    <title>Example Domain - Example.com</title>
</head>
<body>
<div>
    <h1>Example Domain Has A Headline</h1>
</div>
</body>
</html>
`


describe('Extraction of title', () => {
  let extractor = new WebpageExtractor(HtmlFixture);

  it('extracts titleFromTag', () => {
    expect(extractor.titleFromTag()).toEqual('Example Domain - Example.com');
  });

  xit('extracts titleFromOg', () => {
    expect(extractor.titleFromOg()).toEqual('Open Graph Example')
  });

  xit('extracts titleFromTwitterCard', () => {
    expect(extractor.titleFromOg()).toEqual('Open Graph Example')
  });

  xit('extracts titleFromHeadline', () => {
    expect(extractor.titleFromHeadline()).toEqual('Example Domain Has a Headline')
  });


})
