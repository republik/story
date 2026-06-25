### Develop

```bash
npm run dev:code
# run in seperate tab/window
npm run dev:server
open http://localhost:3000/
```

See [observablehq notebook](https://observablehq.com/d/af9e3c14c5e92e2e) for data processing steps.

### Deploy

```bash
npm run build
npm run deploy
```

### Clear CDN

Goto https://app.keycdn.com/zones/purgeurl/87880 and enter:

```
/s3/republik-assets/dynamic-components/ches/index.js
```

If you change asset files be sure to purge those too.
