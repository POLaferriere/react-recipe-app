function imperialToMetric(obj) {
	for (var key in obj) {
		switch(obj[key]) {
			case 'tsp' :
			case 'teaspoon' :
				obj[key] = 'ml'
				obj.qty = obj.qty*5
				break;

			case 'tablespoon' :
			case 'tbsp' :
				obj[key] = 'ml'
				obj.qty = obj.qty*15
				break; 

			case 'cup' :
				obj[key] = 'ml'
				obj.qty = obj.qty*240
				break;

			case 'oz' :
			case 'ounce' :
				obj[key] = 'g'
				obj.qty = obj.qty*28
				break;

			case 'pound' :
			case 'lb' :
				obj[key] = 'g'
				obj.qty = obj.qty*450
				break;
		}
	}
}

function metricToImperial(obj) {
	for (var key in obj) {
		switch(obj[key]) {
			case 'ml' :
				if(obj.qty < 31 && obj.qty%3 == 0) {
					obj[key] = 'tbsp'
					obj.qty = obj.qty/15
				} else if(obj.qty < 31 && obj.qty != 0) {
					obj[key] = 'tsp'
					obj.qty = obj.qty/15
				} else if(obj.qty > 30) {
					obj[key] = 'cup'
					obj.qty = obj.qty/240
				}
				obj[key] = ''
				obj.qty = obj.qty*5
				break;

			case 'tablespoon' :
			case 'tbsp' :
				obj[key] = 'ml'
				obj.qty = obj.qty*15
				break; 

			case 'cup' :
				obj[key] = 'ml'
				obj.qty = obj.qty*240
				break;

			case 'oz' :
			case 'ounce' :
				obj[key] = 'g'
				obj.qty = obj.qty*28
				break;

			case 'pound' :
			case 'lb' :
				obj[key] = 'g'
				obj.qty = obj.qty*450
				break;
		}
	}
}

export {imperialToMetric};