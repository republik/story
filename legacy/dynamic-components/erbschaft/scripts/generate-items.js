console.log(JSON.stringify(
  [
    'goldvreneli',
    'haus',
    'radio',
    'ring'
  ].map(name => ({
    name,
    title: "",
    src: `https://cdn.republik.space/s3/republik-assets/dynamic-components/erbschaft/images/${name}.jpg`,
    audioSrc: {mp3: `https://cdn.republik.space/s3/republik-assets/dynamic-components/erbschaft/audio/${name}.mp3`}
  }))
  .concat(
    [
      'barometer',
      'bauernhof',
      'holzruhe',
      'kerze',
      'listerin',
      'porzellan',
      'schal'
    ].map(name => ({
      name,
      title: "",
      src: `https://place-hold.it/300x300?text=${name}`,
      audioSrc: {mp3: `https://cdn.republik.space/s3/republik-assets/dynamic-components/erbschaft/audio/${name}.mp3`}
    }))
  )
, undefined, 2))
