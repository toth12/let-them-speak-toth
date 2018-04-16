/* eslint-disable */
import * as d3 from 'd3';

let tree = {};

const margin = {top: 10, right: 30, bottom: 30, left: 60},
  w = 1400,
  width = w - margin.left - margin.right;

const fonts = {
  parent: 25,
  child: 16,
}

/**
* Initialize all tree root nodes
**/

tree.init = (props) => {

  let svg = d3.select('#target').select('svg').size() ?
    d3.select('#target').select('svg')
    : d3.select('#target').append('svg');

  svg.attr('width', width)
    .attr('height', (props.data.length * 70) + margin.top + margin.bottom);

  svg.selectAll('.root-node').data(props.data).enter()
    .append('text')
      .attr('class', 'root-node')
      .text((d) => d.label)
      .attr('font-size', fonts.parent)
      .attr('y', tree.getRootY)
      .attr('x', margin.left)
      .on('click', function(d, i) {
        d3.selectAll('.root-node').attr('class', 'root-node');
        d3.select(this).attr('class', 'root-node active');
        props.onClick(d, i);
      })

  // add links from the reset button to root nodes
  let links = [],
      reset = document.querySelector('#reset');
  // d3 tree internals reverse x and y
  props.data.map((d, i) => links.push({
    source: { y: 15, x: reset.offsetTop + (reset.clientHeight / 2) },
    target: { y: margin.left - 5, x: tree.getRootY(d, i) - 8}
  }))

  // append the links and transition into the dom
  const linkEnter = svg.selectAll('.root-link').data(links).enter()
    .append('path')
    .attr('class', 'root-link')
    .attr('d', (d) => tree.path(d.source, d.source, 'root-link'))

  linkEnter.transition()
    .delay((d, i) => (i+3) * 50)
    .attr('d', (d) => tree.path(d.source, d.target, 'root-link'))
}

/**
* Draw the tree for one particular root node
**/

