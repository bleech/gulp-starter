clone = require 'clone'

fetch = (config = {}, parentData = {}, dataStores) ->
  if config.dataStore
    data = getDataFromDataStore config.dataStore, config.dataStoreArgs, dataStores
    data = getSingePostData config, data
  else if config.data?.d
    data = config.data.d
  else if config.customData
    data = config.customData
    delete config.customData
  else
    data = parentData.d or parentData
  if config.dataMapping
    data = mapData data, config.dataMapping
  data = addGlobalData data
  data

getDataFromDataStore = (dataStoreCmd, dataStoreArgs, dataStores) ->
  if dataStoreCmd.store
    dataStoreName = dataStoreCmd.store
    cmd = dataStoreCmd.cmd
  else
    [dataStoreName, cmd] = dataStoreCmd.split '#'
  dataStores[dataStoreName].fetch cmd, dataStoreArgs

getSingePostData = (config, data) ->
  if not config.iterateOver and not config.multiPosts and data.posts
    data = data.posts[0]
  data

mapData = (data, mapping) ->
  for from, to of mapping
    if data[from]
      data[to] = data[from]
      delete data[from]
  data

addGlobalData = (data) ->
  data = clone data
  mods = require.context 'content/_global', true, /\.cson$/
  globals = {}
  globals = mods.keys().reduce (globs, mod) ->
    globs[mod.replace('./', '').replace('.cson', '')] = mods(mod)
    globs
  , {}
  data.globals = globals
  data

module.exports = fetch
