### Develop

```bash
cp test/.env.example test/.env
npm i
npm run dev
open http://localhost:3000/
```

This assumes you have an «Articles» dir two levels above, e.g. `~/Code/szenarien` and `~/Articles/article-szenarien`.

### Deploy

```bash
npm run build
npm run deploy
```

### Clear CDN

Goto https://app.keycdn.com/zones/purgeurl/87880 and https://app.keycdn.com/zones/purgeurl/136385 and enter:

```
/s3/republik-assets/dynamic-components/szenarien/index.js
```

If you change asset files be sure to purge those too.
