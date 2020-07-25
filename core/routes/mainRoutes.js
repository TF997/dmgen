
'use strict'

require('dotenv').config()
const Router = require('koa-router')
const router = new Router()
const koaBody = require('koa-body')({multipart: true, uploadDir: '.'})
const statGen = require('../models/main')

/**
 * @name Home Page
 * @route {GET} /
 */
router.get('/', async ctx => {
	let values = await statGen.statGen()
	await ctx.render('home',values)
})

module.exports = router