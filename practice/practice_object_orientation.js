// Given the following object structure:
// let scissorsId = 0;
// let scissorsName = 'Scissors';
// let scissorsStock = 8;
// let scissorsPrice = 10;
// 
// let drillId = 1;
// let drillName = 'Cordless Drill';
// let drillStock = 15;
// let drillPrice = 45;
//
// behaviors:
// set price of product setPrice(newPrice)
// describe product:
// describeProduct(scissors);
// => Name: Scissors
// => ID: 0
// => Price: $10
// => Stock: 8
//
// Create a factor function to return objects meeting these requirements
// createProduct(id, name, stock, price) methods setPrice and describe
//

function createProduct(id, name, stock, price) {
	if (price < 0) throw new Error('Price cannot be negative.');

	return {
		id,
		name,
		stock,
		price,
		setPrice(newPrice) {
			if (newPrice < 0) throw new Error ('Price cannot be negative.');

			this.price = newPrice;
		},
		describe() {
			let logProperty = console.log.bind(null, '=> ');

			logProperty(`Name: ${this.name}`);
			logProperty(`ID: ${this.id}`);
			logProperty(`Price: $${this.price}`);
			logProperty(`Stock: ${this.stock}`);
			console.log();
		},
	}
}

let scissors = createProduct(1, 'Scissors', 25, 4.5);
let drill = createProduct(2, 'Drill', 30, 25.00);
scissors.describe();
drill.describe();

drill.setPrice(28.50);
drill.describe();

// uncomment to test errors:
// let nonProduct = createProduct(3, 'nothing', 15, -10);
// scissors.setPrice(-5);
