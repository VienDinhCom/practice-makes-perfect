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
    const padding = 100;

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
      .tickFormat((year) => {
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
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('id', 'tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('background-color', 'rgba(0, 0, 0, 0.8)')
      .style('color', 'white')
      .style('padding', '10px')
      .style('border-radius', '5px')
      .style('pointer-events', 'none');

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
      .on('mouseover', (event, d) => {
        const temp = baseTemperature + d.variance;
        const date = new Date(d.year, d.month - 1);

        tooltip
          .style('opacity', 0.9)
          .html(`${d3.timeFormat('%Y - %B')(date)}<br>${temp.toFixed(2)}°C<br>${d.variance.toFixed(2)}°C`)
          .attr('data-year', d.year)
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 28 + 'px');
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0);
      });

    /* Legend 
    =========================================================================*/
    const legendWidth = 300;

    const minTemp = d3.min(monthlyVariance, (d) => baseTemperature + d.variance) || 0;
    const maxTemp = d3.max(monthlyVariance, (d) => baseTemperature + d.variance) || 10;

    const legendThreshold = d3
      .scaleThreshold<number, string>()
      .domain(
        (() => {
          const step = (maxTemp - minTemp) / 5;
          return [minTemp + step, minTemp + step * 2, minTemp + step * 3, minTemp + step * 4];
        })()
      )
      .range([
        d3.interpolateRdYlBu(0.9), // Cold (blue)
        d3.interpolateRdYlBu(0.7), // Cool (light blue)
        d3.interpolateRdYlBu(0.5), // Moderate (yellow)
        d3.interpolateRdYlBu(0.3), // Warm (orange)
        d3.interpolateRdYlBu(0.1), // Hot (red)
      ]);

    const legendXScale = d3.scaleLinear().domain([minTemp, maxTemp]).range([0, legendWidth]);

    const legendAxis = d3
      .axisBottom(legendXScale)
      .tickSize(10)
      .tickFormat((d) => `${d.valueOf().toFixed(1)}°C`)
      .tickValues(legendThreshold.domain().concat([minTemp, maxTemp]));

    const legend = chart
      .append('g')
      .attr('id', 'legend')
      .attr('transform', `translate(${padding}, ${height + padding + 50})`);

    legend
      .selectAll('rect')
      .data(
        legendThreshold.range().map((color, i) => {
          const d = legendThreshold.domain();
          return {
            color: color,
            x0: i === 0 ? minTemp : d[i - 1],
            x1: i === legendThreshold.range().length - 1 ? maxTemp : d[i],
          };
        })
      )
      .enter()
      .append('rect')
      .attr('x', (d) => legendXScale(d.x0))
      .attr('y', 0)
      .attr('width', (d) => legendXScale(d.x1) - legendXScale(d.x0))
      .attr('height', 20)
      .attr('fill', (d) => d.color);

    legend.append('g').call(legendAxis).attr('transform', `translate(0, 20)`);
  } catch (error) {
    console.error(error);
  }
})();
