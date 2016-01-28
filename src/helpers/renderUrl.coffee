routes = require 'routes.cson'
.routes

dataStores =
  Page: require 'dataStores/Page'
  Global: require 'dataStores/Global'

buildConstructionPlan = require 'core/buildConstructionPlan'
renderModules = require 'core/renderModules'
setCurrentPage = require 'helpers/setCurrentPage'

module.exports = (url) ->
  setCurrentPage url
  route = routes[url]
  config = require "config/#{route.config}.cson"
  module.exports.constructionPlan = constructionPlan = buildConstructionPlan {0: config}, {}, dataStores
  html = renderModules constructionPlan
  html[0]
