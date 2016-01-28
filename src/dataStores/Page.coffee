currentPage = null

class PageDataStore
  @fetch: (name, params...) ->
    name or= @currentPage
    require "../content/#{name}/index.cson"

  @setCurrentPage: (name) ->
    @currentPage = name

module.exports = PageDataStore
