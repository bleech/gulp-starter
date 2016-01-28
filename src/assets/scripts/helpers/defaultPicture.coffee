module.exports = (obj) ->
  {
    fallback: require('content/' + obj.imgSrc.mobile)
    ltIE9: require('content/' + obj.imgSrc.default)
    sizes: [
      default: require('content/' + obj.imgSrc.mobileSmall)
      retina: require('content/' + obj.imgSrc.mobile)
      query: '(max-width: 320px)'
    ,
      default: require('content/' + obj.imgSrc.mobile)
      retina: require('content/' + obj.imgSrc.mobileRetina)
      query: '(max-width: 767px)'
    ,
      default: require('content/' + obj.imgSrc.default)
      retina: require('content/' + obj.imgSrc.retina)
      query: '(min-width: 768px)'
    ]
  }
