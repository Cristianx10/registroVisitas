var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

var fs = require('fs');

app.use(express.static('public'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.get('/', function (request, response) {
    let contexto = {layout:false};
    response.render('inicio', contexto);
});

app.listen(3000, function () {
  console.log('Escuchando el puerto 3000!');
});


/*fs.readFile('/etc/passwd', (err, data) => {
    if (err) throw err;
    console.log(data);
  });
  */

//fs.writeFile('message.txt', 'Hello Node.js', 'utf8', callback);