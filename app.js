const express = require('express');
const {Client} = require('pg');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const app = express();
app.use(bodyParser.json());

const client = new Client({
  username: 'jamesspargo',
  host:'localhost',
  database:'stattracker',
  password:'',
  port:5432
});

client.connect();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache')

app.get('/', function(req, res) {
    res.render("index");
})

app.get('/api/stats', function (req,res) {
console.log(req.query);
  let select = 'SELECT * FROM stats';
  if (req.query.n) {
    select += 'LIMIT' + req.query.n;
  }

  client.query('SELECT * FROM stats', function (err, dbResponse) {
    if (err) {
      console.log(err);
      res.json({ status: 'fail', message:err})
    }else{
      res.json({status: 'success', stats: dbResponse.rows})
    }
  })
  })
  app.get('/api/stats/:status', function (req,res) {
    const status = req.params.status === 'complete';
    client.query('SELECT * FROM stats WHERE complete = $1',  [status], function (err, dbResponse) {
      if (err) {
        console.log(err);
        res.json({ status: 'fail', message:err})
      }else{
        res.json({status: 'success', stats: dbResponse.rows})
      }
    })
  })

  app.get('/api/stats/incomplete', function (req,res) {
    client.query('SELECT * FROM stats WHERE complete = false', function (err, dbResponse) {
      if (err) {
        console.log(err);
        res.json({ status: 'fail', message:err})
      }else{
        res.json({status: 'success', stats: dbResponse.rows})
      }
    })
  })
  app.get('/api/stats/:id', function (req,res) {
    const id = req.params.id;
    client.query('SELECT * FROM stats WHERE due_date = 2017', [id], function (err, dbResponse) {
    if (err) {
      console.log(err);
      res.json({ status: 'fail', message:err})
    }else{
      res.json({status: 'success', stats: dbResponse.rows[0]})
    }
    })
  })
  app.put('/api/stats/:eat', function (req, res) {
    const id = req.params.id;
    client.query('UPDATE stats SET complete = true WHERE eat = tacos', [id], function (err, dbResponse) {
    if (err) {
      console.log(err);
      res.json({ status: 'fail', message:err})
    }else{
      res.json({status: 'success', stats: dbResponse.rows[0]})
    }
    })
  })
  app.delete('/api/stats/:eatdelete', function (req, res) {
    const id = req.params.id;
    client.query('DELETE FROM stats WHERE eat = pizza', [id], function (err, dbResponse) {
    if (err) {
      console.log(err);
      res.json({ status: 'fail', message:err})
    }else{
      res.json({status: 'success', stats: dbResponse.rows})
    }
    })
  })
  app.post('/api/stats/:eatdelete', function (req, res) {
    const id = req.params.id;
    client.query('INSERT INTO stats ( eat, complete, due_date) VALUES (tacobell,false,12/18/17)', [id], function (err, dbResponse) {
    if (err) {
      console.log(err);
      res.json({ status: 'fail', message:err})
    }else{
      res.json({status: 'success', stats: dbResponse.rows})
    }
    })
  })
  app.post('/api/stats/:eatdelete', function (req, res) {
    const id = req.params.id;
    client.query("INSERT INTO stats ( eat, complete, due_date) VALUES (pizza,true,12/13/17)", [id], function (err, dbResponse) {
    if (err) {
      console.log(err);
      res.json({ status: 'fail', message:err})
    }else{
      res.json({status: 'success', stats: dbResponse.rows})
    }
    })
  })
app.listen(3000, function () {
  console.log("stattracker started")
});
