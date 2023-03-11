// REST API for crud mysql login table using express, body parser and mysql node modules

// import express, body parser and mysql modules
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

// create express app
var app = express();
var cors = require('cors')

var app = express()
app.use(cors())
// configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set server port
var port = 8080;
const tables = ["login", "customer", "order", "payment"];
// create mysql connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'data_web'
});

// connect to database
connection.connect(function (err) {
    if (err) throw err
    console.log('You are now connected with mysql database...')
})

// define root route
app.get('/', function (req, res) {
    res.send('Hello World');
});
for (var i = 0; i < tables.length; i++) {
    (function(table) {
    app.get('/' + table, function(req, res) {
        if(table === "order"){
            connection.query('SELECT * FROM `' + table+'`', function(error, results, fields) {
            if (error) throw error;
            return res.send(results);
            });
        }else{
            connection.query('SELECT * FROM ' + table, function(error, results, fields) {
                if (error) throw error;
                return res.send(results);
                });
        }
    })
    })(tables[i]);
}

app.get('/customer', function(req, res) {
        connection.query('SELECT * FROM customer', function(error, results, fields) {
        if (error) throw error;
        return res.send(results);
    });
})

app.post('/login', function (req, res) {
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    connection.query("INSERT INTO login (username, password, email) VALUES (?, ?, ?) ", [username, password, email], 
    function (error, results, fields) {
        if(error) {
            console.log(error)
            } 
            console.log(results)
        });
})

app.post('/customer', function (req, res) {
    console.log(req.body);
    const fname = req.body.fname;
    const lname = req.body.lname;
    const phone = req.body.phone;
    const address = req.body.address;
    const zipcode = req.body.zipcode;

    connection.query("INSERT INTO customer (cus_fname, cus_lname, cus_phone, cus_address, cus_zipcode) VALUES (?, ?, ?, ?, ?) ", [fname, lname, phone, address, zipcode], 
    function (error, results, fields) {
        if(error) {
            console.log(error)
            } 
            console.log(results)
        });
})

    
/*
// retrieve all table
app.get('/login', function (req, res) {
    connection.query('SELECT * FROM login', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'login list.' });
    });
})
app.get('/customer', function (req, res) {
    connection.query('SELECT * FROM customer', function (error, results, fields) {
        if (error) throw error;
        return res.send(results);
    });
})*/

// retrieve login with id
app.get('/login/:cus_id', function (req, res) {
    
        let cus_id = req.params.cus_id;
    
        if (!cus_id) {
            return res.status(400).send({ error: true, message: 'cus_id' });
        }
    
        connection.query('SELECT * FROM login where cus_id=?', cus_id, function (error, results, fields) {
            if (error) throw error;
            return res.send({ error: false, data: results[0], message: 'login list.' });
        });
    
    })

// update login with id
app.put('/login', function (req, res) {
        
            let login = req.body;
        
            if (!login) {
                return res.status(400).send({ error: login, message: 'Please provide login' });
            }
        
            connection.query("UPDATE login SET username = ?, dateCreate = ?, password = ?, email = ? WHERE cus_id", [login.username, login.dateCreate, login.password, login.email, login.cus_id], function (error, results, fields) {
                if (error) throw error;
                return res.send({ error: false, data: results, message: 'login has been updated successfully.' });
            });
        
        }
)

// delete login
app.delete('/login', function (req, res) { 
    let login = req.body;

    if (!login) {
        return res.status(400).send({ error: login, message: 'Please provide login' });
    }

    connection.query("DELETE FROM login WHERE cus_id = ?", [login.cus_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'loginlogin has been deleted successfully.' });
    });

})

// listen to port
app.listen(8080, function () {
    console.log('Node app is running on port ' + port);
})


