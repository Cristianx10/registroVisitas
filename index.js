var express = require("express");
var exphbs = require("express-handlebars");

var app = express();

var fs = require("fs");

app.use(express.static("public"));

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

var visitas = {
  general: [],
  registro: []
};

fs.readFile(__dirname + "/registro.txt", (err, data) => {
  if (err) {
    console.log("No se encontro el archivo");
  } else {
    visitas = JSON.parse(data);
    console.log("Encontro el archivo");
  }
});

function registrarVisita(url) {
  let f = new Date();
  if (visitas.general.length > 0) {
    let encontro = false;

    visitas.general.forEach((v, index) => {
      if (v.url == url) {
        v.visitas++;
        let visi = v.visitas;
        encontro = true;

        let informacion = {
          url: url,
          visitas: visi,
          fecha: f.getDate() + "/" + f.getMonth() + "/" + f.getFullYear(),
          hora: f.getHours() + ":" + f.getMinutes()
        };

        visitas.registro.push(informacion);
      }
    });

    if (encontro == false) {
      let informacion = {
        url: url,
        visitas: 1,
        fecha: f.getDate() + "/" + f.getMonth() + "/" + f.getFullYear(),
        hora: f.getHours() + ":" + f.getMinutes()
      };
      visitas.general.push(informacion);
      visitas.registro.push(informacion);
    }
  } else {
    let informacion = {
      url: url,
      visitas: 1,
      fecha: f.getDate() + "/" + f.getMonth() + "/" + f.getFullYear(),
      hora: f.getHours() + ":" + f.getMinutes()
    };
    visitas.general.push(informacion);
    visitas.registro.push(informacion);
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
  let contexto = { layout: false, visitas: visitas };
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
