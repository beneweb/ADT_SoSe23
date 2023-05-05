var express = require("express");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");
var neo4j = require("neo4j-driver");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static("public"));
app.use(express.static(path.join(__dirname, "views")));

var customerRoutes = require("./routes/customerRoutes");

var driver = neo4j.driver(
  "bolt://127.0.0.1:7687",
  neo4j.auth.basic("neo4j", "Ekiem&10!")
);
var session = driver.session();

// get login
app.get("/login", function (req, res) {
  session;
  res.render("login", {});
});
//neues Essen
app.get("/productadd", function (req, res) {
  session;
  res.render("productadd", {});
});
// post login
app.post("/login/post", function (req, res) {
  var Nachname = req.body.Nachname;
  var unterKategorie = req.body.unterKategorie;

  session
    .run(
      `match (p:Person{Nachname:'${Nachname}'})-[:ist_ein]->(u:unterKategorie{Name:'${unterKategorie}'})
    return p
    `
    )
    .then(function (result) {
      var pw = [];
      result.records.forEach(function (record) {
        pw.push({
          Passwort: record._fields[0].properties.Passwort,
        });
      });
      res.render("login", { passw: pw });
    })
    .catch(function (err) {
      console.log(err);
    });
});
//
app.get("/Hunderasse", function (req, res) {
  session
    .run(
      `
        match(s:Sorte),(m:Marke)
        where (s:Sorte)-[:wird_produziert_von]->(m:Marke)
        return s
        `
    )
    .then(function (result) {
      var SorteArr = [];
      result.records.forEach(function (record) {
        SorteArr.push({
          Name: record._fields[0].properties.Name,
          Preis: record._fields[0].properties.Preis,
          Stückzahl: record._fields[0].properties.Stückzahl,
          kcal: record._fields[0].properties.kcal,
          img: record._fields[0].properties.img,
        });
      });
      res.render("Hunderasse", {
        Sorten: SorteArr,
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});

//CO-WO-Portal
app.get("/", function (req, res) {
  session;
  res.render("index", {});
});

app.use("/customer/", customerRoutes);
//CO-Portal
//COhome
//WO-Portal
//MA-chat
app.get("/MAchat", function (req, res) {
  session;
  res.render("MAchat", {});
});
//MAForum
app.get("/MAforum", function (req, res) {
  session;
  res.render("MAforum", {});
});
//MA add
app.post("/MAadd", function (req, res) {
  var rolle = req.body.rolle;
  var vorname = req.body.vorname;
  var nachname = req.body.nachname;
  var datum = req.body.datum;
  var email = req.body.email;
  var passwort = req.body.passwort;
  session
    .run(
      `MERGE(u:unterKategorie{Name:'${rolle}'}) MERGE(p:Person{Vorname:'${vorname}',Nachname:'${nachname}',Geburtsdatum:date('${datum}'),EMail:'${email}',Passwort:'${passwort}'}) MERGE(p)-[:ist_ein]->(u)`
    )
    .then(function (result) {
      res.redirect("/");
      session.close();
    })
    .catch(function (err) {
      console.log(err);
    });
  res.redirect("/MAforum");
});
//MAhome
app.get("/MAhome", function (req, res) {
  session;
  res.render("MAhome", {});
});
//MASorten
app.get("/MAsorte", function (req, res) {
  session;
  res.render("MAsorte", {});
});
//MASorten add
app.post("/Sorten/add", function (req, res) {
  var vorname = req.body.vorname;
  var rolle = req.body.rolle;
  var nachname = req.body.nachname;
  var datum = req.body.datum;
  var email = req.body.email;
  var passwort = req.body.passwort;
  session
    .run(
      `MERGE(u:unterKategorie{Name:'${rolle}'}) MERGE(p:Person{Vorname:'${vorname}',Nachname:'${nachname}',Geburtsdatum:date('${datum}'),EMail:'${email}',Passwort:'${passwort}'}) MERGE(p)-[:ist_ein]->(u)`
    )
    .then(function (result) {
      res.redirect("/");
      session.close();
    })
    .catch(function (err) {
      console.log(err);
    });
  res.redirect("/COhome");
});

app.listen(3000);
console.log("Server Started on Port 3000");

module.exports = app;
