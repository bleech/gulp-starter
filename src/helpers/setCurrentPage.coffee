routes = require 'routes.cson'
.routes
dataStores =
  Page: require 'dataStores/Page'
  Global: require 'dataStores/Global'

module.exports = (url) ->
  urlParts = url.split '/'
  if urlParts.length > 2
    url = '/' + urlParts[1] + '/'
  url = url.replace dataStores.Global.fetch('index').rootPath, '/'
  route = routes[url]
  dataStores.Page.setCurrentPage route.dataStore.split('#')[1]
