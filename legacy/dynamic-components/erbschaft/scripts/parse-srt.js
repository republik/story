var parseSRT = require('parse-srt')
var rw = require('rw')
var contents = rw.readFileSync('/dev/stdin', 'utf8');

console.log(
  JSON.stringify(
    parseSRT(contents).map(subtitle => ({text: subtitle.text, start: subtitle.start})),
    undefined,
    2
  )
)
