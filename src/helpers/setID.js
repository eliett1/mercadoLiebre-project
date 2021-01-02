const setID = (productsIds) => {
	const id = productsIds.reduce((acc, id) => {
		acc = id > acc ? id : acc
		return acc
	})

	return id + 1
}

module.exports = setID
