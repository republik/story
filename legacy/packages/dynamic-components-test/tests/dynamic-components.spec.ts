import { expect, test } from '@playwright/test'

import usageData from '../../../dynamic-component-usage.json'

const pagesByComponent: Map<string, string[]> = new Map()

for (const entry of usageData) {
  const path = `/articles${entry.slug}`
  for (const src of entry.src) {
    const url = new URL(src)
    const key = url.pathname
    if (pagesByComponent.has(key)) {
      pagesByComponent.set(key, [
        ...new Set([...pagesByComponent.get(key)!, path]),
      ])
    } else {
      pagesByComponent.set(key, [path])
    }
  }
}

for (const [component, paths] of pagesByComponent.entries()) {
  const match = component.match(
    /\/dynamic-components\/([a-z0-9\-]+)\/([a-z0-9\-]+)\.js/,
  )
  const componentName = match
    ? match[2] === 'index'
      ? match[1]
      : `${match[1]}-${match[2]}`
    : component

  test.describe(componentName, () => {
    for (const path of paths) {
      test(`${componentName}:${path}`, async ({ page }) => {
        const errors: string[] = []

        page.on('pageerror', (err) => {
          errors.push(err.message)
        })

        page.on('console', (msg) => {
          if (msg.type() === 'error') {
            errors.push(msg.text())
          }
        })

        await page.goto(path)

        for (const component of await page
          .locator(`[data-dynamic-component=${componentName}]`)
          .all()) {
          await expect(component.locator('[data-state="error"]')).toBeHidden()
          await expect(component.locator('[data-state="loading"]')).toBeHidden()
        }

        expect(
          errors,
          `JS errors on ${path}:\n${errors.join('\n')}`,
        ).toHaveLength(0)
      })
    }
  })
}
