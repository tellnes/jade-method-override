# Jade Method Override

## Usage

```js
var app = express()
app.use(express.methodOverride())
require('jade-method-override').express(app)
```

Now you can do

```jade
form(method='put')
```

and it will result in

```html
<form method="post"><input type="hidden" name="_method" value="put"></form>
```


## Install

    npm install -S jade-method-override


## Licence

MIT
