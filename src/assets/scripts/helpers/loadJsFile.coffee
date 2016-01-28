module.exports = (d, url, id) ->
  js = undefined
  s = 'script'
  scriptTag = d.getElementsByTagName(s)[0]

  if d.getElementById id
    return

  js = d.createElement s
  js.id = id
  js.src = url
  scriptTag.parentNode.insertBefore js, scriptTag
  return

