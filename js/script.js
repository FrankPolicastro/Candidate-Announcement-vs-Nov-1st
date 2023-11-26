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
            //console.log(row.announced)
        //console.log(new Date(row.announced))
        });

        drawScatterplot(data);
    });
}

function drawScatterplot(data) {
    
    const margin = {top: 50, right: 50, bottom: 50, left: 50};
    const width = window.innerWidth * 0.9;
    const height = window.innerHeight * 0.5;
    const midtermDates = ["11/7/2006", "11/2/2010", "11/4/2014", "11/6/2018", "11/8/2022"]
    
    // append the svg object to the body of the page
    // document.getElementById("scatterplot") = d3.select("#scatterplot")

    //11-20-2023 - add tips
    const tips = d3
        .select("body").append("div")
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
        


    // create x scale
    // let xScale = d3.scaleLinear()
    //     .domain(d3.extent(data, function(d) { return d.daysAfterMidtermsAnnounced }))
    //     .range([margin.left, width]);

    var parseTime = d3.timeFormat("%b %d %Y");
    //var format = d3.time.format("%b-%d-%Y");
    //console.log(format(new Date(1075611600000))); // returns a string

        // let xScale = d3.scaleTime()
        //     .domain(d3.extent(data, function(d) { return d.year }))   //d.announced
        //     .range([margin.left, width])
        //     console.log(d3.extent(data, function(d) { return d.year })); //d.announced


        //UNCOMMENT THIS BELOW
        //WORKING 11/26/2023
        // let xScale = d3.scaleLinear()
        //     .domain(d3.extent(data, function(d) { 
        //         d.announced = (new Date(d.announced))
        //         //d.announced = parseTime(d.announced)
        //         //return (new Date(d.announced)) }))   //d.announced
        //         return (d.announced) }))
        //     .range([margin.left, width]);
        //     //console.log(d3.extent(data, function(d) { 
        //     //    d.announced = (new Date(d.announced))
        //         //d.announced = parseTime(d.announced)
        //     //    return typeof d.announced })); //d.announced

        //CONVERTED TO TIMESCALE 11/26/2023
        let xScale = d3.scaleTime()
            .domain(d3.extent(data, function(d) {d.announced = (new Date(d.announced)) 
                return (d.announced)}))
            .range([margin.left-35, width])
            console.log(d3.extent(data, function(d) {d.announced = (new Date(d.announced)) 
                return (d.announced)}));



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
        .ticks(20)
        .tickFormat(d3.timeFormat('%b %Y')) //11-26-2023 - cleaned up x axis labels
        );
    
    // create y scale
    // const yScale = d3.scaleLinear()
    //     .domain(d3.extent(data, function(d) { return d.year }))
    //     .range([75, height-75]); // move y axis above x axis FP 11-8-2023
         const yScale = d3.scaleLinear()
            .domain(d3.extent(data, function(d) { return d.id }))
            .range([0, height-15]); // move y axis above x axis FP 11-8-2023



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
    
    var theDate = new Date("2018/11/6");
    //console.log(theDate)
    //var today = theDate.getMonth()+1 + "/" + theDate.getDate() + "/" +     theDate.getFullYear();
    
    //11-24-2023: Vertical lines denoting midterm dates
    // svg.append("line")
    //      .style("stroke", "blue")
    //      .style("stroke-width", .8)
    //      .attr("class", "theLine")
    //      //.attr("x1", xScale(theDate))
    //      .attr("x1", xScale(new Date(midtermDates[1])))
    //      .attr("x2", xScale(new Date(midtermDates[1])))       
    //      .attr("y1", height)
    //      .attr("y2", 0); 
         
    //11-24-2023: append loop for vertical midtermyear lines
    //THIS WAS INTERESTING
    
            // for (var i = 0; i < midtermDates.length; i++) {
            //     //console.log(new Date (midtermDates[i]));
            //     //var filteredData = (function(d) {
            //     //    return (new Date (midtermDates[i]));
            //     //});
            //     console.log(i);
            //     var lines = svg.selectAll(null)
            //       .data(midtermDates)
            //       .enter()
            //       .append("line")
            //       .attr("class", "theLine")
            //       .attr("x1", function(d) {
            //         return xScale(new Date(midtermDates[i]))
            //       })
            //       .attr("x2", function(d) {
            //         return xScale(new Date(midtermDates[i]))
            //       })
            //       .attr("y1", function(d) {
            //         return height
            //       })
            //       .attr("y2", 0)
            //       .style("stroke", "blue");
            //       //.style("stroke-width", .8);
              
            //   };

            //11-24-2023: 2nd attempt to append vertical midtermyear lines
            var lines = svg.selectAll(null)
                .data(midtermDates)
                .enter()
                .append("line")
                .attr("class", "theLine")
                //.attr("x1", function(d, i) {return xScale(new Date(d))})
                .attr("x1", function(d, i) {return xScale(new Date(d))})
                //.attr("x2", function(d, i) {return xScale(new Date(d))})   
                .attr("x2", function(d, i) {return xScale(new Date(d))})
                .attr("y1", function(d, i) {return height})
                .attr("y2", 0)
                .attr('opacity', '1')
                .attr('indx', function(d, i) {return i})
                .style("stroke", "blue")
                .style("stroke-width", .8)
                .on('mouseover', function (d) {
                    d3.select(this).transition()
                        .duration('50')
                        .attr('opacity', '.15');
                    tips.transition()
                        .duration(50)
                        .style("opacity", 1);
                    //let midtrmyr = (midtermDates);
                    let indx = d.target.getAttribute('indx');
                    console.log(indx);
                    tips.html(midtermDates[indx])
                        .style("left", (d.pageX + 10) + "px")
                        .style("top", (d.pageY - 15) + "px");
                
                })
                .on('mouseout', function (d) {
                    d3.select(this).transition()
                        .duration('50')
                        .attr('opacity', '1');
                        tips.transition()
                        .duration('50')
                        .style("opacity", 0);
                }); 

    // svg.append("line")
    //      //.append("line") 
    //      .attr("class", "theLine")
    //      //.attr("x1", xScale(theDate))   
    //      .attr("fill",  "white")
    //      .attr("x1", xScale(new Date(midtermDates[3])))
    //      .attr("x2", xScale(new Date(midtermDates[3])))
    //      .attr("y1", height)
    //      .attr("y2", 0);
    
    //11-24-2023: Add second set of mouse-over & outs for vertical mid term year lines
    //svg.select('.theLine')
         

        //Added Mouse test
        

    //midtermDates.forEach(function(d){ return console.log( new Date(d))})     



        //.ticks(5)

    // add circles
    svg.selectAll(".announcedCircle")
        .data(data)
        .enter()
        .append("circle")
        .attr('class', 'announcedCircle')
        .attr("cx", function(row) { return xScale(row.announced)})
        .attr("cy", function(row) { return yScale(row.id)})
        .attr("r", 5) // changed teh circle size to '5' - FP 11-8-2023
        //.style("fill", 'blue') // changed the color to 'blue' - FP 11-8-2023
        // dynamic color change from 'red' to 'blue' - FP 11-13-2023
        .style("fill", function(row){ return row.party == 'D' ? 'blue' : 'red' })
        .style('opacity', 0.75)
        .on('mouseover', function (d) {
            d3.select('announcedCircle').transition()
                .duration('50')
                .attr('opacity', '.15');
            tips.transition()
                .duration(50)
                .style("opacity", 1);
            let candName = (d.srcElement.__data__.candidate);
            let candYear = (d.srcElement.__data__.announced);
            var parseSDt = d3.timeFormat("%x");  //11-24-2023: why did parseTime work but parseSDt had to be declared closer to this append?
            let candYearfmt = parseSDt(candYear);
            console.log(candName);
            tips.html(candName + "<br>" + candYearfmt)
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
}



main();