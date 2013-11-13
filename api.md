---
layout: default
title: API Reference
---

`MapBBCode.js` methods are explained on the [BBCode page](bbcode.html). In `MapBBCodeUI.js` and `MapBBCodeUI.Editor.js` there are only 4 public methods combined. Note that when built separately, UI scripts require `MapBBCode.js`, `EditorSprites.js` (base64 contents of a PNG image with button icons) and `FunctionButton.js` (see below). They also support all other modules described in the [Leaflet plugins page](plugins.html), but can work without them.

## Methods

* `setStrings( <Object> strings )`: replaces strings with provided translations. See `strings/English.js` for default values.
* `show( <HTMLElement/String> div, <String/HTMLElement> bbcode )`: creates a map inside a given element (can be referenced by id) for given bbcode. can be extracted from an HTML element: it can be in `bbcode` or `value` attributes, or inside it.
* `showExternal( <HTMLElement/String> div, <String> id )`: download a map from a map sharing service and display it, along with an export button and a link to the service.
* `editor( <HTMLElement/String> div, <String/HTMLTextArea> bbcode, callback, context )`: creates an editor in the given panel, possibly pre-initialized with bbcode. The latter is either a string or a textarea, in latter case caret position is taken into account, and the code is replaced after applying changes.
    Calls `callback` when "Apply" or "Cancel" buttons are clicked, with a single parameter of new bbcode.
* `editorWindow( <String/HTMLTextArea> bbcode, callback, context )`: opens a new window with an editor for given bbcode (see `editor()`). Does not return anything.

Methods `show` and `editor` return an object with a `map` property, `editor` flag and methods to control the panel:

* `close()`: removes all elements, "closes" the panel.
* `zoomToData()`: zooms and pans the map view to the data.
* `getBBCode()`: returns BBCode string for objects currently displayed.
* `updateBBCode( <String> bbcode, <Boolean> noZoom )`: removes all objects in a panel and replaces them with those defined in the given bbcode. If `noZoom` is `true`, doesn't zoom and pan to new objects.

## Options

Usually configurable by a forum administrator:

| Option | Type | Default | Description
|---|---|---|---
| `defaultPosition` | Number[] | `[22, 11]` | Coordinates of the center of a map when opened with empty bbcode.
| `defaultZoom` | Number | `2` | Default zoom of a map when bbcode is empty.
| `viewWidth` | Number | `600` | Width of a map panel when displaying a bbcode. Here and below `0` means `100%`.
| `viewHeight` | Number | `300` | Height of a map panel when displaying a bbcode.
| `fullViewHeight` | Number | `600` | Height of an expanded map panel. Width is always `100%`.
| `fullFromStart` | Boolean | `false` | Whether the map panel is opened already in expanded state. The button is hidden in this case.
| `fullScreenButton` | Boolean | `true` | Whether to show a button for expanding the map panel.
| `editorHeight` | Number | `400` | Height of an editor panel, if `editor()` method is used.
| `windowWidth` | Number | `800` | Width of an editor window, if `editorWindow()` method is used.
| `windowHeight` | Number | `500` | Height of an editor window, if `editorWindow()` method is used.
| `preferStandardLayerSwitcher` | Boolean | `true` | If this option is `false` and `L.StaticLayerSwitcher` class is present, it will be used instead of a standard Leaflet layers control.
| `allowedHTML` | String | *see source code* | Regular expression that matches all HTML tags allowed in object titles.
| `outerLinkTemplate` | String | `''` | Template for outer link for displayed map center and zoom. Example: `'http://openstreetmap.org/#map={zoom}/{lat}/{lon}'`. If not specified, outer link button is not shown.

Map layers are specified by any of those options. If none are included, an OpenStreetMap default layer is used.

| Option | Type | Description
|---|---|---
| `layers` | String[] | Array of layer identifiers. See `window.layerList` below.
| `createLayers` | Function(L) | Function that receives Leaflet object as a parameter and returns an array of Leaflet layers.

Other options:

