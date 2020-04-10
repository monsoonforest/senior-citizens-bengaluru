# MAP OF SENIOR CITIZEN DENSITY IN BENGALURU, INDIA
A thematic map of senior citizen (>60 years old) density at the ward administrative level in Bengaluru city.
The population of senior citizens was queried by ward. To obtain the density of senior citizens by ward, we divided the number of senior citizens by the built-up area within a ward. This was to represent the "true" residential or built-up area for Bengaluru rather than just use ward area (which may include parks, lakes, crop-lands etc.) Currently we are working on obtaining recent population datasets for Senior Citizens.

Site is hosted on <a href="https://pages.github.com/" rel="nofollow"> GitHub</a>.

## Data and layers
- Senior citizen population sourced from <a href="https://ceokarnataka.kar.nic.in/" rel="nofollow"> Chief Electoral Officer Karnataka</a>.
- Ward polygons sourced from <a href="http://opencity.in/data/bbmp-wards" rel="nofollow"> Open City; Urban Data Portal</a>.


## Credits and Demo
- Leaflet choropleth tutorial (with US state population density example): http://leafletjs.com/examples/choropleth.html
- For a demo refer to : <a href="https://datavizforall.github.io/leaflet-map-polygon-hover/index.html"  rel="nofollow"> Data Visualization for All by Jack Dougherty & Ilya Ilyankou </a>
- <a href="qgis.org/en/site/"  rel="nofollow"> QGIS a free and open source Geographic Information System</a>
- <a href="r-project.org"  rel="nofollow">The R Project for Statistical Computing</a>
- The built-up area dataset was derieved by using a Normalized Difference Index of Band 8 and Band 2 from a January 2020 Sentinel-2 image of Bengaluru using <a href="https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S2"  rel="nofollow">Google Earth Engine</a>. The dataset has a spatial resolution of 10 meters and is available for download on this repository. The difference index was applied based on research by <a href="https://www.researchgate.net/publication/328613201_EXTRACTION_OF_BUILT-UP_AREA_USING_HIGH_RESOLUTION_SENTINEL-2A_AND_GOOGLE_SATELLITE_IMAGERY"  rel="nofollow">Vigneshwaran & Kumar (2018)</a>.

## Collaborators
- <a href="https://github.com/pvnkmrksk"  rel="nofollow"> Pavan Kumar Kaushik</a>.
- <a href="https://sites.google.com/urbanmorph.com/urbanmorph/health"  rel="nofollow"> Sathya Sankaran and Sonal Kulkarni at Urban Morph</a>.
- The Relief Riders of Bengaluru City.