/*
 * updates the letter counts based on the textarea and redraws the
 * entire histogram
 */
var updateData = function() {
  // get the textarea "value" (i.e. currently entered text)
  var text = d3.select("body").select("textarea.txt1").node().value;

  // calculate the letter count
  var count = countLetters(text);

  /*
   * you will find there are a lot of JavaScript functions that are not
   * supported in all browsers. for consistency, we will convert our
   * count object to a d3 map to avoid any issues.
   */
  count = d3.map(count);

  /*
   * speaking of non-standard functions, try out console.table!
   * remove this line if it doesn't work on your browser
   */
  try {
    console.table(count);
  }
  catch (e) {
    console.log(count);
  }

  return count;
};

var updateData1 = function() {
  // get the textarea "value" (i.e. currently entered text)
  var text = d3.select("body").select("textarea.txt2").node().value;

  // calculate the letter count
  var count = countLetters(text);

  /*
   * you will find there are a lot of JavaScript functions that are not
   * supported in all browsers. for consistency, we will convert our
   * count object to a d3 map to avoid any issues.
   */
  count = d3.map(count);

  /*
   * speaking of non-standard functions, try out console.table!
   * remove this line if it doesn't work on your browser
   */
  try {
    console.table(count);
  }
  catch (e) {
    console.log(count);
  }

  return count;
};

/*
 * our massive function to draw a bar chart. note some stuff in here
 * is bonus material (for transitions and updating the text)
 */
var drawBarChart = function() {
  // get the data we want to visualize
  var count = updateData();

  // make sure we have at least 1 letter to draw
  if (count.keys().length < 1) {
    return;
  }

  // get the svg we want to draw on
  var svg = d3.select("body").select("svg.svg1");

  /*
   * we will need to map our data domain to our svg range, which
   * means we need to calculate the min and max of our data
   */

  var countMin = 0; // always include 0 on a bar chart
  var countMax = d3.max(count.values());
  console.log("count bounds:", [countMin, countMax]);

  /*
   * before we draw, we should decide what kind of margins we
   * want. this will be the space around the core plot area,
   * where the tick marks and axis labels will be placed
   * http://bl.ocks.org/mbostock/3019563
   */
  var margin = {
    top:    15,
    right:  35, // leave space for y-axis
    bottom: 30, // leave space for x-axis
    left:   10
  };

  // now we can calculate how much space we have to plot
  var bounds = svg.node().getBoundingClientRect();
  var plotWidth = bounds.width - margin.right - margin.left;
  var plotHeight = bounds.height - margin.top - margin.bottom;

  /*
   * okay now somehow we have to figure out how to map a count value
   * to a bar height, decide bar widths, and figure out how to space
   * bars for each letter along the x-axis
   *
   * this is where the scales in d3 come in very handy
   * https://github.com/mbostock/d3/wiki/Scales
   */

  /*
   * the counts are easiest because they are numbers and we can use
   * a simple linear scale, but the complicating matter is the
   * coordinate system in svgs:
   * https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Positions
   *
   * so we want to map our min count (0) to the max height of the plot area
   */
  var countScale = d3.scale.linear()
    .domain([countMin, countMax])
    .range([plotHeight, 0])
    .nice(); // this rounds the domain a bit for nicer output

  /*
   * the letters need an ordinal scale instead, which is used for
   * categorical data. we want a bar space for all letters, not just
   * the ones we found
   */
  var letterScale = d3.scale.ordinal()
    // range, between-bar padding, outside padding
    .rangeRoundBands([0, plotWidth], 0.1, 0)
    .domain(letters); // global

  /*
   * to make translating and scaling easier, we place elements into
   * svg groups first
   */
  var plot = svg.select("g#plot");

  if (plot.size() < 1) { // need if statement if we redraw bar chart
    plot = svg.append("g")
      .attr("id", "plot")
      .attr("transform", translate(margin.left, margin.top));
  }

  /*
   * time to bind each data element to a rectangle in our visualization
   */
  var bars = plot.selectAll("rect")
    .data(count.entries(), function(d) { return d.key; });

  /*
   * okay, this is where things get weird. d3 uses an enter, update,
   * exit pattern for dealing with data. think of it as new data,
   * existing data, and old data. for the first time, everything is new!
   * http://bost.ocks.org/mike/join/
   */

  /*
   * we use the enter() selection to add new bars for every
   * new data element
   */
  bars.enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return letterScale(d.key);})
    .attr("width", letterScale.rangeBand())
    .attr("y", function(d) { return countScale(d.value);})
    .attr("height", function(d) {
      return plotHeight - countScale(d.value);
    });

  /* start optional for updating bar chart each keypress */

  /*
   * what about when we get new text? can we do something fancy?
   * OF COURSE WE CAN. but, we will get to that stuff later. here
   * is just a preview.
   *
   * we will transition form the old bar height to the new one.
   */
  bars.transition()
    .attr("y", function(d) { return countScale(d.value);})
    .attr("height", function(d) {
      return plotHeight - countScale(d.value);
    });

  /*
   * some letters may no longer be present, so lets
   * remove those bars
   */
  bars.exit()
    .transition()
    .attr("y", function(d) { return countScale(countMin);})
    .attr("height", function(d) {
      return plotHeight - countScale(countMin);
    })
    .remove();

  /* end optional for updating bar chart each keypress */

  /*
   * okay we need some axis labels. thankfully, d3 has built-in
   * functionality for this so we don't have to calculate how to
   * draw each label or tick mark.
   */

  // we use these to automatically generate axis lines and tick marks
  // explicitly, we are using d3.svg.axis() to generate a line function
  // that we will call later to generate actual lines. (yes, a function
  // can return another function in javascript!)
  var xAxis = d3.svg.axis()
    .scale(letterScale)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(countScale)
    .orient("right");

  if (plot.select("g#y-axis").size() < 1) {
    // add x-axis (remember where 0, 0 is located)
    plot.append("g")
      .attr("id", "x-axis")
      .attr("transform", "translate(0, " + plotHeight + ")")
      .call(xAxis);

    // add y-axis
    plot.append("g")
      .attr("id", "y-axis")
      .attr("transform", "translate(" + plotWidth + ", 0)")
      .call(yAxis);
  }
  else {
    // need the if/else if we keep redrawing to update scale
    // instead of re-plot it
    plot.select("g#y-axis").call(yAxis);
  }

  // we will style these in css!
};

