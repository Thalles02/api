//"inportando" as bibliotecas
const express = require("express");
const { Client } = require("pg");
const cors = require("cors");
const bodyparser = require("body-parser");
const config = require("./config");

//inicializando aplicação
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyparser.json());

var conString = config.urlConnection;
var client = new Client(conString);

client.connect(function (err) {
  if (err) {
    return console.error("Não foi possível conectar ao banco.", err);
  }
  client.query("SELECT NOW()", function (err, result) {
    if (err) {
      return console.error("Erro ao executar a query.", err);
    }
    console.log(result.rows[0]);
  });
});

app.get("/user", (req, res, test) => {
  try{
    client.query("SELECT * from usuarios", function (err, result) {
      if (err) {
        return console.error("Erro ao executar a query.", err);
      }
      console.log("chamou get usuários");
      res.send(result.rows);

      });
  }catch(error){
    console.log(error)
  }

});

app.listen(config.port, () =>
  console.log("Servidor funcionando na porta " + config.port)
);
