from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
import jwt
import datetime

app = Flask(__name__)

app.config['SECRET_KEY'] = 'thisisecret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////nfs/2017/m/mtan/projects/php/github/back-end/test.db'

db = SQLAlchemy(app)
# Data models
class User(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	public_id = db.Column(db.String(50), unique=True)
	name = db.Column(db.String(50))
	password = db.Column(db.String(80))
	admin = db.Column(db.Boolean)

class Item(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(50))
	description = db.Column(db.String(100))
	image_url = db.Column(db.String(200))
	price = db.Column(db.Integer)

class Order(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	user_id = db.Column(db.Integer)
	item_id = db.Column(db.Integer)
	quantity = db.Column(db.Integer)
	timestamp = db.Column(db.DateTime)

class Category(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(50), unique=True)

class ItemCategory(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	category_id = db.Column(db.Integer)
	item_id = db.Column(db.Integer)

# Tokenization
def token_required(f):
	@wraps(f)
	def decorated(*args, **kwargs):
		token = None

		if 'x-access-token' in request.headers:
			token = request.headers['x-access-token']

		if not token:
			return jsonify({ 'message' : 'Token is missing!' })

		try:
			data = jwt.decode(token, app.config['SECRET_KEY'])
			current_user = User.query.filter_by(public_id=data['public_id']).first()
			if not current_user:
				return jsonify({ 'message' : 'Token is invalid'})
		except:
			return jsonify({ 'message' : 'Token is invalid'})

		return f(current_user, *args, **kwargs)

	return decorated

# User table routes
@app.route('/user/all', methods=['GET'])
@token_required
def get_all_users(current_user):

	if not current_user.admin:
		return jsonify({ 'message': 'Reserved admin method.'})

	users = User.query.all()
	output = []

	for user in users:
		user_data = {}
		user_data['public_id'] = user.public_id
		user_data['name'] = user.name
		user_data['password'] = user.password
		user_data['admin'] = user.admin
		output.append(user_data)

	return jsonify({ 'users' : output})

@app.route('/user/', methods=['GET'])
@token_required
def get_one_user(current_user):

	user = User.query.filter_by(public_id=current_user.public_id).first()

	if not user:
		return jsonify({ 'message' : 'No user found!' })

	user_data = {}
	user_data['public_id'] = user.public_id
	user_data['name'] = user.name
	user_data['password'] = user.password
	user_data['admin'] = user.admin

	return jsonify({ 'user': user_data })

@app.route('/user/', methods=['POST'])
# @token_required
def create_user():

	# if not current_user.admin:
		# return jsonify({ 'message': 'Reserved admin method.'})

	data = request.get_json()

	if not data:
		return jsonify({ 'message' : 'No parameters specified'})

	hashed_password = generate_password_hash(data['password'], method='sha256')

	new_user = User(public_id=str(uuid.uuid4()), name=data['name'], password=hashed_password, admin=False)
	print(new_user)
	db.session.add(new_user)
	db.session.commit()

	return jsonify({ 'message' : 'New user created!'})

@app.route('/user/<method>/<public_id>', methods=['PUT'])
@token_required
def change_user_rights(current_user, public_id, method):

	if not current_user.admin:
		return jsonify({ 'message': 'Reserved admin method.'})

	user = User.query.filter_by(public_id=public_id).first()

	if not user:
		return jsonify({ 'message' : 'No user found!' })

	user.admin = True if method == 'up' else False
	db.session.commit()

	message = 'User has been ' + ('promoted!' if method == 'up' else 'demoted.')
	return jsonify({ 'message': message })

@app.route('/user/<public_id>', methods=['PUT'])
@token_required
def edit_user(current_user, public_id):

	if not current_user.admin and not current_user.public_id != public_id:
		return jsonify({ 'message' : 'Invalid user access token'})

	data = request.get_json()

	if not data:
		return jsonify({ 'message' : 'No parameters specified'})

	# Disable changing user id
	data.pop('id', None)
	data.pop('public_id', None)
	data.pop('admin', None)

	# Hash password
	password = data.pop('password', None)
	if password:
		data['password'] = generate_password_hash(password, method='sha256')

	User.query.filter_by(public_id=public_id).update(data)
	db.session.commit()

	return jsonify({ 'message' : 'Item has been edited.'})

@app.route('/user/<public_id>', methods=['DELETE'])
@token_required
def delete_user(current_user, public_id):

	if not current_user.admin:
		return jsonify({ 'message': 'Reserved admin method.'})

	user = User.query.filter_by(public_id=public_id).first()

	if not user:
		return jsonify({ 'message' : 'No user found!' })

	db.session.delete(user)
	db.session.commit()

	return jsonify({ 'message' : 'User has been deleted' })

# Login routes
@app.route('/login/', methods=['POST'])
def login():
	auth = request.authorization

	if not auth or not auth.username or not auth.password:
		return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

	user = User.query.filter_by(name=auth.username).first()

	if not user or not check_password_hash(user.password, auth.password):
		return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})

	token = jwt.encode({'public_id' : user.public_id, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=60)}, app.config['SECRET_KEY'])

	return jsonify({'token' : token.decode('UTF-8')})

