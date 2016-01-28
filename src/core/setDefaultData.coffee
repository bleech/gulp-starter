setDefaults = (config) ->
  config.view = 'index' unless config.view
  config.path = '' unless config.path
  config.iterateOver = false unless config.iterateOver
  config.multiPosts = false unless config.multiPosts
  config.dataStoreArgs = {} unless config.dataStoreArgs
  unless config.data
    config.data =
      d: {}
      area: {}
  unless config.data.d
    config.data.d = {}
  unless config.data.area
    config.data.area = {}
  config

module.exports = setDefaults
