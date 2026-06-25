import { configure } from '@storybook/react';
import 'glamor/reset';
const req = require.context('../src', true, /\.story\.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
