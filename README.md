![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)

# **Kiwu Backend**

A RESTful API used by the Kiwu eCommerce Platform

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/theskinnycoder/kiwu-backend/blob/main/LICENSE)

## **Tech Stack**

- **Server** : NodeJS, ExpressJS
- **DataBase** : MongoDB Atlas, Mongoose ODM

## **Run Locally**

1. Clone the repo

```bash
  git clone https://github.com/theskinnycoder/kiwu-backend.git
```

2. Go to the project directory

```bash
  cd kiwu-backend
```

3. Install dependencies

```bash
  npm i
```

4. Add the environment variables to **`.env`** (Take a look at the **`.env.example`**)

5. Start the server

```bash
  npm start
```

## **Environment Variables**

To run this project, you will need to add the following environment variables to your **`.env`** file

- **`PORT`**
- **`MONGO_URI`**
- **`COOKIE_NAME`**
- **`JWT_SECRET`**

## **API Reference**

### **A) UnAuthenticated Routes :**

#### **1. Auth Routes :**

- **POST `/api/auth/register`** : To register a new user
- **POST `/api/auth/login`** : To login an existing user

#### **2. Designer Routes :**

- **GET `/api/designers`** : To get all designers
- **GET `/api/designers/:id`** : To get a designer by ID

#### **3. Product Routes :**

- **GET `/api/products`** : To get all products
- **GET `/api/products?categories=:categories`** : To get all products that matches a list of categories
- **GET `/api/products?designer=:designer`** : To get all products that belongs to a designer
- **GET `/api/products/:id`** : To get a product by ID

### **4. Category Routes :**

- **GET `/api/categories`** : To get all categories
- **GET `/api/categories/:id`** : To get a category by ID

### **B) Authenticated Routes :**

#### **1. Auth Routes :**

- **POST `/api/auth/logout`** : To logout the current logged-in user

#### **2. Profile Routes :**

- **GET `/api/me`** : To get the profile of the current logged-in user
- **PUT `/api/me`** : To update the profile of the current logged-in user
- **DELETE `/api/me`** : To delete the profile of the current logged-in user

#### **3. Order Routes :**

- **GET `/api/orders/me`** : To get all the un-delivered orders the current logged-in user
- **GET `/api/orders/me/:id`** : To get an un-delivered order of the current logged-in user by ID
- **POST `/api/orders/me`** : To create a new order by the current logged-in user
- **PATCH `/api/orders/me/:id`** : To mark an UnPaid order as paid after paying

### **C) Designer-Only Routes :**

#### **1. Product Routes :**

- **POST `/api/products`** : To post a new product from the current logged-in designer's account
- **PUT `/api/products`** : To update an existing product from the current logged-in designer's account
- **DELETE `/api/products`** : To delete an existing product from the current logged-in designer's account

### **D) Admin-Only Routes :**

#### **1. Product Routes :**

- **GET `/api/products/pending`** : To get a list of pending products to either approve or decline
- **GET `/api/products/pending/:id`** : To get a pending products by ID to either approve or decline
- **POST `/api/products/pending/:id/approve`** : To approve a pending product by ID
- **POST `/api/products/pending/:id/decline`** : To decline a pending product by ID

#### **2. Designer Routes :**

- **POST `/api/designers`** : To make a designer by email (req.body.email)
- **PATCH `/api/designers`** : To remove a designer by email (req.body.email)
- **PATCH `/api/designers/:id`** : To remove a designer by ID (req.params.id)
- **PUT `/api/designers/:id`** : To update a designer details by ID
- **DELETE `/api/designers/:id`** : To delete a designer's account by ID (as a User too, not just designer access)

#### **3. Category Routes :**

- **POST `/api/categories`** : To create a new category

#### **4. Order Routes :**

- **GET `/api/orders`** : To get all un-delivered pending orders by all customers
- **GET `/api/orders/:id`** : To get an un-delivered order by ID
- **PATCH `/api/orders/:id/deliver`** : To mark an un-delivered order as delivered after delivery

## **Authors**

- [@theskinnycoder](https://www.github.com/theskinnycoder)

## **Support**

For support, email rahulsriramwriter@gmail.com

## **License**

[MIT](https://choosealicense.com/licenses/mit/)
