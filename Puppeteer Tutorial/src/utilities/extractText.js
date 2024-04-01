export default async function getTextContent(page, selector) {
  const text = await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    return element ? element.textContent.trim() : null;
  }, selector);
  return text;
  //   const element = await page.$(selector);
}
