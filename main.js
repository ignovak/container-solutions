var agentRadius = 30
var angleDelta = Math.PI / 15
var angleOffset = Math.PI / 12
var outerRadius = 250

var main = d3.select('#main')
  .append('svg')
  .attr('width', 600)
  .attr('height', 600)
  .style('outline', '1px solid');

main.append('text')
    .text('Mesos master')
    .attr('y', 20);

d3.json('data.json', function (error, data) {
    render(data);
  });

function render (data) {

  var links = main.selectAll('line')
    .data(data.slice(1).map((_, i) => ({ source: data[0], target: data[i + 1] })))
    .enter()
    .append('line')
    .attr('stroke', '#0af')

  var agents = main.selectAll('g')
    .data(data)
    .enter()
    .append('g')
      .attr('transform', function (_, i) {
        var edgeRadius = outerRadius * (i % 2 ? 0.8 : 1)
        var offsetX = agentRadius * 2 + (i % 2 ? 60 : 0)
        var offsetY = agentRadius * 3 + (i % 2 ? -40 : 0)
        var x = edgeRadius * (1 - Math.cos(angleOffset + angleDelta * i)) + offsetX
        var y = edgeRadius * Math.sin(angleOffset + angleDelta * i) + offsetY
        return `translate(${x}, ${y})`
      })
    .on('mouseenter', function () {
      d3.select(this)
        .select('circle')
        .transition()
        .attr('r', agentRadius * 2);
    })
    .on('mouseleave', function () {
      d3.select(this)
        .select('circle')
        .transition()
        .attr('r', agentRadius);
    })

  agents
    .append('circle')
      .attr('r', agentRadius)
      .attr('fill', '#fff')
      .attr('stroke', '#0af')

  agents
    .append('text')
    .text(_ => _.name)
      .attr('text-anchor', 'middle')

  var simulation = d3.forceSimulation(data)
    // .force('collide', d3.forceCollide(50))
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(300, 300))
    .force('link', d3.forceLink(links).distance(150).strength(0.1))
    // .force('x', d3.forceX())
    // .force('y', d3.forceY())
    .on('tick', function() {
      agents.attr('transform', _ => `translate(${_.x}, ${_.y})`)
      links
        .attr('x1', _ => _.source.x)
        .attr('y1', _ => _.source.y)
        .attr('x2', _ => _.target.x)
        .attr('y2', _ => _.target.y)
    })

}

  // .selectAll('rect')
  //   .data([100, 200, 300, 400])
  //   .enter()
  //   .append('rect')
  //     .attr('x', _ => _)
  //     .attr('y', 100)
  //     .attr('width', 90)
  //     .attr('height', 100)
  //     .attr('fill', '#faa')
