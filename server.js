const express = require('express');

const app = express();

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public')); //make files in public accsessible

//array of users
const users = [ 
    {
        email: 'benjamin@icloud.com',
        password: 'benja123'
    },
    {
        email: 'john@gmail.com',
        password: 'john123'
    },
    {
        email: 'jane@hotmail.com',
        password: 'jane123'
    }
];


// LOGIN Route
app.get('/', (req, res) => {

    res.sendFile(__dirname + '/public/index.html');

});


// Account Route
app.get('/account', (req, res) => {

    res.sendFile(__dirname + '/public/account.html');

});


// Login Attempt
app.post('/login/attempt', (req, res) => {

    const { email, password } = req.body;

    const user = users.find(
        user => user.email === email && user.password === password
    );

    if (user) {         //if user = true (if credentials is coorect)

        res.json({      //re route to account page
            ok: true
        });

    } else {

        res.json({      //return error message
            ok: false,
            errors: {}
        });

    }

});


// START SERVER
app.listen(PORT, () => {    //
    console.log(`Server running at http://localhost:${PORT}`);
});