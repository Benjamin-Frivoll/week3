const express = require('express');

const app = express();

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const users = [
    {
        email: 'benjamin@example.com',
        password: 'password123'
    },
    {
        email: 'john@example.com',
        password: 'john123'
    },
    {
        email: 'jane@example.com',
        password: 'jane123'
    }
];


// LOGIN PAGE
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Login</title>

            <style>
                .hidemessage {
                    display: none;
                }

                .showmessage {
                    display: block;
                }
            </style>
        </head>

        <body>
            <h1>Login</h1>

            <form id="loginForm">

                <label>Email:</label>
                <input 
                    type="email" 
                    id="email" 
                    required
                >

                <br><br>

                <label>Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    required
                >

                <br><br>

                <button type="submit">Login</button>

            </form>

            <div id="errormsg" class="hidemessage">
                User credentials do not match
            </div>

            <script>

                const loginForm = document.getElementById('loginForm');

                loginForm.addEventListener('submit', async (event) => {

                    event.preventDefault();

                    const email = document.getElementById('email').value;
                    const password = document.getElementById('password').value;

                    const response = await fetch('/login/attempt', {

                        method: 'POST',

                        headers: {
                            'Content-Type': 'application/json'
                        },

                        body: JSON.stringify({
                            email: email,
                            password: password
                        })

                    });

                    const result = await response.json();

                    const errorMessage = document.getElementById('errormsg');

                    if (result.ok === false) {

                        errorMessage.classList.remove('hidemessage');

                        errorMessage.classList.add('showmessage');

                    } else {

                        errorMessage.classList.remove('showmessage');

                        errorMessage.classList.add('hidemessage');

                        window.location.href = '/account';

                    }

                });

            </script>

        </body>
        </html>
    `);
});


// ACCOUNT PAGE
app.get('/account', (req, res) => {

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Account</title>
        </head>

        <body>

            <h2>My Account</h2>

            <img 
                src="https://via.placeholder.com/150" 
                alt="Profile image"
            >

            <p>Name: Benjamin Frivoll</p>
            <p>Email: benjamin@example.com</p>
            <p>Account type: Student</p>

        </body>
        </html>
    `);

});


// LOGIN ATTEMPT
app.post('/login/attempt', (req, res) => {

    const { email, password } = req.body;

    const user = users.find(
        user => user.email === email && user.password === password
    );

    if (user) {

        res.json({
            ok: true
        });

    } else {

        res.json({
            ok: false,
            errors: {}
        });

    }

});


// START SERVER
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});