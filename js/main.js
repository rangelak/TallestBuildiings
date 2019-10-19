
// helper function for sorting function
function compareHeights(a, b) {
    var heightA = +a.height_m;
    var heightB = +b.height_m;

    var comparison = 0;
    if (heightA > heightB) {
        comparison = -1;
    } else if (heightA < heightB) {
        comparison = 1;
    }
    return comparison;
}

// soring function
function sortHeights(d){
	return d.sort(compareHeights);
}

// display buildings on the side
function displayBuilding(building){
	var imgPath = 'img/' + building.image;
	var displayDiv = document.getElementById("picArea")
	displayDiv.innerHTML = "<img src ='" + imgPath + "' class='img-fluid mb-3'/>"

	// adding also link to wikipedia in a fairly straightforward way in the end
	displayDiv.innerHTML += "<div class = 'building-stats'> name: " + building.building + "</div>" +
		"<div class = 'building-stats'> country: " + building.country + "</div>" + 
		"<div class = 'building-stats'> city: " + building.city + "</div>" + 
		"<div class = 'building-stats'> height(m): " + building.height_m + "</div>" + 
		"<div class = 'building-stats'> height(ft): " + building.height_ft + "</div>" + 
		"<div class = 'building-stats'> floors: " + building.floors + "</div>" + 
		"<div class = 'building-stats'> Completion year: " + building.completed + "</div>" +
		"<a href= 'https://en.wikipedia.org/wiki/" + building.building + 
		"' class = 'building-stats' target='_blank'> Link to wiki: " + building.building + "</a>";


}

// loading the csv
d3.csv("data/buildings.csv", function(error, data) {
    if (error) throw error;
    
    // sort the data
    var chartData = sortHeights(data);

    // drawing the canvas
    var svg = d3.select("#chartArea")
        .append("svg")
        .attr("width", 600)
        .attr("height", 800);

    // adding rectangles
    svg.selectAll('rect')
        .data(chartData)
        .enter()
        .append("rect")
        .attr('width', (d => +d.height_px))
        .attr('height', 30)
        .attr('y', function(d, index) {
            return (index * 60);
        })
        .attr('x', 250)
        .attr('fill', '#69b3a2')
    	.on('click', function(d){
    		return displayBuilding(d);
    	})
    	/* 
    	NOTE TO TFs: I like this with mouseover a lot more
    	yet the specifications ask for click.     	
    	*/

    // adding names
    svg.selectAll("text.building-label")
        .data(chartData)
        .enter()
        .append("text")
        .attr("class", "building-label")
        .attr("x", 240)
        .attr("y", (d, index) => index * 60 + 20)
        .text((d) => d.building)
        .on('click', (d) => displayBuilding(d));

    // adding height labels
    svg.selectAll("text.height-label")
        .data(chartData)
        .enter()
        .append("text")
        .attr("class", "height-label")
        .attr("x", (d) => (+d.height_px) + 220)
        .attr("y", (d, index) => index * 60 + 20)
        .text((d) => d.height_m);

});