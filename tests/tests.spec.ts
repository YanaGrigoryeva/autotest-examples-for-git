//ui-testing
import { test, expect } from '@playwright/test';

test('Обычный клик', async ({ page }) => {
  await page.goto('http://uitestingplayground.com/click');
  await page.getByRole('button', { name: 'Button That Ignores DOM Click Event' }).click();
});

test('Проверка инпута и кнопки с разными методами и локаторами', async ({ page }) => {
  await page.goto('http://uitestingplayground.com/textinput');
  const button = page.getByRole('button');
  const textbox = page.getByPlaceholder('MyButton');
  await textbox.fill('die Schaltfläche');
  await button.click();
  await expect(button).toHaveAccessibleName('die Schaltfläche');
  await textbox.click({ clickCount: 3 });
  await textbox.press('Backspace');
  await textbox.type('Кнопка');
  await button.click();
  await expect(button).toHaveAccessibleName('Кнопка');
});

test.describe('Тест на видимость', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://uitestingplayground.com/visibility');
  });
  test('Проверка видимости после нажатия кнопки', async ({ page }) => {
    const hideButton = page.locator('#hideButton');
    const transparentButton = page.locator('#transparentButton');
    const removedButton = page.locator('#removedButton');
    const invisibleButton = page.locator('#invisibleButton');
    const zeroWidthButton = page.locator('#zeroWidthButton');
    const notdisplayedButton = page.locator('#notdisplayedButton');
    const overlappedButton = page.locator('#overlappedButton');
    const offscreenButton = page.locator('#offscreenButton');
    const hidingLayer = page.locator('#hidingLayer');

    await test.step('По умолчанию', async () => {
      await expect(hideButton).toBeVisible();
      await expect(transparentButton).toBeVisible();
      await expect(removedButton).toBeVisible();
      await expect(invisibleButton).toBeVisible();
      await expect(zeroWidthButton).toBeVisible();
      await expect(notdisplayedButton).toBeVisible();
      await expect(overlappedButton).toBeVisible();
      await expect(offscreenButton).toBeVisible();
      await expect(hidingLayer).toBeHidden();
    });
    await test.step('Нажатие кнопки Hide', async () => {
      await hideButton.click();
    });
    await test.step('Hide осталась видимой', async () => {
      await expect(hideButton).toBeVisible();
    });
    await test.step('Прозрачная кнопка', async () => {
      await expect(transparentButton).toHaveCSS('opacity', '0');
    });
    await test.step('Кнопка со скрытым слоем', async () => {
      await expect(overlappedButton).toBeVisible();
      await expect(hidingLayer).toBeVisible();
    });
    await test.step('Кнопка за пределами экрана', async () => {
      await expect(offscreenButton).toBeVisible();
      await expect(offscreenButton).not.toBeInViewport();
    });
    await test.step('Остальные кнопки скрыты', async () => {
      await expect(removedButton).toBeHidden();
      await expect(invisibleButton).toBeHidden();
      await expect(zeroWidthButton).toBeHidden();
      await expect(notdisplayedButton).toBeHidden();
    });
  });
});

test.describe('Проверка прокрутки', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://uitestingplayground.com/scrollbars');
  });
  test('Прокрутка и клик', async ({ page }) => {
    const hidingButton = page.locator('#hidingButton');
    await hidingButton.scrollIntoViewIfNeeded();
    await hidingButton.click();
  });
});