tree.draw = (props) => {

  /**
  * Tree structure data
  **/

  const graph = d3.tree().size([height, width]);
  const root = d3.hierarchy(props.data, (d) => d.children);
  let nodes = root.descendants();
  const links = graph(root).links();

  // add ids to all nodes
  nodes.map((d, idx) => d._id = idx);

  /**
  * Remove root links
  **/

  d3.selectAll('.root-link').remove()

  /**
  * Render invisible text labels
  **/

  const hiddenSvg = d3.select('#hidden').append('svg')
    .attr('width', 1000)
    .attr('height', 100)

  hiddenSvg.selectAll('text').data(nodes).enter()
    .append('text')
      .text(getLabel)
      .attr('font-size', getFontSize)
      .attr('id', (d) => 'node-' + d._id);

  /**
  * Set offsets
  **/

  // find all children and parent nodes
  let parents = [];
  let children = [];
  // store the idx of each parent
  let parentIdToIdx = {};
  let parentIdx = 0;
  nodes.forEach((d) => {
    if (isParent(d)) {
      parents.push(d);
      parentIdToIdx[d._id] = parentIdx++;
    } else {
      children.push(d)
    }
  });

  // set node positions
  const childHeight = 25;
  const linksWidth = 46;
  const groupPadding = 20;
  let childCount = 0;
  let rootX;

  // set the chart height according to the child count
  let h = childHeight * children.length + 60;
  // add height for the spacing between child blocks
  h += groupPadding * Object.keys(parentIdToIdx).length;
  // set the height given the total height and margins
  let height = h - margin.top - margin.bottom;

  // set node positions
  nodes.forEach(function(d) {
    // parents
    if (isParent(d)) {
      // root node
      if (d.depth === 0) {
        rootX = tree.getBB('#node-' + d._id).width + margin.left;
        d.y = 0;
      }
      // non-root parent
      else {
        d.y = rootX + tree.getBB('#node-' + d._id).width + linksWidth + 15;
      }
    // children
    } else {
      // compute the x offset of all parents
      let parentsX = 0;
      let node = d;
      while (node) {
        if (node.parent && node.parent._id !== 0) {
          parentsX += tree.getBB('#node-' + node.parent._id).width;
          node = node.parent;
        } else {
          node = false;
        }
      }
      d.y = rootX + (d.depth * linksWidth) + parentsX;
      d.x = ++childCount * childHeight;
      // add space between each block of children
      d.x += parentIdToIdx[d.parent._id] * groupPadding;
    }
  })

  // center each parent at the y-center of their non-parent children
  nodes.forEach(function(d) {
    if (isParent(d)) {
      let min = Number.POSITIVE_INFINITY,
          max = Number.NEGATIVE_INFINITY;
      d.children.forEach(function(child) {
        if (child.x < min) min = child.x;
        if (child.x > max) max = child.x;
      })
      // only occurs for root node with parent-only children
      if (min === Number.POSITIVE_INFINITY &&
          max === Number.NEGATIVE_INFINITY) {
        d.x = margin.left;
      // non-root nodes have children with positions
      } else {
        d.x = (min + max) / 2;
      }
    }
  })

  // pluck out the root node
  const rootNode = nodes[0];
  nodes = nodes.filter((d, i) => i > 0);

  /**
  * Render
  **/

  const svg = d3.select('#target').select('svg');

  const g = svg.append('g').attr('transform',
    'translate(' + margin.left + ',' + margin.top + ')');

  svg.transition()
    .attr('width', width)
    .attr('height', height);

  /**
  * Transition root nodes out of scene
  **/

  d3.selectAll('.root-node').each(function(d, i) {
    const elem = d3.select(this);
    // root node
    if (elem.attr('class').includes('active')) {
      elem.transition()
        .delay(500)
        .duration(500)
        .attr('y', rootNode.x + 20)
        .attr('x', margin.left)
        .attr('text-anchor', getTextAnchor(rootNode))
        .attr('font-size', getFontSize(rootNode))
        .text(getLabel(rootNode));
    // all non-root nodes
    } else {
      d3.select(this).transition()
        .delay(i * 50)
        .duration(500)
        .attr('x', -500)
    }
  })

  /**
  * Links
  **/

  const link = g.selectAll('.link')
    .data(links)
    .enter().append('path')
      .attr('class', 'link')
      .attr('d', function(d) {
        // parent to parent link
        if (d.source.children && d.source.children.length &&
            d.target.children && d.target.children.length) {
          return tree.path(d.source, d.target, 'root-to-parent')
        };
        // root to non-parent link
        if (d.source.depth === 0) {
          return tree.path(d.source, d.target, 'root-to-child')
        };
        // parent to child link
        return tree.path(d.source, d.target, 'parent-to-child');
      })

  /**
  * Nodes
  **/

  const node = g.selectAll('.node')
    .data(nodes)
    .enter().append('g')
      .attr('class', 'node')
      .attr('transform', function(d) {
        return 'translate(' + d.y + ',' + d.x + ')';
      })
      .attr('font-size', getFontSize)
      .on('click', d => {
        props.onClick(d)
      })

  /**
  * Text
  **/

  node.append('text')
    .attr('dy', getDy)
    .attr('x', getX)
    .style('text-anchor', getTextAnchor)
    .attr('font-size', getFontSize)
    .text(getLabel);

  /**
  * Rotate the reset button
  **/

  d3.select('#reset').style('transform', 'rotate(360deg)');

  /**
  * Helpers
  **/

  function isParent(d) {
    return d.children && d.children.length;
  }

  function getDy(d) {
    return isParent(d) ? 7 : 4;
  }

  function getX(d) {
    if (isParent(d) && d.depth === 0) return 0;
    return isParent(d) ? -8 : 8;
  }

  function getFontSize(d) {
    return d.children && d.children.length ?
      fonts.parent : fonts.child;
  }

  function getTextAnchor(d) {
    if (isParent(d) && d.depth === 0) return 'start';
    return isParent(d) ? 'end' : 'start';
  }

  function getLabel(d) {
    return d.data.label;
  }
}

/**
* Reset the tree to its initial position
**/

tree.reset = (props) => {
  // remove all hidden nodes
  d3.select('#hidden').select('svg').remove();
  // remove children nodes and links
  d3.select('#target').selectAll('.node').remove();
  d3.select('#target').selectAll('.link').remove();
  // transition the original root nodes
  d3.select('#target').selectAll('.root-node')
    .transition()
    .duration(500)
    .attr('y', tree.getRootY)
    .attr('x', margin.left);
  d3.select('#reset').style('transform', 'rotate(180deg)');
}


/**
* Helpers shared by init and reset methods
**/

tree.getRootY = (d, i) => ((i+1) * 60) + margin.top;

tree.path = (s, d, type) => {
  let endY = d.y;
  let startY = s.y;
  if (type === 'root-to-parent') {
    startY += tree.getBB('#node-' + s._id).width;
    endY -= tree.getBB('#node-' + d._id).width + 12;
  }
  if (type === 'root-to-child') {
    startY += tree.getBB('#node-' + s._id).width;
  }
  return `M ${startY} ${s.x}
          C ${(startY + endY) / 2} ${s.x},
            ${(startY + endY) / 2} ${d.x},
            ${endY} ${d.x}`
}

tree.getBB = (selector) => {
  const elem = document.querySelector(selector);
  return elem ? elem.getBoundingClientRect() : {width: 0};
}

export default tree;