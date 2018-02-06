import React from 'react';
import * as d3 from 'd3';

class Diagram extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    draw()
  }

  render() {
    return (
      <div className='diagram'>
        <div id='hidden'></div>
        <div id='target'></div>
      </div>
    )
  }
}

const data = {
  name: 'nakedness',
  size: 30,
  children: [
    { 
      name: 'shooting',
      size: 30,
      children: [
        {
          name: 'The "moveto" commands (M or m) establish a new current point. The effect is as if',
          size: 18,
        },
        {
          name: 'The "closepath" (Z or z) ends the current subpath and causes an automatic straight line to be drawn from',
          size: 18,
        },
        {
          name: 'When a subpath ends in a "closepath," it differs in behavior from what happens when "manually"',
          size: 18,
        },
        {
          name: 'The various "lineto" commands draw straight lines from the current point to a new point:',
          size: 18,
        },
        {
          name: 'Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place',
          size: 18,
        },
        {
          name: 'In a professional context it often happens that private or corporate',
          size: 18,
        },
        {
          name: 'Most of its text is made up from sections 1.10.32–3 of Cicero\'s',
          size: 18
        },
        {
          name: 'The "moveto" commands (M or m) establish a new current point. The effect is as if',
          size: 18,
        },
        {
          name: 'The "closepath" (Z or z) ends the current subpath and causes an automatic straight line to be drawn from',
          size: 18,
        },
        {
          name: 'When a subpath ends in a "closepath," it differs in behavior from what happens when "manually"',
          size: 18,
        },
        {
          name: 'The various "lineto" commands draw straight lines from the current point to a new point:',
          size: 18,
        },
      ]
    },
    {
      name: 'Most of its text is made up from sections 1.10.32–3 of Cicero\'s',
      size: 18
    },
    {
      name: 'The "moveto" commands (M or m) establish a new current point. The effect is as if',
      size: 18,
    },
    {
      name: 'The "closepath" (Z or z) ends the current subpath and causes an automatic straight line to be drawn from',
      size: 18,
    },
    {
      name: 'When a subpath ends in a "closepath," it differs in behavior from what happens when "manually"',
      size: 18,
    },
    {
      name: 'The various "lineto" commands draw straight lines from the current point to a new point:',
      size: 18,
    },
    {
      name: 'Most of its text is made up from sections 1.10.32–3 of Cicero\'s',
      size: 18
    },
    {
      name: 'The "moveto" commands (M or m) establish a new current point. The effect is as if',
      size: 18,
    },
    {
      name: 'The "closepath" (Z or z) ends the current subpath and causes an automatic straight line to be drawn from',
      size: 18,
    },
    {
      name: 'When a subpath ends in a "closepath," it differs in behavior from what happens when "manually"',
      size: 18,
    },
    {
      name: 'The various "lineto" commands draw straight lines from the current point to a new point:',
      size: 18,
    },
  ]
}

const draw = () => {
  var margin = {top: 10, right: 30, bottom: 30, left: 30},
      width = 1400 - margin.left - margin.right,
      height = 700 - margin.top - margin.bottom;

  /**
  * Tree structure data
  **/

  var tree = d3.tree()
    .size([height, width]);

  var root = d3.hierarchy(data, function(d) { return d.children; });
  var nodes = root.descendants();
  var links = tree(root).links();

  // add ids to all nodes
  nodes.map(function(d, idx) {d._id = idx});

  /**
  * Render invisible text labels
  **/

  var hiddenSvg = d3.select('#hidden').append('svg')
    .attr('width', width)
    .attr('height', height)

  hiddenSvg.selectAll('text').data(nodes).enter()
    .append('text')
      .text(function(d) { return d.data.name; })
      .attr('font-size', function(d) { return d.data.size; })
      .attr('id', function(d) { return 'node-' + d._id; })

  /**
  * Set offsets
  **/

  // find all children and parent nodes
  var parents = [];
  var children = [];
  nodes.forEach(function(d) { isParent(d) ? parents.push(d) : children.push(d) })

  // set node positions
  var linksWidth = 46;
  var childCount = 0;
  var parentCount = 0;
  var childHeight = (height - margin.top - margin.bottom) / children.length;
  var parentHeight = (height - margin.top - margin.bottom) / (parents.length + 1);
  var rootX;

  nodes.forEach(function(d) {
    // parents
    if (isParent(d)) {
      d.x = ++parentCount * parentHeight;
      // root
      if (d.depth === 0) {
        rootX = getBB('#node-' + d._id).width + margin.left;
        d.y = rootX;
      }
      // non-root parent
      else d.y = rootX + getBB('#node-' + d.parent._id).width + linksWidth;
    // children
    } else {
      // compute the x offset of all parents
      var parentsX = 0;
      var node = d;
      while (node) {
        if (node.parent && node.parent._id !== 0) {
          parentsX += getBB('#node-' + node.parent._id).width;
          node = node.parent;
        } else {
          node = false;
        }
      }
      d.y = rootX + (d.depth * linksWidth) + parentsX;
      d.x = ++childCount * childHeight;
    }
  })

  /**
  * Render
  **/

  var svg = d3.select('#target').append('svg')
    .attr('width', width)
    .attr('height', height);

  var g = svg.append('g').attr('transform',
    'translate(' + margin.left + ',' + margin.top + ')');

  /**
  * Links
  **/

  var link = g.selectAll('.link')
    .data(links)
    .enter().append('path')
      .attr('class', 'link')
      .attr('d', function(d) {
        return d.target.children && d.target.children.length ?
            path(d.source, d.target, true)
          : path(d.source, d.target, false)
      })

  /**
  * Nodes
  **/

  var node = g.selectAll('.node')
    .data(nodes)
    .enter().append('g')
      .attr('transform', function(d) { return 'translate(' + d.y + ',' + d.x + ')'; })

  /**
  * Text
  **/

  node.append('text')
    .attr('dy', function(d) { return isParent(d) ? 7 : 4 })
    .attr('x', function(d) { return isParent(d) ? -8 : 8; })
    .style('text-anchor', function(d) { return isParent(d) ? 'end' : 'start'; })
    .attr('font-size', function(d) { return d.data.size + 'px'; })
    .text(function(d) { return d.data.name; });

  /**
  * Helpers
  **/

  function isParent(d) {
    return d.children && d.children.length;
  }

  function getBB(selector) {
    const elem = document.querySelector(selector);
    return elem ? elem.getBoundingClientRect() : {width: 0};
  }

  function path(s, d, offset) {
    var endY = d.y;
    if (offset) {
      endY -= getBB('#node-' + d._id).width + 14;
    }
    return `M ${s.y} ${s.x}
            C ${(s.y + endY) / 2} ${s.x},
              ${(s.y + endY) / 2} ${d.x},
              ${endY} ${d.x}`
  }

}

export default Diagram;