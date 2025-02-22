# Coderhouse Backend Challenges

Coderhouse backend course challenges.

## Index

- [Challenge 1 (Classes)](#ch01)
- [Challenge 2 (File Management)](#ch02)
- [Challenge 3 (Node.js-Express Server)](#ch03)
- [Challenge 4 (API RESTfull)](#ch04)
- [Challenge 5 (Template Engines)](#ch05)
- [Challenge 6 (WebSockets)](#ch06)
- [Challenge 7 (SQL Databases & Knex.js)](#ch07)
- [Challenge 8 (MongoDB)](#ch08)
- [Challenge 9 (Mocks & Normalization)](#ch09)
- [Challenge 10 (Simple Login)](#ch10)
- [Challenge 11 (Passport Login)](#ch11)
- [Challenge 12 (Process Object)](#ch12)
- [Challenge 13 (Load Balancing with Nginx)](#ch13)
- [Challenge 14 (Loggers, GZIP & Performance Analysis)](#ch14)
- [Challenge 15 (Heroku Deploy)](#ch15)
- [Challenge 16 (Layered Architecture)](#ch16)
- [Challenge 17 (Singleton and DAO patterns)](#ch17)
- [Challenge 18 (API Testing & Documentation)](#ch18)
- [Challenge 19 (GraphQL)](#ch19)

<div id='ch01' />

## Challenge 1 (Classes)

Create a class User and invoke all its methods.

```js
export class User {
  constructor(name, lastname, books, pets) {
    this.name = name
    this.lastname = lastname
    this.books = books
    this.pets = pets
  }

  getFullName = () => `${this.name} ${this.lastname}`

  addPet = name => this.pets.push(name)

  countPets = () => this.pets.length

  addBook = (title, author) => this.books.push({ title, author })

  getBookNames = () => this.books.map(book => book.title)
}
```

<div id='ch02' />

## Challenge 2 (File Management)

### `FileSystem CRUD`

Nodejs FileSystem (fs) CRUD implementation using promises.

![First Menu](challenge2/readme/first-menu.jpg)
![Menu](challenge2/readme/menu.png)

```js
// Interfaces
Container {
  fileName: String

  save: (Product) => Number
  getById: (Number) => Product
  getAll: () => Product[]
  deleteById: (Number) => void
  deleteAll: () => void
}

Product {
  id: String
  title: String
  price: Number
  thumbnail: String
}
```

### Libraries

- **`fs (file system)`** (The Node.js file system module allows you to work with the file system on your computer)
- **`uuid`** (Used for creating unique ids)
- **`readline-sync`** (Synchronous Readline for interactively running to have a conversation with the user via a console (TTY) )
- **`colors`** (Used to get colors in the node.js console)

<div id='ch03' />

## Challenge 3 (NodeJS-Express Server)

Basic server with NodeJS and Express.

```js
/* Import and init express */
const express = require('express')
const app = express()
```

```js
/* Endpoints */
app.get('/products', async (req, res) => {
  try {
    const products = await container.getAll()
    res.send(products)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('An error has ocurred getting all products')
  }
})

app.get('/randomProduct', async (req, res) => {
  try {
    const randomProduct = await container.getRandom()
    res.send(randomProduct)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('An error has ocurred getting a random product')
  }
})

app.get('*', (req, res) => {
  res.status(404).send('Error 404: Page not found')
})
```

```js
/* Server configuration */
const server = app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`)
})

server.on('error', err => {
  console.log(err.message)
})
```

### Libraries

- **`express`** (Popular framework for NodeJS, intended for use in building web applications and APIs.)

<div id='ch04' />

## Challenge 4 (API RESTfull)

API RESTfull of products implementation using NodeJS and Express

```js
/* Middleware and routes config */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(logger)

app.use('/api', apiRoutes)
app.get('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, '/public/pages/404.html'))
})
```

```js
/* Products PUT and DELETE methods */
router.put('/:id', async (req, res) => {
  try {
    const {
      params: { id },
      body: { title, price, thumbnail }
    } = req

    if (!title || !price || !thumbnail) {
      return res.status(400).json({
        success: false,
        error: 'Wrong body format: title, price and thumbnail fields are required'
      })
    }
    if (typeof title !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Wrong body format: title must be a string'
      })
    }
    if (typeof price !== 'number') {
      return res.status(400).json({
        success: false,
        error: 'Wrong body format: price must be a number'
      })
    }
    if (typeof thumbnail !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Wrong body format: thumbnail must be a string'
      })
    }

    const productUpdated = { id, title, price, thumbnail }
    const updateByIdResult = await container.updateById(productUpdated)

    if (updateByIdResult === -1) {
      return res.status(404).json({
        success: false,
        error: `Product with id: ${id} does not exist`
      })
    } else {
      return res.json({ success: true, result: productUpdated })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'An error has ocurred updating the product'
    })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deleteByIdResult = await container.deleteById(id)

    if (deleteByIdResult === -1) {
      return res.status(404).json({
        success: false,
        error: `Product with id: ${id} does not exist`
      })
    } else {
      return res.json({
        success: true,
        result: `Product with id: ${id} deleted`
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'An error has ocurred deleting the product'
    })
  }
})
```

### `Product Entry Form`

The server have a public space that contains an index.html document with a product entry form in order to add a product.

![Product Entry Form](challenge4/readme/product-entry-form.jpg)

```js
/* Form submit event */
form.addEventListener('submit', handleSubmit)

async function handleSubmit(evt) {
  evt.preventDefault()

  const title = inputTitle.value
  const price = Number(inputPrice.value)
  const thumbnail = inputThumbnail.value

  const product = {
    title,
    price,
    thumbnail
  }

  try {
    // POST request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
    response.json().then(data => {
      if (data.success) {
        // Product saved successfully
        successPost()
        resetInputs()
      } else {
        // Product could not be saved
        failurePost(data.error)
      }
    })
  } catch (error) {
    console.log(error)
  }
}
```

### Libraries

- **`express`** (Popular framework for NodeJS, intended for use in building web applications and APIs.)
- **`path`** (The Node.js path module provides utilities for working with file and directory paths.)
- **`TailwindCSS`** (Popular CSS framework, used to stylize the product entry form.)

<div id='ch05' />

## Challenge 5 (Template Engines)

Using the same product API of the deliverable project of the previous class, build a web server (not REST) that incorporates:

1. **`Product Upload Form`** (A product upload form in the root path)
2. **`Products View`** (A view of the products loaded (using template engines) on the GET route '/products')
3. **`Navigation`** (Both pages will have a button that redirects to the other)
4. **`Handlebars - EJS - Pug`** (Keeping the same functionality use those 3 template engines)

### Template Engines Configuration with Express

```js
/* Handlebars Template Engine Config */
const { engine } = require('express-handlebars')

app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'main.hbs',
    layoutsDir: path.resolve(__dirname, './views/layouts'),
    partialsDir: path.resolve(__dirname, './views/partials')
  })
)
app.set('view engine', 'hbs')
app.set('views', './views')
```

```js
/* EJS Template Engine Config */
app.set('view engine', 'ejs')
```

```js
/* Pug Template Engine Config */
app.set('view engine', 'pug')
app.set('views', './views')
```

### Web Routes and Server Side Rendering

```js
/* Path '/' renders the product entry form and '/products' renders
a view that displays all products in a table */
router.get('/', (req, res) => {
  res.render('index')
})

router.get('/products', async (req, res) => {
  try {
    const products = await container.getAll()
    res.render('products', { products })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'An error has ocurred getting all products'
    })
  }
})
```

### Products View with Template Engines

As an example I show how it is done with EJS Template Engine

```html
<!DOCTYPE html>
<html lang="en">
  <%- include('./layouts/head', { webTitle: 'Products' }) %>
  <body>
    <!-- Navbar -->
    <%- include('./partials/navbar') %>

    <div class="w-full flex flex-col mt-12 sm:mt-28">
      <div class="flex flex-col gap-10 max-w-2xl mx-auto">
        <% if (products.length > 0) { %>
        <h1 class="text-gray-400 font-medium text-xl">All Products</h1>
        <table class="table-fixed border-collapse overflow-scroll max-w-[100vw]">
          <thead class="text-gray-800 border-b-[1px] border-gray-400">
            <tr>
              <th class="text-start pl-2 py-2">Title</th>
              <th class="text-start py-2">Price</th>
              <th class="text-center pr-2 py-2">Thumbnail</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <% products.forEach(prod => { %>
            <tr class="border-b-[1px] border-gray-200 cursor-pointer transition-colors hover:bg-gray-50">
              <td class="pl-2 pr-14 sm:pr-48 py-2"><%= prod.title %></td>
              <td class="pr-14 sm:pr-48 py-2"><%= prod.price %></td>
              <td class="py-2"><img src="<%" ="prod.thumbnail" % /> alt=<%= prod.title %> class="w-8 mx-auto"/></td>
            </tr>
            <% }) %>
          </tbody>
        </table>
        <% } else { %>
        <h2 class="text-center mt-[28vh] font-normal text-2xl">❌ There are not products</h2>
        <a
          href="/"
          class="text-center text-lg font-medium border-2 border-neutral-900 text-neutral-900 py-1 w-40 mx-auto rounded-md transition-colors hover:bg-neutral-900 hover:text-white"
          >Add a Product</a
        >
        <% } %>
      </div>
    </div>
  </body>
</html>
```

### Products View in the Web

![Products View in the Web](challenge5/readme/products-view.png)

### Libraries

- **`express-handlebars`** (A Handlebars view engine for Express.)
- **`ejs`** (EJS is a simple templating language that lets you generate HTML markup with plain JavaScript.)
- **`pug`** (Pug is a templating engine for Express.)

<div id='ch06' />

## Challenge 6 (WebSockets)

The WebSocket API is an advanced technology that makes it possible to open a two-way interactive communication session between the user's browser and a server. With this API, you can send messages to a server and receive event-driven responses without having to poll the server for a reply.

1. **`List of products in real time`** (Modify the last deliverable so that it has a websocket channel that allows to represent, below the entry form, a table with the list of products in real time)
2. **`Chat channel`** (Chat channel between clients and server)

### Socket Server Configuration

```js
/* Import and init socket.io server */
const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: SocketServer } = require('socket.io')

const app = express()
const http = new HttpServer(app)
const io = new SocketServer(http)
```

```js
/* Socket.io server config in 'connection' event. On a client
connection the server will emit and listen the following events */
io.on('connection', async socket => {
  console.log('New client connection - ID:', socket.id)

  /* Products */
  const products = await productsHandler.getAll()
  socket.emit('products', { products })

  socket.on('new-product', async data => {
    const products = await productsHandler.getAll()
    io.emit('products', { products })
  })

  /* Messages */
  const messages = await messagesHandler.getAll()
  socket.emit('messages', { messages })

  socket.on('new-message', async data => {
    const messages = await messagesHandler.getAll()
    io.emit('messages', { messages })
  })
})
```

### Client Side Socket

Load the socket.io-client, which exposes an io global (and the endpoint GET /socket.io/socket.io.js), and then connect.

```html
<script src="/socket.io/socket.io.js"></script>
<script>
  const socket = io()
</script>
```

Then you can listen and emit events in the client side.

```js
/* Listening 'products' event. When a client is connected, the server
sends him all products. Those products are listed on a real time table */
socket.on('products', data => {
  renderProducts(data.products)
})

function renderProducts(products) {
  let html
  if (products.length > 0) {
    let productsHtml = ''
    products.forEach(product => {
      productsHtml += `
        <tr class="border-b-[1px] border-gray-200 cursor-pointer transition-colors hover:bg-gray-50">
          <td class="pl-2 pr-14 sm:pr-48 py-2">${product.title}</td>
          <td class="pr-14 sm:pr-48 py-2">${product.price}</td>
          <td class="py-2"><img src=${product.thumbnail} alt=${product.title} class="w-8 mx-auto"/></td>
        </tr>
      `
    })
    html = `
      <table class="table-fixed border-collapse overflow-scroll max-w-[100vw]">
        <thead class="text-gray-800 border-b-[1px] border-gray-400">
          <tr>
            <th class="text-start pl-2 py-2">Title</th>
            <th class="text-start py-2">Price</th>
            <th class="text-center pr-2 py-2">Thumbnail</th>
          </tr>
        </thead>
        <tbody class="text-gray-700">
          ${productsHtml}
        </tbody>
      </table>
    `
  } else {
    html = `
      <h2 class="text-center text-neutral-900 mt-8 mb-8 font-normal text-2xl">❌ There are not products</h2>
    `
  }

  document.getElementById('products-container').innerHTML = html
}
```

```js
/* Listening 'messages' event. The server sends all history
of messages, those messages are shown in the message center */
socket.on('messages', data => {
  renderMessages(data.messages)
  messagesContainer.scroll({
    top: messagesContainer.scrollHeight,
    behavior: 'smooth'
  })
})
```

```js
/* Send a message, if the message is saved successfully 
emit 'new-message' event to the server */
sendMessageForm.addEventListener('submit', handleSubmit)

async function handleSubmit(evt) {
  evt.preventDefault()

  const email = emailInput.value
  const text = myMessageInput.value

  if (!text) {
    emailAlert.innerText = ''
    return
  }

  const message = {
    email,
    text
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    })
    response.json().then(data => {
      if (data.success) {
        successMessage()
        resetMessageInput()
        socket.emit('new-message', message)
      } else {
        failureMessage()
      }
    })
  } catch (error) {
    console.log(error)
  }
}
```

### Chat Channel View in the Web

![Chat Channel View in the Web](challenge6/readme/message-center.jpg)

### Libraries

- **`socket.io`** (Socket.IO is an event-driven library for real-time web applications. It enables real-time, bi-directional communication between web clients and servers)

<div id='ch07' />

## Challenge 7 (SQL Databases & Knex.js)

SQL is a standard language for storing, manipulating and retrieving data in databases. SQL stands for Structured Query Language

Move the project persistence from filesystem to SQL databases using Knex.js

1. **`Messages persistence to SQLite3`** (Change messages persistence from filesystem to SQLite3 database)
2. **`Products persistence to MariaDB`** (Change products persistence from filesystem to MariaDB database)

### Knex Configuration

```js
/* Create a 'mariaDB' and 'sqlite' config object to use the MariaDB database
for products persistance and SQLite3 database for messages persistance */
module.exports = {
  mariaDB: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      port: 3307,
      user: 'root',
      password: '',
      database: 'ch_challenges_ecommerce'
    }
  },
  sqlite: {
    client: 'sqlite3',
    connection: {
      filename: './src/db/ecommerce.sqlite'
    },
    useNullAsDefault: true
  }
}
```

### Migrations and Scripts

```js
/* Create products table migration, includes the up and down(rollback) functions */
const knex = require('knex')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const exists = await knex.schema.hasTable('products')
  if (!exists) {
    return knex.schema.createTable('products', table => {
      table.increments('id').primary()
      table.string('title').notNullable()
      table.float('price').notNullable()
      table.string('thumbnail').notNullable()
    })
  }
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  const exists = await knex.schema.hasTable('products')
  if (exists) {
    return knex.schema.dropTable('products')
  }
}
```

```js
/* Script that populates the messages table */
const populateMsgsTable = async () => {
  try {
    const exists = await knex.schema.hasTable('messages')
    if (exists) {
      await knex('messages').insert(messages)
    }
  } catch (error) {
    console.log(error)
  } finally {
    knex.destroy()
  }
}
```

### Database CRUD

```js
/* Update a product by his id */
updateById = async product => {
  try {
    const { id, title, price, thumbnail } = product

    const productToUpdate = await knex('products').where({ id }).first()

    if (!productToUpdate) {
      console.log('Product not found in the database'.red)
      return -1
    }

    await knex('products').where({ id }).update({ title, price, thumbnail })
    console.log('Product updated successfully in the database'.green)
  } catch (err) {
    console.log(err.message.red)
  }
}
```

### Libraries

- **`knex`** (Knex.js is a "batteries included" SQL query builder for PostgreSQL, CockroachDB, MSSQL, MySQL, MariaDB, SQLite3, Better-SQLite3, Oracle, and Amazon Redshift designed to be flexible, portable, and fun to use)
- **`mysql`** (This is a node.js driver for MySQL)
- **`sqlite3`** (Asynchronous, non-blocking SQLite3 bindings for Node.js.)

<div id='ch08' />

## Challenge 8 (MongoDB)

MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.

**`Assignment`**

Using Mongo Shell, create a database called ecommerce that contains two collections: messages and products.

```sh
# Insert many documents to products collection
db.products.insertMany([
  {
    title: 'Ruler',
    price: 124.8,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
  },
  {
    title: 'Calculator',
    price: 234.5,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
  },
  {
    title: 'Globe',
    price: 345.6,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-128.png'
  }
])