# Item routes
@app.route('/item/', methods=['GET'])
def get_all_items():

	items = Item.query.all()
	output = []

	for item in items:
		item_data = {}
		item_data['id'] = item.id
		item_data['name'] = item.name
		item_data['description'] = item.description
		item_data['price'] = item.price
		item_data['image_url'] = item.image_url
		output.append(item_data)

	return jsonify({ 'items' : output})

@app.route('/item/', methods=['POST'])
@token_required
def create_item(current_user):

	if not current_user.admin:
		return jsonify({ 'message': 'Reserved admin method.'})

	data = request.get_json()

	new_item = Item(name=data['name'], description=data['description'], image_url=data['image_url'], price=data['price'])
	db.session.add(new_item)
	db.session.commit()

	return jsonify({ 'message' : 'New item created'})

@app.route('/item/<id>', methods=['PUT'])
@token_required
def edit_item(current_user, id):

	if not current_user.admin:
		return jsonify({ 'message' : 'Reserved admin method.'})

	data = request.get_json()

	if not data:
		return jsonify({ 'message' : 'No parameters specified'})

	# Disable changing item id
	data.pop('id', data)

	Item.query.filter_by(id=id).update(data)

	# for key, value in data.items():
	# 	if key != 'id':
	# 		print(item[key])
	# 		item[key] = value

	db.session.commit()

	return jsonify({ 'message' : 'Item has been edited.'})

@app.route('/item/<id>', methods=['DELETE'])
@token_required
def delete_item(current_user, id):

	if not current_user.admin:
		return jsonify({ 'message': 'Reserved admin method.'})

	item = Item.query.filter_by(id=id).first()

	if not item:
		return jsonify({ 'message' : 'No item found!' })

	db.session.delete(item)
	db.session.commit()

	return jsonify({ 'message' : 'Item has been deleted' })

# Category Routes
@app.route('/category/', methods=['GET'])
def get_all_categories():

	categories = Category.query.all()
	output = []

	for category in categories:
		category_data = {}
		category_data['id'] = category.id
		category_data['name'] = category.name
		output.append(category_data)

	return jsonify({ 'categories' : output})

@app.route('/category', methods=['POST'])
@token_required
def create_category(current_user):

	if not current_user.admin:
		return jsonify({ 'message': 'Reserved admin method.'})

	data = request.get_json()

	new_category = Category(name=data['name'])
	db.session.add(new_category)
	db.session.commit()

	return jsonify({ 'message' : 'New category created'})

@app.route('/category/<id>', methods=['PUT'])
@token_required
def edit_category(current_user, id):

	if not current_user.admin:
		return jsonify({ 'message' : 'Reserved admin method.'})

	data = request.get_json()

	if not data:
		return jsonify({ 'message' : 'No parameters specified'})

	# Disable changing category id
	data.pop('id', None)

	Category.query.filter_by(id=id).update(data)
	db.session.commit()

	return jsonify({ 'message' : 'Category has been edited.'})

@app.route('/category/<id>', methods=['DELETE'])
@token_required
def delete_category(current_user, id):

	if not current_user.admin:
		return jsonify({ 'message': 'Reserved admin method.'})

	category = Category.query.filter_by(id=id).first()

	if not category:
		return jsonify({ 'message' : 'No category found!' })

	db.session.delete(category)
	db.session.commit()
	return jsonify({ 'message' : 'Category has been deleted' })

