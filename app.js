const http = require('http');
const os = require('os');
const puppeteer = require('puppeteer');

(async () => {
})();

const port = process.env.PORT || 8080;
http.createServer(async function (req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname === '/screenshot') {
    res.writeHead(200, { 'Content-Type': 'image/png' })
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.goto(url.searchParams.get('url') || 'https://www.microsoft.com/ja-jp/', {waitUntil: 'networkidle2'}) ;
    res.end(await page.screenshot())
    await browser.close();
    return
  }

  res.writeHead(200, { 'Content-Type': 'text/plain' })
  const host = os.hostname();
  res.end(`I'm ${host}`);

}).listen(port).on("listening", () => { console.log(`listening on http://localhost:${port}`) });