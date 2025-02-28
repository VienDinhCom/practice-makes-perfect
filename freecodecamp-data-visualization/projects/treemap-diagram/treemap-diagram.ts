import * as d3 from 'd3';

(async () => {
  const datasets = {
    movies: {
      title: 'Movie Sales',
      description: 'Top 100 Highest Grossing Movies Grouped By Genre',
      url: 'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json',
    },
    kickstarter: {
      title: 'Kickstarter Pledges',
      description: 'Top 100 Most Pledged Kickstarter Campaigns Grouped By Category',
      url: 'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/kickstarter-funding-data.json',
    },
    videogames: {
      title: 'Video Game Sales',
      description: 'Top 100 Most Sold Video Games Grouped by Platform',
      url: 'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json',
    },
  };

  interface Item {
    name: string;
    category: string;
    value: string;
  }

  interface DataChild {
    name: string;
    children: Item[];
  }

  interface Data {
    name: string;
    children: DataChild[];
  }

  // Define types for d3 hierarchy nodes
  type HierarchyDatum = Data | DataChild | Item;

  interface TreemapNode extends d3.HierarchyNode<HierarchyDatum> {
    x0: number;
    x1: number;
    y0: number;
    y1: number;
  }

  const data: Data = await d3.json<Data>(datasets.videogames.url).then((data) => data!);

  const width = 960;
  const height = 570;

  const svg = d3.select('#chart').append('svg').attr('width', width).attr('height', height);

  /* Treemap 
  =========================================================================*/
  const root = d3
    .hierarchy<HierarchyDatum>(data)
    .sum((d) => parseFloat('value' in d ? d.value : '0'))
    .sort((a, b) => (b.value || 0) - (a.value || 0));

  const treemap = d3.treemap<HierarchyDatum>().size([width, height]).paddingInner(1);

  // Apply the treemap layout to the root
  treemap(root);

  // All leaves will now have x0, x1, y0, y1 properties
  const leaves = root.leaves() as unknown as TreemapNode[];

  // Create a color scale for the categories
  const categories = data.children.map((c) => c.name);
  const colorScale = d3.scaleOrdinal<string>().domain(categories).range(d3.schemeCategory10);

  // Create a group element for the tiles
  const tile = svg
    .selectAll('g')
    .data(leaves)
    .enter()
    .append('g')
    .attr('transform', (d) => `translate(${d.x0},${d.y0})`);

  // Add the rectangle elements (tiles)
  tile
    .append('rect')
    .attr('class', 'tile')
    .attr('width', (d) => Math.max(0, d.x1 - d.x0))
    .attr('height', (d) => Math.max(0, d.y1 - d.y0))
    .attr('data-name', (d) => {
      const nodeData = d.data as Item;
      return nodeData.name;
    })
    .attr('data-category', (d) => {
      const nodeData = d.data as Item;
      return nodeData.category;
    })
    .attr('data-value', (d) => {
      const nodeData = d.data as Item;
      return nodeData.value;
    })
    .attr('fill', (d) => {
      const nodeData = d.data as Item;
      return colorScale(nodeData.category);
    })
    .attr('stroke', 'white')
    .attr('stroke-width', 0.5);

  // Add text labels for larger tiles
  tile
    .append('text')
    .selectAll('tspan')
    .data((d) => {
      const nodeData = d.data as Item;
      return nodeData.name.split(/(?=[A-Z][^A-Z])/g);
    })
    .enter()
    .append('tspan')
    .attr('x', 4)
    .attr('y', (_, i) => 13 + i * 10)
    .text((d) => d)
    .attr('font-size', '8px')
    .attr('fill', 'black');

  /* Tooltips 
  =========================================================================*/
  const tooltip = d3
    .select('body')
    .append('div')
    .attr('id', 'tooltip')
    .style('position', 'absolute')
    .style('visibility', 'hidden')
    .style('background-color', 'rgba(0, 0, 0, 0.8)')
    .style('color', 'white')
    .style('padding', '10px')
    .style('border-radius', '5px')
    .style('pointer-events', 'none');

  tile
    .on('mousemove', function (event: MouseEvent, d: TreemapNode) {
      const xPosition = event.pageX + 10;
      const yPosition = event.pageY + 10;
      const nodeData = d.data as Item;

      tooltip
        .style('left', xPosition + 'px')
        .style('top', yPosition + 'px')
        .style('visibility', 'visible')
        .attr('data-value', nodeData.value)
        .html(`Name: ${nodeData.name}<br>` + `Category: ${nodeData.category}<br>` + `Value: ${nodeData.value}`);
    })
    .on('mouseout', function () {
      tooltip.style('visibility', 'hidden');
    });
})();
