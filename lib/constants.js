"use strict";

exports.__esModule = true;
exports.videoSizingStyles = exports.pausedOverlayWrapperSizingStyles = exports.expandToFillContainerStyle = exports.SIZING_MODES = exports.HOVER_PLAYER_STATE = exports.VIDEO_STATE = void 0;

var _pausedOverlayWrapper, _videoSizingStyles;

// Enumerates states that the video can be in
var VIDEO_STATE = {
  paused: 'paused',
  loading: 'loading',
  playing: 'playing'
}; // Enumerates states that the hover player can be in

exports.VIDEO_STATE = VIDEO_STATE;
var HOVER_PLAYER_STATE = {
  paused: 'paused',
  loading: 'loading',
  playing: 'playing'
}; // Enumerates sizing modes which define how the player's contents should be sized relative to each other

exports.HOVER_PLAYER_STATE = HOVER_PLAYER_STATE;
var SIZING_MODES = {
  // Everything should be sized based on the paused overlay's dimensions - the video element will expand to fill that space
  overlay: 'overlay',
  // Everything should be sized based on the video element's dimensions - the overlays will expand to cover the video
  video: 'video',
  // Everything should be sized based on the player's outer container div - the overlays and video will all expand to cover
  // the container
  container: 'container',
  // Manual mode does not apply any special styling and allows the developer to exercise full control
  // over how everything should be sized - this means you will likely need to provide your own custom styling for
  // both the paused overlay and the video element
  manual: 'manual'
}; // CSS styles to make some contents in the player expand to fill the container

exports.SIZING_MODES = SIZING_MODES;
var expandToFillContainerStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}; // Styles to apply to the paused overlay wrapper and video element for different sizing modes

exports.expandToFillContainerStyle = expandToFillContainerStyle;
var pausedOverlayWrapperSizingStyles = (_pausedOverlayWrapper = {}, _pausedOverlayWrapper[SIZING_MODES.overlay] = {
  position: 'relative'
}, _pausedOverlayWrapper[SIZING_MODES.video] = expandToFillContainerStyle, _pausedOverlayWrapper[SIZING_MODES.container] = expandToFillContainerStyle, _pausedOverlayWrapper[SIZING_MODES.manual] = null, _pausedOverlayWrapper);
exports.pausedOverlayWrapperSizingStyles = pausedOverlayWrapperSizingStyles;
var videoSizingStyles = (_videoSizingStyles = {}, _videoSizingStyles[SIZING_MODES.overlay] = expandToFillContainerStyle, _videoSizingStyles[SIZING_MODES.video] = {
  display: 'block',
  width: '100%'
}, _videoSizingStyles[SIZING_MODES.container] = expandToFillContainerStyle, _videoSizingStyles[SIZING_MODES.manual] = null, _videoSizingStyles);
exports.videoSizingStyles = videoSizingStyles;