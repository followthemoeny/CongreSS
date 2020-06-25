const puppeteer = require('puppeteer');
import renderer from 'react-test-renderer';

const APP = `http://localhost:3000/`;
jest.setTimeout(10000);
describe('do we get to the candidates page?', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: false,
    });
    page = await browser.newPage();
  });

  afterAll(() => {
    browser.close();
  });

  describe('Splash Page', () => {
    it('loads successfully', async () => {
      // We navigate to the page at the beginning of each case so we have a
      // fresh start
      await page.goto('http://localhost:3000');
      await page.waitForSelector('head');
      let title = await page.$eval('head > title', (el) => el.innerHTML);
      expect(title).toBe('SHOW ME THE MONEY');
      title = await page.$eval('span', (el) => el.innerHTML);
      expect(title).toBe('Congre$$');
    });

    it('Can get to officials', async () => {
      await page.goto('http://localhost:3000');
      await page.waitForSelector('input');
      await page.focus('input');
      await page.keyboard.type('411 Woodland Heights 28734');
      await page.$eval('button', (el) => el.click());
      await page.waitForSelector('h2');
      let successfulSearch = await page.$eval('h2', (el) => el.innerHTML);
      expect(successfulSearch).toBe('Your Elected Officials');
    });
  });
});
