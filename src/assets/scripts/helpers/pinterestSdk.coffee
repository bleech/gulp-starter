Module = require './Module'
ModuleLogger = require './ModuleLogger'
loadJsFile = require './loadJsFile'
GlobalDataStore = require 'dataStores/Global'

initialized = false

class PinterestSdk extends Module
  constructor: (cb) ->
    @logFlag = false
    super
    @setGlobalOptions()

  loadScript: (cb) ->
    return unless @_globalOptions
    @log '@_globalOptions: ', @_globalOptions
    if window.PDK and window.PDK.init
      cb?()
    else unless initialized
      window.pAsyncInit = =>
        @log 'Pinterest Init Options: ', @_globalOptions.init
        window.PDK.init @_globalOptions.init
        cb?()

      (loadJsFile) document, @_globalOptions.jsSrc, @_globalOptions.id
    else
      setTimeout =>
        @loadScript cb
      , 50
    initialized = true

pinterestSdk = null

module.exports = (cb) ->
  pinterestSdk or= new PinterestSdk()
  pinterestSdk.loadScript cb
