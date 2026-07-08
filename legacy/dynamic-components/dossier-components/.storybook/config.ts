import { configure } from '@storybook/react';
const req = require.context('../src', true, /\.story\.(tsx|js)$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