var drawBarChart1 = function() {
  // get the data we want to visualize
  var count = updateData1();

  // make sure we have at least 1 letter to draw
  if (count.keys().length < 1) {
    return;
  }

  // get the svg we want to draw on
  var svg = d3.select("body").select("svg.svg2");

  /*
   * we will need to map our data domain to our svg range, which
   * means we need to calculate the min and max of our data
   */

  var countMin = 0; // always include 0 on a bar chart
  var countMax = d3.max(count.values());
  console.log("count bounds:", [countMin, countMax]);

  /*
   * before we draw, we should decide what kind of margins we
   * want. this will be the space around the core plot area,
   * where the tick marks and axis labels will be placed
   * http://bl.ocks.org/mbostock/3019563
   */
  var margin = {
    top:    15,
    right:  35, // leave space for y-axis
    bottom: 30, // leave space for x-axis
    left:   10
  };

  // now we can calculate how much space we have to plot
  var bounds = svg.node().getBoundingClientRect();
  var plotWidth = bounds.width - margin.right - margin.left;
  var plotHeight = bounds.height - margin.top - margin.bottom;

  /*
   * okay now somehow we have to figure out how to map a count value
   * to a bar height, decide bar widths, and figure out how to space
   * bars for each letter along the x-axis
   *
   * this is where the scales in d3 come in very handy
   * https://github.com/mbostock/d3/wiki/Scales
   */

  /*
   * the counts are easiest because they are numbers and we can use
   * a simple linear scale, but the complicating matter is the
   * coordinate system in svgs:
   * https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Positions
   *
   * so we want to map our min count (0) to the max height of the plot area
   */
  var countScale = d3.scale.linear()
    .domain([countMin, countMax])
    .range([plotHeight, 0])
    .nice(); // this rounds the domain a bit for nicer output

  /*
   * the letters need an ordinal scale instead, which is used for
   * categorical data. we want a bar space for all letters, not just
   * the ones we found
   */
  var letterScale = d3.scale.ordinal()
    // range, between-bar padding, outside padding
    .rangeRoundBands([0, plotWidth], 0.1, 0)
    .domain(letters); // global

  /*
   * to make translating and scaling easier, we place elements into
   * svg groups first
   */
  var plot = svg.select("g#plot");

  if (plot.size() < 1) { // need if statement if we redraw bar chart
    plot = svg.append("g")
      .attr("id", "plot")
      .attr("transform", translate(margin.left, margin.top));
  }

  /*
   * time to bind each data element to a rectangle in our visualization
   */
  var bars = plot.selectAll("rect")
    .data(count.entries(), function(d) { return d.key; });

  /*
   * okay, this is where things get weird. d3 uses an enter, update,
   * exit pattern for dealing with data. think of it as new data,
   * existing data, and old data. for the first time, everything is new!
   * http://bost.ocks.org/mike/join/
   */

  /*
   * we use the enter() selection to add new bars for every
   * new data element
   */
  bars.enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return letterScale(d.key);})
    .attr("width", letterScale.rangeBand())
    .attr("y", function(d) { return countScale(d.value);})
    .attr("height", function(d) {
      return plotHeight - countScale(d.value);
    });

  /* start optional for updating bar chart each keypress */

  /*
   * what about when we get new text? can we do something fancy?
   * OF COURSE WE CAN. but, we will get to that stuff later. here
   * is just a preview.
   *
   * we will transition form the old bar height to the new one.
   */
  bars.transition()
    .attr("y", function(d) { return countScale(d.value);})
    .attr("height", function(d) {
      return plotHeight - countScale(d.value);
    });

  /*
   * some letters may no longer be present, so lets
   * remove those bars
   */
  bars.exit()
    .transition()
    .attr("y", function(d) { return countScale(countMin);})
    .attr("height", function(d) {
      return plotHeight - countScale(countMin);
    })
    .remove();

  /* end optional for updating bar chart each keypress */

  /*
   * okay we need some axis labels. thankfully, d3 has built-in
   * functionality for this so we don't have to calculate how to
   * draw each label or tick mark.
   */

  // we use these to automatically generate axis lines and tick marks
  // explicitly, we are using d3.svg.axis() to generate a line function
  // that we will call later to generate actual lines. (yes, a function
  // can return another function in javascript!)
  var xAxis = d3.svg.axis()
    .scale(letterScale)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(countScale)
    .orient("right");

  if (plot.select("g#y-axis").size() < 1) {
    // add x-axis (remember where 0, 0 is located)
    plot.append("g")
      .attr("id", "x-axis")
      .attr("transform", "translate(0, " + plotHeight + ")")
      .call(xAxis);

    // add y-axis
    plot.append("g")
      .attr("id", "y-axis")
      .attr("transform", "translate(" + plotWidth + ", 0)")
      .call(yAxis);
  }
  else {
    // need the if/else if we keep redrawing to update scale
    // instead of re-plot it
    plot.select("g#y-axis").call(yAxis);
  }

  // we will style these in css!
};

/*
 * helper method to easily create translate commands
 */
var translate = function(x, y) {
  return "translate(" + String(x) + ", " + String(y) + ")";
};