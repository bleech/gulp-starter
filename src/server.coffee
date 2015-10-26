routes = require './routes.cson'
.routes

renderUrl = require './helpers/renderUrl'

module.exports = (locals, callback) ->
  callback null, renderUrl(locals.path)
