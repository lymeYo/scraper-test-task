import puppeteer from "puppeteer-extra";
import StealthPlugin  from "puppeteer-extra-plugin-stealth";
import randomUseragent  from 'random-useragent'

puppeteer.use(StealthPlugin())

export const LAUNCH_PUPPETEER_OPTS = {
  headless: false,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--disable-gpu',
    '--window-size=1920x1080'
  ]
};

export const PAGE_PUPPETEER_OPTS = {
  networkIdle2Timeout: 5000,
  waitUntil: 'networkidle2',
  timeout: 3000000
};

export const getPageContent = async (url: string): Promise<string> => {
  try {
    const browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPTS)
    const page = await browser.newPage()
    await page.setUserAgent(randomUseragent.getRandom())
    await page.goto(url, {waitUntil: 'networkidle2'})
    
    const content = await page.content()
    browser.close()

    return content 
  } catch(err) {
    throw err
  }
}