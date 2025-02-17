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
const barWidth = width / data.data.length;

const chart = d3.select('#chart').append('svg').attr('width', width).attr('height', height);


