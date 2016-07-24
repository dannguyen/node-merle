jest.disableAutomock();
import WebpageExtractor from './../../../lib/extractors/WebpageExtractor';

const HtmlFixture = `
<!doctype html>
<html>
<head>
<link rel="shortcut icon" href="https://www.example.com/favicon.ico">
</head>
<body>
<div>

</div>
</body>
</html>
`


describe('Extracting of imageUrl', () => {
  let extractor = new WebpageExtractor(HtmlFixture);

  it('extracts favIconFromLink ', () => {
    expect(extractor.favIconFromLink()).toEqual('https://www.example.com/favicon.ico');
  });
})
