var config = {
  agentRadius: 30,
  master: {
    x: 350,
    y: 250
  }
}

var main = d3.select('#main svg')

main.append('circle')
    .attr('cx', config.master.x)
    .attr('cy', config.master.y)
    .attr('r', 80)
    .attr('fill', '#69c')

main.append('text')
    .text('Mesos master')
    .attr('x', config.master.x)
    .attr('y', config.master.y)

d3.json('data.json', function (error, data) {
    render(data);
  });

function render (data) {

  var links = main.selectAll('line')
    .data(data)
    .enter()
    .append('line')

  var agents = main.selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .on('mouseenter', function () {
      d3.select(this)
        .select('circle')
        .transition()
        .attr('r', config.agentRadius * 2)
    })
    .on('mouseleave', function () {
      d3.select(this)
        .select('circle')
        .transition()
        .attr('r', config.agentRadius)
    })

  agents
    .append('circle')
      .attr('r', config.agentRadius)

  agents
    .append('text')
    .text(_ => _.name)
      .attr('text-anchor', 'middle')

  simulation = d3.forceSimulation(data)
    .force('collide', d3.forceCollide(40))
    // .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(250, 500))
    // .force('link', d3.forceLink(links).distance(150).strength(0.1))
    .force('x', d3.forceX().strength(0.05))
    .force('y', d3.forceY().strength(0.2))
    .on('tick', function() {
      agents.attr('transform', _ => `translate(${_.x}, ${_.y})`)
      links
        .attr('x1', config.master.x)
        .attr('y1', config.master.y)
        .attr('x2', _ => _.x)
        .attr('y2', _ => _.y)
    })

}
