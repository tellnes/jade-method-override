
var jmo = require('jade-method-override')

jade.render('something', { compiler: jmo.compiler() })



// Express

jmo.express(app)
