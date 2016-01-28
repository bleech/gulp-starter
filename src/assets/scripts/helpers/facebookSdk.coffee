Module = require './Module'
ModuleLogger = require './ModuleLogger'
loadJsFile = require './loadJsFile'

initialized = false

class FacebookSdk extends Module
  constructor: (cb) ->
    @logFlag = false
    super
    @setGlobalOptions()

  loadScript: (cb) ->
    return unless @_globalOptions
    @log '@_globalOptions: ', @_globalOptions
    if window.FB and window.FB.init
      cb?()
    else unless initialized
      window.fbAsyncInit = =>
        @log 'Facebook Init Options: ', @_globalOptions.init
        window.FB.init @_globalOptions.init
        cb?()

      (loadJsFile) document, @_globalOptions.jsSrc, @_globalOptions.id
    else
      setTimeout =>
        @loadScript cb
      , 50
    initialized = true

facebookSdk = null

module.exports = (cb) ->
  facebookSdk or= new FacebookSdk()
  facebookSdk.loadScript cb
