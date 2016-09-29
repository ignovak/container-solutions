var d3 = require('d3')

module.exports = function renderMasterNode (config, svg) {
  var arc = d3.arc()
      .innerRadius(config.master.r)
      .outerRadius(config.master.r * 1.1)
      .startAngle(3 / 2 * Math.PI)
      .endAngle(10);

  var g = svg.append('g')
      .attr('class', 'master')
      .attr('transform', `translate(${config.master.x}, ${config.master.y})`)

  g.append('circle')
      .attr('r', config.master.r)
      .attr('fill', '#69c')

  g.append('defs').append('path')
      .attr('id', 'master-text-path')
      .attr('d', arc());

  g.append('text').append('textPath')
      .attr('xlink:href', '#master-text-path')
      .text('Mesos master');
}
