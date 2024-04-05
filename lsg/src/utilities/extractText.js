export async function getTextContent(page, selector) {
  const text = await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    return element ? element.textContent.trim() : null;
  }, selector);
  return text;
}

export const hasSpoilers = async (page) => {
  const hasSpoiler = await page.evaluate(
    () => document.querySelector(`div.review>div.contains-spoilers`) !== null
  );
  return hasSpoiler;
};
