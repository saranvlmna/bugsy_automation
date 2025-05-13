import { firefox } from "playwright";

export default async (url: string) => {
  try {
    const browser = await firefox.launch();
    const context = await browser.newContext();

    const page = await context.newPage();
    await page.goto(url);

    const html = await page.content();
    await browser.close();

    return html;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
