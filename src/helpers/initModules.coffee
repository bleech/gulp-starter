initModules = (config) ->
  for areaName, modules of config
    for moduleName, moduleConfig of modules
      if(moduleConfig.modules)
        initModules moduleConfig.modules
      ids = [].concat moduleConfig.id
      try
        Lib = require "../modules/#{moduleConfig.name}/script"
        ids.forEach (id) ->
          $container = $(".module--#{id}")
          new Lib($container)
      catch e
        if e.message.indexOf('Cannot find module') isnt -1
          $modulConfigPath = moduleConfig.name
          # console.log $modulConfigPath + ' does not have a script.coffee'
        else
          throw e

module.exports = initModules
