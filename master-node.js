var d3 = require('d3')

module.exports = function renderCore (config, svg) {
  var core = svg.append('g')
      .attr('class', 'core')
      .attr('transform', `translate(${config.master.x}, ${config.master.y})`)

  renderMaster(config, core);
  renderFrameworks(config, core);
}

function renderMaster (config, svg) {
  var arc = d3.arc()
      .innerRadius(config.master.r)
      .outerRadius(config.master.r * 1.1)
      .startAngle(3 / 2 * Math.PI)
      .endAngle(10);

  var g = svg.append('g').attr('class', 'master')

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

function renderFrameworks (config, svg) {

  config.frameworks.slice(0, 4).forEach(function(framework, index) {
    renderFramework(framework, index, {
      arcShift: - 1 / 3,
      innerRadius: config.master.r * 1.9,
      svg: svg
    })
  })

  config.frameworks.slice(4).forEach(function(framework, index) {
    renderFramework(framework, index, {
      arcShift: 1 / 6,
      innerRadius: config.master.r * 1.5,
      svg: svg
    })
  })

}

function renderFramework (framework, index, params) {

  var arcStep = 1 / 6 * Math.PI,
      arcShift = params.arcShift,
      svg = params.svg,
      innerRadius = params.innerRadius,
      outerRadiusBg = innerRadius * 1.2,
      outerRadiusText = innerRadius * 1.05,
      startAngle = (index + arcShift) * arcStep,
      endAngle = startAngle + arcStep * 0.85,
      bgWidth = innerRadius * arcStep

  var bg = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadiusBg)
      .startAngle(startAngle)
      .endAngle(endAngle)

  var arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadiusText)
      .startAngle(startAngle)
      .endAngle(endAngle)

  var id = 'framework-text-path-' + framework.name;

  svg.append('path')
      .attr('d', bg)
      .on('mouseenter', function () {
        d3.select(this).attr('style', 'fill: ' + framework.color)
      })
      .on('mouseleave', function () {
        d3.select(this).attr('style', '')
      })

  svg.append('defs').append('path')
      .attr('id', id)
      .attr('d', arc)

  svg.append('text').append('textPath')
      .attr('xlink:href', '#' + id)
      .text(framework.name)
      .attr('startOffset', function() {
        return (bgWidth - this.getComputedTextLength()) / 2
      })
      .on('mouseenter', function () {
        d3.select(this).attr('style', 'fill: #fff')
      })
      .on('mouseleave', function () {
        d3.select(this).attr('style', '')
      })

}
