GlobalDataStore = require 'dataStores/Global'

class Module
  constructor: (@$container) ->
    return unless @$container
    @logGlobalFlag = true
    @_setElements()
    @_bindEvents()
    @setOptions()
    @bindEvents()

  setOptions: ->

  bindEvents: ->

  setGlobalOptions: (fileName) ->
    fName = if fileName then fileName else 'index'
    @_globalOptions = GlobalDataStore
      .fetch fName
      .moduleOptions[@_camelize @constructor.name]
    if (@_globalOptions is undefined) and @logGlobalFlag
      console.warn "Could not load require('dataStores/Global').fetch('#{fName}')"

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

  _setElements: ->
    for name, selector of @elements
      this["$#{name}"] = @$container.find selector

  _bindEvents: ->
    for definition, fn of @events
      [e, selector, empty] = definition.split /\s(.+)?/
      @$container.on e, selector, this[fn]

  _camelize: (str) ->
    str[0].toLowerCase() + str.replace(/-([a-z])/g, (a, b) ->
      b.toUpperCase()
    ).slice(1)

module.exports = Module
