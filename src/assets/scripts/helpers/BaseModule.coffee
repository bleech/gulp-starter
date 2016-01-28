moduleKeywords = ['extended', 'included']

class BaseModule
  @extend: (obj) ->
    for key, value of obj when key not in moduleKeywords
      this[key] = value
    obj.extended?.apply this
    this

  @include: (obj) ->
    for key, value of obj when key not in moduleKeywords
      # Assign properties to the prototype
      this::[key] = value
    obj.included?.apply this
    this

module.exports = BaseModule
