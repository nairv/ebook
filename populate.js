var tablename;
// U will contain all the selected points
var U = new Set();

var endt;
var startt;

// F will contain all the buckets
// F has the format {"data-pk-value":{corresponding set containing the points} ,.....}
var F = {};

// C will contain all the counts of the set buckets in F
var C = {};



var generateQuery = function(){
	//Clone U , F , C so that successive clicks will not modify them
	var tempU = jQuery.extend(true , {} , U);
	var tempF = jQuery.extend(true , {} , F);
	var tempC = jQuery.extend(true , {} , C);
	var query;
	var type;
	var union = "U(";
	console.log("TempU Count in generate :" + tempU.count());
	count = tempU.count();
	while(count > 0){
		type = "";
		union = "";
		console.log("TempF: " + tempF);
		console.log("TempC: " + tempC);
		var set1 = tempF[largestBucket(tempC)];
		console.log("LargestBucket :" + set1);
		Object.keys(set1).forEach(function(key) {
	    	console.log(key);
	    	var obj = jQuery.parseJSON(key);
	    	console.log(obj["pkVal"]);
	    	console.log(obj["colVal"]);
	    	console.log(largestBucket(tempC));
	    	//tempU.remove(key);
	    	if(largestBucket(tempC) === obj["colVal"])
	    	{
	    		console.log("col");
	    		type = "col";
	    	}
	    	else{
	    		console.log("pk");
	    		type = "pk";
	    	}
	    	if(type === "col"){
	    		//console.log(obj["pkVal"]);
	    		union = String(String(union) + "," + String(obj["pkVal"]));
	    	}
	    	else{
	    		//console.log(key["colVal"]);
	    		union = String(String(union) + "," + String(obj["colVal"]));
	    	}
	    	//delete tempU[key];
	    	count = count - 1;
	    });

	    union = union + ")";

		if(type === "col")
		{
			query1 = "{&#8719;<sub>("+largestBucket(tempC)+")</sub>&#963;<sub>("+union+")</sub>}";
		}
		else{
			query1 = "{&#963;<sub>("+largestBucket(tempC)+")</sub>&#8719;<sub>("+union+")</sub>}";
		}	
		//console.log(query1);
		if(query === undefined)
			query = query1;
		else
			query = query + " U " + query1;
		tempU.minus(tempF[largestBucket(tempC)]);
		delete(tempF[largestBucket(tempC)]);
		delete(tempC[largestBucket(tempC)]);
		delete set1;
	}
	jQuery("#querybox").html("<p>"+String(query)+"</p>");
	var d2 = new Date();
	endt = d2.getTime();
	console.log("Time difference :"+ (endt - startt));
}
// Find the set in C with the largest number of elements 
var largestBucket = function(o) {
    var sorted = {},
    key , max = 0 , maxprop;

    for (prop in o) {
    	if (o.hasOwnProperty(prop)) {
    		if(o[prop] > max){
    			max = o[prop];
    			maxprop = prop;
    		}
    	}
    }
    return maxprop;
}

