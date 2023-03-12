// *** note for front-end-devs:
// *** to start server type in terminal: pm2 start server.js
// *** to stop server type in terminal: pm2 stop server.js
// *** to restart server type in terminal: pm2 restart server.js
// *** to delete server type in terminal: pm2 delete server.js
// *** to see all servers type in terminal: pm2 list

var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

// create express app
var app = express();
var cors = require('cors')
app.use(cors())
// configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = 'mysecret';
// set server port
var port = 8080;
// create mysql connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'data-web'//datakim
});
// set mysql table names
const tables = ["login", "customer", "order", "payment"];
// connect to database
connection.connect(function (err) {
    if (err) throw err
    console.log('You are now connected with mysql database...')
})
// define root route
app.get('/', function (req, res) {
    res.send('Hello World');
});
// retrieve all data from mysql database
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
// sign up process: insert data to mysql database
app.post('/signup', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const phone = req.body.phone;
    const address = req.body.address;
    const zipcode = req.body.zipcode;
    const hashedPassword = bcrypt.hashSync(password, 10);
    connection.query('SELECT * FROM customer WHERE username = ?',[username],
    function(error, results, fields){
        if(results.length > 0) {
            res.status(401).send({message: "Username already exists" });
        }else{
            connection.query("INSERT INTO login (username, password, email) VALUES (?, ?, ?) ", [username, hashedPassword, email], 
            function (error, results, fields) {
                if(error) {
                    res.status(401).send({message: "Username already exists" });
                } 
                connection.query("INSERT INTO customer (username, cus_fname, cus_lname, cus_phone, cus_address, cus_zipcode) VALUES (?, ?, ?, ?, ?, ?) ", [username, fname, lname, phone, address, zipcode], 
                function (error, results, fields) {
                    if(error) {
                        res.status(401).send({message: "Username already exists" });
                    }else{
                        res.status(200).send({message: "User registered successfully" });
                    }
                });
            });
        }
    });
})
// log in process: check if username and password match
app.post('/login', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const token = jwt.sign({ username }, secret, { expiresIn: '1h' });
    connection.query("SELECT * FROM login WHERE username = ?", [username], 
    function (error, results, fields) {
        if(results.length > 0) {
            const hashedPassword = results[0].password;
            const passwordMatch = bcrypt.compareSync(password, hashedPassword); // Compare the hashed password with the entered password
            if (passwordMatch) {
                res.json({ token });
            } else {
                res.status(401).send({passwordMatch:passwordMatch,password:password,hashedPassword:hashedPassword,message: "Invalid password" });
            }
        }else{
            res.status(401).send({results:results, username:username,password:password,hashedPassword:hashedPassword,message: "Invalid password" });
        }
    });
})
// log out process: clear token cookie
app.post('/logout', function(req, res) {
    // clear the token cookie
    res.clearCookie('token');
    // send a response to the client
    res.json({ message: 'Logged out successfully.' });
});

// verify action
app.post('/verify', function (req, res) {
    const password = req.body.password;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, secret);
    const username = req.body.username;
    connection.query("SELECT * FROM login WHERE username = ?", [username],
    function (error, results, fields) {
        if(results.length > 0) {
            const hashedPassword = results[0].password;
            const passwordMatch = bcrypt.compareSync(password, hashedPassword); // Compare the hashed password with the entered password
            if (passwordMatch) {
                res.json({ passwordMatch });
            } else {
                res.status(401).send({passwordMatch:passwordMatch,password:password,hashedPassword:hashedPassword,message: "Invalid password" });
            }
        }else{
            res.status(401).send({results:results, username:username,password:password,hashedPassword:hashedPassword,message: "Invalid password" });
        }
    });
})


// listen to port
app.listen(8080, function () {
    console.log('Node app is running on port ' + port);
})

