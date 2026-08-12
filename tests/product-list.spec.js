import { test, expect } from '@playwright/test';

test.describe('ProductList regression tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.route('http://localhost:8081/api/products', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify([
                    {
                        id: 1,
                        name: 'Laptop',
                        description: 'Gaming laptop',
                        price: 1299,
                        category: 'Electronics',
                        quantity: 3,
                    },
                    {
                        id: 2,
                        name: 'Notebook',
                        description: 'Spiral notebook',
                        price: 6,
                        category: 'Office',
                        quantity: 12,
                    },
                    {
                        id: 3,
                        name: 'Coffee Beans',
                        description: 'Roasted coffee beans',
                        price: 18,
                        category: 'Groceries',
                        quantity: 5,
                    },
                ]),
            });
        });

        await page.goto('/products');
    });

    test('renders the loaded product list and filters by text search', async ({ page }) => {
        await expect(page.getByRole('heading', { name: /Local Products \(3\)/i })).toBeVisible();
        await expect(page.getByText('Laptop')).toBeVisible();
        await expect(page.getByText('Notebook')).toBeVisible();

        await page.getByLabel('Search by Name').fill('laptop');

        await expect(page.getByRole('heading', { name: /Local Products \(1\)/i })).toBeVisible();
        await expect(page.getByText('Laptop')).toBeVisible();
        await expect(page.getByText('Notebook')).not.toBeVisible();
    });

    test('filters by category and shows empty state when no products match', async ({ page }) => {
        await page.getByLabel('Filter by Category').selectOption('Electronics');

        await expect(page.getByRole('heading', { name: /Local Products \(1\)/i })).toBeVisible();
        await expect(page.getByText('Laptop')).toBeVisible();
        await expect(page.getByText('Notebook')).not.toBeVisible();

        await page.getByLabel('Search by Name').fill('no match');

        await expect(page.getByText('No products found from the local API.')).toBeVisible();
    });
});
