BaseModule = require './BaseModule'
ModuleLogger = require './ModuleLogger'

class ViewModule extends BaseModule
  @include ModuleLogger

  constructor: (@$container) ->
    return unless @$container
    @_setElements()
    @_bindEvents()
    @setOptions?()
    @bindEvents?()
    @init?()
    @_bindOnLoad()

  _setElements: ->
    for name, selector of @elements
      this["$#{name}"] = @$container.find selector

  _bindEvents: ->
    for definition, fn of @events
      [e, selector, empty] = definition.split /\s(.+)?/
      @$container.on e, selector, this[fn]

  _bindOnLoad: ->
    if @onLoad
      if document.readyState = 'complete'
        @onLoad()
      else
        $(window).load @onLoad


module.exports = ViewModule
