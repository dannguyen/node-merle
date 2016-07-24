jest.disableAutomock();
import WebpageExtractor from './../../../lib/extractors/WebpageExtractor';

const HtmlFixture = `
<!doctype html>
<html>
<head>
</head>
<body>
<div>

</div>
</body>
</html>
`


describe('Extracting of imageUrl', () => {
  let extractor = new WebpageExtractor(HtmlFixture);
  xit('extracts imageUrlFromOg', () => {

  });
});
