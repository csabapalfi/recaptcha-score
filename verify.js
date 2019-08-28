const https = require('https')
const {URLSearchParams} = require('url');
const secret = '6Le7VbUUAAAAADm3L-7Jnbau2h3DGsyuFneOKPZn'


module.exports = (request, response) => {

  const token = request.body.token

  const data = new URLSearchParams({ response: token, secret}).toString()

  const options = {
    method: 'POST',
    hostname: 'www.google.com',
    path: '/recaptcha/api/siteverify',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': data.length
    }
  }
  
  const req = https.request(options, res => res.pipe(response))
  
  req.on('error', () => {
    response.status(500)
    response.send({success: false, 'error-codes': ['internal-server-error']})
  })
  
  req.write(data)

  req.end()
}

