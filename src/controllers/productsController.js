const { name } = require('ejs');
const fs = require('fs');
const path = require('path');
const setID = require ('../helpers/setID')

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const generateID = function() {
	let ids = products.map((product) => product.id)
	return setID(ids)
}

const newProduct = function(req) {
	let newProduct = {
		id: generateID(),
		...req.body,
		image: req.files[0].filename,
	};
	products.push(newProduct);
	let productsJSON = JSON.stringify(products);
	fs.writeFileSync(productsFilePath, productsJSON)
	return newProduct.id
}

const editProduct = function (req) {
	products.forEach((product) => {
		if (product.id == req.params.id) {
			// product = { ...product, ...req.body, image: req.files[0].filename }
			product.name = name
			product.price = price
			product.discount = Number(product.discount)
			product.image = req.files[0].filename
			product.category = category
			product.description = description
		}
	})
	const productJson = JSON.stringify(products)
	fs.writeFileSync(productsFilePath, productJson)
	return product.id
}

const deleteProduct = function(req) {
	const productsNotDeleted = products.filter((product) => product.id != req.params.id)
	let productsJSON = JSON.stringify(productsNotDeleted);
	fs.writeFileSync(productsFilePath, productsJSON)
}

const controller = {
	// Root - Show all products
	index: (req, res, next) => {
			res.render ('products', {products, toThousand})
	},

	// Detail - Detail from one product
	detail: (req, res, next) => {
		const product = products.find(item =>  item.id == req.params.id);
		if(product.discount) {
			product.finalPrice = toThousand(product.price * (1 - product.discount/100))
		} else {
			product.price = toThousand (product.price)
		}
		res.render('detail', {product, title: product.name})
	},

	// Create - Form to create
	create: (req, res, next) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res, next) => {
		const id = newProduct(req);
		res.redirect('/products/detail/' + id)
	},

	// Update - Form to edit
	edit: (req, res, next) => {
		const productToEdit = products.find(item =>  item.id == req.params.id);
		res.render('product-edit-form', {productToEdit, title: 'Editando ' + productToEdit.name})
	},
	// Update - Method to update
	update: (req, res, next) => {
		const id = editProduct(req)
		res.redirect('/products/detail/' + id)
	},

	// Delete - Delete one product from DB
	destroy : (req, res, next) => {
		deleteProduct(req)
		res.redirect('/')
	}
};

module.exports = controller;
