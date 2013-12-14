---
layout: guide
title: Administrator's Guide
maplang: English
---

## Configuration Panel

Regardless of a forum or blog engine, a good MapBBCode plugin has a configuration page hidden somewhere, most likely in a separate settings page or near posting or bbcode settings. This page looks similar across engines, because options are the same, and the main panel is drawn by the MapBBCode library. The latter has a layer list and a panel that allows for tuning panel dimensions and managing layers.

### Layers

Layers are chosen from a [predefined list](https://github.com/MapBBCode/mapbbcode/blob/master/src/layers/LayerList.js). By default it has OpenStreetMap-based layers and, often, a Bing Imagery layer. For most layers you just select them and click "Add", then fixing the order by clicking up and down arrows near the layer name. All map panels on the forum will have the first layer in the list shown by default, and users can choose other layers, but their layer preferences are not saved.

Some layers, like Cloudmade's, require a developer key. When you select one of them, a text field appears, along with a link to the website where you can register and acquire the key. If you entered it incorrectly, you can remove the layer and try again.

You can have proprietary layers, like Google or Yandex maps, on your forum. For that you'll need to add relevant scripts to some files. See "Add-ons" section below for instructions.

While moving layers around, you will find that it is impossible to have a proprietary layer for a default one. You should have at least one OpenStreetMap-based layer for that. This restriction is present because the author doesn't want for his plugins to become free Google Maps plugins. He comes from OSM project and wishes for it to be known and to grow. It is not hard to circumvent the restriction, but please do not. If you want a proprietary map for your forum or blog, find another plugin, made specially for that. As for OSM layers, there are some pretty and informative instances, like OpenMapSurfer and MapQuest Open.

### Interactive demo

{% include admin.html %}

### Panel states and dimensions

A map panel can have three states: display/normal, display/expanded and editable. The editor can be either opened in a popup window or appear in an inline panel. You can configure those modes and panel dimensions using 6 buttons: 4 arrows for shrinking and expanding the panel, and 2 switches. "View/Editor" selects which state are you editing, and the button below it toggles behaviour: in "View" mode you choose whether the map panel will be displayed small with an option to expand it to full width, or expanded by default; in "Editor" — whether to use a window or an inline panel.

As you click control buttons, you will see numbers below the panel change their values and sometimes color. If a value is grayed out, it is not used: for example, when the editor is configured to appear in an inline panel, window dimensions are irrelevant.

Finally, you should zoom and pan the map around. The position and zoom that you choose will be stored and used as default for editing panels and empty bbcode values. If you are operating a local community forum, it would be reasonable to have your region for a default position.

### Other configurable options

Aside from the map and layers panel, there are some other parameters you may be able to configure:

* **Global maps switch:** with it you can turn maps on and off on the whole forum. There might be a per-topic setting, but it's unlikely. On some engines this option is unnecessary, because you can easily enable and disable the plugin itself.
* **Map button in quick reply forms:** if a forum has built-in quick reply forms with bbcode buttons, this option control whether those buttons include the one for adding a map. If enabled, a lot of javascript files will be included on every topic browsing page, and it is more that 250 kilobytes uncompressed, though caching and gzip compression are quite widespread.
* **Hide layers under a button control:** the Leaflet library has its own layer control, which looks like a button, which turns into a list of layers when the mouse cursor is over it. The alternative is a custom layer control which is used in the configuration panel above (sans arrows and crosses, obviously).
* **Allowed tags:** maps can contain markers with titles, which can include any HTML. Most special characters are screened, but some tags are preserved, so one can add a link or emphasize a word in a popup panel. This field contains a fragment of a [regular expression](https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions) for matching allowed HTML tags.
* **External link template:** if your forum has its own map somewhere, you can put in this field a link to it. You can use strings `{lat}`, `{lon}` and `{zoom}` for substituting current position and zoom level, so the map opens exactly on the place a user is looking at.
* **Enable MapBBCode Share integration:** when enabled, users will be able to include external maps instead of drawing them from scratch, and upload maps to an external server. Usually it is [share.mapbbcode.org](http://share.mapbbcode.org/), although you can have your own instance.
* **MapBBCode Share server address:** this is where you put your MapBBCode Share instance's address if you have one.

## Configuring MapBBCode

Most MapBBCode plugins allow for extending the library's functionality. It is done in two ways:

### Add-ons

Add-ons are separate javascript files that need to be included after `mapbbcode*.js`. There are usually three places that need updating, though it differs by the engine:

* `mapbbcode-window.html` in the mapbbcode library directory.
* page header template(s)
* configuration page template (only for additional layers)

Some of those files may be modified in a plugin, so it's better to search for a comment "put MapBBCode add-ons here". For most plugins it marks places where you need to put inclusion tags for add-on scripts. Please mind correct paths to js files.

There are some add-ons distributed with MapBBCode by default. First, a length measurement plugin, `Handler.Length.js`. It resides alongside `mapbbcode.js` and adds a measurement panel to maps.

Second, proprietary layers. If you want to have Google or Yandex layers, add the following line (replace `{PROVIDER}` with a provider name):

```html
<script src="mapbbcode/proprietary/{PROVIDER}.js"></script>
```

Note that since you are modifying files, you will have to redo those actions after updating a MapBBCode plugin.

### Options

A lot of MapBBCode and Leaflet options can be configured by hand, if you don't like default values. You especially might want to do that with plugins that don't offer a configuration panel. It is quite easy: find a page header template (there can be more that one) by searching for `new MapBBCode(` substring (note the opening bracket). There you will see a lot of options, and you can override them or add your own (see [API reference](api.html) for the list). For Leaflet options, add `leafletOptions: {}` option, and inside the figure brackets you can write [options](http://leafletjs.com/reference.html#map-options) that get passed to `L.Map` object.

Again, those changes are likely to get overwritten with a plugin update.

## Help

See the [FAQ page](faq.html) if you have any questions, and don't hesitate to [ask the author](mailto:zverik@textual.ru) if you haven't found an answer.
