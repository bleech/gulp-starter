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
  # config = addDataFromHelper config, parentData
  config

setBaseClasses = (areaName, config) ->
  config = clone config
  moduleId = hat(32, 36)
  moduleClass = changeCase.param config.name
  areaClass = changeCase.param areaName
  baseClassesArray = ['modules', areaClass, "module--#{moduleId}"]
  if config.cssClass
    baseClassesArray.push config.cssClass
  else
    baseClassesArray.push moduleClass
  baseClasses = baseClassesArray.join ' '
  config.data.d.baseClasses = baseClasses
  config.id = moduleId
  config

module.exports = setData
