# **kiwu-backend**

## **1. Setup :**

1. Clone the repo
2. Copy the **`.env.example`** content into a **`.env`** file and fill the missing variables (like your own MongoDB Atlas Connection String)
3. Check the **Scripts** section at the bottom of the **README**

## **2. Routes :**

### **A) UnAuthenticated Routes :**

#### **1. Auth Routes :**

- **POST `/api/auth/register`** : To register a new user
- **POST `/api/auth/login`** : To login an existing user

#### **2. Admin Routes :**

- **GET `/api/admins`** : To get all admins
- **GET `/api/admins/:id`** : To get an admin by ID

#### **3. Product Routes :**

- **GET `/api/products`** : To get all products
- **GET `/api/products?categories=:categories`** : To get all products that matches a list of categories
- **GET `/api/products?admin=:admin`** : To get all products that belongs to an admin
- **GET `/api/products`** : To get all products
- **GET `/api/products/:id`** : To get a product by ID

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

### **C) Admin-Only Routes :**

#### **1. Product Routes :**

- **POST `/api/products`** : To post a new product from the current logged-in admin's account
- **PUT `/api/products`** : To update an existing product from the current logged-in admin's account
- **DELETE `/api/products`** : To delete an existing product from the current logged-in admin's account

### **D) Super-Admin-Only Routes :**

#### **1. Product Routes :**

- **GET `/api/products/pending`** : To get a list of pending products to either approve or decline
- **GET `/api/products/pending/:id`** : To get a pending products by ID to either approve or decline
- **POST `/api/products/pending/:id/approve`** : To approve a pending product by ID
- **POST `/api/products/pending/:id/decline`** : To decline a pending product by ID

#### **2. Admin Routes :**

- **POST `/api/admins`** : To make an admin by email (req.body.email)
- **PATCH `/api/admins`** : To remove an admin by email (req.body.email)
- **PATCH `/api/admins/:id`** : To remove an admin by ID (req.params.id)
- **PUT `/api/admins/:id`** : To update an admin details by ID
- **DELETE `/api/admins/:id`** : To delete an admin's account by ID (as a User too, not just admin access)

#### **3. Order Routes :**

- **GET `/api/orders`** : To get all un-delivered pending orders by all customers
- **GET `/api/orders/:id`** : To get an un-delivered order by ID
- **PATCH `/api/orders/:id/deliver`** : To mark an un-delivered order as delivered after delivery

## **3. Scripts :**

### **A) Data Scripts :**

- **`npm run data:import`** : To import 1 super-admin, 2 admins, 4 customers into the DataBase.
- **`npm run data:destroy`** : To delete data from the DataBase.

### **B) Run Scripts :**

- **`npm run dev`** : To start nodemon in development mode
- **`npm run start`** : To start node in production mode
