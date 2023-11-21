function main() {
    // use D3 to read in data
    // Parse the Data
    d3.csv("data/primaryCandidates.csv").then( function(data) {

        var parseTime = d3.timeFormat("%b %d %Y");
        
        data.forEach(function(row) {
            row.year = +row.year;
            row.daysAfterMidtermsAnnounced = +row.daysAfterMidtermsAnnounced;
            row.id = +row.id;
            //row.announced = parseTime(new Date(row.announced))
            //console.log((new Date(row.announced)))
            row.announced = (new Date(row.announced))
            row.announced = parseTime(row.announced)
            console.log(row.announced)
        /console.log(new Date(row.announced))
        });

        drawScatterplot(data);
    });
}

function drawScatterplot(data) {
    
    const margin = {top: 50, right: 50, bottom: 50, left: 50};
    const width = window.innerWidth * 0.5;
    const height = window.innerHeight * 0.5;
    
    // append the svg object to the body of the page
    // document.getElementById("scatterplot") = d3.select("#scatterplot")

    //11-20-2023 - add tips
    const tips = d3.select("body").append("div")
        .attr("class", "tips")
        .style("opacity", 0);
    //11-20-2023 - add tips

    const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style("background-color", "pink")
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
                
    //console.log(d3.extent(data, function(d) { return d.daysAfterMidtermsAnnounced }));

    //11-20-2023 - mouse for tips
        .on('mouseover', function (d) {
            d3.select('announcedCircle').transition()
                .duration('50')
                .attr('opacity', '.15');
            tips.transition()
                .duration(50)
                .style("opacity", 1);
            let num = (d.srcElement.__data__.candidate);
            console.log(num);
            tips.html(num)
                .style("left", (d.pageX + 10) + "px")
                .style("top", (d.pageY - 15) + "px");
        
        })
        .on('mouseout', function (d) {
            d3.select('announcedCircle').transition()
                .duration('50')
                .attr('opacity', '1');
                tips.transition()
                .duration('50')
                .style("opacity", 0);
        });


    // create x scale
    // let xScale = d3.scaleLinear()
    //     .domain(d3.extent(data, function(d) { return d.daysAfterMidtermsAnnounced }))
    //     .range([margin.left, width]);

    var parseTime = d3.timeFormat("%b %d %Y");

        // let xScale = d3.scaleTime()
        //     .domain(d3.extent(data, function(d) { return d.year }))   //d.announced
        //     .range([margin.left, width])
        //     console.log(d3.extent(data, function(d) { return d.year })); //d.announced


        //UNCOMMENT THIS BELOW

        let xScale = d3.scaleTime()
            .domain(d3.extent(data, function(d) { 
                d.announced = (new Date(d.announced))
                d.announced = parseTime(d.announced)
                return (new Date(d.announced)) }))   //d.announced
            .range([margin.left, width])
            console.log(d3.extent(data, function(d) { 
                d.announced = (new Date(d.announced))
                d.announced = parseTime(d.announced)
                return typeof d.announced })); //d.announced


    // add x axis

    //add background color - FP 11-8-2023
    // svg.append("rect")
    //     .attr("width", width + margin.left + margin.right)
    //     .attr("height", height + margin.top + margin.bottom)
    //     .attr("fill", "pink");
    
    svg.append("g")
        .style("font", "14px times") // increase font FP 11-8-2023
        .attr("class", "axis")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale)
        .tickFormat(d3.format('d'))
        );
    
    // create y scale
    // const yScale = d3.scaleLinear()
    //     .domain(d3.extent(data, function(d) { return d.year }))
    //     .range([75, height-75]); // move y axis above x axis FP 11-8-2023
         const yScale = d3.scaleLinear()
            .domain(d3.extent(data, function(d) { return d.id }))
            .range([75, height-75]); // move y axis above x axis FP 11-8-2023



    // add Y axis
    //console.log(d3)
    svg.append("g")
        .style("font", "14px times") // increase font FP 11-8-2023
        .attr("class", "axis")
        .attr("transform", `translate(0, 0)`)
        .call(d3.axisLeft(yScale)
        .tickFormat(d3.format('d'))  //tickFormat to remove commas - FP 11-8-2023
        );
        //.ticks(d3.utcYear.every(3))
        //.tickFormat(d3.format('d')));  //tickFormat to remove commas - FP 11-8-2023
        // .tickFormat(function(d) {
        //     if (d===2022) 
        //        { return "" }
        //     if (d===2018)
        //        { return "" }
        //     if (d===2014) 
        //        { return "" }
        //     if (d===2010)
        //        { return "" }
        //     else 
        //        { return d}
        //})
        
        //.ticks(5)

    // add circles
    svg.selectAll(".announcedCircle")
        .data(data)
        .enter()
        .append("circle")
        .attr('class', 'announcedCircle')
        .attr("cx", function(row) { return xScale(row.year)})
        .attr("cy", function(row) { return yScale(row.id)})
        .attr("r", 5) // changed teh circle size to '5' - FP 11-8-2023
        //.style("fill", 'blue') // changed the color to 'blue' - FP 11-8-2023
        // dynamic color change from 'red' to 'blue' - FP 11-13-2023
        .style("fill", function(row){ return row.party == 'D' ? 'blue' : 'red' })
        .style('opacity', 0.75); 
}



main();