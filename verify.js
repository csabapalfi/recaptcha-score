const https = require('https')
const {URLSearchParams} = require('url');

// WARNING! Never ever publish your real/production reCAPTCHA secret.
const secret = '6Lf6YRwoAAAAAFDG8gbUhsPTb1q_uvXLN6akvnvI'


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

