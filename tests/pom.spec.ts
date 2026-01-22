import { test, expect } from '@playwright/test';
import { LoginForm } from './pom.page';

test.describe('Пример с классами', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://uitestingplayground.com/sampleapp');
  });

  test('Корректные данные', async ({ page }) => {
    const loginForm = new LoginForm(page);
    const username = 'testuser';
    await loginForm.fill(username, 'pwd');
    await loginForm.submit();

    const status = await loginForm.getStatus();
    expect(status).toBe(`Welcome, ${username}!`);
  });
});
