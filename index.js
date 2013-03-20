var inherits = require('util').inherits

exports.compiler = function (jade) {

  jade = jade || require('jade')

  var Compiler = jade.Compiler
    , Tag = jade.nodes.Tag

  function MOCompiler(node, options) {
    Compiler.call(this, node, options)
  }
  inherits(MOCompiler, Compiler)

  var postGetReg = /^(\'|\")(post|get)(\'|\")$/

  MOCompiler.prototype.visitTag = function (node) {
    if (node.name === 'form') {
      var method = node.getAttribute('method')

      if (!postGetReg.test(method)) {
        var tag = new Tag('input')
        tag.setAttribute('type', '"hidden"')
        tag.setAttribute('name', '"_method"')
        tag.setAttribute('value', method)
        node.block.unshift(tag)

        node.removeAttribute('method')
        node.setAttribute('method', '"post"')
      }
    }

    Compiler.prototype.visitTag.call(this, node)
  }

  return MOCompiler
}

exports.express = function (app, jade) {
  var compiler = exports.compiler(jade)
  if (app.locals) {
    app.locals.compiler = compiler
  } else {
    var options = app.set('view options') || {}
    options.compiler = 
    app.set('view options', options)
  }
  return compiler
}
