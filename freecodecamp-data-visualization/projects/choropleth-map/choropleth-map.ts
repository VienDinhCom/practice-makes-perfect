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

    const tooltip = d3.select('body').append('div').attr('id', 'tooltip');

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
      .attr('d', path)
      .on('mouseover', function (event: any, d: any) {
        const county = education.get(d.id.toString());

        if (!county) return;

        tooltip
          .attr('data-education', county.bachelorsOrHigher)
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 28 + 'px')
          .style('opacity', 0.9)
          .html(`<p>${county.area_name}, ${county.state}: ${county.bachelorsOrHigher}%</p>`);
      })
      .on('mouseout', function () {
        tooltip.style('opacity', 0);
      });

    /* Legend 
    =========================================================================*/
    const legendWidth = 300;
    const legendRectWidth = legendWidth / colorScale.range().length;

    const legend = chart
      .append('g')
      .attr('id', 'legend')
      .attr('transform', `translate(${width / 2 - legendWidth / 2}, ${height + 50})`);

    // Add legend rectangles
    legend
      .selectAll('rect')
      .data(colorScale.range())
      .enter()
      .append('rect')
      .attr('x', (_, i) => legendRectWidth * i)
      .attr('y', 0)
      .attr('width', legendRectWidth)
      .attr('height', 10)
      .attr('fill', (d) => d);

    // Add legend labels
    const legendDomain = [0, ...colorScale.domain(), 100];

    legend
      .selectAll('text')
      .data(legendDomain)
      .enter()
      .append('text')
      .attr('x', (_, i) => legendRectWidth * i)
      .attr('y', 20)
      .style('font-size', '10px')
      .text((d) => `${d}%`);
  } catch (error) {
    console.error(error);
  }
})();
