MODULES_PATH = '../modules'

merge = require 'merge'

renderModules = (config) ->
  result = {}
  for areaName, modules of config
    html = ''
    for moduleName, moduleConfig of modules
      if moduleConfig.modules
        moduleConfig.data.area = renderModules moduleConfig.modules
      html += renderModule moduleConfig
    result[areaName] = html
  result

renderModule = (config) ->
  path = "#{config.name}/#{config.view}"
  # REQUIRE STYL FILES AND ADD LOCAL CLASSES
  # cssPath = "#{config.name}"
  # localClasses = loadStyle(cssPath)
  # for key, local of localClasses
  #   config.data.d.baseClasses += " #{local}"
  renderFile config.data, path

renderFile = (data, path) ->
  context = addHelpers data
  require("../modules/#{path}.jade")(context)

# loadStyle = (path) ->
#   try
#     require "../modules/#{path}/style.styl"
#   catch error
#     {}

addHelpers = (data) ->
  helpers = loadHelpers()
  merge {}, data,
    helpers: helpers

loadHelpers = ->
  mods = require.context 'viewHelpers', true, /\.jade$/
  helpers = {}
  helpers = mods.keys().reduce (globs, mod) ->
    globs[mod.replace('./', '').replace('.jade', '')] = mods(mod)
    globs
  , {}
  helpers

module.exports = renderModules
