namespace = {}

$namespace = $ namespace

module.exports =
  on: ->
    $namespace.on.apply $namespace, arguments
    this

  off: ->
    $namespace.off.apply $namespace, arguments
    this

  one: ->
    $namespace.one.apply $namespace, arguments
    this

  trigger: ->
    $namespace.trigger.apply $namespace, arguments
    this
