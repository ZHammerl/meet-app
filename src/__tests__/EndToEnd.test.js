import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
  let browser, page;
  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer
      .launch
      //     {
      //   headless: false,
      //   slowMo: 250, //slow down by 250ms
      //   ignoreDefaultArgs: ['--disable extensions'], // ignores default setting that causes timeout errors
      // }
      ();
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });
  test('an event element is collapsed by default', async () => {
    const eventDetails = await page.$(
      '.event .details-container'
    );
    expect(eventDetails).toBeNull();
  });

  test('User can expand event to see its details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$(
      '.event .details-container'
    );
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide its details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$(
      '.event .details-container'
    );
    expect(eventDetails).toBeNull();
  });
});

describe('filter events by city', () => {
  let browser, page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250, //slow down by 250ms
      ignoreDefaultArgs: ['--disable extensions'], // ignores default setting that causes timeout errors
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });

  test('When user has not searched for a city, show upcoming events from all cities.', async () => {
    const countEvents = await page.$$eval(
      '.event',
      (events) => events.length
    );
    expect(countEvents).toBe(3);
  });

  test('User should see a list of suggestions when they search for a city', async () => {
    await page.type('.city', 'Berlin');
    const suggestions = await page.$$eval(
      '.suggestions li',
      (suggestion) => suggestion.length
    );
    expect(suggestions).toBe(2);
  });

  test('User can select a city from the suggested list', async () => {
    await page.reload();
    await page.type('.city', 'Berlin');
    await page.click('.suggestions li');
    const countEvents = await page.$$eval(
      '.event',
      (events) => events.length
    );

    expect(countEvents).toBe(1);
  });
});