# Insert one document to products collection
db.products.insertOne({
  title: 'Gif',
  price: 45.2,
  thumbnail: 'https://cdn3.iconfinder.com/data/icons/pleasant/GIF-Image.png'
})
```

```sh
# List all documents of each collection and count them
db.messages.find()
db.products.find()
db.messages.estimatedDocumentCount()
db.products.estimatedDocumentCount()
```

```sh
# Find with filters
db.products.find({ price: { $lt: 1000 } })
db.products.find({ $and: [{ price: { $gt: 1000 } }, { price: { $lt: 3000 } }] })
db.products.find({ price: { $gt: 3000 } })
db.products.find({}, { title: 1 }).sort({ price: 1 }).limit(1).skip(2)
```

```sh
# Update and delete with filters
db.products.updateMany({ price: { $gt: 4000 } }, { $set: { stock: 0 } })
db.products.deleteMany({ price: { $lt: 1000 } })
```

```sh
# Create an user called 'pepe' with password 'asd456' with read-only permissions
use admin
db.createUser({
  user: 'pepe',
  pwd: 'asd456',
  roles: [
    {
      role: 'read',
      db: 'ch-challenges-ecommerce'
    }
  ]
})
```

<div id='ch09' />

## Challenge 9 (Mocks & Normalization)

Products mock with Faker.js and messages normalization with Normalizr.

1. **`Products mock`** (Create an endpoint that returns 5 random products using Faker.js and show them on a new view in the frontend)
2. **`Messages normalization`** (Reformat message format with normalizr)

```js
/* Import faker and create an endpoint that returns 5 random products */
const { faker } = require('@faker-js/faker')

