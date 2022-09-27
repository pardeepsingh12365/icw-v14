const Discord = require('discord.js')
const config = require("../config.js")
exports.radios = {
  "stations": [
  {
    name: 'mirchi',
    aliases: 'mirchifm',
    lang: 'hindi',
    id: 'radiomirchiindia',
    title: 'Radio Mirchi',
    url: `http://peridot.streamguys.com:7150/Mirchi`,
    thumbnail: 'https://media.discordapp.net/attachments/1023883157432447007/1023883189716013076/images_5.png',
    duration: { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0}
  },
  {
    name: 'capital',
    aliases: 'capitalfm',
    lang: 'english',
    id: 'CapitalUKMP3',
    title: 'Capital FM',
    url: `http://vis.media-ice.musicradio.com/CapitalUKMP3`,
    thumbnail: 'https://media.discordapp.net/attachments/1023883157432447007/1023884494186487838/pngwing.com.png',
    duration: { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0}
  },
  {
    name: 'heart',
    aliases: 'heartfm',
    lang: 'english',
    id: 'HeartUKMP3',
    title: 'Heart FM',
    url: `http://vis.media-ice.musicradio.com/HeartUKMP3`,
    thumbnail: 'https://media.discordapp.net/attachments/1023883157432447007/1023885716977106954/images-2.jpg',
    duration: { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0}
  },
  {
    name:'dnbradio',
    aliases: 'dnb',
    lang: 'english',
    id: 'durmandbassradio',
    title: 'Drum N Bass FM',
    url: `http://photek.dnbradio.com:8000/dnbradio_main.mp3`,
    thumbnail: 'https://media.discordapp.net/attachments/1023883157432447007/1023886081147539456/images.webp',
    duration: { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0}
  },
  {
    name: 'punjabins',
    aliases: 'ns',
    lang: 'punjabi',
    id: 'punjabinonstop',
    title: 'Non Stop Punjabi Radio',
    url: `https://stream-11.zeno.fm/593xdu5b9yzuv?zs=JX3m9RQNQR-9AANIg31tKg`,
    thumbnail: 'https://media.discordapp.net/attachments/1023883157432447007/1023886975314436106/images-1.webp',
    duration: { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0}
  },
  {
    name: 'punjabirocks',
    aliases: 'pr',
    lang: 'punjabi',
    id: 'punjabirocksfm',
    title: 'Radio Punjabi Rocks',
    url: `https://cors.bitwize.com.lb/http://radio.punjabrocks.com:9988/Punjabi-Rocks`,
    thumbnail: 'https://media.discordapp.net/attachments/1023883157432447007/1023887486293905468/images-2.webp',
    duration: { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0}
  },
  {
    name: 'dhakad',
    aliases: 'dhakadfm',
    lang: 'haryanvi',
    id: 'dhakadradio',
    title: 'Dhakad Radio - Haryanvi hits',
    url: `http://app.dhakadradio.com:8000/live`,
    thumbnail: 'https://media.discordapp.net/attachments/1023883157432447007/1023887998280015902/images-3.webp',
    duration: { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0}
  },
  {
    name: 'olive',
    aliases: 'olivefm',
    lang: 'hindi',
    id: 'olivefmindiahindi',
    title: 'Radio Olive India',
    url: `https://22333.live.streamtheworld.com/OLIVE1063.mp3`,
    thumbnail: 'https://media.discordapp.net/attachments/1023883157432447007/1023888720555945994/radioolive11.png',
    duration: { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0}
  },
  {
    name: 'era',
    aliases: 'erafm',
    lang: 'malaysia',
    id: 'erafmmalaysia',
    title: 'Era FM',
    url: `http://astro2.rastream.com/era`,
    thumbnail:'https://media.discordapp.net/attachments/1023883157432447007/1023889145782870108/images-4.webp',
    duration: { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0}
  },
  {
    name: 'big',
    aliases: 'bigfm',
    lang: 'hindi',
    id: 'bigfmhindiindia',
    title: 'Big-FM india',
    url: `https://funasia.streamguys1.com/live4`,
    thumbnail: 'https://media.discordapp.net/attachments/1023883157432447007/1023889790346731620/images-5.webp',
    duration: {months: 0, days: 0, hours: 0, minutes: 0, seconds: 0}
  },
  {
    name: 'city',
    aliases: 'radiocity',
    lang: 'hindi',
    id: 'radiocityindia',
    title: 'Radio City india',
    url: `https://stream-18.zeno.fm/pxc55r5uyc9uv?zs=BkQNXtu9QCe793GkIrF0AA`,
    thumbnail: 'https://media.discordapp.net/attachments/1023883157432447007/1023897361560371240/images-3.jpg',
    duration: {months: 0, days: 0, hours: 0, minutes: 0, seconds: 0}
  },
  {
    name: 'spice',
    aliases: 'spicefm',
    lang: 'hindi',
    id: 'spicefmindia',
    title: 'Spice FM india',
    url: `https://spice988fm.radioca.st/stream`,
    thumbnail: 'https://media.discordapp.net/attachments/1023883157432447007/1023897905066676284/unnamed-1.jpg',
    duration: {months: 0, days: 0, hours: 0, minutes: 0, seconds: 0}
  },
  {
    name: 'badal',
    aliases: 'badalfm',
    lang: 'hindi',
    id: 'badalfmindia',
    title: 'Badal FM india',
    url: `https://stream-26.zeno.fm/nhrtcxg09u8uv?zs=U5kwMstqRXqLD19hbC2xvw`,
    thumbnail: 'https://media.discordapp.net/attachments/1023883157432447007/1023898305534644284/images-6.webp',
    duration: {months: 0, days: 0, hours: 0, minutes: 0, seconds: 0}
  },
  {
    name: 'dhol',
    aliases: 'dholradio',
    lang: 'punjabi',
    id: 'dholradioindia',
    title: 'Dhol Radio india',
    url: `http://144.91.75.79:8000/;stream.mp3`,
    thumbnail: 'https://media.discordapp.net/attachments/1023883157432447007/1023898680962596905/unnamed.webp',
    duration: {months: 0, days: 0, hours: 0, minutes: 0, seconds: 0}
  },
  {
    name: 'virsa',
    aliases: 'virsaradio',
    lang: 'punjabi',
    id: 'virsaindia',
    title: 'Virsa india',
    url: `http://stream-38.zeno.fm/25h82wv629duv?zs=irwXeSOuQVeZ4ts5LCqtmg`,
    thumbnail: 'https://media.discordapp.net/attachments/1023883157432447007/1023883359312674848/download.png',
    duration: {months: 0, days: 0, hours: 0, minutes: 0, seconds: 0}
  },
  {
    name: 'khas',
    aliases: 'khasharyanvi',
    lang: 'haryanvi',
    id: 'khasindia',
    title: 'Khas Haryanvi india',
    url: `http://khasharyanvi.com:8000/live`,
    thumbnail: 'https://media.discordapp.net/attachments/1023883157432447007/1023899223818784828/images-1.png',
    duration: {months: 0, days: 0, hours: 0, minutes: 0, seconds: 0}
  },
  {
    name: 'kiss',
    aliases: 'kissfm',
    lang: 'english',
    id: 'kissmusic',
    title: 'kiss fm',
    url: `https://playerservices.streamtheworld.com/api/livestream-redirect/977_HITSAAC_SC`,
    thumbnail: 'https://media.discordapp.net/attachments/1023883157432447007/1023899660240306247/images-2.png',
    duration: {months: 0, days: 0, hours: 0, minutes: 0, seconds: 0}
  }
]
}