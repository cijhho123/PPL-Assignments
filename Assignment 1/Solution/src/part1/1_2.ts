type Product = {
	name: string;
	price: number;
	discounted: boolean;
}

//signature: getDiscountedProductAveragePrice(invesntory, number)
// type: (Product[] ) => number
// purpose: calculates the average price of all discounted products in a given inventory 
// pre-conditions: true
// tests: treeToSentence([{name:"a", price:5, discounted:true}, {name:"b", price:10, discounted:true}, {name:"b", price:15, discounted:true}]) ==> 10
const getDiscountedProductAveragePrice = (inventory: Product[]): number => {
	const filteredItems = inventory.filter((p : Product) => p.discounted);
	const sum =  filteredItems.reduce((acc, curr) => acc + curr.price, 0);
	const amount =  filteredItems.reduce((acc, curr) => acc += 1, 0);
	
	return sum / amount;
}

let p : Product[] = [{name:"a", price:5, discounted:true}, {name:"b", price:10, discounted:true}, {name:"b", price:15, discounted:true}];
console.log(getDiscountedProductAveragePrice(p));