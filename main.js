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
  var agents = main.selectAll('g')
    .data(data)
    .enter()
    .append('g')
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
      .attr('cx', function (_, i) {
        var edgeRadius = outerRadius * (i % 2 ? 0.8 : 1)
        var offset = agentRadius * 2 + (i % 2 ? 60 : 0)
        return edgeRadius * (1 - Math.cos(angleOffset + angleDelta * i)) + offset
      })
      .attr('cy', function (_, i) {
        var edgeRadius = outerRadius * (i % 2 ? 0.8 : 1)
        var offset = agentRadius * 3 + (i % 2 ? -40 : 0)
        return edgeRadius * Math.sin(angleOffset + angleDelta * i) + offset
      })
      .attr('r', agentRadius)
      .attr('fill', '#fff')
      .attr('stroke', '#0af')

  agents
    .append('text')
    .text(_ => _.name)
      .attr('text-anchor', 'middle')
      .attr('x', function (_, i) {
        var edgeRadius = outerRadius * (i % 2 ? 0.8 : 1)
        var offset = agentRadius * 2 + (i % 2 ? 60 : 0)
        return edgeRadius * (1 - Math.cos(angleOffset + angleDelta * i)) + offset
      })
      .attr('y', function (_, i) {
        var edgeRadius = outerRadius * (i % 2 ? 0.8 : 1)
        var offset = agentRadius * 3 + (i % 2 ? -40 : 0)
        return edgeRadius * Math.sin(angleOffset + angleDelta * i) + offset
      })

  simulation = d3.forceSimulation(data)
    // .force('collide', d3.forceCollide(20))
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(300, 300))
    // .force('link', d3.forceLink(links).distance(20).strength(1))
    // .force('x', d3.forceX())
    // .force('y', d3.forceY())
    .on('tick', function() {
      return
      agents.selectAll('circle')
        .attr('cx', _ => _.x)
        .attr('cy', _ => _.y)
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