router.get('/test', (req, res) => {
  const products = []
  for (let i = 0; i < 5; i++) {
    products.push({
      title: faker.commerce.product(),
      price: faker.commerce.price(1, 1000, 2),
      thumbnail: faker.image.imageUrl(64, 64, 'product', true)
    })
  }
  res.json({ success: true, result: products })
})
```

### Libraries

- **`@faker-js/faker`** (Generate massive amounts of fake (but realistic) data for testing and development)
- **`normalizr`** (Normalizes and denormalizes JSON according to schema)

<div id='ch10' />

## Challenge 10 (Simple Login)

A simple mechanism should be incorporated that allows a customer to be logged in by name through a login form.

`Setup Express Session`

```js
/* Import the necesary modules and setup the cookie parser
and session middlewares */
const session = require('express-session')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')

app.use(cookieParser())
app.use(
  session({
    secret: '<Secret Key>',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
    store: MongoStore.create({
      mongoUrl: dbConfig.mongodb.uri,
      collectionName: 'users'
    })
  })
)
```

`Implement login and logout`

```js
/* Sets a session in the express server with
the username sended in the request and sends
a cookie to the client side */
router.post('/login', (req, res) => {
  const { username } = req.body
  req.session.user = username
  req.session.save(err => {
    if (err) {
      console.log('Session error: ', err)
      return res.redirect('/login')
    }
    res.redirect('/')
    res.cookie('username', username)
  })
})

