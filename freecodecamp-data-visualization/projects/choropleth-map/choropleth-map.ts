import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import type { FeatureCollection, GeometryObject } from 'geojson';

(async () => {
  try {
    const urls = {
      map: 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json',
      education: 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json',
    };

    type Counties = FeatureCollection<GeometryObject & { id: number }>;

    interface Education {
      fips: number;
      state: string;
      area_name: string;
      bachelorsOrHigher: number;
    }

    const { education, counties } = await Promise.all([d3.json<any>(urls.map), d3.json<any>(urls.education)]).then(
      ([mapData, educationData]) => {
        const counties = topojson.feature(mapData, mapData.objects.counties) as unknown as Counties;
        const education = new Map<string, Education>(educationData.map((d: any) => [d.fips.toString(), d]));

        return { counties, education };
      }
    );

    // Set up dimensions
    const width = 960;
    const height = 600;
    const padding = 60;

    const chart = d3
      .select('#chart')
      .append('svg')
      .attr('width', width + padding * 2)
      .attr('height', height + padding * 2);

    /* Map 
    =========================================================================*/
    const path = d3.geoPath();
    const colorScale = d3.scaleThreshold<number, string>().domain([15, 30, 45, 60]).range(d3.schemeBlues[5]);

    chart
      .append('g')
      .selectAll('path')
      .data(counties.features)
      .enter()
      .append('path')
      .attr('class', 'county')
      .attr('data-fips', (d: any) => d.id)
      .attr('data-education', (d: any) => {
        const county = education.get(d.id.toString());
        return county ? county.bachelorsOrHigher : 0;
      })
      .attr('fill', (d: any) => {
        const county = education.get(d.id.toString());
        return colorScale(county ? county.bachelorsOrHigher : 0);
      })
      .attr('d', path);
  } catch (error) {
    console.error(error);
  }
})();
