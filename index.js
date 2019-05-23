var express = require("express");
var exphbs = require("express-handlebars");

var app = express();

var fs = require("fs");

app.use(express.static("public"));

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

var visitas = {
    general:[],
    registro:[]
};


fs.readFile(__dirname + "/registro.txt", (err, data) => {
    if (err){
        console.log("No se encontro el archivo");
    }else{
      visitas = JSON.parse(data);
      console.log("Encontro el archivo");
    }

});

function registrarVisita(url) {
  if (visitas.general.lenght > 0) {
    let encontro = false;
    visitas.general.forEach((v, index) => {
      if (v.url == url) {
        v.visitas++;
        let visi = v.visitas;
        encontro = true;

        visitas.registro.push({
          url: url,
          visitas: visi,
          fecha: new Date()
        });
      }
    });
    if (encontro == false) {
      visitas.general.push({ url: url, visitas: 1, fecha: new Date() });
      visitas.registro.push({ url: url, visitas: 1, fecha: new Date() });
    }
  } else {
    visitas.general.push({ url: url, visitas: 1, fecha: new Date() });
    visitas.registro.push({ url: url, visitas: 1, fecha: new Date() });
  }
  fs.writeFile("registro.txt", JSON.stringify(visitas), "utf8", function() {});
}

app.get("/", function(request, response) {
  let contexto = { layout: false };
  registrarVisita("inicio");
  response.render("inicio", contexto);
});

app.get("/nosotros", function(request, response) {
  let contexto = { layout: false };
  registrarVisita("nosotros");
  response.render("nosotros", contexto);
});

app.get("/contacto", function(request, response) {
  let contexto = { layout: false };
  registrarVisita("contacto");
  response.render("contacto", contexto);
});

app.get("/admin", function(request, response) {
  let contexto = { layout: false };
  response.render("admin", contexto);
});

app.listen(3000, function() {
  console.log("Escuchando el puerto 3000!");
});

/*fs.readFile('/etc/passwd', (err, data) => {
    if (err) throw err;
    console.log(data);
  });
  */

//fs.writeFile('message.txt', 'Hello Node.js', 'utf8', callback);
