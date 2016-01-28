class PageDataStore
  @fetch: (name, params...) ->
    require "../content/_global/#{name}.cson"

module.exports = PageDataStore
