import * as d3 from 'd3';

(async () => {
  try {
    interface Data {
      name: string;
      year: number;
      time: Date;
      doping?: string;
    }

    const data: Data[] = await d3
      .json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
      .then((data: any) =>
        data.map(({ Name, Year, Seconds, Doping }: any) => ({
          name: Name,
          year: Year,
          time: new Date(1, 1, 1, 1, Math.floor(Seconds / 60), Seconds % 60),
          doping: Doping,
        }))
      );

    const width = 800;
    const height = 500;
    const padding = 60;

    const chart = d3
      .select('#chart')
      .append('svg')
      .attr('width', width + padding * 2)
      .attr('height', height + padding * 2);

    function formatTime(date: Date) {
      const mins = date.getMinutes();
      const secs = date.getSeconds();
      return `${mins}:${String(secs).padStart(2, '0')}`;
    }

    /* X Axis
    =========================================================================*/
    const xMin = d3.min(data, ({ year }) => year)! - 1;
    const xMax = d3.max(data, ({ year }) => year)! + 1;

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
    const yMin = d3.min(data, ({ time }) => time)!;
    const yMax = d3.max(data, ({ time }) => time)!;

    const yScale = d3
      .scaleTime()
      .domain([yMin, yMax])
      .range([padding, height + padding]);

    const yAxis = d3.axisLeft(yScale).tickFormat((time) => formatTime(new Date(time as number)));

    chart.append('g').call(yAxis).attr('id', 'y-axis').attr('transform', `translate(${padding}, 0)`);

    /* Dots 
    =========================================================================*/
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('id', 'tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'rgba(0,0,0,0.8)')
      .style('color', 'white')
      .style('padding', '10px')
      .style('border-radius', '5px')
      .style('font-size', '12px');

    chart
      .selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('r', 5)
      .attr('cx', ({ year }) => xScale(year))
      .attr('cy', ({ time }) => yScale(time))
      .attr('data-xvalue', ({ year }) => year)
      .attr('data-yvalue', ({ time }) => time.toISOString())
      .attr('fill', ({ doping }) => (doping ? 'red' : 'green'))
      .attr('stroke', 'white')
      .on('mouseover', (event, { name, year, time, doping }) => {
        tooltip
          .style('visibility', 'visible')
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 10}px`)
          .attr('data-year', year)
          .html(
            `
              ${name}, Year: ${year}, Time: ${formatTime(time)}<br/>
              ${doping ? `<br/>${doping}` : ''}
            `
          );
      })
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden');
      });

    /* Legend
    =========================================================================*/
    const legend = chart
      .append('g')
      .attr('id', 'legend')
      .attr('transform', `translate(${width - 150}, ${padding})`);

    legend.append('rect').attr('x', 0).attr('y', 0).attr('width', 20).attr('height', 20).style('fill', 'green');

    legend.append('text').attr('x', 30).attr('y', 15).text('No doping allegations');

    legend.append('rect').attr('x', 0).attr('y', 30).attr('width', 20).attr('height', 20).style('fill', 'red');

    legend.append('text').attr('x', 30).attr('y', 45).text('Riders with doping allegations');
  } catch (error) {
    console.error(error);
  }
})();
