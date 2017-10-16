/* eslint-env jest */
'use strict'

const express = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const mongooseExpress = require('../index')
const testSchema = require('../__mocks__/test-schema')

describe('mongoose-express', () => {
  test('adds models to request', () => {
    expect.hasAssertions()
    const app = express()
    const connection = mongoose.connect(
      'mongodb://localhost/should-not-exist',
      { useMongoClient: true }
    )
    app.use(mongooseExpress(connection, [{ name: 'Test', schema: testSchema }]))
    app.use((req, res, next) => {
      try {
        expect(req.models.Test.schema).toBe(testSchema)
        res.send('hello')
      } catch (err) {
        // uncomment if you get a 500 error
        // console.log(err)
        next(err)
      }
    })
    return supertest(app)
      .get('/')
      .expect(200, 'hello')
  })

  test('works with no schemas passed', () => {
    expect.hasAssertions()
    const app = express()
    const connection = mongoose.connect(
      'mongodb://localhost/should-not-exist',
      { useMongoClient: true }
    )
    app.use(mongooseExpress(connection))
    app.use((req, res, next) => {
      try {
        expect(req.models).toEqual({})
        res.send('hello')
      } catch (err) {
        // uncomment if you get a 500 error
        // console.log(err)
        next(err)
      }
    })
    return supertest(app)
      .get('/')
      .expect(200, 'hello')
  })
})
