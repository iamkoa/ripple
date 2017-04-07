defaults = {
	showAnimation:
		time: .6
		curve: "cubic-bezier(0.4, 0.0, 0.2, 1)"
}

exports.defaults = defaults


###
# ////////////////////////////////////////////// #
# Ripple effect
# ////////////////////////////////////////////// #
###

exports.Ripple = (ev, layer) ->

	ev    ?= undefined
	layer ?= undefined

	if ev is undefined or layer is undefined
		print "Must include event and layer"
		return false

	ripple = new Layer
		borderRadius: "50%"
		scale: 0
		opacity: .5
		superLayer: layer
		backgroundColor: if layer.backgroundColor.color isnt "none" then layer.backgroundColor else "rgba(255,255,255,.2)"
		brightness: 225
		midX: ev.offsetX
		midY: ev.offsetY
		index: 0
		force2d: true

	ripple.bringToFront()

	rippleAnimation = ripple.animate
		properties:
			scale: layer.width / 50
			clip: true
			opacity: 0
			curve: "ease-out"
			time: .5

	# Capture the layers' current clip property
	clip = layer.clip

	layer.props =
		clip: true

	# Destroy the ripple effect after click
	rippleAnimation.onAnimationEnd ->

		ripple.destroy()

		# Reset the layers' clip property
		layer.clip = clip


###
# ////////////////////////////////////////////// #
# Ripple transition
# ////////////////////////////////////////////// #
###

exports.RippleTransition = ({layer, openFrom, closeTo} = {}) ->

	layer    ?= undefined
	openFrom ?= undefined
	closeTo  ?= undefined

	if layer is undefined
		print "Specify a <Layer> to transition"
		return false

	if openFrom is undefined and closeTo is undefined
		print "Must include openFrom or closeTo - <Layer> or {x:x, y:y}"
		return false

	if openFrom? and closeTo?
		print "Must specify either openFrom OR closeTo, not both"
		return false

	goPoint = if openFrom? then openFrom else if closeTo? then closeTo

	# Grab the absolute position of our openFrom point
	if goPoint.screenFrame
		op   = goPoint.screenFrame
		midX = op.x + (op.width / 2)
		midY = op.y + (op.height / 2)
	else
		midX = goPoint.x
		midY = goPoint.y

	# To calc the mask size, get the largest distance between our origin point and layer point
	maskSize = Math.max(exports.twoPoints(midX, midY, layer.width, layer.height), exports.twoPoints(midX, midY, 0, 0), exports.twoPoints(midX, midY, layer.width, 0), exports.twoPoints(midX, midY, 0, layer.height)) * 2

	# Create the circle mask layer and insert the layer
	mask = new Layer
		size: if openFrom? then 0 else maskSize
		backgroundColor: "transparent"
		borderRadius: "50%"
		name: "mask"
		clip: true

	# Depending on whether we're opening or closing, set different vars
	mask.props = if openFrom? then { x: midX, y: midY } else { midX: midX, midY: midY }

	container = new Layer
		size: Screen.size
		parent: mask
		name: "container"
		force2d: true

	# Anchor our content
	container.screenFrame =
		x: 0
		y: 0
		size: Screen.size

	container.addChild(layer)

	# Make our invisible layer, visible
	if openFrom?
		layer.visible = true

	goToX    = if openFrom? then midX - maskSize / 2 else midX
	goToY    = if openFrom? then midY - maskSize / 2 else midY
	goToSize = if openFrom? then maskSize else 0

	# Animate the mask
	mask.animate
		x: goToX
		y: goToY
		size: goToSize
		options:
			time: exports.defaults.showAnimation.time
			curve: exports.defaults.showAnimation.curve

	container.animate
		x: -goToX
		y: -goToY
		options:
			time: exports.defaults.showAnimation.time
			curve: exports.defaults.showAnimation.curve

	# Destroy the mask
	mask.onAnimationEnd ->
		if closeTo?
			layer.visible = false
		container.removeChild(layer)
		mask.destroy()

	return mask


###
# ////////////////////////////////////////////// #
# Return the distance between two points
# ////////////////////////////////////////////// #
###
exports.twoPoints = (p1x, p1y, p2x, p2y) ->
	dist = Math.sqrt( (p1x - p2x) ** 2 + (p1y - p2y) ** 2 )
	return dist
