
const cheerio = require('cheerio')
const request = require('request')


async function search(req, res) {
  
  const origin = req.body.url
  const depth = req.body.depth
  
  // const depth = 1;
  
  const urls = []
  const tmp = await getUrls(origin)
  urls.push(tmp);

  for (let x = 0; x < depth; x++) {

    const nextlvl = urls[x]
    const newurls = []

    for (let j = 0; j < nextlvl.length; j++) {
      // navega i busca 
      let found = false;

      urls.forEach(e => {
        found = e.includes()
      })

      const tmp = !found ? await getUrls(nextlvl[j]) : []

      if (tmp.length > 0) newurls.push(...tmp)
      console.log(x,j, tmp.length, newurls.length)

    }
    urls.push(newurls)
    console.log(x)
  }

  res.send(urls);
}


// Devuelve todas las url encontradas en el html correspondiendte a la url
async function getUrls(url) {

  // LLamada a la url
  return new Promise((resolve, reject) => {
    request({
      uri: url
    }, async (err, res, body) => {
      // Control de error de la llamada http
      if (err) { reject(err) }
      const foundurls = [];
      
      // Recoger el valor de los href de los tags <a> 
      const $ = cheerio.load(body);
      $('a').each((i, e) => {
        url = e.attribs['href']
        if (/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(url)) {
          foundurls.push(url)
        }
      });

      resolve(foundurls)
    });
  })
    .then(value => { return value })
    .catch(err => console.log(err))
}

module.exports = { search };