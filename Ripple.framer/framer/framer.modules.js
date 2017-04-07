require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Ripple":[function(require,module,exports){
var defaults;

defaults = {
  showAnimation: {
    time: .6,
    curve: "cubic-bezier(0.4, 0.0, 0.2, 1)"
  }
};

exports.defaults = defaults;


/*
 * ////////////////////////////////////////////// #
 * Ripple effect
 * ////////////////////////////////////////////// #
 */

exports.Ripple = function(ev, layer) {
  var clip, ripple, rippleAnimation;
  if (ev == null) {
    ev = void 0;
  }
  if (layer == null) {
    layer = void 0;
  }
  if (ev === void 0 || layer === void 0) {
    print("Must include event and layer");
    return false;
  }
  ripple = new Layer({
    borderRadius: "50%",
    scale: 0,
    opacity: .5,
    superLayer: layer,
    backgroundColor: layer.backgroundColor.color !== "none" ? layer.backgroundColor : "rgba(255,255,255,.2)",
    brightness: 225,
    midX: ev.offsetX,
    midY: ev.offsetY,
    index: 0,
    force2d: true
  });
  ripple.bringToFront();
  rippleAnimation = ripple.animate({
    properties: {
      scale: layer.width / 50,
      clip: true,
      opacity: 0,
      curve: "ease-out",
      time: .5
    }
  });
  clip = layer.clip;
  layer.props = {
    clip: true
  };
  return rippleAnimation.onAnimationEnd(function() {
    ripple.destroy();
    return layer.clip = clip;
  });
};


/*
 * ////////////////////////////////////////////// #
 * Ripple transition
 * ////////////////////////////////////////////// #
 */

exports.RippleTransition = function(arg) {
  var closeTo, container, goPoint, goToSize, goToX, goToY, layer, mask, maskSize, midX, midY, op, openFrom, ref;
  ref = arg != null ? arg : {}, layer = ref.layer, openFrom = ref.openFrom, closeTo = ref.closeTo;
  if (layer == null) {
    layer = void 0;
  }
  if (openFrom == null) {
    openFrom = void 0;
  }
  if (closeTo == null) {
    closeTo = void 0;
  }
  if (layer === void 0) {
    print("Specify a <Layer> to transition");
    return false;
  }
  if (openFrom === void 0 && closeTo === void 0) {
    print("Must include openFrom or closeTo - <Layer> or {x:x, y:y}");
    return false;
  }
  if ((openFrom != null) && (closeTo != null)) {
    print("Must specify either openFrom OR closeTo, not both");
    return false;
  }
  goPoint = openFrom != null ? openFrom : closeTo != null ? closeTo : void 0;
  if (goPoint.screenFrame) {
    op = goPoint.screenFrame;
    midX = op.x + (op.width / 2);
    midY = op.y + (op.height / 2);
  } else {
    midX = goPoint.x;
    midY = goPoint.y;
  }
  maskSize = Math.max(exports.twoPoints(midX, midY, layer.width, layer.height), exports.twoPoints(midX, midY, 0, 0), exports.twoPoints(midX, midY, layer.width, 0), exports.twoPoints(midX, midY, 0, layer.height)) * 2;
  mask = new Layer({
    size: openFrom != null ? 0 : maskSize,
    backgroundColor: "transparent",
    borderRadius: "50%",
    name: "mask",
    clip: true
  });
  mask.props = openFrom != null ? {
    x: midX,
    y: midY
  } : {
    midX: midX,
    midY: midY
  };
  container = new Layer({
    size: Screen.size,
    parent: mask,
    name: "container",
    force2d: true
  });
  container.screenFrame = {
    x: 0,
    y: 0,
    size: Screen.size
  };
  container.addChild(layer);
  if (openFrom != null) {
    layer.visible = true;
  }
  goToX = openFrom != null ? midX - maskSize / 2 : midX;
  goToY = openFrom != null ? midY - maskSize / 2 : midY;
  goToSize = openFrom != null ? maskSize : 0;
  mask.animate({
    x: goToX,
    y: goToY,
    size: goToSize,
    options: {
      time: exports.defaults.showAnimation.time,
      curve: exports.defaults.showAnimation.curve
    }
  });
  container.animate({
    x: -goToX,
    y: -goToY,
    options: {
      time: exports.defaults.showAnimation.time,
      curve: exports.defaults.showAnimation.curve
    }
  });
  mask.onAnimationEnd(function() {
    if (closeTo != null) {
      layer.visible = false;
    }
    container.removeChild(layer);
    return mask.destroy();
  });
  return mask;
};


