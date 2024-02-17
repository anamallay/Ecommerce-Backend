# E-commerce Application API

## Introduction

A comprehensive eCommerce Backend API built with Node.js and TypeScript, offering secure user authentication, product management, order processing, and payment integration for a seamless online shopping experience

## Installation

intall the package

```bash
npm install
```

RUN Server

```bash
npm start
```

## Features
### User Management (/api/users)
Endpoints for administering user accounts within the platform. These include listing all users, retrieving specific user details, registering new users, activating accounts, updating user information, and managing user status (banning/unbanning).

**GET** `/api/users`: Fetch a list of all users.

**GET** `/api/users/:id` : Retrieve detailed information about a specific user.

**POST** `/api/users/register` : Register a new user.

**POST** `/api/users/activate-account/:token` : Activate a newly registered user's account using a token sent via email.

**PUT** `/api/users/:id` : Update user information.
DELETE /api/users/:id: Delete a user account.

**PUT** `/api/users/ban/:id` : Ban a user, restricting access.

**PUT** `/api/users/unban/:id` : Unban a user, restoring access.

### User Authentication (/api/auth)
Handles user login, logout, and password management processes, ensuring secure access to user accounts.

**POST** `/api/auth/login` : Authenticate and log in a user.

**POST** `/api/auth/logout` : Log out a user, ending their session.

**POST** `/api/auth/forget-password` : Initiate a password reset process for users who have forgotten their passwords.

**PUT** `/api/auth/reset-password` : Allow users to set a new password as part of the password reset process.

### Product Management (/api/products)
Manages the product inventory, including listing products, adding new products, updating existing products, and deleting products.

**GET** `/api/products` : Retrieve a list of all products.

**GET** `/api/products/filtered-products`: Fetch products based on specific filters.

**GET** `/api/products/pagination` : List products with pagination support.

**GET** `/api/products/:slug` : Get detailed information about a product identified by its slug.

**POST** /api/products: Add a new product to the inventory.

**PUT** `/api/products/:slug` : Update details of an existing product.

**DELETE** `/api/products/:slug`: Remove a product from the inventory.

### Order Processing (/api/orders)
Covers the entire order process, from payment processing to order tracking and management.

**POST** /api/orders/process-payment: Process payment for an order. 

**GET** /api/orders: List all orders.

**GET** /api/orders/:id: Retrieve details of a specific order.

**GET** /api/orders/getBuyer/:userId: Fetch orders made by a specific buyer.

**DELETE** /api/orders/:orderId: Cancel and delete an order.

**PUT** /api/orders/:orderId/status: Update the status of an order.

**GET** /api/orders/braintree/token: Generate a token for Braintree payment processing.

**POST** /api/orders/braintree/payment: Process a payment through Braintree.

### Product Categories (/api/categories)
Facilitates the organization of products into categories, making it easier for users to browse and find products.

**GET** `/api/categories` : List all product categories.

**GET** `/api/categories/:id` : Get details about a specific category.

**POST** `/api/categories` : Create a new product category.

**PUT** `/api/categories/:id` : Update an existing category.

**DELETE** `/api/categories/:id` : Remove a category.

### Customer Support (/api/contactus)
Provides a channel for users to reach out for support or inquiries through the platform.

**POST** `/api/contactus` : Submit a support or inquiry message.

## Configuration

Create a .env File: In the root directory of your project, create a file named .env.

- **PORT**: The port number on which your Node.js application will run. For example, 3002 means your app will listen on http://localhost:3002.

- **MONGODB_URL**: Your MongoDB connection string. This URL is used to connect your application to your MongoDB database hosted on MongoDB Atlas.

- **DEFAULT_IMG_PATH**: The default path where images are stored if no specific path is provided by the user.
- **JWT_USER_ACTIVATION_KEY**, **JWT_USER_ACCESS_KEY**, **JWT_RESET_PASSWORD_KEY**: These are secret keys used for encrypting and decrypting JSON Web Tokens (JWTs) for user activation, access, and password reset functionalities, respectively.

- **SMTP_USERNAME** and **SMTP_PASSWORD**: Credentials for the SMTP server used to send emails from your application, such as password reset or account verification emails.

- **CLOUDINARY_CLOUD_NAME**, **CLOUDINARY_API_KEY**, **CLOUDINARY_API_SECRET**: These are your Cloudinary account details for cloud-based image and video management services.

- **BRAINTREE_MERCHANT_ID**, **BRAINTREE_PUBLIC_KEY**, **BRAINTREE_PRIVATE_KEY**: These are credentials for integrating Braintree, a payment processing service, to handle transactions.

