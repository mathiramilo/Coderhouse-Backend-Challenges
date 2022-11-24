# Coderhouse Backend Challenges

This repository contains all coderhouse backend challenges.

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
        error:
          'Wrong body format: title, price and thumbnail fields are required'
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
        <table
          class="table-fixed border-collapse overflow-scroll max-w-[100vw]"
        >
          <thead class="text-gray-800 border-b-[1px] border-gray-400">
            <tr>
              <th class="text-start pl-2 py-2">Title</th>
              <th class="text-start py-2">Price</th>
              <th class="text-center pr-2 py-2">Thumbnail</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <% products.forEach(prod => { %>
            <tr
              class="border-b-[1px] border-gray-200 cursor-pointer transition-colors hover:bg-gray-50"
            >
              <td class="pl-2 pr-14 sm:pr-48 py-2"><%= prod.title %></td>
              <td class="pr-14 sm:pr-48 py-2"><%= prod.price %></td>
              <td class="py-2">
                <img src="<%" ="prod.thumbnail" % /> alt=<%= prod.title %>
                class="w-8 mx-auto"/>
              </td>
            </tr>
            <% }) %>
          </tbody>
        </table>
        <% } else { %>
        <h2 class="text-center mt-[28vh] font-normal text-2xl">
          ❌ There are not products
        </h2>
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

## Challenge 10 (Simple Login)

A simple mechanism should be incorporated that allows a customer to be logged in by name through a login form.

### `Setup Express Session`

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

### `Implement login and logout`

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
