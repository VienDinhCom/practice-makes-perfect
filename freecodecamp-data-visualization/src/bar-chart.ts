import * as d3 from 'd3';

interface Data {
  errors: { [key: string]: any };
  id: number;
  source_name: string;
  source_code: string;
  code: string;
  name: string;
  urlize_name: string;
  display_url: string;
  description: string;
  updated_at: string;
  frequency: string;
  from_date: string;
  to_date: string;
  column_names: string[];
  private: boolean;
  type: null;
  premium: boolean;
  data: [string, number][];
}

(async () => {
  try {
    const data = await d3
      .json<Data>('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json')
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
    const dates = data.data.map(([date]) => new Date(date));

    const xMin = d3.min(dates)!;
    const xMax = d3.max(dates)!;

    xMax.setMonth(xMax.getMonth() + 3);

    const xScale = d3.scaleTime().domain([xMin, xMax]).range([0, width]);
    const xAxis = d3.axisBottom(xScale);

    chart
      .append('g')
      .call(xAxis)
      .attr('id', 'x-axis')
      .attr('transform', `translate(${padding}, ${height + padding})`);

    /* Y Axis
    =========================================================================*/
    const gdp = data.data.map(([, gdp]) => gdp);

    const yMax = d3.max(gdp)!;
    const yScale = d3.scaleLinear().domain([0, yMax]).range([height, 0]);
    const yAxis = d3.axisLeft(yScale);

    chart.append('g').call(yAxis).attr('id', 'y-axis').attr('transform', `translate(${padding}, ${padding})`);

    /* Bars 
    =========================================================================*/
    const barWidth = width / data.data.length;

    const tooltip = d3.select('#chart').append('div').attr('id', 'tooltip');

    d3.select('svg')
      .selectAll('rect')
      .data(data.data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('data-date', ([date]) => date)
      .attr('data-gdp', ([, gdp]) => gdp)
      .attr('x', ([date]) => padding + xScale(new Date(date)))
      .attr('y', ([, gdp]) => padding + yScale(gdp))
      .attr('width', barWidth)
      .attr('height', ([_, gdp]) => height - yScale(gdp))
      .on('mouseover', function (event: MouseEvent, [dateStr, gdp]) {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = date.getMonth();
        const quarter = Math.floor(month / 3) + 1;

        tooltip
          .style('opacity', 1)
          .attr('data-date', dateStr)
          .html(`${year} Q${quarter}: $${gdp}B`)
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 40}px`);
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0);
      })
      .on('mousemove', (event: MouseEvent) => {
        tooltip.style('left', `${event.pageX + 10}px`).style('top', `${event.pageY - 40}px`);
      });
  } catch (error) {
    console.error(error);
  }
})();
