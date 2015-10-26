MODULES_PATH = '../modules'

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
  path = "#{config.name}/#{config.view}.jade"
  # REQUIRE STYL FILES AND ADD LOCAL CLASSES
  # cssPath = "#{config.name}"
  # localClasses = loadStyle(cssPath)
  # for key, local of localClasses
  #   config.data.d.baseClasses += " #{local}"
  renderFile config.data, path

renderFile = (data, path) ->
  require("../modules/#{path}")(data)

# loadStyle = (path) ->
#   try
#     require "../modules/#{path}/style.styl"
#   catch error
#     {}

module.exports = renderModules