/* If there is a session, it destroys it, removes the cookie
on the client side and redirects to the logout page */
router.get('/logout', (req, res) => {
  const username = req.session?.username
  if (username) {
    req.session.destroy(err => {
      if (!err) {
        res.clearCookie('username')
        res.sendFile(path.resolve('src/public/pages/logout.html'))
      } else {
        res.redirect('/login')
      }
    })
  } else {
    res.redirect('/login')
  }
})
```

### `Login view in the Web`

![Login Form](./challenge10/readme/login-form.png)

### Libraries

- **`express-session`** (Simple session middleware for Express)
- **`cookie-parser`** (Parse HTTP request cookies)
- **`connect-mongo`** (MongoDB session store for Express and Connect)

<div id='ch11' />

## Challenge 11 (Passport Login)

Using Passport.js local strategy, implement an authentication mechanism

`Passport Initialization`

```js
app.use(passport.initialize())
app.use(passport.session())
```

`Passport Setup`

```js
/* Register, if doesn't exists a user with the same
username, create a new user and store it in the database */
passport.use(
  'register',
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await usersDAO.getByUsername(username)
      if (user) return done(null, false)
      const newUser = {
        username,
        password: await bcrypt.hash(password, 10)
      }
      await usersDAO.save(newUser)
      console.log('User created successfully', newUser)
      return done(null, newUser)
    } catch (err) {
      console.log('Error creating the user')
      return done(err)
    }
  })
)

/* Login, if exists a user with the same username,
checks if the passwords coincide and makes the login */
passport.use(
  'login',
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await usersDAO.getByUsername(username)
      if (!user) return done(null, false)
      if (!user.verifyPassword(password)) return done(null, false)
      return done(null, user)
    } catch (err) {
      return done(err)
    }
  })
)

// Serialization
passport.serializeUser((user, done) => {
  done(null, user._id)
})

// Deserialization
passport.deserializeUser(async (id, done) => {
  const user = await usersDAO.getById(id)
  done(null, user)
})
```

`Auth API routes`

```js
router.post(
  '/register',
  passport.authenticate(
    'register',
    {
      failureRedirect: '/register'
    },
    AuthController.register
  )
)
router.post(
  '/login',
  passport.authenticate(
    'login',
    {
      failureRedirect: '/login'
    },
    AuthController.login
  )
)
```

### Libraries

- **`passport`** (Authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application)
- **`passport-local`** (The local authentication strategy authenticates users using a username and password)
- **`bcrypt`** (A bcrypt library for NodeJS)

<div id='ch12' />

## Challenge 12 (Process Object)

The process object provides information about, and control over, the current Node.js process.

1. **`Enviroment Variables`** (Move all keys and credentials used to an **.env file**, and load it using the **dotenv** library)
2. **`CLI Arguments`** (The **port** should be read from the **command line arguments**, using some library (minimist or yargs). In the case of not passing this parameter by command line, connect by default to port 8080)
3. **`Process Info`** (Add a **'/info' route** that presents in a **simple view**, **information about the process object**)
4. **`Child Process`** (Add another **route '/api/randoms'** that allows to **calculate a number of random numbers in the range 1 to 1000** specified by query parameters. This route will **not be blocking** (use the fork method of child process))

### 1. Enviroment Variables

```sh
# .env file, Local MongoDB connection uri
MONGO_URI="mongodb://127.0.0.1:27017/ch-backend-challenges"
```

```js
/* Using 'dotenv' to obtain the enviroment variables */
const dotenv = require('dotenv')

