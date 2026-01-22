import { Page, Locator } from '@playwright/test';
export class LoginForm {
  constructor(private page: Page) {}

  async fill(username: string, password: string) {
    await this.page.locator('input[name="UserName"]').fill(username);
    await this.page.locator('input[name="Password"]').fill(password);
  }
  async submit() {
    await this.page.click('#login');
  }
  async getStatus() {
    return await this.page.textContent('#loginstatus');
  }
}
