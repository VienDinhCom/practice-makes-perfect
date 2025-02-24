import * as d3 from 'd3';

(async () => {
  try {
    interface Data {
      baseTemperature: number;
      monthlyVariance: {
        year: number;
        month: 1;
        variance: 1;
      }[];
    }

    const { baseTemperature, monthlyVariance } = await d3
      .json<Data>('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json')
      .then((data) => data!);

    const width = 800;
    const height = 400;
    const padding = 60;

    const chart = d3
      .select('#chart')
      .append('svg')
      .attr('width', width + padding * 2)
      .attr('height', height + padding * 2);

    /* X Axis
    =========================================================================*/
    const xMin = d3.min(monthlyVariance, ({ year }) => year)!;
    const xMax = d3.max(monthlyVariance, ({ year }) => year)!;

    const xScale = d3
      .scaleLinear()
      .domain([xMin, xMax])
      .range([padding, width + padding]);

    const xAxis = d3.axisBottom(xScale).tickFormat((year) => String(year));

    chart
      .append('g')
      .call(xAxis)
      .attr('id', 'x-axis')
      .attr('transform', `translate(0, ${height + padding})`);

    /* Y Axis
    =========================================================================*/

    /* Bars 
    =========================================================================*/
  } catch (error) {
    console.error(error);
  }
})();
