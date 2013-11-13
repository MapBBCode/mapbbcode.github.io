// L.LeafletIcon
var mapli = L.map('mapli').setView([11, 22], 2);
mapli.addLayer(window.layerList.getLeafletLayers('OpenStreetMap')[0]);
mapli.addLayer(L.marker([11, 22], { icon: L.letterIcon('A') }));

