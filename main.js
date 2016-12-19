var d3 = require('d3')
var renderCore = require('./master-node')

var config = {
  agentRadius: 30,
  master: {
    x: 400,
    y: 200,
    r: 75
  },
  frameworks: ['K', 'SP', 'FR6', 'FR7', 'ES', 'LS', 'FL']
}

var svg = d3.select('#main svg')

renderCore(config, svg)


var arc = d3.arc()
  .innerRadius(config.agentRadius)
  .outerRadius(config.agentRadius * 1.1)
  .startAngle(3 / 2 * Math.PI)
  .endAngle(10);

svg.append('defs').append('path')
    .attr('id', 'node-text-path')
    .attr('d', arc());

d3.json('data.json', function (error, data) {
    render(data);
  });

function render (data) {

  var links = svg.selectAll('line')
    .data(data)
    .enter()
    .append('line')

  var nodes = svg.selectAll('g.node')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'node')
    .on('click', function (data, index, selection) {
      var _this = d3.select(this)
      _this.classed('selected', !_this.classed('selected'))
    })
    .on('mouseenter', function () {
      d3.select(this)
        .select('g')
        .transition()
        .attr('transform', 'scale(2)')
    })
    .on('mouseleave', function () {
      var _this = d3.select(this)
      if (!_this.classed('selected'))
        _this
          .select('g')
          .transition()
          .attr('transform', 'scale(1)')
    })

  var agents = nodes.append('g')

  agents.append('circle')
      .attr('r', config.agentRadius)

  agents.append('text').append('textPath')
      .attr('xlink:href', '#node-text-path')
      .text(_ => _.name);

  var simulation = d3.forceSimulation(data)
    .force('collide', d3.forceCollide(50))
    // .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(250, 450))
    // .force('link', d3.forceLink(links).distance(150).strength(0.1))
    .force('x', d3.forceX().strength(0.05))
    .force('y', d3.forceY().strength(0.2))
    .on('tick', function() {
      nodes.attr('transform', _ => `translate(${_.x}, ${_.y})`)
      links
        .attr('x1', config.master.x)
        .attr('y1', config.master.y)
        .attr('x2', _ => _.x)
        .attr('y2', _ => _.y)
    })

}
