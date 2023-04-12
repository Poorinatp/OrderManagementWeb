// *** note for front-end-devs:
// *** to start server type in terminal: pm2 start server.js
// *** to stop server type in terminal: pm2 stop server.js
// *** to restart server type in terminal: pm2 restart server.js
// *** to delete server type in terminal: pm2 delete server.js
// *** to see all servers type in terminal: pm2 list

var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
const pdfService = require('./pdf-service');
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
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');
const path = require('path');
const { exec } = require('child_process');
const mysqldump = require('mysqldump');
const fs = require('fs');
// set server port
var port = 8080;
// create mysql connection
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'WebAppDB'
});
// set mysql table names
const tables = ["login", "customer", "order", "payment", "product_detail", "product_inventory", "product_order"];
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
            res.status(401).send({message: "Username already exists 1" });
        }else{
            connection.query("INSERT INTO login (username, password, email) VALUES (?, ?, ?) ", [username, hashedPassword, email], 
            function (error, results, fields) {
                if(error) {
                    res.status(401).send({message: "Username already exists 2" });
                } 
                connection.query("INSERT INTO customer (username, cus_fname, cus_lname, cus_phone, cus_address, cus_zipcode) \
                VALUES (?, ?, ?, ?, ?, ?) ", [username, fname, lname, phone, address, zipcode], 
                function (error, results, fields) {
                    if(error) {
                        res.status(401).send({message: error.message +" Username already exists 3"});
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
        if(results.length > 0 && results[0].username !== "admin") {
            const hashedPassword = results[0].password;
            const passwordMatch = bcrypt.compareSync(password, hashedPassword); // Compare the hashed password with the entered password
            if (passwordMatch) {
                //res.status.send({message: "successfully password"});
                res.json({ token });
            } else {
                res.status(401).send({message: "Invalid password"+password+" "+hashedPassword });
            }
        }else{
            res.status(401).send({message: "no user Fold" });
        }
    });
})

// log in process: check if username and password match
app.post('/loginAdmin', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const token = jwt.sign({ username }, secret, { expiresIn: '1h' });
    connection.query("SELECT * FROM login WHERE username = ?", [username],
    function (error, results, fields) {
        if(results.length > 0 && results[0].username === "admin") {
            const hashedPassword = results[0].password;
            const passwordMatch = bcrypt.compareSync(password, hashedPassword); // Compare the hashed password with the entered password
            if (passwordMatch) {
                //res.status.send({message: "successfully password"});
                res.json({ token });
            } else {
                res.status(401).send({message: "Invalid password"+password+" "+hashedPassword });
            }
        }else{
            res.status(401).send({message: "no user Fold" });
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
app.get('/verify', function (req, res) {
    const password = req.body.password;
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
// add product to database
app.post('/addproduct', function (req, res) {
    const product_type = req.body.product_type;
    const product_gender = req.body.product_gender;
    const product_brand = req.body.product_brand;
    const product_description = req.body.product_description;
    const product_price = req.body.product_price;
    const product_image = req.body.product_image;
    const promotion_id = req.body.promotion_id;
    connection.query("INSERT INTO product_detail (product_type, product_gender, product_brand, product_description, product_price, promotion_id, product_urlimg) \
    VALUES (?, ?, ?, ?, ?, ?, ?) ", [product_type, product_gender, product_brand, product_description,product_price, promotion_id, product_image],
    function (error, results, fields) {
        if(error) {
            res.status(401).send({message: error.message + " Username already exists 3"});
        }else{
            res.status(200).send({message: "Added" });
        }
    });
})


// retrieve data from mysql database by id
for (var i = 0; i < tables.length; i++) {
    (function(table) {
    if(table==="product_detail"||table==="product_inventory"||table==="product_order"){
        table = table.replace(/_/g, "");
        // console.log(table);
    }else{}
    app.get('/' + table + '/:id', function(req, res) {
        if(table === "order"){
            connection.query('SELECT * FROM `'+table+'` WHERE '+table+'_id = ?',[req.params.id],
            function(error, results, fields){
                if(results.length > 0) {
                    res.status(200).send(results);
                }else{
                    res.status(401).send({message: "User not found" });
                }
            });
        }else if(table === "login"){
            res.status(401).send({message: "User not found" });
        }else if(table === "customer"){
            connection.query('SELECT * FROM '+table+' WHERE cus_id = ?',[req.params.id],
            function(error, results, fields){
                if(results.length > 0) {
                    res.status(200).send(results);
                }else{
                    res.status(401).send({message: "User not found" });
                }
            });
        }else if(table === "productdetail"){
            connection.query('SELECT * FROM product_detail WHERE product_id = ?',[req.params.id],
            function(error, results, fields){
                if(results.length > 0) {
                    res.status(200).send(results);
                }else{
                    res.status(401).send({message: "Product not found" });
                }
            });
        }else if(table === "productinventory"){
            connection.query('SELECT * FROM product_inventory WHERE product_id = ?',[req.params.id],
            function(error, results, fields){
                if(results.length > 0) {
                    res.status(200).send(results);
                }else{
                    res.status(401).send({message: "Product not found" });
                }
            });
        }else if(table === "productorder"){
            connection.query('SELECT * FROM product_order WHERE order_id = ?',[req.params.id],
            function(error, results, fields){
                if(results.length > 0) {
                    res.status(200).send(results);
                }else{
                    res.status(401).send({message: "Product not found" });
                }
            });
        }else{
            connection.query('SELECT * FROM '+table+' WHERE '+table+'_id = ?',[req.params.id],
            function(error, results, fields){
                if(results.length > 0) {
                    res.status(200).send(results);
                }else{
                    res.status(401).send({message: "User not found" });
                }
            });
        }
    })
    })(tables[i]);
}

// retrieve customer data from mysql database by username
app.get('/profile/:username', function(req, res) {
    const username = req.params.username;
    // console.log('username:', username);
    connection.query('SELECT * FROM customer WHERE username = ?', [username],
      function(error, results, fields){
        if (error) {
          console.log('Error:', error);
          res.status(200).send({ message: 'Server error' });
          return;
        }
        if (results.length > 0) {
          res.status(200).send(results);
        } else {
          res.status(200).send({ message: 'User not found', username: username });
        }
      }
    );
  });

// retrieve product data from mysql database by id

app.get('/productinventory/:id', function(req, res) {
    const product_id = parseInt(req.params.id);
    connection.query('SELECT * FROM product_inventory WHERE product_id = ?',[product_id],
    function(error, results, fields){
        if(results.length > 0) {
            res.status(200).send(results);
        }else{
            res.status(200).send({message: "Product sold out" });
        }
    });
})

// retrieve product data from mysql database by id
app.get('/productdetail/:id', function(req, res) {
    const product_id = parseInt(req.params.id);
    connection.query('SELECT * FROM product_detail WHERE product_id = ?',[product_id],
    function(error, results, fields){
        if(results.length > 0) {
            res.status(200).send(results);
        }else{
            res.status(200).send({message: "Product not found" });
        }
    });
})

// retrieve data from order table, product_order table and product table from mysql database
app.get('/orderline', function(req, res) {
    connection.query('SELECT * FROM `order` INNER JOIN product_order ON `order`.order_id = product_order.order_id INNER JOIN product_detail ON product_order.product_id = product_detail.product_id',
    function(error, results, fields){
        if(results.length > 0) {
            res.status(200).send(results);
        }else{
            res.status(401).send({message: "Order not found" });
        }
    });
})
// retrieve data from order table, product_order table and product table from mysql database by order_id
app.get('/orderline/:id', function(req, res) {
    const order_id = parseInt(req.params.id);
    connection.query('SELECT * FROM `order` INNER JOIN product_order ON `order`.order_id = product_order.order_id INNER JOIN product_detail ON product_order.product_id = product_detail.product_id WHERE `order`.order_id = ?',[order_id],
    function(error, results, fields){
        if(results.length > 0) {
            res.status(200).send(results);
        }else{
            res.status(401).send({message: "Order not found" });
        }
    });
})

// retrieve data from order table, product_order table and product table from mysql database by cus_id
app.get('/orderline/customer/:id', function(req, res) {
    const cus_id = parseInt(req.params.id);
    connection.query('SELECT * FROM `order` INNER JOIN product_order ON `order`.order_id = product_order.order_id INNER JOIN product_detail ON product_order.product_id = product_detail.product_id WHERE `order`.cus_id = ?',[cus_id],
    function(error, results, fields){
        if(error)   console.log(error);
        if(results.length > 0) {
            res.status(200).send(results);
        }else{
            res.status(401).send({message: "Order not found" });
        }
    });
})

// check email and order_id from mysql database
app.post('/orderlinestatus/', function(req, res) {
    const { email, order_id } = req.body;
    connection.query('SELECT username FROM login WHERE email = ?',[email],
    function(error, results, fields){
        if(error){
            res.status(500).send({message: "email not found" });
        }
        else{
            connection.query('SELECT cus_id FROM customer WHERE username = ?',[results[0].username],
            function(error, results, fields){
                if(error){
                    res.status(500).send({message: "username not found" });
                }
                else{
                    connection.query('SELECT * FROM `order` WHERE cus_id = ? AND order_id = ?',[results[0].cus_id, order_id],
                    function(error, results, fields){
                        if(results.length > 0) {
                            res.status(200).send(results);
                        }else{
                            res.status(401).send({message: "Order not found" });
                        }
                    }
                    );
                }
            }
            );
        }
    }
    );
})


// update customer data from mysql database by id
app.put('/profile/:id', function(req, res) {
    const cus_id = parseInt(req.params.id);
    const { cus_fname, cus_lname, cus_phone, cus_address, cus_zipcode } = req.body;
    connection.query('UPDATE customer SET cus_fname = ?, cus_lname = ?, cus_phone = ?, cus_address = ?, cus_zipcode = ? WHERE cus_id = ?',
    [cus_fname, cus_lname, cus_phone, cus_address, cus_zipcode, cus_id],
    function(error, results, fields) {
        if (error) {
        res.status(500).send({ message: "Error updating customer data" });
        } else if (results.affectedRows > 0) {
        res.status(200).send({ message: "Customer updated successfully" });
        } else {
        res.status(401).send({ message: "Customer not found" });
        }
    }
    );
});

// update order status from mysql database by id
app.put('/updateorder/:id', function(req, res) {
    const order_id = parseInt(req.params.id);
    const { order_status } = req.body;
    connection.query('UPDATE `order` SET order_status = ? WHERE order_id = ?', [order_status, order_id],
    function(error, results, fields) {
        if (error) {
        res.status(500).send({ message: "Error updating order status", error: error });
        } else if (results.affectedRows > 0) {
        res.status(200).send({ message: "Order status updated successfully" });
        } else {
        res.status(401).send({ message: "Order not found" });
        }
    }
    );
});

// generate tax invoice for order by id 
app.get('/taxinvoice/:id', function(req, res) {
    const order_id = parseInt(req.params.id);
    connection.query('SELECT o.*, po.*, pd.*, c.* FROM `order` o \
    JOIN product_order po ON o.order_id = po.order_id \
    JOIN product_detail pd ON po.product_id = pd.product_id \
    JOIN customer c ON o.cus_id = c.cus_id \
    WHERE o.order_id = ?',[order_id],
    function(error, results, fields){
        if(error) {
            res.status(401).send({ message: error.message, error: error });
        } else if(results.length > 0) {
            const customerName = results[0].cus_fname+' '+results[0].cus_lname;
            const customerAddress = results[0].cus_address+', '+results[0].cus_zipcode;
            const orderDate = results[0].order_date;
            //const orderDate = date.toISOString().slice(0, 10).split('T')[0];
            //console.log(date);
            const productDetails = results.map(row => ({
                // band: keep 3 character and to upper case
                brand: (row.product_brand).toUpperCase().slice(0, 3)+"-"+row.product_id,
                name: row.product_description,
                price: (row.product_price / 1.07).toFixed(2),
                quantity: row.product_amount,
                // if second decimal is lower than 5, round down, else round up
                subtotal: (row.product_price / 1.07 * row.product_amount).toFixed(2)
              }));
              
            const subtotal = productDetails.reduce((sum, product) => sum + parseFloat(product.subtotal), 0).toFixed(2);
            const taxRate = 0.07; // Assuming a 7% tax rate
            const taxAmount = (subtotal * taxRate).toFixed(2);
            const total = (parseFloat(subtotal) + parseFloat(taxAmount)).toFixed(2);
            //const doc = new PDFDocument();
            const fileName = `taxinvoice_${order_id}.pdf`;
            // Send the PDF back to the client
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment;filename="${fileName}"`);
            pdfService.buildPDF(
                res,
                customerName,
                customerAddress,
                orderDate,
                productDetails,
                subtotal,
                taxRate,
                taxAmount,
                total,
                order_id
            )
        }else{
            res.status(401).send({message: "Order not found" });
        }
      });
  })


// delete product from mysql database by id
app.delete('/productdetail/delete', function(req, res) {
    const product_id = req.body.product_id;
    connection.query('DELETE FROM product_detail WHERE product_id = ?',[product_id],
    function(error, results, fields){
        if(results.affectedRows > 0) {
            res.status(200).send({message: "Product deleted successfully" });
        }else{
            res.status(401).send({message: "Product not found" });
        }
    });
})

// delete list of product from mysql database by id
app.delete('/productinventory/deletemultiple', function(req, res) {
    const array = req.body.product_id_list;
    if (!array || array.length === 0) {
      return res.status(200).send({ message: 'Invalid product IDs', array });
    }
    const placeholders = array.map(() => '?').join(',');
    const sql = `DELETE FROM product_detail WHERE product_id IN (${placeholders})`;
    
    connection.query(sql, array, function(error, results, fields) {
      if (error) {
        return res.status(500).send({ message: 'Internal server error' });
      }
      // check if any rows were deleted
      if (results.affectedRows > 0) {
        return res.status(200).send({ message: 'Products deleted successfully' });
      }
      return res.status(200).send({ message: 'No products found with the specified IDs' });
    });
  });
// delete product inventory from mysql database by id
app.delete('/productinventory/delete', function(req, res) {
    const product_id = req.body.product_id;
    connection.query('DELETE FROM product_inventory WHERE product_id = ?',[product_id],
    function(error, results, fields){
        if(error) {
            console.log(error.message);
            res.status(500).send({message: "Error deleting product inventory"});
        }else if(results.affectedRows > 0) {
            res.status(200).send({message: "Product inventory deleted successfully" });
        }else{
            res.status(401).send({message: "Product inventory not found" });
        }
    });
})


// add list of product inventory to mysql database
app.post('/productinventory/addmultiple', function(req, res) {
    const data = req.body;
    // loop through each item in the data array and insert into MySQL database
    data.forEach(function(item) {
        const sql = `INSERT INTO product_inventory (product_id, product_size, product_quantity) VALUES ('${item.product_id}', '${item.size}', '${item.quantity}')`;
        connection.query(sql, function(error, results, fields) {
            if(error) {
                res.status(401).send({message: error.message + " Username already exists 3"});
            }else{
                res.status(200).send({message: "Added" ,array:data});
            }
        });
    });
});


// create order, product_order, payment in mysql database product_id,product_size,product_amount is store in array
app.post('/order/create', function(req, res) {
    const { username, order_amount, order_price, order_Shipmethod, order_status, product_id, product_size, product_amount, payment_totalvat, payment_bill, payment_method, payment_status } = req.body;
    const sql = `SELECT cus_id FROM customer WHERE username = '${username}'`;
    if(username==null||username=="")
    {
        res.status(401).send({message: "Username is empty" });
    }else{
    connection.query(sql, function(error, results, fields) {
        if(error) {
            console.log(error.message);
            res.status(401).send({message: error.message + " Username already exists 1"});
        }else{
            const cus_id = results[0].cus_id;
            const sql1 = `INSERT INTO \`order\` (cus_id, order_amount, order_price, order_Shipmethod, order_status) VALUES ('${cus_id}', '${order_amount}', '${order_price}', '${order_Shipmethod}', '${order_status}')`;
            connection.query(sql1, function(error, results, fields) {
                if(error) {
                    console.log(error.message);
                    res.status(401).send({message: error.message + " Username already exists 2"});
                }else{
                    const order_id = results.insertId;
                    console.log("payment_bill: ", payment_bill);
                    const sql2 = `INSERT INTO payment (order_id, payment_totalvat, payment_bill, payment_method, payment_status) VALUES ('${order_id}', '${payment_totalvat}', '${payment_bill}', '${payment_method}', '${payment_status}')`;
                    connection.query(sql2, function(error, results, fields) {
                        if(error) {
                            console.log(error.message);
                            res.status(401).send({message: error.message + " Username already exists 3"});
                        }else{
                            const isError = false;
                            for (var i = 0; i < product_id.length; i++) {
                                // use a closure to capture the value of product_id for each iteration
                                (function(product_id_i,product_size_i,product_amount_i) {
                                  // check inventory
                                  const sql3 = `SELECT product_quantity FROM product_inventory WHERE product_id = '${product_id_i}' AND product_size = '${product_size[i]}'`;
                                  connection.query(sql3, function(error, results, fields) {
                                    if(error) {
                                        isError = true;
                                      console.log(error.message);
                                    }else{
                                      const product_quantity = results[0].product_quantity;
                                      if(product_quantity < product_amount[i]) {
                                        res.status(401).send({message: "Not enough inventory" });
                                      }else{
                                        const sql4 = `INSERT INTO product_order (order_id, product_id, product_size, product_amount) VALUES ('${order_id}', '${product_id_i}', '${product_size_i}', '${product_amount_i}')`;
                                        connection.query(sql4, function(error, results, fields) {
                                          if(error) {
                                            isError = true;
                                            console.log(error.message);
                                          }else{
                                            const sql5 = `UPDATE product_inventory SET product_quantity = product_quantity - '${product_amount_i}' WHERE product_id = '${product_id_i}' AND product_size = '${product_size_i}'`;
                                            connection.query(sql5, function(error, results, fields) {
                                              if(error) {
                                                isError = true;
                                                console.log(error.message);
                                              }
                                            });
                                          }
                                        });
                                      }
                                    }
                                  });
                                })(product_id[i],product_size[i],product_amount[i]); // pass the value of product_id for this iteration to the closure
                              }                              
                                if(!isError) {
                                    res.status(200).send({message: "Order created successfully" });
                                }
                        }
                    });
                }
            });
        }
    });
}
})


// add product inventory to mysql database
app.post('/productinventory/add', function(req, res) {
    const { product_id, product_size, product_quantity } = req.body;
    const sql = `INSERT INTO product_inventory (product_id, product_size, product_quantity) VALUES ('${product_id}', '${product_size}', '${product_quantity}')`;
    connection.query(sql, function(error, results, fields) {
        if(error) {
            res.status(401).send({message: error.message + " Username already exists 3"});
        }else{
            res.status(200).send({message: "Added" });
        }
    });
});

app.get('/backup', function(req, res) {
    const backupPath = path.join(__dirname, 'backupdata', 'backup.sql');
    const options = {
        connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'WebAppDB',
        },
        dumpToFile: backupPath
    };
    mysqldump(options)
        .then(() => {
            res.status(200).send({message: "Backup created"});
        })
        .catch(error => {
            console.error(`Backup error: ${error.message}`);
            res.status(500).send({ message: error.message });
        });
});

// restore database from backup file backup.sql in backupdata folder
app.get('/restore', function(req, res) {
    const backupPath = path.join(__dirname, 'backupdata', 'backup.sql');
    const options = {
            connection: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'WebAppDB',
            },
            dumpToFile: backupPath
        };
    mysqlrestore(options)
        .then(() => {
            res.status(200).send({message: "Backup restored"});
        })
        .catch(error => {
            console.error(`Restore error: ${error.message}`);
            res.status(500).send({ message: error.message });
        });
});


// listen to port
app.listen(8080, function () {
    console.log('Node app is running on port ' + port);
})
