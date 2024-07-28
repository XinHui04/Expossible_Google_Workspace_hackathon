function fetchRSSFeed() {
  const rssUrl = 'http://feeds.bbci.co.uk/news/rss.xml'; // Replace with your desired RSS feed URL
  const response = UrlFetchApp.fetch(rssUrl);
  const xml = XmlService.parse(response.getContentText());
  const items = xml.getRootElement().getChild('channel').getChildren('item');
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1'); // Replace 'Sheet1' with your sheet name

  // Clear existing data
  sheet.clear();

  // Add headers
  sheet.appendRow(['Title', 'Description', 'URL', 'Published At']);
  
  // Add RSS feed data
//   items.forEach(item => {
//     const title = item.getChild('title').getText();
//     const description = item.getChild('description').getText();
//     const link = item.getChild('link').getText();
//     const pubDate = item.getChild('pubDate').getText();
//     sheet.appendRow([title, description, link, pubDate]);
//   });
// }

// Strip HTML tags
function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '');
}

// Add RSS feed data
items.forEach(item => {
  const title = item.getChild('title').getText();
  const descriptionHtml = item.getChild('description').getText();
  const description = stripHtml(descriptionHtml);
  const link = item.getChild('link').getText();
  const pubDateAbsence = item.getChild('pubDate');
  const pubDate = pubDateAbsence ? pubDateAbsence.getText() : 'No date recorded';
  sheet.appendRow([title, description, link, pubDate]);
  });
}


function createTimeDrivenTrigger() {
  ScriptApp.newTrigger('fetchRSSFeed')
    .timeBased()
    .everyMinutes(1) 
    .create();
}
