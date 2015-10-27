routes = require './routes.cson'
.routes

renderUrl = require './helpers/renderUrl'
stripConstructionPlan = require './helpers/stripConstructionPlan'

module.exports = (locals, callback) ->
  html = renderUrl(locals.path)
  script = "<script>var constructionPlan = #{JSON.stringify stripConstructionPlan renderUrl.constructionPlan}</script>"
  # script = "<script>var constructionPlan = '{test: \"best\"}'</script>"
  html = html.replace '<!-- CONSTRUCTION_PLAN_PLACEHOLDER-->', script
  callback null, html
