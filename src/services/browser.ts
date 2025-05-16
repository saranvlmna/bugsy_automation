import { firefox } from "playwright";

export default async (url: string) => {
  try {
    const browser = await firefox.launch();
    const context = await browser.newContext();

    const page = await context.newPage();
    await page.goto(url);

    const imageBuffer = await page.screenshot();
    await browser.close();

    return imageBuffer;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