dotenv.config()

const config = {
  MONGO_URI: process.env.MONGO_URI
}

module.exports = config
```

### 2. CLI Arguments

```js
/* Using 'yargs' to obtain the CLI arguments */
const yargs = require('yargs')

const args = yargs(process.argv.slice(2))
  .default({
    port: 8080
  })
  .alias({
    p: 'port'
  }).argv

const config = {
  PORT: args.port
}

module.exports = config
```

### 3. Process Info

API endpoint that returns the info

```js
/* Obtain the required process information */
const getProcessInfo = () => {
  const processInfo = {}

  processInfo.args = process.argv
  processInfo.os = process.platform
  processInfo.version = process.version
  processInfo.rss = process.memoryUsage.rss()
  processInfo.execPath = process.execPath
  processInfo.id = process.pid
  processInfo.dir = process.cwd()

  return processInfo
}
```

```js
/* Send the process info in the response */
class ProcessInfoController {
  getProcessInfo(req, res, next) {
    try {
      const processInfo = getProcessInfo()
      const response = successResponse(processInfo)
      res.json(response)
    } catch (err) {
      next(err)
    }
  }
}
```

```js
/* Process info API route */
router.get('/', ProcessInfoController.getProcessInfo)
```

Obtaining the process info in the frontend

```js
/* Get the process info from the API and print it in the DOM */
async function getProcessInfo() {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()
    const processInfo = data.data

    id_dd.innerText = processInfo.id
    dir_dd.innerText = processInfo.dir
    execPath_dd.innerText = processInfo.execPath
    os_dd.innerText = processInfo.os
    version_dd.innerText = processInfo.version
    rss_dd.innerText = processInfo.rss
    arguments_ul.innerHTML = renderArguments(processInfo.args)
  } catch (err) {
    console.log(err)
  }
}
```

```js
/* Render the arguments list */
function renderArguments(args) {
  let html = ''
  for (let i = 0; i < args.length; i++) {
    html += `
      <li
        class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
      >
        <div class="flex w-0 flex-1 items-center">
        <span class="ml-2 w-0 flex-1 truncate"
          >${args[i]}</span
        >
        </div>
      </li>
    `
  }
  return html
}
```

Process Info View in the Web

![Process Info View](./challenge12/readme/process-info.png)

### 4. Child Process

```js
/* Controller that initializates the child process using
the 'fork method' to achieve a not blocking server */
class RandomsController {
  getRandoms(req, res, next) {
    try {
      const { qty } = req.query
      const calculateRandoms = fork(path.resolve(__dirname, '../utils/calculateRandoms.js'))
      calculateRandoms.send(qty || 100000000)
      calculateRandoms.on('message', data => {
        const response = successResponse(data)
        res.json(response)
      })
    } catch (err) {
      next(err)
    }
  }
}
```

```js
/* Randoms API route */
router.get('/', RandomsController.getRandoms)
```

```js
/* Child process that calculate the random numbers */
const calculateRandoms = qty => {
  let result = {}
  for (let i = 0; i < qty; i++) {
    const random = Math.floor(Math.random() * 1000)
    result[random] ? result[random]++ : (result[random] = 1)
  }
  return result
}

process.on('message', qty => {
  const result = calculateRandoms(qty)
  process.send(result)
})
```

### Libraries

- **`dotenv`** (Loads environment variables from .env file)
- **`yargs`** (Helps you build interactive command line tools by parsing arguments and generating an elegant user interface)
- **`child_process`** (The node child_process module provides the ability to spawn subprocesses)

<div id='ch13' />

## Challenge 13 (Load Balancing with Nginx)

`Assignment`

1. **`CPUs Number`** (Add the **amount of CPUs** in the **info view**)
2. **`CLI Mode Argument`** (The **mode (fork or cluster)** should be read from the **command line arguments**, using some library (minimist or yargs). In the case of not passing this parameter by command line, the **default is fork**)
3. **`Load Balancing with Nginx`** (Configurate Nginx so that **all queries to /api/randoms** are **redirected to a cluster of servers managed from nginx**, equally distributed among 4 instances listening on ports 8082, 8083, 8084 and 8085 respectively, **the rest of the queries**, redirect them to an **individual server listening on port 8080**)

### 1. CPUs Number

```js
/* Obtain the amount of CPUs */
const os = require('os')

processInfo.cpus = os.cpus().length
```

### 2. CLI Mode Argument

```js
/* Obtain the mode from the CLI */
const args = yargs(process.argv.slice(2))
  .default({
    port: 8080,
    mode: 'fork'
  })
  .alias({
    p: 'port',
    m: 'mode'
  }).argv

