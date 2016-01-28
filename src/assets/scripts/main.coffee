require 'assets/styles/app.styl'

renderUrl = require 'helpers/renderUrl'
initModules = require 'helpers/initModules'
setCurrentPage = require 'helpers/setCurrentPage'

setCurrentPage window.location.pathname

initModules window.constructionPlan
