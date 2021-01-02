const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		let inSale = products.filter(function (product) {
            return product.category == 'in-sale'
        })

        let visited = products.filter (function (product) {
            return product.category == 'visited'
        })

        res.render ('index', {inSale, visited, toThousand})
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;