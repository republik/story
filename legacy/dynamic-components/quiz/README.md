# Quiz

## Getting started

`npm install && npm run storybook`

## Setting up a new quiz

 1. Copy the Google Sheet of one of the past quizzes (see below)
 1. Modify the sheet while preserving its structure (only columns C through G have to be non-empty)
 1. Select "Publish on the Web" from the File menu
 1. Run the export script with the published sheet's ID (see below)
 1. Add `results` and `trackingId` keys to config (optional)
 1. Add component to article with config as prop

## Past quizzes

### Kriminalitäts-Quiz

Article: [Der «Messer­migrant» namens Michael](https://publikator.republik.ch/repo/republik/article-der-messerstecher-heisst-michael/tree)

[Google Sheet](https://docs.google.com/spreadsheets/d/1MSnfJHXhVMEF7SmnZUkfAEYI5S7zftfjiceIBaZxKiw/edit#gid=0)

Export script:

`node scripts/fetchData.js 2PACX-1vQB2elr716t05ENQAh08vOmjzyIrTz_IS0dtZKAV8v-U3KR6d-plA2WLxNfjNLrtYRUTyO8wCFeZCn_ quizzes/kriminalitaet.json`

### WEF-Quiz

Article: [Das grosse WEF-Quiz](https://publikator.republik.ch/repo/republik/article-wer-wird-milliardaer/tree)

[Google Sheet](https://docs.google.com/spreadsheets/d/1fAaMX5HyLfk0PD5IE2YUL_z-N-UCR160KcqmdSQLpoA/edit#gid=0)

Export script:

`node scripts/fetchData.js 2PACX-1vQXpwlK39zb_rDwXd-t8Xvi3UAoV3dcygqNiFRdTCXZtAsHBbPE5ksY8OqMjS8759mjEYBi0lXDORYs quizzes/wef.json`
