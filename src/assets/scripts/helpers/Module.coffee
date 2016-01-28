BaseModule = require './BaseModule'
ModuleLogger = require './ModuleLogger'

class Module extends BaseModule
  @include ModuleLogger

module.exports = Module
