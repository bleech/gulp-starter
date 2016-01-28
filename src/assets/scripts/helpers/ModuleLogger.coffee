GlobalDataStore = require 'dataStores/Global'

module.exports =
  logGlobalFlag: true

  setGlobalOptions: (fileName) ->
    fName = if fileName then fileName else 'index'
    moduleName = @_camelize @constructor.name
    @_globalOptions = GlobalDataStore
      .fetch fName
      .moduleOptions[moduleName]
    if (@_globalOptions is undefined) and @logGlobalFlag
      console.warn "Could not load global config object -> moduleConfigs.#{moduleName} from content/_global/#{fName}.cson file."

  log: ->
    if @logFlag and @logGlobalFlag
      args = Array.prototype.slice.call arguments
      fnName = @getFunctionName arguments.callee
      if fnName
        args.unshift "#{@constructor.name}##{fnName}:"
      else
        args.unshift "#{@constructor.name}:"
      console.log.apply console, args

  getFunctionName: (callee) ->
    for name, fn of this
      if fn is callee.caller
        return name
    for name, fn of this.constructor.prototype
      if fn is callee.caller
        return name

  _camelize: (str) ->
    str[0].toLowerCase() + str.replace(/-([a-z])/g, (a, b) ->
      b.toUpperCase()
    ).slice(1)