/*
 * ////////////////////////////////////////////// #
 * Return the distance between two points
 * ////////////////////////////////////////////// #
 */

exports.twoPoints = function(p1x, p1y, p2x, p2y) {
  var dist;
  dist = Math.sqrt(Math.pow(p1x - p2x, 2) + Math.pow(p1y - p2y, 2));
  return dist;
};


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2tvYW0vRHJvcGJveC9GcmFtZXItVGVzdHMvUmlwcGxlLmZyYW1lci9tb2R1bGVzL1JpcHBsZS5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImRlZmF1bHRzID0ge1xuXHRzaG93QW5pbWF0aW9uOlxuXHRcdHRpbWU6IC42XG5cdFx0Y3VydmU6IFwiY3ViaWMtYmV6aWVyKDAuNCwgMC4wLCAwLjIsIDEpXCJcbn1cblxuZXhwb3J0cy5kZWZhdWx0cyA9IGRlZmF1bHRzXG5cblxuIyMjXG4jIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gI1xuIyBSaXBwbGUgZWZmZWN0XG4jIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gI1xuIyMjXG5cbmV4cG9ydHMuUmlwcGxlID0gKGV2LCBsYXllcikgLT5cblxuXHRldiAgICA/PSB1bmRlZmluZWRcblx0bGF5ZXIgPz0gdW5kZWZpbmVkXG5cblx0aWYgZXYgaXMgdW5kZWZpbmVkIG9yIGxheWVyIGlzIHVuZGVmaW5lZFxuXHRcdHByaW50IFwiTXVzdCBpbmNsdWRlIGV2ZW50IGFuZCBsYXllclwiXG5cdFx0cmV0dXJuIGZhbHNlXG5cblx0cmlwcGxlID0gbmV3IExheWVyXG5cdFx0Ym9yZGVyUmFkaXVzOiBcIjUwJVwiXG5cdFx0c2NhbGU6IDBcblx0XHRvcGFjaXR5OiAuNVxuXHRcdHN1cGVyTGF5ZXI6IGxheWVyXG5cdFx0YmFja2dyb3VuZENvbG9yOiBpZiBsYXllci5iYWNrZ3JvdW5kQ29sb3IuY29sb3IgaXNudCBcIm5vbmVcIiB0aGVuIGxheWVyLmJhY2tncm91bmRDb2xvciBlbHNlIFwicmdiYSgyNTUsMjU1LDI1NSwuMilcIlxuXHRcdGJyaWdodG5lc3M6IDIyNVxuXHRcdG1pZFg6IGV2Lm9mZnNldFhcblx0XHRtaWRZOiBldi5vZmZzZXRZXG5cdFx0aW5kZXg6IDBcblx0XHRmb3JjZTJkOiB0cnVlXG5cblx0cmlwcGxlLmJyaW5nVG9Gcm9udCgpXG5cblx0cmlwcGxlQW5pbWF0aW9uID0gcmlwcGxlLmFuaW1hdGVcblx0XHRwcm9wZXJ0aWVzOlxuXHRcdFx0c2NhbGU6IGxheWVyLndpZHRoIC8gNTBcblx0XHRcdGNsaXA6IHRydWVcblx0XHRcdG9wYWNpdHk6IDBcblx0XHRcdGN1cnZlOiBcImVhc2Utb3V0XCJcblx0XHRcdHRpbWU6IC41XG5cblx0IyBDYXB0dXJlIHRoZSBsYXllcnMnIGN1cnJlbnQgY2xpcCBwcm9wZXJ0eVxuXHRjbGlwID0gbGF5ZXIuY2xpcFxuXG5cdGxheWVyLnByb3BzID1cblx0XHRjbGlwOiB0cnVlXG5cblx0IyBEZXN0cm95IHRoZSByaXBwbGUgZWZmZWN0IGFmdGVyIGNsaWNrXG5cdHJpcHBsZUFuaW1hdGlvbi5vbkFuaW1hdGlvbkVuZCAtPlxuXG5cdFx0cmlwcGxlLmRlc3Ryb3koKVxuXG5cdFx0IyBSZXNldCB0aGUgbGF5ZXJzJyBjbGlwIHByb3BlcnR5XG5cdFx0bGF5ZXIuY2xpcCA9IGNsaXBcblxuXG4jIyNcbiMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyAjXG4jIFJpcHBsZSB0cmFuc2l0aW9uXG4jIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gI1xuIyMjXG5cbmV4cG9ydHMuUmlwcGxlVHJhbnNpdGlvbiA9ICh7bGF5ZXIsIG9wZW5Gcm9tLCBjbG9zZVRvfSA9IHt9KSAtPlxuXG5cdGxheWVyICAgID89IHVuZGVmaW5lZFxuXHRvcGVuRnJvbSA/PSB1bmRlZmluZWRcblx0Y2xvc2VUbyAgPz0gdW5kZWZpbmVkXG5cblx0aWYgbGF5ZXIgaXMgdW5kZWZpbmVkXG5cdFx0cHJpbnQgXCJTcGVjaWZ5IGEgPExheWVyPiB0byB0cmFuc2l0aW9uXCJcblx0XHRyZXR1cm4gZmFsc2VcblxuXHRpZiBvcGVuRnJvbSBpcyB1bmRlZmluZWQgYW5kIGNsb3NlVG8gaXMgdW5kZWZpbmVkXG5cdFx0cHJpbnQgXCJNdXN0IGluY2x1ZGUgb3BlbkZyb20gb3IgY2xvc2VUbyAtIDxMYXllcj4gb3Ige3g6eCwgeTp5fVwiXG5cdFx0cmV0dXJuIGZhbHNlXG5cblx0aWYgb3BlbkZyb20/IGFuZCBjbG9zZVRvP1xuXHRcdHByaW50IFwiTXVzdCBzcGVjaWZ5IGVpdGhlciBvcGVuRnJvbSBPUiBjbG9zZVRvLCBub3QgYm90aFwiXG5cdFx0cmV0dXJuIGZhbHNlXG5cblx0Z29Qb2ludCA9IGlmIG9wZW5Gcm9tPyB0aGVuIG9wZW5Gcm9tIGVsc2UgaWYgY2xvc2VUbz8gdGhlbiBjbG9zZVRvXG5cblx0IyBHcmFiIHRoZSBhYnNvbHV0ZSBwb3NpdGlvbiBvZiBvdXIgb3BlbkZyb20gcG9pbnRcblx0aWYgZ29Qb2ludC5zY3JlZW5GcmFtZVxuXHRcdG9wICAgPSBnb1BvaW50LnNjcmVlbkZyYW1lXG5cdFx0bWlkWCA9IG9wLnggKyAob3Aud2lkdGggLyAyKVxuXHRcdG1pZFkgPSBvcC55ICsgKG9wLmhlaWdodCAvIDIpXG5cdGVsc2Vcblx0XHRtaWRYID0gZ29Qb2ludC54XG5cdFx0bWlkWSA9IGdvUG9pbnQueVxuXG5cdCMgVG8gY2FsYyB0aGUgbWFzayBzaXplLCBnZXQgdGhlIGxhcmdlc3QgZGlzdGFuY2UgYmV0d2VlbiBvdXIgb3JpZ2luIHBvaW50IGFuZCBsYXllciBwb2ludFxuXHRtYXNrU2l6ZSA9IE1hdGgubWF4KGV4cG9ydHMudHdvUG9pbnRzKG1pZFgsIG1pZFksIGxheWVyLndpZHRoLCBsYXllci5oZWlnaHQpLCBleHBvcnRzLnR3b1BvaW50cyhtaWRYLCBtaWRZLCAwLCAwKSwgZXhwb3J0cy50d29Qb2ludHMobWlkWCwgbWlkWSwgbGF5ZXIud2lkdGgsIDApLCBleHBvcnRzLnR3b1BvaW50cyhtaWRYLCBtaWRZLCAwLCBsYXllci5oZWlnaHQpKSAqIDJcblxuXHQjIENyZWF0ZSB0aGUgY2lyY2xlIG1hc2sgbGF5ZXIgYW5kIGluc2VydCB0aGUgbGF5ZXJcblx0bWFzayA9IG5ldyBMYXllclxuXHRcdHNpemU6IGlmIG9wZW5Gcm9tPyB0aGVuIDAgZWxzZSBtYXNrU2l6ZVxuXHRcdGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG5cdFx0Ym9yZGVyUmFkaXVzOiBcIjUwJVwiXG5cdFx0bmFtZTogXCJtYXNrXCJcblx0XHRjbGlwOiB0cnVlXG5cblx0IyBEZXBlbmRpbmcgb24gd2hldGhlciB3ZSdyZSBvcGVuaW5nIG9yIGNsb3NpbmcsIHNldCBkaWZmZXJlbnQgdmFyc1xuXHRtYXNrLnByb3BzID0gaWYgb3BlbkZyb20/IHRoZW4geyB4OiBtaWRYLCB5OiBtaWRZIH0gZWxzZSB7IG1pZFg6IG1pZFgsIG1pZFk6IG1pZFkgfVxuXG5cdGNvbnRhaW5lciA9IG5ldyBMYXllclxuXHRcdHNpemU6IFNjcmVlbi5zaXplXG5cdFx0cGFyZW50OiBtYXNrXG5cdFx0bmFtZTogXCJjb250YWluZXJcIlxuXHRcdGZvcmNlMmQ6IHRydWVcblxuXHQjIEFuY2hvciBvdXIgY29udGVudFxuXHRjb250YWluZXIuc2NyZWVuRnJhbWUgPVxuXHRcdHg6IDBcblx0XHR5OiAwXG5cdFx0c2l6ZTogU2NyZWVuLnNpemVcblxuXHRjb250YWluZXIuYWRkQ2hpbGQobGF5ZXIpXG5cblx0IyBNYWtlIG91ciBpbnZpc2libGUgbGF5ZXIsIHZpc2libGVcblx0aWYgb3BlbkZyb20/XG5cdFx0bGF5ZXIudmlzaWJsZSA9IHRydWVcblxuXHRnb1RvWCAgICA9IGlmIG9wZW5Gcm9tPyB0aGVuIG1pZFggLSBtYXNrU2l6ZSAvIDIgZWxzZSBtaWRYXG5cdGdvVG9ZICAgID0gaWYgb3BlbkZyb20/IHRoZW4gbWlkWSAtIG1hc2tTaXplIC8gMiBlbHNlIG1pZFlcblx0Z29Ub1NpemUgPSBpZiBvcGVuRnJvbT8gdGhlbiBtYXNrU2l6ZSBlbHNlIDBcblxuXHQjIEFuaW1hdGUgdGhlIG1hc2tcblx0bWFzay5hbmltYXRlXG5cdFx0eDogZ29Ub1hcblx0XHR5OiBnb1RvWVxuXHRcdHNpemU6IGdvVG9TaXplXG5cdFx0b3B0aW9uczpcblx0XHRcdHRpbWU6IGV4cG9ydHMuZGVmYXVsdHMuc2hvd0FuaW1hdGlvbi50aW1lXG5cdFx0XHRjdXJ2ZTogZXhwb3J0cy5kZWZhdWx0cy5zaG93QW5pbWF0aW9uLmN1cnZlXG5cblx0Y29udGFpbmVyLmFuaW1hdGVcblx0XHR4OiAtZ29Ub1hcblx0XHR5OiAtZ29Ub1lcblx0XHRvcHRpb25zOlxuXHRcdFx0dGltZTogZXhwb3J0cy5kZWZhdWx0cy5zaG93QW5pbWF0aW9uLnRpbWVcblx0XHRcdGN1cnZlOiBleHBvcnRzLmRlZmF1bHRzLnNob3dBbmltYXRpb24uY3VydmVcblxuXHQjIERlc3Ryb3kgdGhlIG1hc2tcblx0bWFzay5vbkFuaW1hdGlvbkVuZCAtPlxuXHRcdGlmIGNsb3NlVG8/XG5cdFx0XHRsYXllci52aXNpYmxlID0gZmFsc2Vcblx0XHRjb250YWluZXIucmVtb3ZlQ2hpbGQobGF5ZXIpXG5cdFx0bWFzay5kZXN0cm95KClcblxuXHRyZXR1cm4gbWFza1xuXG5cbiMjI1xuIyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vICNcbiMgUmV0dXJuIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHR3byBwb2ludHNcbiMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyAjXG4jIyNcbmV4cG9ydHMudHdvUG9pbnRzID0gKHAxeCwgcDF5LCBwMngsIHAyeSkgLT5cblx0ZGlzdCA9IE1hdGguc3FydCggKHAxeCAtIHAyeCkgKiogMiArIChwMXkgLSBwMnkpICoqIDIgKVxuXHRyZXR1cm4gZGlzdFxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFDQUE7QURBQSxJQUFBOztBQUFBLFFBQUEsR0FBVztFQUNWLGFBQUEsRUFDQztJQUFBLElBQUEsRUFBTSxFQUFOO0lBQ0EsS0FBQSxFQUFPLGdDQURQO0dBRlM7OztBQU1YLE9BQU8sQ0FBQyxRQUFSLEdBQW1COzs7QUFHbkI7Ozs7OztBQU1BLE9BQU8sQ0FBQyxNQUFSLEdBQWlCLFNBQUMsRUFBRCxFQUFLLEtBQUw7QUFFaEIsTUFBQTs7SUFBQSxLQUFTOzs7SUFDVCxRQUFTOztFQUVULElBQUcsRUFBQSxLQUFNLE1BQU4sSUFBbUIsS0FBQSxLQUFTLE1BQS9CO0lBQ0MsS0FBQSxDQUFNLDhCQUFOO0FBQ0EsV0FBTyxNQUZSOztFQUlBLE1BQUEsR0FBYSxJQUFBLEtBQUEsQ0FDWjtJQUFBLFlBQUEsRUFBYyxLQUFkO0lBQ0EsS0FBQSxFQUFPLENBRFA7SUFFQSxPQUFBLEVBQVMsRUFGVDtJQUdBLFVBQUEsRUFBWSxLQUhaO0lBSUEsZUFBQSxFQUFvQixLQUFLLENBQUMsZUFBZSxDQUFDLEtBQXRCLEtBQWlDLE1BQXBDLEdBQWdELEtBQUssQ0FBQyxlQUF0RCxHQUEyRSxzQkFKNUY7SUFLQSxVQUFBLEVBQVksR0FMWjtJQU1BLElBQUEsRUFB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
