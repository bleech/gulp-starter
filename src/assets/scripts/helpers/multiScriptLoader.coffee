class MultiScriptLoader
  constructor: (@loaders) ->
    return unless @loaders
    @scriptCount = @loaders.length
    @loadedScripts = 0

  loadScripts: ->
    new Promise (resolve, reject) =>
      @loaders.forEach (loader) =>
        loader @loaderCompleteCb(resolve, reject)

  loaderCompleteCb: (resolve, reject) =>
    =>
      @loadedScripts += 1
      if @loadedScripts >= @scriptCount
        resolve()

module.exports = (loaders) ->
  new MultiScriptLoader(loaders)
  .loadScripts()
