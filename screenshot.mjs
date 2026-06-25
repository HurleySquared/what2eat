import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1200, height: 800 });

// Home page
await page.goto('http://localhost:5173');
await page.waitForTimeout(1000);
await page.screenshot({ path: '/private/tmp/claude-501/-Users-erichurley-Activities-what2eat/3aed9d33-bff7-4e0c-a587-e6da3aad63c9/scratchpad/home.png' });

// Click Let's Eat
await page.click('button:has-text("Let\'s Eat")');
await page.waitForTimeout(500);
await page.screenshot({ path: '/private/tmp/claude-501/-Users-erichurley-Activities-what2eat/3aed9d33-bff7-4e0c-a587-e6da3aad63c9/scratchpad/picking.png' });

// Profile page
await page.goto('http://localhost:5173/profile');
await page.waitForTimeout(500);
await page.screenshot({ path: '/private/tmp/claude-501/-Users-erichurley-Activities-what2eat/3aed9d33-bff7-4e0c-a587-e6da3aad63c9/scratchpad/profile.png' });

await browser.close();