const config = {
  PORT: args.port,
  MODE: args.mode,
  MONGO_URI: process.env.MONGO_URI
}
```

```js
/* If the mode is cluster create the cluster of servers
using the cluster native nodejs module */
if (config.MODE === 'cluster' && cluster.isPrimary) {
  const cpus = os.cpus().length
  for (let i = 0; i < cpus; i++) {
    cluster.fork()
  }
} else {
  // Servers initialization
}
```

### 3. Load Balancing with Nginx

Nginx reverse proxy configuration (nginx.conf)

```conf
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    upstream backend-coder {
        server 127.0.0.1:8082;
        server 127.0.0.1:8083;
        server 127.0.0.1:8084;
        server 127.0.0.1:8085;
    }

    server {
        listen       80;
        server_name  proxy-server;

        location / {
            proxy_pass http://127.0.0.1:8080;
        }

        location /api/randoms {
            proxy_pass http://backend-coder;
        }
    }
}
```

### Instructions

Commands that must be executed by command line and the arguments that must be sent to raise all the server instances so that they support the configuration detailed in the previous points.

1. `npm start -- -p 8080 -m fork`
2. `npm start -- -p 8081 -m cluster`
3. `npm start -- -p 8082 -m fork`
4. `npm start -- -p 8083 -m fork`
5. `npm start -- -p 8084 -m fork`
6. `npm start -- -p 8085 -m fork`

### Libraries

- **`pm2`** (Production process manager for Node.JS applications with a built-in load balancer)

<div id='ch14' />

## Challenge 14 (Loggers, GZIP & Performance Analysis)

1. **`GZIP Compression`** (Add **compression** to the response of the **'/api/info'** route)
2. **`Winston Logger`** (Implement the **server logging** using **winston**)
3. **`Performance Analysis`** (Complete **performance analysis** of the server)

### 1. GZIP Compression

```js
/* Use the compression module to compress the response */
const compression = require('compression')

router.get('/', compression(), ProcessInfoController.getProcessInfo)
```

### 2. Winston Logger

1. **Route and method** of **all requests** received by the server **(info)**
2. **Route and method** of **requests to routes that do not exist** on the server **(warning)**
3. **Errors** thrown by the **message and product apis**, only **(error)**

Consider the following criteria:

- Log **all levels to console** (info, warning and error)
- Log **only warning** logs to a file called **warn.log**
- Send **only the error** logs to a file called **error.log**

```js
/* Winston logger config */
const path = require('path')
const { createLogger, format, transports } = require('winston')

const logger = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.resolve(__dirname, '../logs/warn.log'),
      level: 'warn'
    }),
    new transports.File({
      filename: path.resolve(__dirname, '../logs/error.log'),
      level: 'error'
    })
  ],
  format: format.combine(
    format.timestamp(),
    format.colorize({ all: true }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  )
})

module.exports = logger
```

#### 1. **Route and method** of **all requests** received by the server **(info)**

```js
const logger = require('../utils/logger')

const loggerMiddleware = (req, res, next) => {
  const method = req.method
  const url = req.url

  logger.info(`${method} => ${url}`)
  next()
}
```

#### 2. **Route and method** of **requests to routes that do not exist** on the server **(warning)**

```js
app.get('*', (req, res) => {
  const { method, url } = req
  logger.warn(`Nonexistent Route: ${method} => ${url}`)
  res.status(404).sendFile(path.resolve(__dirname + '/public/pages/404.html'))
})
```

#### 3. **Errors** thrown by the **message and product apis**, only **(error)**

```js
const logger = require('../utils/logger')

const errorMiddleware = (err, req, res, next) => {
  const status = err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR
  const message = err.message || 'An unexpected error ocurred'

  logger.error(message)
  return res.status(status).json(errorResponse(message))
}
```

### 3. Performance Analysis

The performance of the server will be analyzed subjecting it to stress tests in
order to do the profiling and flamegraph of it.

To see the complete performance report click [**here**](https://drive.google.com/file/d/1nsrcC1QPNEoSGXYi-dTLZk-juTIenoHg/view?usp=sharing)

`Resume:`

1. Artillery as a load test emulating 50 concurrent connections with 20 requests for each one.

```
--------------------------------
Summary report @ 01:31:02(-0300)
--------------------------------

http.codes.200: ....................................................... 1000
http.request_rate: .................................................... 1000/sec
http.requests: ........................................................ 1000
http.response_time:
min: .................................................................. 0
max: .................................................................. 21
median: ............................................................... 2
p95: .................................................................. 6
p99: .................................................................. 8.9
http.responses: ....................................................... 1000
vusers.completed: ..................................................... 50
vusers.created: ....................................................... 50
vusers.created_by_name.0: ............................................. 50
vusers.failed: ........................................................ 0
vusers.session_length:
min: .................................................................. 24.3
max: .................................................................. 132
median: ............................................................... 47
p95: .................................................................. 122.7
p99: .................................................................. 130.3
```

2. The profiling of the server, performing the test with --prof of node.js. Parse
   the results obtained after processing them with --prof-process.

```
[Summary]:

