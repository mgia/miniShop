## How do you build an e-commerce website in 2 days?

For this project, I was given the following requirements:

#### Item Management
The website can show different items in a shop, including name, description, price and quantity.

#### User Management
The website should have user accounts to track customer information and orders.

#### Cart Management
There should be a cart which acts as a temporary item cache before the final purchase.

#### Category Filtering
Customers should be able to discover items by category

## The Ok Store
I decided to build a back-end API server that would serve information to a front-end web page.

My API server has the following features:
- Junction tables for data in many-to-many relationships (users/items, items/categories)
- Complete endpoints with full CRUD operations for all data types
- JWT tokenization for stateless session management

My front-end webpage has the following features:
- Login and register page for existing / new users
- Item catalog with `add to cart` feature
- Cart preview displaying total amount and number of items
- Cart with 'remove from cart' and `send order` features

## Getting Started
Setting up requires running two concurrent servers for front-end and back-end.

In one terminal, run:
```
cd back-end
export FLASK_APP=app.py
flask run
```

In another terminal, run:
```
cd front-end
npm start
```

### Testing
The database is pre-loaded with user accounts with you can use to login. You can also choose to register new accounts in the login page.

Username: admin
Password: admin

Also, in certain browsers like Chrome, localhost CORS requests are disallowed by default. To bypass this issue, you can simply download a CORS web extension to enable cross-origin resource sharing for development testing purposes.

## Built With

* [React](https://reactjs.org/) - Front-end web framework used
* [Flask](http://flask.pocoo.org/) - API server framework used

## Notes

