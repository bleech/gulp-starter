clone = require 'clone'

stripConstructionPlan = (constructionPlan) ->
  constructionPlan = clone constructionPlan
  for areaName, area of constructionPlan
    for moduleName, mod of area
      delete mod.data
      delete mod.path
      if mod.modules
        mod.modules = stripConstructionPlan mod.modules
  constructionPlan

module.exports = stripConstructionPlan
