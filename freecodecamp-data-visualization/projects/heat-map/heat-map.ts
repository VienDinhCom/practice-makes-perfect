import * as d3 from 'd3';

(async () => {
  try {
    interface Data {
      baseTemperature: number;
      monthlyVariance: {
        year: number;
        month: number;
        variance: number;
      }[];
    }

    const data = await d3
      .json<Data>('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json')
      .then((data) => data!);

    const { baseTemperature, monthlyVariance } = data;

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
    const xScale = d3
      .scaleBand()
      .domain(monthlyVariance.map((d) => String(d.year)))
      .range([0, width]);

    const xAxis = d3
      .axisBottom(xScale)
      .tickValues(xScale.domain().filter((year) => Number(year) % 10 === 0))
      .tickFormat(function (year) {
        const date = new Date(0);
        date.setUTCFullYear(Number(year));
        return d3.utcFormat('%Y')(date);
      })
      .tickSize(10);

    chart
      .append('g')
      .call(xAxis)
      .attr('id', 'x-axis')
      .attr('transform', `translate(${padding}, ${height + padding})`);

    /* Y Axis
    =========================================================================*/
    const yScale = d3
      .scaleBand()
      .domain(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'])
      .rangeRound([0, height])
      .padding(0);

    const yAxis = d3
      .axisLeft(yScale)
      .tickValues(yScale.domain())
      .tickFormat((month) => {
        const date = new Date(0);
        date.setUTCMonth(Number(month));
        return d3.utcFormat('%B')(date);
      })
      .tickSize(10);

    chart.append('g').call(yAxis).attr('id', 'y-axis').attr('transform', `translate(${padding}, ${padding})`);

    /* Cells 
    =========================================================================*/
    chart
      .selectAll('rect')
      .data(monthlyVariance)
      .enter()
      .append('rect')
      .attr('class', 'cell')
      .attr('transform', `translate(${padding + 1}, ${padding + 1})`)
      .attr('data-month', (d) => d.month - 1)
      .attr('data-year', (d) => d.year)
      .attr('data-temp', (d) => baseTemperature + d.variance)
      .attr('x', (d) => xScale(String(d.year)) || 0)
      .attr('y', (d) => yScale(String(d.month - 1)) || 0)
      .attr('width', () => xScale.bandwidth())
      .attr('height', () => yScale.bandwidth())
      .attr('fill', (d) => d3.interpolateRdYlBu(1 - (baseTemperature + d.variance) / 10))
      .append('title')
      .text((d) => {
        const temp = baseTemperature + d.variance;
        const date = new Date(d.year, d.month - 1);

        return `${d3.timeFormat('%Y - %B')(date)}\n${temp.toFixed(2)}°C\n${d.variance.toFixed(2)}°C`;
      });
  } catch (error) {
    console.error(error);
  }
})();
