import { expect, test } from '@playwright/test'

import usageData from '../../../dynamic-component-usage.json'

const slugs = usageData.map((entry) => `/articles${entry.slug}`)

for (const slug of slugs) {
  test(slug, async ({ page }) => {
    const errors: string[] = []

    page.on('pageerror', (err) => {
      errors.push(err.message)
    })

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })

    const response = await page.goto(slug)

    expect(response?.status(), `HTTP error for ${slug}`).toBeLessThan(400)
    await page.waitForLoadState('networkidle')

    expect(errors, `JS errors on ${slug}:\n${errors.join('\n')}`).toHaveLength(
      0,
    )
  })
}
