---
layout: default
title: FAQ
---

**How can an imagery layer be stored in a BBCode?**

You don't store presentation information (layer, dimensions, map title) in the [map] bbcode. Code is intended to represent just geometric objects with their attributes: like GeoJSON, but better suited for forums. This way it is independent from the library or the way it is presented. You can draw object differently, but if you conform to the specification, the resulting map will have everything the author intended to show.

Map BBCode stores *what* to display, not *how*. The only exception are zoom/coordinate attributes of [map] tag, which could be considered an object in itself: when a code is empty, those attributes can center a map of a feature being discussed. Using those attributes along with objects is not recommended, and the library does not produce such code. Markers are better suited for drawing attention to certain parts of a map, and unpredictable panel dimensions make fiddling with initial zoom level pointless.

**How do I delete an object from a map?**

Click on that object (for a line, click on it, not on rectangular markers), and you'll see a popup panel. There will be a "Delete" button.

**Which map layers would you recommend for forum maps?**

In that order:

* *OpenMapSurfer* — because it is the prettiest and rich map based on OSM data.
* *OpenStreetMap* — as a fallback from OpenMapSurfer, which can be offline sometimes, and as a familiar map for some.
* *Bing Imagery* — most people are used to having imagery layer as an option, and Bing is good enough. Also Bing team supports OSM project, which automatically makes them nice guys.

**Should I enable MapBBCode Share integration for my forum/blog?**

Maps uploaded to a central server (it doesn't need to be share.mapbbcode.org) allow for three nice features that your users might welcome:

1. Collaborative editing: no hassle with post editing permissions, just give away a link to the share service. Updates will immediately be shown on the included map.
2. Export to a multitude of formats, for example, GPX or CSV. A topic opener can share a path for the upcoming trip, and all participants will be able to download it to their GPS devices.
3. A single map for different forums and sites: you can include the original map in a blog post or in an another forum thread.

The drawback is that uploaded maps cannot be edited from a library, and editing link should be bookmarked. Of course, if the author has lost the link, he can fork the map and replace the old code with the new one.

**External maps are not loaded in Internet Explorer**

Open "Internet Options", select "Security" tab, click "Custom level..." button and find "Access data sources across domains" in "Miscellaneous" section. Set it to "Enable" and refresh the page. This setting is off by default, and I do not know a way to circumvent it. Please refer to the [relevant issue](https://github.com/MapBBCode/mapbbcode/issues/8) and submit a pull request to `MapBBCodeUI.Share.js`, if you know how to solve this problem.

**Why some dimensions are grayed out in a configuration panel?**

The button below "View/Edit" switcher control how the map will appear on forum/blog pages. Its settings make some values irrelevant. For example, when the editor is configured to be shown as an inline panel, editor window dimensions are not used, which is visualized with grayed-out values.

**Why forum modules need `mapbbcode` directory?**

It contains not only three files of the MapBBCode library, but also other libraries that may be useful, like a Bing imagery layer. Only one of those is available from CDN, Leaflet. Ideally the whole folder should be stored at a single location (of course, with an option to download all files, e.g. for an intranet forum), but there is a problem. I don't know where to get free and *reliable* CDN. If you know how to do it properly, please contact the author.

**The whole library is essentially one file, right?**

Yes. For example, using only `mapbbcode.js` you can visualize a bbcode or include a map from MapBBCode Share:

```html
<!DOCTYPE html>
<meta charset="utf-8">
<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.6.4/leaflet.css" />
<script src="http://cdn.leafletjs.com/leaflet-0.6.4/leaflet.js"></script>
<script src="mapbbcode.js"></script>
<div id="test"></div>
<script>
var mapBB = new MapBBCode();
mapBB.showExternal('test', 'gttvz');
</script>
```

**I want to display length while drawing lines**

Include the `Param.Measure.js` script from the MapBBCode repository, and the measurement line will automatically appear in a feature popup panel. This and other example scripts in `param` directory demonstrate how to add functionality to the editor.

**Why one cannot add title text to lines and polygons?**

Because it is not obvious visually whether you can click on an object or not, unlike markers, which are made for being clicked. You can override this, of course, by modifying `Param.Text.js` and making a custom build.

**Which layer is selected by default?**

The first one. The topmost one in the configuration interface. Not the one that is selected when you press "save changes".

**Layer order in a layer control differs from the order in `layers` property**

This is a [Leaflet library issue](https://github.com/Leaflet/Leaflet/issues/2086).

**Can I add more than 5 layers?**

No.

**I want a custom layer included in a layer list that forum admins use**

Add this line to scripts in page templates before MapBBCode objects instantiation:

```javascript
window.layerList.list['Layer Name'] = 'L.tileLayer("http://...", { ... })';
```

**Specifically, I want Google Maps in my forum**

Google layers are not included because Google is evil. And sometimes charge for their maps. And you should promote free and open maps, that is, OpenStreetMap. But of course there is a way to add google maps to a forum, and since version 1.1, an easy one. Just add those two lines after `mapbbcode-config.js` but before `new MapBBCode()`:

```html
<script src="http://maps.google.com/maps/api/js?v=3&sensor=false"></script>
<script src="{mapbbcode}/proprietary/Google.js"></script>
```

The same for other proprietary layers: Bing, Yandex etc.

**I haven't found my question in this list**

Please ask it on the [issue tracker](https://github.com/mapbbcode/mapbbcode/issues), or [write to the author](mailto:zverik@textual.ru).
