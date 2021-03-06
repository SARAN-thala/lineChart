const datas = [];
const UPPER_LIMIT = 100;
const LOWER_LIMIT = 0;
const RANGE=40;

const translate = (x, y) => (`translate (${x}, ${y})`);

const WIDTH = 1400;
const HEIGHT = 360;
const MARGIN = 30;
const INNER_WIDTH = WIDTH - (2 * MARGIN);
const INNER_HEIGHT = HEIGHT - (2 * MARGIN);

const newData = function () {
    for(let i=0;i<=RANGE;i++){
        datas.push(Math.floor(Math.random(LOWER_LIMIT,UPPER_LIMIT)*100));
    }
};
newData();

const getLastData = function () {
    datas.push(Math.floor(Math.random(0, 100)*100));
    datas.shift();
    return datas;
};

const drawLineChart = function (svg, line, datas) {
    let g = svg.append('g')
        .attr('transform', translate(MARGIN,MARGIN));

    g.append('path')
        .attr('d', line(datas))
        // .transition()
        // .ease(d3.easeLinear)
        // .duration(250)
        .classed('path', true);
};

const drawBarChart = function (svg, datas, yScale, xScale) {
    svg.selectAll('rect')
        .data(datas)
        .enter()
        .append('rect')
        .attr('height',(d) => (INNER_HEIGHT - yScale(d)))
        .attr('width', 29)
        .attr('x',(d, i) => (xScale(i)))
        .attr('y', (d) => (yScale(d)))
        .attr('transform', translate(MARGIN, MARGIN))
        .attr('fill','lightsteelblue')
        .classed('rect', true);
};

// var histogramChart = function () {
//     var histogram = d3.histogram()
//         .domain(x.domain())
//         .thresholds(x.ticks(20));
// };

const initializeChart = function (xAxis, yAxis, div) {
    let svg = d3.select(div).append("svg")
        .attr('width', WIDTH)
        .attr('height', HEIGHT);

    svg.append('g')
        .attr('transform', translate(MARGIN, HEIGHT - MARGIN))
        .call(xAxis)
        .classed('xAxis', true);

    // svg.selectAll('.xAxis .tick')
    //     .append('line')
    //     .attr('x1', 0.5)
    //     .attr('y1', 0)
    //     .attr('x2', 0.5)
    //     .attr('y2', -INNER_HEIGHT)
    //     .classed('grid', true);

    svg.append('g')
        .attr('transform', translate(MARGIN, MARGIN))
        .call(yAxis)
        .classed('yAxis', true);

    // svg.selectAll('.yAxis .tick')
    //     .append('line')
    //     .attr('x1', 0)
    //     .attr('y1', 0.5)
    //     .attr('x2', INNER_WIDTH)
    //     .attr('y2', 0.5)
    //     .classed('grid', true);

    return svg;
};

const loadChart = function () {

    let xScale = d3.scaleLinear()
        .domain([0, RANGE])
        .range([0, 1200]);

    let yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([INNER_HEIGHT,0]);

    let xAxis = d3.axisBottom(xScale).ticks(40);
    let yAxis = d3.axisLeft(yScale);

    let svg = initializeChart(xAxis,yAxis,'#line-chart');
    let svgBar = initializeChart(xAxis,yAxis,'#bar-chart');

    let line = d3.line()
        .x((d,i) => (xScale(i)))
        .y(d => (yScale(d)));

    // d3.select('.path').remove();
    // d3.select('.rect').remove();
    setInterval(function () {
        let randomNumbers = getLastData();
        svg.selectAll('.path').remove();
        svgBar.selectAll('.rect').remove();

        drawLineChart(svg,line,randomNumbers);
        drawBarChart(svgBar,randomNumbers,yScale,xScale);
    },500);
};

window.onload = loadChart;