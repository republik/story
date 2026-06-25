## Schwabb

Schwangerschaftsabbrüche.

### Develop

```bash
cp test/.env.example test/.env
git submodule update --init --recursive --remote
npm i
npm run dev
open http://localhost:3000/
```

#### Update the Article

The Publikator document is integrated as a git submodule.

To update to the latest change in Publikator use:

```
git submodule update --recursive --remote
```

If you want to edit you can just `cd` into `article-schwabb`:

```bash
cd article-schwabb
git pull # ensure it's up to date
# edit article.md
git add article.md
git commit -m "new props"
git push
```

After updating or editing you should also commit the new submodule reference:

```
cd .. # back to root
git add article-schwabb
git commit -m "update article"
git push
```

### Deploy

```bash
npm run build
npm run deploy
```

### Clear CDN

Goto https://app.keycdn.com/zones/purgeurl/$id and enter:

```
/s3/republik-assets/dynamic-components/schwabb/index.js
```

If you change asset files be sure to purge those too.
