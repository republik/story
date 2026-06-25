# Pleadings dynamic component

## Accepted props

### TagMapping

A tag mapping can be used to create a specific heading (text and color) for a comment with a tag.
If the text contains "{user}" it will be replaced with the name of the person who wrote the comment.

The tag mapping should look like this:
```json
{
  "tagMapping": {
    "Dafür": {
      "text": "{user} für das Mediengesetz",
      "color": "#146B3A"
    },
    "Dagegen": {
      "text": "{user} gegen das Mediengesetz",
      "color": "#BB2528"
    },
    "default": {
      "text": "Plädoyer von {user}",
      "color": "#000000"
    }
  }
}
```

If a comments tag can't be matched the default mapping will be used.

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
/s3/republik-assets/dynamic-components/pleadings/index.js
```

If you change asset files be sure to purge those too.
