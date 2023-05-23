const express = require("express");

const router = express.Router();

var neo4j = require("neo4j-driver");
var driver = neo4j.driver(
  "bolt://127.0.0.1:7687",
  neo4j.auth.basic("neo4j", "Ekiem&10!")
);
var session = driver.session();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded());


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
      match (p1:Person)-[:besitzt]-(r:Rasse), (p2:Person{Vorname:'Benedikt'})
      where not exists ((p2)-[:ist_vernetzt]-(p1))
      return p1 as Person1, NULL as Person2, r

      union

      match (r:Rasse)-[:besitzt]-(p1:Person{Vorname:'Benedikt'})-[:ist_vernetzt]->(p2:Person)
      return NULL as Person1, p2 as Person2, r
      `
    )
    .then(result => {
      const data = {
        p1s: [],
        p2s: [],
        rs: [],
      };

      result.records.forEach(record => {

        const p1s = record.get('Person1');
        const p2s = record.get('Person2');
        const rs = record.get('r');

        if (p1s) {
          const p1Data = {
            Vorn: p1s.properties.Vorname,
            Nachn: p1s.properties.Nachname,
            ident: p1s.properties.img
          };
          data.p1s.push(p1Data);
        }
        if (p2s) {
          const p2Data = {
            Vorn: p2s.properties.Vorname,
            Nachn: p2s.properties.Nachname,
            id: p2s.properties.id
          };
          data.p2s.push(p2Data);
        }
        if (rs) {
          const rData = {
            Rasseimg: rs.properties.img
          };
          data.rs.push(rData)
        }

      });
      res.render("coindex", {
        data: data,
        content: "./content/COforum",
        title: "Forum",
        header: "Mitarbeiterforum",
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});
//CO-forum-post
router.post("/COforum", function (req, res) {

  var pushVorname = req.body.selectedoption;
  var selectedremove = req.body.selectedremove;

  if (typeof pushVorname !== 'undefined' && pushVorname) {
    session
      .run(
        `
      match (p1:Person), (p2:Person{Vorname:'Benedikt'})
      where not exists ((p2)-[:ist_vernetzt]-(p1))
      return p1 as Person1, NULL as Person2

      union

      match (p1:Person), (p2:Person)
      where p1.Vorname='Benedikt' and p2.Vorname='${pushVorname}'
      create (p1)-[:ist_vernetzt]->(p2)
      return NULL as Person1, p2 as Person2

      union

      match (p1:Person{Vorname:'Benedikt'})-[:ist_vernetzt]->(p2:Person)
      return NULL as Person1, p2 as Person2
      `
      )
      .then(result => {
        const data = {
          p1s: [],
          p2s: [],
          Rasse: [],
        };

        result.records.forEach(record => {

          const p1s = record.get('Person1');
          const p2s = record.get('Person2');

          if (p1s) {
            const p1Data = {
              Vorn: p1s.properties.Vorname
            };
            data.p1s.push(p1Data);
          }
          if (p2s) {
            const p2Data = {
              Vorn: p2s.properties.Vorname
            };
            data.p2s.push(p2Data);
          }
        });
        res.render("coindex", {
          data: data,
          content: "./content/COforum",
          title: "Forum",
          header: "Mitarbeiterforum",
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  if (typeof selectedremove !== 'undefined' && selectedremove) {
    session
      .run(
        `
      match (p1:Person), (p2:Person{Vorname:'Benedikt'})
      where not exists ((p2)-[:ist_vernetzt]-(p1))
      return p1 as Person1, NULL as Person2

      union

      match (p1:Person{Vorname:'Benedikt'})-[r:ist_vernetzt]-(p2:Person{Vorname:'${selectedremove}'})
      delete r
      return NULL as Person1, p2 as Person2

      union

      match (p1:Person{Vorname:'Benedikt'})-[:ist_vernetzt]->(p2:Person)
      return NULL as Person1, p2 as Person2
      `
      )
      .then(result => {
        const data = {
          p1s: [],
          p2s: [],
          Rasse: []
        };

        result.records.forEach(record => {

          const p1s = record.get('Person1');
          const p2s = record.get('Person2');

          if (p1s) {
            const p1Data = {
              Vorn: p1s.properties.Vorname
            };
            data.p1s.push(p1Data);
          }
          if (p2s) {
            const p2Data = {
              Vorn: p2s.properties.Vorname
            };
            data.p2s.push(p2Data);
          }

        });
        res.render("coindex", {
          data: data,
          content: "./content/COforum",
          title: "Forum",
          header: "Mitarbeiterforum",
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }





});
router.get('/data', (req, res) => {
  const id = req.query.id

  session
    .run(
      `
      match (p:Person{Vorname:"${id}"})-[:ist_vernetzt]->(k:Person)
      return k as kontakt
      `
    )
    .then(result => {
      const data = {
        ks: [],
      };

      result.records.forEach(record => {

        const ks = record.get('kontakt');

        if (ks) {
          const kData = {
            Vorn: ks.properties.Vorname,
          };
          data.ks.push(kData);
        }
      });
      res.send(data)
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
