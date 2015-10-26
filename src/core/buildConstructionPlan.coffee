merge = require 'merge'
clone = require 'clone'
Array::dict = ->
  @reduce ((dict, obj, i) -> dict[i] = obj if obj[key]?; return dict), {}

setDefaultData = require './setDefaultData'
setData = require './setData'

currentDataStores = null

fromConfig = (config, parentData = {}, dataStores) ->
  config = clone config
  currentDataStores ?= dataStores
  result = {}
  for areaName, modules of config
    for moduleName, moduleConfig of modules
      result[areaName] or= {}
      if moduleConfig.acfContent
        acfModules = fromFlexibleContent(areaName, moduleConfig, parentData)
        result[areaName] = merge result[areaName], acfModules
      else
        preparedModule = prepareModule areaName, moduleConfig, parentData
        if preparedModule.iterateOver
          iteratedModules = fromIterateableModule areaName, moduleConfig
          result[areaName] = merge result[areaName], iteratedModules
        else
          result[areaName][moduleName] = fromPreparedModule preparedModule
  result

prepareModule = (areaName, config, parentData) ->
  config = setDefaultData config
  config = setData areaName, config, parentData, currentDataStores
  config = setModuleTemplatePath config
  config

fromFlexibleContent = (areaName, config = {}, parentData = {}) ->
  modules = []
  if Array.isArray parentData.d[areaName]
    modules = parentData.d[areaName].map (dynamicModuleData) ->
      output =
        name: $dynamicModuleData.acf_fc_layout
        data:
          d: $dynamicModuleData
  if modules.length
    modules = modules.dict()
    modules = fromConfig({0: modules}, {})[0]
  modules

fromIterateableModule = (areaName, config) ->
  iterateKey = config.iterateOver
  iterateData = config.data.d[iterateKey]
  modules = {}
  for key, data of iterateData
    config.data.d = data
    preparedModule = prepareModule areaName, config, {}
    fromPreparedModule preparedModule
  modules

fromPreparedModule = (mod) ->
  mod = clone mod
  if config = mod.modules
    data = mod.data
    mod.modules = fromConfig config, data
  mod

setModuleTemplatePath = (config) ->
  config.path = "./modules/#{config.name}/index.jade"
  return config

module.exports = fromConfig
