import * as d3 from 'd3';

(async () => {
  try {
    interface Polygon {
      type: 'Polygon';
      id: number;
      arcs: number[][];
    }

    interface MultiPolygon {
      type: 'MultiPolygon';
      id: number;
      arcs: number[][][][];
    }

    interface Data {
      counties: {
        type: 'GeometryCollection';
        geometries: (Polygon | MultiPolygon)[];
      };
      education: {
        fips: number;
        state: string;
        area_name: string;
        bachelorsOrHigher: number;
      };
    }

    const data: Data = await Promise.all([
      d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'),
      d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json'),
    ]).then(([map, education]) => ({ counties: (map as any).objects.counties, education: education as any }));

    console.log(data);

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
  } catch (error) {
    console.error(error);
  }
})();
