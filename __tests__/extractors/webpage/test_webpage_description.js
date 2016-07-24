jest.disableAutomock();
import WebpageExtractor from './../../../lib/extractors/WebpageExtractor';

const HtmlFixture = `
<!doctype html>
<html>
<head>
    <meta name="description" content="This is meta description">
</head>
<body>
<div>
  <p>Just a graf.</p>
</div>
</body>
</html>
`




describe('Extracting of description', () => {
  let extractor = new WebpageExtractor(HtmlFixture);

  it('extracts descriptionFromMetaTag ', () => {
    expect(extractor.descriptionFromMetaTag()).toEqual('This is meta description');
  });
})