# Order Routes
@app.route('/order/all', methods=['GET'])
@token_required
def get_all_orders(current_user):

	if not current_user.admin:
		return jsonify({ 'message': 'Reserved admin method.'})

	orders = Order.query.all()
	output = []

	for order in orders:
		order_data = {}
		order_data['id'] = order.id
		order_data['user_id'] = order.user_id
		order_data['item_id'] = order.item_id
		order_data['quantity'] = order.quantity
		order_data['timestamp'] = order.timestamp
		output.append(order_data)

	return jsonify({ 'orders' : output })

@app.route('/order', methods=['GET'])
@token_required
def get_user_orders(current_user):

	orders = Order.query.filter_by(user_id=current_user.id)

	output = []

	for order in orders:
		order_data = {}
		order_data['id'] = order.id
		order_data['user_id'] = order.user_id
		order_data['item_id'] = order.item_id
		order_data['quantity'] = order.quantity
		order_data['timestamp'] = order.timestamp
		output.append(order_data)

	return jsonify({ 'orders' : output })

@app.route('/order', methods=['POST'])
@token_required
def create_order(current_user):

	data = request.get_json()
	time = datetime.datetime.utcnow()

	for item in data['orders']:
		new_order = Order(user_id=current_user.id, item_id=item['id'], quantity=item['quantity'], timestamp=time)
		db.session.add(new_order)
	db.session.commit()

	return jsonify({ 'message' : 'Orders have been created'})

@app.route('/order/<id>', methods=['PUT'])
@token_required
def edit_order(current_user, id):

	if not current_user.admin:
		return jsonify({ 'message' : 'Reserved admin method.'})

	data = request.get_json()

	if not data:
		return jsonify({ 'message' : 'No parameters specified'})

	# Disable changing order id
	data.pop('id', None)

	Order.query.filter_by(id=id).update(data)
	db.session.commit()

	return jsonify({ 'message' : 'Order has been edited.'})

@app.route('/order/<id>', methods=['DELETE'])
@token_required
def delete_order(current_user, id):

	if not current_user.admin:
		return jsonify({ 'message': 'Reserved admin method.'})

	order = Order.query.filter_by(id=id).first()

	if not order:
		return jsonify({ 'message' : 'No order found!' })

	db.session.delete(order)
	db.session.commit()
	return jsonify({ 'message' : 'Order has been deleted' })

# ItemCategory Routes
@app.route('/itemcategory', methods=['GET'])
def get_all_relations():

	relations = ItemCategory.query.all()

	output = []

	for relation in relations:
		relation_data = {}
		relation_data['id'] = relation.id
		relation_data['category_id'] = relation.category_id
		relation_data['item_id'] = relation.item_id
		output.append(relation_data)

	return jsonify({ 'all' : output })

@app.route('/itemcategory/<category_id>', methods=['GET'])
def get_category_items(category_id):

	relations = ItemCategory.query.filter_by(category_id=category_id)

	output = []

	for relation in relations:
		output.append(relation.item_id)

	return jsonify({ str(category_id) : output })

@app.route('/itemcategory', methods=['POST'])
@token_required
def create_item_category(current_user):

	if not current_user.admin:
		return jsonify({ 'message' : 'Reserved admin rights.' })

	data = request.get_json()

	if not data:
		return jsonify({ 'message' : 'No parameters specified.' })

	new_item_category = ItemCategory(item_id=data['item_id'], category_id=data['category_id'])

	db.session.add(new_item_category)
	db.session.commit()

	return jsonify({ 'message' : 'Item Category have been created'})

@app.route('/itemcategory/<id>', methods=['PUT'])
@token_required
def edit_item_category(current_user, id):

	if not current_user.admin:
		return jsonify({ 'message' : 'Reserved admin method.'})

	data = request.get_json()

	if not data:
		return jsonify({ 'message' : 'No parameters specified'})

	# Disable changing order id
	data.pop('id', None)

	ItemCategory.query.filter_by(id=id).update(data)
	db.session.commit()

	return jsonify({ 'message' : 'Item Category has been edited.'})

@app.route('/itemcategory/<id>', methods=['DELETE'])
@token_required
def delete_itemcategory(current_user, id):

	if not current_user.admin:
		return jsonify({ 'message': 'Reserved admin method.'})

	item = ItemCategory.query.filter_by(id=id).first()

	if not item:
		return jsonify({ 'message' : 'No itemcategory found!' })

	db.session.delete(item)
	db.session.commit()
	return jsonify({ 'message' : 'Item Category has been deleted' })


if __name__ == '__main__':
	app.run(debug=True)

db.create_all()
