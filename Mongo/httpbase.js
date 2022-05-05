const MongoClient = require("mongodb").MongoClient;

var url = 'mongodb://localhost:27017/aplicaciones';
const client = new MongoClient(url, { useUnifiedTopology: true });

const dbName = "aplicaciones";

const personas = [];

client
      .connect()
      .then(
        client =>
          client
            .db(dbName)
            .collection("personas")
            .find()
            .forEach( persona => {
                personas.push(persona);
                console.log(persona);
            }
            )
      )
      .finally(() => client.close());

const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
    const list = [];
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    personas.forEach(persona =>list.push(" " + persona.nombre + " " + persona.apellido + " " + persona.edad));
    res.end(list.toString());
});

server.listen(port, hostname, () => {
    console.log("Hola");
});
