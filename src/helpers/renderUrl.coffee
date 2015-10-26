routes = require 'routes.cson'
.routes
dataStores =
  Page: require 'dataStores/Page'
  Global: require 'dataStores/Global'

buildConstructionPlan = require 'core/buildConstructionPlan'
renderModules = require 'core/renderModules'

module.exports = (url) ->
  route = routes[url]
  dataStores.Page.setCurrentPage route.dataStore.split('#')[1]
  config = require "config/#{route.config}.cson"
  constructionPlan = buildConstructionPlan {0: config}, {}, dataStores
  html = renderModules constructionPlan
  html[0]
