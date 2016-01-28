hat = require 'hat'
changeCase = require 'change-case'
clone = require 'clone'

fetchData = require './fetchData'

setData = (areaName, config, parentData, dataStores) ->
  config = clone config
  data = fetchData config, parentData, dataStores
  delete config.dataStore
  config.data.d = data
  config = setBaseClasses areaName, config
  config = addDataFromHelper config, parentData
  config

setBaseClasses = (areaName, config) ->
  config = clone config
  moduleId = hat(32, 36)
  moduleClass = changeCase.param config.name
  areaClass = changeCase.param areaName
  if areaClass is (parseInt(areaClass, 10) + '')
    baseClassesArray = ['modules', "module--#{moduleId}"]
  else
    baseClassesArray = ['modules', areaClass, "module--#{moduleId}"]
  if config.cssClass
    baseClassesArray.push config.cssClass
  else
    baseClassesArray.push moduleClass
  baseClasses = baseClassesArray.join ' '
  config.data.d.baseClasses = baseClasses
  config.id = moduleId
  config

addDataFromHelper = (config, parentData) ->
  try
    helper = require "modules/#{config.name}/helper.coffee"
    parentData = parentData.d or []
    if helper.addData
      data = helper.addData config.data.d, config, parentData
      config.data.d = data
    if helper.addModules
      modules = config.modules or []
      modules = helper.addModules modules, config.data.d
      config.modules = modules if modules
    config
  catch error
    config

module.exports = setData
