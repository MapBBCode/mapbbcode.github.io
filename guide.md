---
layout: guide
title: User's Guide
---

todo

<div id="bbcode" style="display: none;">[map]59.9342,30.3367(S); 59.4366,24.7529(F); 59.377,28.204(Border control); 59.934,30.337 59.718,30.037 59.39,28.532 59.372,27.444 59.428,26.807 59.367,26.433 59.469,26.016 59.437,24.753[/map]</div>
<div id="view"></div>

<div id="edit"></div>

<script>
var mapBB = new MapBBCode({
	layers: 'OpenMapSurfer,OpenStreetMap,Stamen Watercolor',
	viewWidth: 550,
	fullViewHeight: 450,
	editorHeight: 300,
	uploadButton: true
});
mapBB.showExternal('view', 'pgzpu');

mapBB.editor('edit', document.getElementById('bbcode').innerHTML);
</script>
