# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dynamic-components.spec.ts >> /2025/12/13/nicht-verrenken-buecher-schenken
- Location: tests/dynamic-components.spec.ts:9:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3010/2025/12/13/nicht-verrenken-buecher-schenken
Call log:
  - navigating to "http://localhost:3010/2025/12/13/nicht-verrenken-buecher-schenken", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | import { readFileSync } from 'node:fs'
  3  | import { resolve } from 'node:path'
  4  | 
  5  | import usageData from '../../../dynamic-component-usage.json'
  6  | const slugs = usageData.map((entry) => entry.slug)
  7  | 
  8  | for (const slug of slugs) {
  9  |   test(slug, async ({ page }) => {
  10 |     const errors: string[] = []
  11 | 
  12 |     page.on('pageerror', (err) => {
  13 |       errors.push(err.message)
  14 |     })
  15 | 
  16 |     page.on('console', (msg) => {
  17 |       if (msg.type() === 'error') {
  18 |         errors.push(msg.text())
  19 |       }
  20 |     })
  21 | 
> 22 |     const response = await page.goto(slug)
     |                                 ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3010/2025/12/13/nicht-verrenken-buecher-schenken
  23 | 
  24 |     expect(response?.status(), `HTTP error for ${slug}`).toBeLessThan(400)
  25 |     await page.waitForLoadState('networkidle')
  26 | 
  27 |     expect(errors, `JS errors on ${slug}:\n${errors.join('\n')}`).toHaveLength(
  28 |       0,
  29 |     )
  30 |   })
  31 | }
  32 | 
```