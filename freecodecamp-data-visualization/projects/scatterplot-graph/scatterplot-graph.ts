import * as d3 from 'd3';

(async () => {
  try {
    interface Data {
      name: string;
      year: number;
      date: Date;
      time: string;
      seconds: number;
      doping?: string;
    }

    const data: Data[] = await d3
      .json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
      .then((data: any) =>
        data.map(({ Name, Year, Seconds, Time, Doping }: any) => ({
          name: Name,
          year: Year,
          date: new Date(`${Year}-01-01`),
          time: Time,
          seconds: Seconds,
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

    /* X Axis
    =========================================================================*/
    const xMin = d3.min(data, ({ year }) => year)! - 1;
    const xMax = d3.max(data, ({ year }) => year)! + 1;

    const xScale = d3
      .scaleLinear()
      .domain([xMin, xMax])
      .range([padding, width - padding]);

    const xAxis = d3.axisBottom(xScale).tickFormat((year) => String(year));

    chart
      .append('g')
      .call(xAxis)
      .attr('id', 'x-axis')
      .attr('transform', `translate(${padding}, ${height + padding})`);

    /* Y Axis
    =========================================================================*/
    const yMin = d3.min(data, ({ seconds }) => seconds)!;
    const yMax = d3.max(data, ({ seconds }) => seconds)!;

    const yScale = d3
      .scaleLinear()
      .domain([yMin - 60, yMax + 60])
      .range([height, 0]);

    const yAxis = d3.axisLeft(yScale).tickFormat((seconds) => {
      const mins = Math.floor((seconds as number) / 60);
      const secs = (seconds as number) - mins * 60;

      return `${mins}:${String(secs).padStart(2, '0')}`;
    });

    chart
      .append('g')
      .call(yAxis)
      .attr('id', 'y-axis')
      .attr('transform', `translate(${padding * 2}, ${padding})`);

    /* Dots 
    =========================================================================*/

    chart
      .selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('r', 6)
      .attr('cx', function ({ year }) {
        return padding + xScale(year);
      })
      .attr('cy', function ({ seconds }) {
        return padding + yScale(seconds);
      })
      .attr('data-xvalue', function ({ year }) {
        return year;
      })
      .attr('data-yvalue', function ({ time }) {
        return time;
      })
      .style('fill', function ({ doping }) {
        return doping ? 'red' : 'green';
      });
  } catch (error) {
    console.error(error);
  }
})();
