'use strict'

// MODULE IMPORTS
const Koa = require('koa')
const views = require('koa-views')
const serve = require('koa-static')
const koaBody = require('koa-body')
const bodyParser = require('koa-bodyparser')
const session = require('koa-encrypted-session')
const Handlebars = require('handlebars')

// CUSTOM MODULES IMPORTS
const mainRoutes = require('./core/routes/mainRoutes')


const app = new Koa()

app.keys = ['darkSecret']

app.use(serve('public'))
app.use(koaBody())
app.use(bodyParser())
app.use(session({
	key: 'session',
	secretKey: Buffer.from('EsAg64LMvGITBBz1ZGLfDNU/MYqGDpTzJ1u4BsvIfTw=', 'base64')
}, app))


app.use(views(`${__dirname}/core/views`,
	{
		extension: 'hbs',
		/*options: {
			partials: {
				profileheader: `${__dirname}/core/views/partials/profileheader`,
				loginheader: `${__dirname}/core/views/partials/loginheader`,
				navbar: `${__dirname}/core/views/partials/navbar`
			}
		},*/
		map: { hbs: 'handlebars' }
	})
)


Handlebars.registerHelper('if_diff', function(a, b, opts) {
	if (a !== b) {
		return opts.fn(this)
	} else {
		return opts.inverse(this)
	}
})



app.use(mainRoutes.routes())
app.use(mainRoutes.allowedMethods())


module.exports = app