| Option | Type | Default |  Description
|---|---|---|---
| `maxInitialZoom` | Number | `15` | Maximum zoom level for displayed features. Prevents zooming too close for single markers.
| `letterIconLength` | Number | `2` | Maximum title length for using `L.LetterIcon` for markers.
| `popupIconLength` | Number | `50` | Maximum title length for using `L.PopupIcon` for markers.
| `externalEndpoint` | String | *see source code* | URL of a map sharing server, for `showExternal()` and the upload button.
| `uploadButton` | Boolean | `false` | Whether to allow uploading maps to a sharing server from editor.
| `shareTag` | String | `'mapid'` | A bbcode tag for external map id. If empty, upload button is hidden and `showExternal()` method is disabled.
| `polygonOpacity` | Number | `0.1` | Fill opacity for polygons.
| `leafletOptions` | Object | `{}` | Additional options passed to `L.Map` constructor.
| `hideInsideClasses` | String[] | `[]` | List of classes inside which map panel will not be displayed (useful for disabling maps in signatures).
| `enablePolygons` | Boolean | `true` | Whether to show polygon drawing button in the editing toolbar.
| `helpButton` | Boolean | `true` | Whether to show help button in the editor.
| `editorCloseButtons` | Boolean | `true` | Whether to show "Apply" and "Cancel" buttons in the editor.
| `confirmFormSubmit` | Boolean | `true` | If the editor is opened inside a form, inform a user of losing changes when the form is submitted.
| `windowFeatures` | String | 'resizable,status,dialog' | Parameters for `window.open()` used for opening an editor window.
| `windowPath` | String | 'lib/mapbbcode-window.html' | Path (relative or absolute) to the editor window page (file name can be omitted).

## Parameter Processors

Since the [BBCode specification](BBCODE.md) states that the only customizable part of [map] bbcode is object parameter set, parameter processing and editing panels in the editor have been made pluggable. There are two mandatory modules (text and color) and several example modules.

To create a new parameter module, you have to push to `window.MapBBCode.objectParams` array an object with the following properties and methods (only the first four are mandatory):

* `<RegExp>   reKeys`: regular expression that matches parameters processed by this module.
* `<Boolean>  applicableTo( <ILayer> layer )`: tests that given layer can contain module's properties.
* `           objectToLayer( <ILayer> layer, <String[]> params, <MapBBCode> ui )`: modifies the layer according to the properties, which are filtered by `reKeys`, so there usually is no more than one.
* `<String[]> layerToObject( <ILayer> layer, <String[]> lastParams, <MapBBCode> ui )`: reads properties off the layer and returns them in a string array. `lastParams` array contains properties that the object had before it was edited.
* `           initLayer( <ILayer> layer )`: initializes newly created layer with default property values.
* `           initDrawControl( <Control.Draw> draw )`: modifies [Leaflet.draw](https://github.com/leaflet/leaflet.draw) control according to default property values.
* `<HTMLElement> createEditorPanel( <ILayer>layer, <MapBBCode> ui )`: creates a panel that will be included in an object popup. It should read and allow editing the property that's processed by the module.

# Configuration Tool

To simplify configuring map panel dimensions and a list of available layers, there is a separate javascript module that can be easily integrated in an administration panel.
It requires `window.layerList` and `L.StaticLayerSwitcher` for easier editing of layers. See [EMBEDDING.md](EMBEDDING.md#administration-panel) for a guide on integration.

## Options

The `MapBBCodeConfig` class includes all options listed above in "configurable by a forum administrator" table, except the last three (`preferStandardLayerSwitcher`, `allowedHTML` and `outerLinkTemplate`). Instead there are additional options for configuring the configuration panel:

| Option | Type | Default | Description
|---|---|---|---
| `editorInWindow` | Boolean | `true` | Whether the editor is opened in a window or in an inline panel.
| `editorTypeFixed` | Boolean | `false` | Whether an administrator can change the above option, or the type is hard-coded into a template.
| `maxLayers` | Number | `5` | Maximum number of layers on a map.

## Methods

* `setStrings( <Object> strings )`: replaces strings with provided translations. See `strings/English.Config.js` for default values.
* `addLayer( <String> id )`: adds a layer to the list. See `window.layerList`.
* `show( <HTMLElement/String> div )`: shows a map panel with controls inside a given element (can be specified by its id).
* `bindLayerAdder( <Object> elements )`: adds listeners and labels to several input elements for adding layers:

| bindLayerAdder option | What does it reference
|---|---
| `select` | `<select size="1">` for a layer list
| `button` | `<input type="button">` for adding a selected layer
| `keyBlock` | an initially hidden block for entering a key for layers that require it
| `keyBlockDisplay` | `display` CSS value for that block
| `keyTitle` | `<span>` where a title for key input field will be inserted
| `keyValue` | `<input type="text">` for entering a key

## Events

There are a number of [Leaflet events](http://leafletjs.com/reference.html#events) that the panel emits.

| Event | Data | When fired
|---|---|---
| `show` | options object | Configuration panel has been created.
| `change` | options object | Any of the options were changed.
| `layerselected` | `{ <String> id }` | A user selected another layer (does not affect options).
