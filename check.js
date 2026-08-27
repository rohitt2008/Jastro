import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5173');
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  try {
    await page.waitForSelector('[data-element-id="hero-cta"]');
    await page.click('[data-element-id="hero-cta"]');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if property inspector is visible and what it shows
    const hasColorInput = await page.$('input[type="color"]');
    console.log('Button clicked. Has Color Input:', !!hasColorInput);

    const selectionText = await page.evaluate(() => {
      const el = document.querySelector('.bg-blue-100');
      return el ? el.textContent : 'No selection';
    });
    console.log('Selection Text:', selectionText);
  } catch (err) {
    console.error('Error clicking hero cta:', err.message);
  }

  await browser.close();
})();
