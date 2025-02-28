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

  
})();
