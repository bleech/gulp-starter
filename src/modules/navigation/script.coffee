ViewModule = require 'assets/scripts/helpers/ViewModule'

class Navigation extends ViewModule
  elements:
    navA: 'a'

  events:
    'click a': 'clickAnchor'

  constructor: ->
    @log()
    @logFlag = false
    super

  # autoloaded if exists (optional)
  setOptions: ->
    @log()

  # autoloaded if exists (optional)
  bindEvents: ->
    @log()

  # autoloaded if exists (optional)
  init: ->
    @log @$navA

  clickAnchor: (e) =>
    @log()

module.exports = Navigation
