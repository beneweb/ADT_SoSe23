const express = require("express");

const router = express.Router();

var neo4j = require("neo4j-driver");
var driver = neo4j.driver(
  "bolt://127.0.0.1:7687",
  neo4j.auth.basic("neo4j", "Ekiem&10!")
);
var session = driver.session();

router.get("/Cohome", function (req, res) {
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
          img: record._fields[0].properties.img,
        });
      });
      console.log(SorteArr);
      res.render("coindex", {
        content: "./content/COHome",
        title: "Startseite",
        Sorten: SorteArr,
        header: '',
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});
//COforum
router.get("/COforum", function (req, res) {
  session
    .run(
      `
        match (p1:Person), (p2:Person), (p3:Person), (r:Rasse)
        where p1.Vorname=~".*" and (p2)-[:ist_vernetzt]->(p3) and (p1)-[:besitzt]-(r)
        return distinct p1, p3, r
        `
    )
    .then(function (result) {
      var personArr = [];
      result.records.forEach(function (record) {
        personArr.push({
          Vorn: record._fields[0].properties.Vorname,
          Nachn: record._fields[0].properties.Nachname,
          Hunder: record._fields[0].properties.Hunderasse,
          Nachnver: record._fields[1].properties.Nachname,
          img: record._fields[2].properties.Rasse,
        });
      });
      res.render("coindex", {
        Personen: personArr,
        content: "./content/COforum",
        title: "Forum",
        header: "Mitarbeiterforum",
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});

//login-register
router.get("/COlogin-register", function (req, res) {
  session;
  res.render("COlogin-register", {});
});
//post login-register
router.post("/registrieren/add", function (req, res) {
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

//productoverview
router.get("/COproductoverview", function (req, res) {
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
      res.render("coindex", {
        Sorten: SorteArr,
        content: "./content/COproductoverview",
        title: "Product Overview",
        header: "Product Overview",
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});

module.exports = router;
