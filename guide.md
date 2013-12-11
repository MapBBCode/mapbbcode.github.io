---
layout: guide
title: User's Guide
maplang: English
---

This is a map. It behaves like any other map on the web: you can drag it, click "+" and "-" buttons to zoom in and out, change map layers with a button in top right corner. There are markers which sometimes open a popup when you click on them, and there are other geometrical figures that do nothing.

<div id="view"></div>

Additional tuning was made so the map is comfortable to use. The four-arrows button expands the panel, so you have more space to see details. Markers with short text have it printed right on them. "OSM" link in an attribution string opens [OpenStreetMap website](http://openstreetmap.org) with the place shown. For shared maps, you can download traces and points using "Export" button, and the button with an arrow opens that map on [MapBBCode Share](http://share.mapbbcode.org) website.

There are a lot of ways to pan and zoom a map. Click on a zooming button with a Shift key pressed to skip two zoom levels. Click on a map — and you'll be able to change zoom with a mouse wheel. And to move a map with keyboard arrow keys. If you drag a map holding down Shift button, you will be selecting a rectangle to zoom into.

## Wait, what is MapBBCode?

A plain string, like `[url]...[/url]` BBCode, that describes geolocated objects: labelled points, paths or traces, areas. Like an image, a map illustrates a discussion, replacing a long location description. It looks like this:

    [map]59.939,30.3159(Dvortsovaya); 59.9371,30.3127 59.9312,30.3602(black|);
    59.9458,30.3324 59.939,30.3369 59.9341,30.335 59.9226,30.3078[/map]

While it looks complex ([the specification](bbcode.html) is quite long), like `[url]` code is turned into links, a MapBBCode plugin converts `[map]` bbcode into nice interactive maps. And users don't have to type those numbers by hand: an editor is also provided.

## How do I create a map?

Look for a button somewhere near an "insert image" bbcode button. It might have a small marker for an image, or a <input type="button" value="Map" id="mapedit"/> label. It opens a map editor window. Take note where the cursor is placed in a text pane: if it is inside a map bbcode, it will be edited, instead of creating a new map.

The editor window has a few extra buttons. First, there are "Apply" and "Cancel": do not forget to press the first one when done editing. The "**?**" button opens a help window (which might have contained this text, but we can't depend on the internet connection), and clicking the magnifier button opens a search input field, which can teleport you to any place on the map.

To add a feature on the map, click one of the three icons at the left. The last one places a marker: you just click on the map and type a label for it. Then it can be dragged to another location, and with a click you can change its label or delete the marker. Always try clicking on things: you won't break anything (and there is a "Cancel" button), but you might learn something new.

Drawing a line or a polygon is easy because of helpful tooltips. After finishing the feature, there are a path (usually of blue color) and a set of rectangular markers. Drag a marker to alter the shape (dragging a semi-transparent marker adds a node at that position), click on it to remove a node from the shape. Clicking on a feature away from markers opens a popup panel, similar to marker's one, but with a different set of properties. You can delete the feature from it, and there usually is a color chooser.

An adminitrator can install extensions to the MapBBCode library. Some of them add properties to features, like a width chooser for paths. Other add informative controls: for example, length handler displays the total length of all paths on a map, and when hovering a cursor over a path, it shows the length of those you hover over.

Don't just remember all you've read, but try it on this map (or the one that opens with the "Map" button above, or the one on [the front page](index.html)). You won't break anything, and if you manage to, just reload the page. Since the MapBBCode library is build with open-source components, you may encounter similar controls on other websites.

<div id="edit"></div>

## What's "Upload" button for?

You should know about [MapBBCode Share](http://share.mapbbcode.org) service. It is built with MapBBCode library (so this guide also applies to it), and allows for sharing maps on the web. Anything that is drawn there can be embedded in a page: actually, the first map on this guide is external, and you can see the original by clicking the arrow button at the top right corner.

External (or "shared") maps have several advantages over regular ones:

1. There is an "Export" button for downloading a map in a multitude of file formats, including GPX and CSV.
2. One map can be included in many places that support map bbcode.
3. When a map is edited at MapBBCode Share, it is automatically updated everywhere it is included.
4. By sharing a link to edit a map, you can collaborate with friends in making it.

If after drawing a map you click "Upload" button instead of "Apply", the map will be uploaded, you will receive an edit link (do open it in a new tab!), and the resulting code will be quite short: `[mapid]abcde[/mapid]`, where `abcde` is an unique identifier of the map. Make sure not to forget the edit link, or else you will have to create a copy of the map and replace the identifier in your posts.

To include an already drawn map from MapBBCode Share, click the "Upload" button without drawing anything. There will be an input field where you paste the browsing link to your map. If that link checks out, its code will be included in a post. Alternatively you can just write a `[mapid]` code by hand.

That concludes the guide. If you still have questions, please refer to the [FAQ page](faq.html).

<script>
var mapBB = new MapBBCode({
	windowPath: '/lib/',
	layers: 'OpenMapSurfer,OpenStreetMap,Stamen Watercolor',
	viewWidth: 550,
	fullViewHeight: 450,
	editorHeight: 300,
	editorCloseButtons: false
});
mapBB.showExternal('view', 'pgzpu');

var bbcode = '[map]59.9342,30.6(F); 59.4366,24.7529(S); 59.377,28.204(QWOP); 59.934,30.337 59.718,30.037 59.39,28.532 59.372,27.444 59.9,26.807 59.367,26.433 59.469,26.016 59.437,24.753[/map]';
mapBB.editor('edit', bbcode);

document.getElementById('mapedit').onclick = function() {
	mapBB.editorWindow('');
}
</script>
