import * as d3 from 'd3';

(async () => {
  try {
    interface Data {
      Time: string;
      Place: number;
      Seconds: number;
      Name: string;
      Year: number;
      Nationality: string;
      Doping?: string;
    }

    const data = await d3
      .json<Data[]>('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
      .then((data) => data!);

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
    const dates = data.map(({ Year }) => new Date(`${Year}-01-01`));

    const xMin = d3.min(dates, (date) => date)!;
    const xMax = d3.max(dates, (date) => date)!;

    xMin.setMonth(xMin.getMonth() - 12);
    xMax.setMonth(xMax.getMonth() + 12);

    const xScale = d3
      .scaleTime()
      .domain([xMin, xMax])
      .range([padding, width - padding]);

    const xAxis = d3.axisBottom(xScale);

    chart
      .append('g')
      .call(xAxis)
      .attr('id', 'x-axis')
      .attr('transform', `translate(${padding}, ${height + padding})`);

    /* Y Axis
    =========================================================================*/
    const seconds = data.map(({ Seconds }) => Seconds);

    const yMin = d3.min(seconds)!;
    const yMax = d3.max(seconds)!;

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

    /* Bars 
    =========================================================================*/
  } catch (error) {
    console.error(error);
  }
})();
