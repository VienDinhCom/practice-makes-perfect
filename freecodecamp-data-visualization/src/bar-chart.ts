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

const data = await d3
  .json<Data>('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json')
  .then((data) => data!);

const width = 800;
const height = 400;
const padding = 100;
const barWidth = width / data.data.length;

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
const gdp = data.data.map(([_date, gdp]) => gdp);

const yMax = d3.max(gdp)!;
const yScale = d3.scaleLinear().domain([0, yMax]).range([height, 0]);
const yAxis = d3.axisLeft(yScale);

chart.append('g').call(yAxis).attr('id', 'y-axis').attr('transform', `translate(${padding}, ${padding})`);
