---
layout: guide
title: Administrator's Guide
maplang: English
---

Regardless of a forum or blog engine, good MapBBCode plugin has a configuration page hidden somewhere, most likely in a separate settings page or near posting or bbcode settings. This page looks similar across engines, because options are the same, and the main panel is drawn by a MapBBCode library. The latter has a layer list and a panel that allows for tuning panel dimensions and managing layers.

Layers are chosen from a [predefined list](https://github.com/MapBBCode/mapbbcode/blob/master/src/config/LayerList.js). By default it has OpenStreetMap-based layers and, often, a Bing Imagery layer. For most layers you just select them and click "Add", then fixing the order by clicking up and down arrows near the layer name. All map panels on the forum will have the first layer in the list shown by default, and users can choose other layers, but their layer preferences are not saved. Some layers, like Bing Imagery, require a developer key. When you select it, a text field appears, along with a link to the website where you can register and acquire the key. If you entered it incorrectly, you can remove the layer and try again.

Most proprietary layers, like those from Google and Yandex, are not enabled by default, but in most cases can be easily included by editing some files. Instructions are usually included in "readme" files (check your plugin's source code repository), and they basically point to one or more files with javascript code, in which you would have to add 1-2 lines like that:

```html
<script src="{PROVIDER'S_LIBRARY}"></script>
<script src="mapbbcode/proprietary/{PROVIDER}.js"></script>
```

For Google and Yandex the libraries are corresponding Map APIs. Esri and Bing layers don't need any extra libraries.

While moving layers around, you will find that it is impossible to have a proprietary layer for a default one. You should have at least one OpenStreetMap-based layer for that. This restriction is raised because the author doesn't wish for his plugins to become free Google Maps plugins. He comes from OSM project and wishes for it to be known and to grow. It is not hard to circumvent the restriction, but please do not. If you want a proprietary map for your forum or blog, find another plugin, made specially for that. As for OSM layers, there are some pretty and informative instances, like OpenMapSurfer and MapQuest Open.

<div>
<select size="1" id="layers"></select> <input type="button" id="layeradd"/>
</div>
<div id="bingkey">
<span id="bingtitle"></span>
<input type="text" size="60" id="keyvalue"/>
</div>
<div id="map"></div>

<div id="values">
<div>Default position and zoom: <span id="zoompos"></span></div>
<div>View panel size: <span id="viewsize"></span></div>
<div>Editor panel height: <span id="editheight"></span></div>
<div>Editor window size: <span id="winsize"></span></div>
</div>

A map panel can have three states: display/normal, display/expanded and editable. The editor can be either opened in a popup window or appear in an inline panel. You can configure those modes and panel dimensions using 6 buttons: 4 arrows for shrinking and expanding the panel, and 2 switches. "View/Editor" selects which state are you editing, and the button below it toggles behaviour: in "View" mode you choose whether the map panel will be displayed small with an option to expand it to full width, or expanded by default; in "Editor" — whether to use a window or an inline panel.

As you click control buttons, you will see numbers below the panel change their values and sometimes color. If a value is grayed out, it is not used: for example, when the editor is configured to appear in an inline panel, window dimensions are irrelevant.

Finally, you should zoom and pan the map around. The position and zoom that you choose will be stored and used as default for editing panels and empty bbcode values. If you are operating a local community forum, it would be reasonable to have your region for a default position.

Aside from the map and layers panel, there are some other parameters you may be able to configure:

* **Global maps switch:** with it you can turn maps on and off on the whole forum. There might be a per-topic setting, but it's unlikely. On some engines this option is unnecessary, because you can easily enable and disable the plugin itself.
* **Map button in quick reply forms:** if a forum has built-in quick reply forms with bbcode buttons, this option control whether those buttons include the one for adding a map. If enabled, a lot of javascript files will be included on every topic browsing page, and it is more that 250 kilobytes uncompressed, though caching and gzip compression are quite widespread.
* **Hide layers under a button control:** the Leaflet library has its own layer control, which looks like a button, which turns into a list of layers when the mouse cursor is over it. The alternative is a custom layer control which is used in the configuration panel above (sans arrows and crosses, obviously).
* **Allowed tags:** maps can contain markers with titles, which can include any HTML. Most special characters are screened, but some tags are preserved, so one can add a link or emphasize a word in a popup panel. This field contains a fragment of a [regular expression](https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions) for matching allowed HTML tags.
* **External link template:** if your forum has its own map somewhere, you can put in this field a link to it. You can use strings `{lat}`, `{lon}` and `{zoom}` for substituting current position and zoom level, so the map opens exactly on the place a user is looking at.
* **Enable MapBBCode Share integration:** when enabled, users will be able to include external maps instead of drawing them from scratch, and upload maps to an external server. Usually it is [share.mapbbcode.org](http://share.mapbbcode.org/), although you can have your own instance.
* **MapBBCode Share server address:** this is where you put your MapBBCode Share instance's address if you have one.

See [FAQ](faq.html) if you have any questions, and don't hesitate to [ask the author](mailto:zverik@textual.ru) is you haven't found an answer.

<script>
var config = new MapBBCodeConfig({
	layers: ['OpenMapSurfer', 'OpenStreetMap'],
	viewWidth: 550,
	fullViewHeight: 400
});
config.bindLayerAdder({
	select: 'layers',
	button: 'layeradd',
	keyBlock: 'bingkey',
	keyTitle: 'bingtitle',
	keyValue: 'keyvalue',
	keyBlockDisplay: 'block'
});
config.on('show change', function(o) {
	function set(span, value, enabled) {
		document.getElementById(span).innerHTML = value;
		document.getElementById(span).style.color = enabled ? 'black' : '#aaa';
	}
	set('zoompos', o.defaultZoom + ',' + o.defaultPosition[0] + ',' + o.defaultPosition[1], true);
	set('viewsize', o.fullFromStart ? '100% × ' + o.fullViewHeight : o.viewWidth + '×' + o.viewHeight, true);
	set('editheight', o.editorHeight, !o.editorInWindow);
	set('winsize', o.windowWidth + '×' + o.windowHeight, o.editorInWindow);
});
config.show('map');
</script>
