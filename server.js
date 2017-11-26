const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const app = express()

hbs.registerPartials(`${__dirname}/views/partials`)
app.set('view engine', 'hbs')

app.use((req, res, next) => {
  const now = new Date().toString()
  const log = `${now}: ${req.method} ${req.url}`

  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => err && console.log(err, 'Unable'))
  next()
})

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Maintenance Page'
//   })
// })

app.use(express.static(`${__dirname}/public`))

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())
hbs.registerHelper('screamIt', (str) => str.toUpperCase())

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Welcome Page',
    welcomeMessage: 'Welcome baby'
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Bad request'
  })
})

app.listen(3000, () => console.log('Server is on port 3000'))