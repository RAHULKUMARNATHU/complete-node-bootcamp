console.log('Hello from client ');
const locations = JSON.parse(document.getElementById('map').dataset.locations);

// console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1Ijoia3VtYXJyYWh1bCIsImEiOiJjbG5nMzdpbXYwdHB6MmpwNDR4d2kwYTJnIn0.vMftBRxFMk07xgZfWKJ6Tg';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/kumarrahul/clng65p6t007v01pia5md5cwq',
  scrollZoom: false,
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  //create marker
  const el = document.createElement('div');
  el.className = 'marker';

  // Add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  /*Add popup */
  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  //Extend map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
});