ticks total nonlib name
16 0.1% 100.0% JavaScript
0 0.0% 0.0% C++
5 0.0% 31.3% GC
17343 99.9% Shared libraries
```

3. Then we will use Autocannon on the command line, emulating 100 concurrent
   connections made in a time of 20 seconds.

![Autocannon Report](./challenge14/performance/images/autocannon.png)

4. Profiling the server with node.js inspector mode --inspect. Review the time of
   the less performing processes on the inspection source file.

![Inspect](./challenge14/performance/images/inspect.png)

5. Flamegraph with 0x, emulating the charge with Autocannon with the
   same parameters as before.

![Inspect](./challenge14/performance/images/flamegraph.png)

### Libraries

- **`compression`** (Returns the compression middleware using the given options. The middleware will attempt to compress response bodies)
- **`winston`** (A multi-transport async logging library for Node.js)
- **`artillery`** (Artillery is an open-source command-line tool purpose-built for
  load testing and smoke testing web applications)
- **`autocannon`** (An HTTP/1.1 benchmarking tool written in node, greatly
  inspired by wrk and wrk2, with support for HTTP pipelining and HTTPS)
- **`0x`** (0x can profile and generate an interactive flamegraph for a Node process
  with a single command, on any platform which Node runs on)

<div id='ch15' />

## Challenge 15 (Heroku Deploy)

Deploy the app with Heroku.

<div id='ch16' />

## Challenge 16 (Layered Architecture)

Layer the project, grouping the routing, controller, business logic, and persistence layers appropriately.

### `Project Layered Architecture Diagram`

###

![Layered Architecture Diagram](./challenge16/readme/layered-architecture-diagram.png)

###

`1. Presentation Layer (Front End)`

The presentation layer, also called the UI layer, handles the interactions that users have with the software. It's the most visible layer and defines the application's overall look and presentation to the end-users. This is the tier that's most accessible, which anyone can use from their client device, like a desktop, laptop, mobile phone or tablet.

`2. Router Layer (API)`

The router layer contains the app programming interface (API) routes of the app. Its only job is to receive requests and return a response from the server.

`3. Service Layer (Business Logic)`

The Service layer, also called the domain layer, is where the application's business logic operates. Business logic is a collection of rules that tell the system how to run an application, based on the organization's guidelines. This layer essentially determines the behavior of the entire application. After one action finishes, it tells the application what to do next.

`4. Data Access Layer (Database)`

The data access layer, acts as a protective layer. It contains the code that's necessary to access the database layer. This layer also holds the set of codes that allow you to manipulate various aspects of the database, such as connection details and SQL statements.

###

### Project Folder Structure

![Folder Structure](./challenge16/readme/folder-structure.png)

###

### Flow Example

Everything starts when a user sends a request from a client to the server. As an example lets say that the user requests all products.

`1. The Router Layer receives the request and communicates with the Service Layer to request the products.`

```js
const productsController = require('../../../controllers/products.controller')

router.get('/', productsController.getProducts)
```

```js
const { getProducts } = require('../services/products.services')

class ProductsController {
  async getProducts(req, res, next) {
    try {
      const products = await getProducts()
      const response = successResponse(products)
      res.json(response)
    } catch (err) {
      next(err)
    }
  }
}
```

`2. The Service Layer handle the business logic and communicates with the Data Access Layer to request the products`

```js
const ProductsDAO = require('../database/DAOs/products.dao')

const getProducts = async () => await ProductsDAO.getAll()
```

`3. The Data Access Layer gets the data from the database and passes it to the Service Layer`

```js
const mongoose = require('mongoose')

class ProductsDAO {
  constructor(collection, schema) {
    this.model = mongoose.model(collection, schema)
  }
  async getAll(filter = {}) {
    const documents = await this.model.find(filter, { __v: 0 }).lean()
    return documents
  }
}
```

`4. Finally the Service Layer passes the data to the Router Layer and it returns it to the client`

###

- Note that at all times the communication is unilateral and no layer is skipped.

<div id='ch17' />

## Challenge 17 (Singleton and DAO patterns)

Implement singleton and DAO design patterns into the project.

1. **`DAOs`** (Modify the **data access layer** incorporating the concept of **DAOs**)
2. **`Singleton`** (**DAOs** must be implemented using the **singleton** pattern)

### 1. DAOs

Data Access Object Pattern or DAO pattern is used to separate low level data accessing API or operations from high level business services.

```js
class UsersDAO extends MongoDAO {
  constructor() {
    super(collection, userSchema)
  }

  async getByUsername(username) {
    const user = await this.model.findOne({ username }, { __v: 0 })
    if (!user) {
      return null
    }
    return user
  }
}
```

### 2. Singleton

The **singleton** pattern is a software design pattern that restricts the instantiation of a class to a **singular instance**.

One way to implement the singleton pattern is the following.

```js
module.exports = new UsersDAO()
```

<div id='ch18' />

## Challenge 18 (API Testing & Documentation)

1. **`Testing`** (Test some features of our rest API using **Mocha**, **Chai** and **Supertest**)
2. **`Documentation`** (Rest API documentation using Swagger)

### Testing

Products API testing using mocha with chai and supertest.

```js
const request = require('supertest')('http://localhost:8080')
const expect = require('chai').expect

describe('Products API Tests', () => {
  before(async function () {
    try {
      await mongoose.connect(process.env.MONGO_URI)

      server = app.listen(8080, () => {
        console.log('Server running on port 8080')
      })
    } catch (err) {
      throw new Error(err)
    }
  })

  after(function () {
    mongoose.disconnect()
    server?.close()
  })

  it('Get all products', async () => {
    const response = await request.get('/api/products')

    expect(response.status).to.eql(200)
    expect(response.body).to.be.an('object')
    expect(response.body).to.include.keys('success', 'data')
    expect(response.body.success).to.eql(true)
    expect(response.body.data).to.be.an('array')
  })

  it('Get product by id', async () => {
    const response = await request.get('/api/products/d7sdwd90dnSd922nd8ss')

    expect(response.status).to.eql(200)
    expect(response.body).to.be.an('object')
    expect(response.body).to.include.keys('success', 'data')
    expect(response.body.success).to.eql(true)
    expect(response.body.data).to.be.an('object')
    expect(response.body.data).to.include.keys('id', 'title', 'price', 'thumbnail')
  })

  it('Create a new product', async () => {
    const payload = {
      title: 'test',
      price: 10,
      thumbnail: 'https://test.com/test.jpg'
    }

    const response = await request.post('/api/products').send(payload)

    expect(response.status).to.eql(201)
    expect(response.body).to.be.an('object')
    expect(response.body.data).to.include.keys('title', 'price', 'thumbnail')
    expect({
      title: response.body.title,
      price: response.body.price,
      thumbnail: response.body.thumbnail
    }).to.deep.eql(payload)
  })

  it('Update a product', async () => {
    const payload = {
      title: 'test edited',
      price: 15,
      thumbnail: 'https://test.com/test-edited.jpg'
    }

    const response = await request.put('/api/products/d7sdwd90dnSd922nd8ss').send(payload)

    expect(response.status).to.eql(200)
    expect(response.body).to.be.an('object')
    expect(response.body).to.include.keys('success', 'data')
    expect(response.body.success).to.eql(true)
    expect(response.body.data).to.include.keys('acknowledged', 'modifiedCount', 'thumbnail')
    expect(response.body.data.acknowledged).to.eql(true)
    expect(response.body.data.modifiedCount).to.eql(1)
  })

  it('Delete a product', async () => {
    const response = await request.delete('/api/products/d7sdwd90dnSd922nd8ss')

    expect(response.status).to.eql(200)
    expect(response.body).to.be.an('object')
    expect(response.body).to.include.keys('success', 'data')
    expect(response.body.data).to.include.keys('acknowledged', 'deletedCount')
    expect(response.body.data.acknowledged).to.eql(true)
    expect(response.body.data.deletedCount).to.eql(1)
  })
})
```

### Documentation

Create a documentation for the Rest API using Swagger in Node JS with Express.

```js
/* Swagger middleware config and setup */
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CH Backend Challenges API',
      description: 'Rest API for the Coderhouse backend course challenges',
      version: '1.0.0'
    }
  },
  apis: [path.join(__dirname, '../docs/**/*.yaml')]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/apidocs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
