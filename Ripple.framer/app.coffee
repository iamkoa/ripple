R = require "Ripple"

bottom = new Layer
	size: Screen.size
	backgroundColor: "#E0E0E0"

top = new Layer
	size: Screen.size
	backgroundColor: "#7986CB"
	visible: true

new TextLayer
	text: "Oh, hi!"
	color: "white"
	fontSize: 70
	fontWeight: 500
	x: Align.center
	y: Align.center
	parent: top
	
top.on Events.Tap, (e) ->
	
	R.RippleTransition
		layer: top
		closeTo: {x: Screen.width, y: Screen.height}

bottom.on Events.Tap, (e) ->
		
	R.RippleTransition
		layer: top
		openFrom: e.point