var addToBucket= function(obj){
	if(F[obj["colVal"]] !== undefined && F[obj["pkVal"]] !== undefined)
	{
		var set1 = F[obj["colVal"]];
		set1.add(obj);
		F[obj["colVal"]] = set1;
		
		var set2 = F[obj["pkVal"]];
		set2.add(obj);
		F[obj["pkVal"]] = set2;

		C[obj["colVal"]] = set1.count();
		C[obj["pkVal"]] = set2.count();
	
	}
	else if(F[obj["colVal"]] !== undefined && F[obj["pkVal"]] === undefined){
		var set1 = F[obj["colVal"]];
		set1.add(obj);
		F[obj["colVal"]] = set1;
		
		var set2 = new Set();
		set2.add(obj);
		F[obj["pkVal"]] = set2;

		C[obj["colVal"]] = set1.count();
		C[obj["pkVal"]] = set2.count();
	}
	else if(F[obj["colVal"]] === undefined && F[obj["pkVal"]] !== undefined){
		var set1 = new Set();
		set1.add(obj);
		F[obj["colVal"]] = set1;

		var set2 = F[obj["pkVal"]];
		set2.add(obj);
		F[obj["pkVal"]] = set2;

		C[obj["colVal"]] = set1.count();
		C[obj["pkVal"]] = set2.count();
	}
	else{
		
		var set1 = new Set();
		set1.add(obj);
		F[obj["colVal"]] = set1;

		var set2 = new Set();
		set2.add(obj);
		F[obj["pkVal"]] = set2;
		
		C[obj["colVal"]] = set1.count();
		C[obj["pkVal"]] = set2.count();
	}
	console.log("Printing keys of C");
	Object.keys(C).forEach(function(key) {
	    console.log(key);
	});
	console.log("Largest bucket : "+largestBucket(C));
	console.log("F[LargestBucket(C)] :" + JSON.stringify(F[largestBucket(C)]));
	generateQuery();
}

var removeFromBucket = function(obj){
	if(F[obj["colVal"]] !== undefined && F[obj["pkVal"]] !== undefined)
	{
		var set1 = F[obj["colVal"]];
		set1.remove(obj);
		if(set1.count() === 0){
			delete F[obj["colVal"]];
			delete C[obj["colVal"]];
		}
		else{
			F[obj["colVal"]] = set1;
			C[obj["colVal"]] = set1.count();
		}

		var set2 = F[obj["pkVal"]];
		set2.remove(obj);
		if(set2.count() === 0){
			delete F[obj["pkVal"]];
			delete C[obj["pkVal"]];
		}
		else{
			F[obj["pkVal"]] = set2;
			C[obj["pkVal"]] = set2.count();
		}
	}
	else{
		console.log("Error in removeFromBucket");
	}
	console.log("Printing keys of C");
	Object.keys(C).forEach(function(key) {
	    console.log(key);
	});
	console.log(JSON.stringify(C));
	console.log("Largest bucket : "+largestBucket(C));
	console.log("F[LargestBucket(C)] :" + JSON.stringify(F[largestBucket(C)]));
	generateQuery();
}


onload = function() {
	//selected = array();
	
    if (!document.getElementsByTagName || !document.createTextNode) return;
    var rows = document.getElementById('mytable').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    var cols = document.getElementById('mytable').getElementsByTagName('thead')[0].getElementsByTagName('td');
    for(i=0 ; i < rows.length ; i++)
    {
    	var cells = rows[i].getElementsByTagName('td');
    	for (j= 0 ; j < cells.length ; j++)
    	{
    		cells[j].setAttribute('value' , "false");
    	}
    }

    for (i = 0; i < rows.length; i++) {
    	var rowcells = rows[i].getElementsByTagName('td');
    	for(j =0; j < rowcells.length ; j++){
    		// Onclick function for all cells
	        rowcells[j].onclick = function() {
			     	var cellval = {};
			     	var d1 = new Date();
			     	startt = d1.getTime();
			     	console.log(startt);
			    	cellval["colVal"] = this.getAttribute("data-col-val");
			    	cellval["pkVal"] = this.getAttribute("data-pk-val");
		 
		        	//if the cell is already selected 
		        	if (this.getAttribute('value') == "true") {
		        		this.setAttribute('value' , "false");
		        		this.setAttribute('bgcolor', 'white');
		        		//Remove from selected set
		        		U.remove(cellval);
		        		removeFromBucket(cellval);
		        	}
		        	// If the cell was not already selected
		        	else if(this.getAttribute('value') == "false"){
		        		this.setAttribute('value' , "true");
		        		this.setAttribute('bgcolor', '#dcfac9');
		        		// Add to selected set
		        		U.add(cellval);
		        		addToBucket(cellval);
		        	}
		            console.log("cell selection count :" + U.count());
	       	}
		}
    }
}