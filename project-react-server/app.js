var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const bcrypt = require('bcrypt');
const saltRounds = 10
var jwt = require('jsonwebtoken')
const secret = 'fullstack'


app.use(cors())

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mydb'
});

/* login register*/
app.post('/register', jsonParser, function (req, res, next) {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        connection.execute(
            'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
            [req.body.username, req.body.email, hash,req.body.role], 
            function (err, results, fields) {
                if (err) {
                    res.json({ status: 'error', message: err });
                    return;
                }
                res.json({ status: 'ok' });
            }
        );
    });
});

app.post('/login', jsonParser, function (req, res, next) {
    connection.execute(
        'SELECT * FROM users WHERE email=?',
        [req.body.email],
        function (err, users, fields) {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            if (users.length === 0 || !bcrypt.compareSync(req.body.password, users[0].password)) {
                res.json({ status: 'error', message: 'Invalid email or password' });
                return;
            }

            var token = jwt.sign({ email: users[0].email, role: users[0].role }, secret);
            res.json({ status: 'ok', message: 'login success', token, role: users[0].role });
        }
    );
});

app.get('/admin-route', jsonParser, function (req, res, next) {
    const tokenHeader = req.headers.authorization;
    const token = tokenHeader.replace("Bearer ", "");
    var decoded = jwt.verify(token, secret);

    if (decoded.role === 'admin') {
       
        res.json({ status: 'success', message: 'Admin route accessed' });
    } else {
        res.json({ status: 'error', message: 'Unauthorized' });
    }
});


/* ปิดท้ายของส่วน login register*/

/* Userlist CRUD*/

app.get('/list', function (req, res, next) {

    connection.query(
        'SELECT * FROM users',
        function (err, results, fields) {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'ok', users: results });
        }
    );
});

app.post('/users', jsonParser, function (req, res, next) {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        connection.execute(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [req.body.username, req.body.email, hash],
            function (err, results, fields) {
                if (err) {
                    res.json({ status: 'error', message: err });
                    return;
                }
                res.json({ status: 'ok', message: 'User created successfully' });
            }
        );
    });
});

app.put('/edit/:id', jsonParser, function (req, res, next) {
    const userId = req.params.id;
    const { username, email, password } = req.body;

    bcrypt.hash(password, saltRounds, function (err, hash) {
        connection.execute(
            'UPDATE users SET username=?, email=?, password=? WHERE id=?',
            [username, email, hash, userId],
            function (err, results, fields) {
                if (err) {
                    res.json({ status: 'error', message: err });
                    return;
                }
                res.json({ status: 'ok', message: 'User updated successfully' });
            }
        );
    });
});

app.get('/edit/:id', function (req, res, next) {
    const userId = req.params.id;

    connection.query(
        'SELECT * FROM users WHERE id = ?',
        [userId],
        function (err, results, fields) {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'ok', user: results[0] });
        }
    );
});


app.delete('/delete/:id', function (req, res, next) {
    const userId = req.params.id;

    connection.execute(
        'DELETE FROM users WHERE id=?',
        [userId],
        function (err, results, fields) {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'ok', message: 'User deleted successfully' });
        }
    );
});

/* Userlist CRUD*/

/* CRUD BANNER */

app.use(express.json());

app.get('/images', (_req, res) => {
    const sql = 'SELECT * FROM images';
    connection.query(sql, (err, result) => {
        if (err) {
            res.status(500).send('Error retrieving images from database');
            return;
        }
        res.json(result);
    });
});


app.post('/images', (req, res) => {
    const { img } = req.body;
    const sql = 'INSERT INTO images (img) VALUES (?)';
    connection.query(sql, [img], (err, result) => {
        if (err) {
            res.status(500).send('Error inserting data into database');
            return;
        }
        res.json({ message: 'Image inserted successfully', id: result.insertId });
    });
});

app.put('/images/:id', (req, res) => {
    const { img } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE images SET img = ? WHERE id = ?';
    connection.query(sql, [img, id], (err, result) => {
        if (err) {
            res.status(500).send('Error updating data in database');
            return;
        }
        res.json({ message: 'Image updated successfully', id: result.insertId });
    });
});

app.delete('/images/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM images WHERE id = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) {
            res.status(500).send('Error deleting data from database');
            return;
        }
        res.json({ message: 'Image deleted successfully' });
    });
});

/* CRUD BANNER */




/*MapMapMapMapMapMapMapMapMapMapMapMapMapMapMapMapMapMapMap*/

app.get('/shops', (req, res) => {
    connection.query('SELECT * FROM shop', (error, results) => {
        if (error) {
            console.error('Error executing MySQL query:', error);
            res.status(500).json({ error: 'Error retrieving shops from database' });
        } else {
            res.json(results);
        }
    });
});

// POST a new shop
app.post('/shops', (req, res) => {
    const newShop = req.body;
    connection.execute(
        'INSERT INTO shop (name, latitude, longitude) VALUES (?, ?, ?)',
        [newShop.name, newShop.latitude, newShop.longitude],
        (error, results) => {
            if (error) {
                console.error('Error executing MySQL query:', error);
                res.status(500).json({ error: 'Error adding shop to database' });
            } else {
                res.json({ message: 'Shop added successfully', id: results.insertId });
            }
        }
    );
});

// PUT (update) a shop
app.put('/shops/:id', (req, res) => {
    const shopId = req.params.id;
    const updatedShop = req.body;
    connection.execute(
        'UPDATE shop SET name=?, latitude=?, longitude=? WHERE id=?',
        [updatedShop.name, updatedShop.latitude, updatedShop.longitude, shopId],
        (error, results) => {
            if (error) {
                console.error('Error executing MySQL query:', error);
                res.status(500).json({ error: 'Error updating shop in database' });
            } else {
                res.json({ message: `Shop updated successfully for ID ${shopId}` });
            }
        }
    );
});

// DELETE a shop
app.delete('/shops/:id', (req, res) => {
    const shopId = req.params.id;
    connection.execute(
        'DELETE FROM shop WHERE id=?',
        [shopId],
        (error, results) => {
            if (error) {
                console.error('Error executing MySQL query:', error);
                res.status(500).json({ error: 'Error deleting shop from database' });
            } else {
                res.json({ message: `Shop deleted successfully for ID ${shopId}` });
            }
        }
    );
});
/*MapMapMapMapMapMapMapMapMapMapMapMapMapMapMapMapMapMapMap*/

app.listen(1010, function () {
    console.log('CORS-enabled web server listening on port 80')
})

