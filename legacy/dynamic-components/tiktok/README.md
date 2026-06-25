## Setup New Component

Replace tiktok with your repo slug.

### Develop

```bash
cp test/.env.example test/.env
npm i
npm run dev
open http://localhost:3000/
```

### Deploy

```bash
npm run build
npm run deploy
```

### Clear CDN

Goto https://app.keycdn.com/zones/purgeurl/$id and enter:

```
/s3/republik-assets/dynamic-components/tiktok/index.js
```

If you change asset files be sure to purge those too.

### Get Video Stats

https://exolyt.com/api/videos/$VIDEOID

If it 404s, open profile first:
https://exolyt.com/user/$USERNAME/full
(make sure to be signed in with a free account)