```

Schemas and endpoints definitions using YAML.

```yaml
# Product schema definition
components:
  schemas:
    Product:
      type: 'object'
      required:
        - 'id'
        - 'title'
        - 'price'
        - 'thumbnail'
      properties:
        id:
          type: 'string'
          description: 'The auto-generated id for the product'
        title:
          type: 'string'
          description: 'The title of the product'
        price:
          type: 'number'
          description: 'The price for the product'
        thumbnail:
          type: 'string'
          description: 'The URL of the product thumbnail'
      example:
        id: 'd2dsf-ds24fd-fds34-fds33'
        title: 'Globe'
        price: '120.90'
        thumbnail: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/globe-64.png'
```

```yaml
# Create a product endpoint definition
paths:
  '/api/products':
    post:
      summary: 'Creates a new product'
      tags:
        - 'Products'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/requestBodies/CreateProductPayload'
      responses:
        '201':
          description: 'Product created successfully'
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Product'
        '400':
          description: 'Bad request, all body fields required'
          content:
            application/json:
              schema:
                type: 'object'
                properties:
                  success:
                    type: 'boolean'
                  message:
                    type: 'string'
                example:
                  success: false
                  message: 'All fields are required'
```

Swagger documentation view in the web.

![Swagger Docs](./challenge18/readme/api-docs-swagger.jpg)

### Libraries

- **`mocha`** (JavaScript-based test framework for nodejs and the browser, making asynchronous testing simple and fun)
- **`chai`** (BDD / TDD assertion library for nodejs and the browser that can be delightfully paired with any javascript testing framework)
- **`supertest`** (SuperAgent driven library for testing HTTP servers)
- **`swagger-ui-express`** (This module allows you to serve auto-generated swagger-ui generated API docs from express)
- **`swagger-jsdoc`** (This library reads your JSDoc-annotated source code and generates an OpenAPI (Swagger) specification)

<div id='ch19' />

## Challenge 19 (GraphQL)

GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.

**Assignment:** Refactor the code of the project in which we have been working to go from RESTfull API to GraphQL API.

1. **`GraphQL Schema`**

```js
const { buildSchema } = require('graphql')

const schema = buildSchema(`
  type Product {
    _id: ID!
    title: String!
    price: Float!
    thumbnail: String!
  }

  input ProductInput {
    title: String!
    price: Float!
    thumbnail: String!
  }

  type Query {
    getProducts: [Product]
    getProduct(id: ID!): Product
    getMessages: [Message]
  }

  type Mutation {
    addProduct(input: ProductInput): Product
    updateProduct(id: ID!, input: ProductInput): UpdateProductResponse
    deleteProduct(id: ID!): DeleteProductResponse
    addMessage(input: MessageInput): Message
    createUser(input: UserInput): UserResponse
  }
`)
```

2. **`Resolvers`**

```js
const getProducts = async () => {
  const products = await getProductsService()
  return products
}

const addProduct = async ({ input }) => {
  const product = await saveProduct(input)
  return product
}

const updateProduct = async ({ id, input }) => {
  const product = await updateProductService(id, input)
  return product
}

const deleteProduct = async ({ id }) => {
  const product = await deleteProductService(id)
  console.log(product)
  return product
}
```

3. **`Server Configuration`**

```js
const { graphqlHTTP } = require('express-graphql')

const schema = require('./gql/schema')
const { getProducts, getProduct, getMessages } = require('./resolvers/Query')
const { addProduct, updateProduct, deleteProduct, addMessage, createUser } = require('./resolvers/Mutation')

const rootValue = {
  getProducts,
  getProduct,
  getMessages,
  addProduct,
  updateProduct,
  deleteProduct,
  addMessage,
  createUser
}

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
  })
)
```

4. **`Frontend Requests with GraphQL`**

```js
const product = {
  title,
  price,
  thumbnail
}

const gqlQuery = `
    mutation {
      addProduct(input: ${JSON.stringify(product)}) {
        _id
        title
        price
        thumbnail
      }
    }
  `

try {
  // POST request
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ query: gqlQuery })
  })

  await response.json().then(data => {
    if (!data.errors) {
      // Product saved successfully
      successPost()
      resetInputs()
      // Emit 'new-product' event to the server
      socket.emit('new-product', product)
    } else {
      // Product could not be saved
      failurePost('An error ocurred saving the product')
    }
  })
} catch (error) {
  console.log(error)
}
```

### Libraries

- **`graphql`** (A Query Language and Runtime which can target any service)
- **`express-graphql`** (Create a GraphQL HTTP server with any HTTP web framework that supports connect styled middleware, including Connect itself, Express and Restify)
