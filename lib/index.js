"use strict";

exports.__esModule = true;
exports["default"] = HoverVideoPlayer;

var _react = _interopRequireDefault(require("react"));

var _utils = require("./utils");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * @component HoverVideoPlayer
 *
 * @param {(string|string[]|VideoSource|VideoSource[])}  videoSrc - Source(s) to use for the video player. Accepts 3 different formats:
 *                                                                   - **String**: the URL string to use as the video player's src
 *                                                                   - **Object**: an object with attributes:
 *                                                                     - src: The src URL string to use for a video player source
 *                                                                     - type: The media type of the video source, ie 'video/mp4'
 *                                                                   - **Array**: if you would like to provide multiple sources, you can provide an array of URL strings and/or objects with the shape described above
 * @param {(VideoCaptionsTrack|VideoCaptionsTrack[])} [videoCaptions] - Captions track(s) to use for the video player for accessibility. Accepts 2 formats:
 *                                                                                      - **Object**: an object with attributes:
 *                                                                                        - src: The src URL string for the captions track file
 *                                                                                        - srcLang: The language code for the language that these captions are in (ie, 'en', 'es', 'fr')
 *                                                                                        - label: The title of the captions track
 *                                                                                        - default: Whether this track should be used by default if the user's preferences don't match an available srcLang
 *                                                                                      - **Array**: if you would like to provide multiple caption tracks, you can provide an array of objects with the shape described above
 * @param {boolean} [focused=false] - Offers a prop interface for forcing the video to start/stop without DOM events
 *                                      When set to true, the video will begin playing and any events that would normally stop it will be ignored
 * @param {boolean} [disableDefaultEventHandling] - Whether the video player's default mouse and touch event handling should be disabled in favor of a fully custom solution using the `focused` prop
 * @param {node}    [hoverTargetRef] - Ref to a custom element that should be used as the target for hover events to start/stop the video
 *                                      By default will just use the container div wrapping the player
 * @param {node}    [pausedOverlay] - Contents to render over the video while it's not playing
 * @param {node}    [loadingOverlay] - Contents to render over the video while it's loading
 * @param {number}  [loadingStateTimeout=200] - Duration in ms to wait after attempting to start the video before showing the loading overlay
 * @param {number}  [overlayTransitionDuration=400] - The transition duration in ms for how long it should take for the overlay to fade in/out
 * @param {boolean} [restartOnPaused=false] - Whether the video should reset to the beginning every time it stops playing after the user mouses out of the player
 * @param {boolean} [unloadVideoOnPaused=false] - Whether we should unload the video's sources when it is not playing in order to free up memory and bandwidth
 *                                                  This can be useful in scenarios where you may have a large number of relatively large video files on a single page;
 *                                                  particularly due to a known bug in Google Chrome, if too many videos are loading in the background at the same time,
 *                                                  it starts to gum up the works so that nothing loads properly and performance can degrade significantly.
 * @param {boolean} [muted=true] - Whether the video player should be muted
 * @param {boolean} [loop=true] - Whether the video player should loop when it reaches the end
 * @param {boolean} [defaultControls=false] - whether to show standard video controls on screen
 * @param {boolean} [playsInline=true] - whether to play inline or full-screen
 * @param {string}  [preload] - Sets how much information the video element should preload before being played. Accepts one of the following values:
 *                              - **"none"**: Nothing should be preloaded before the video is played
 *                              - **"metadata"**: Only the video's metadata (ie length, dimensions) should be preloaded
 *                              - **"auto"**: The whole video file should be preloaded even if it won't be played
 * @param {string}  [crossOrigin='anonymous'] - Sets how the video element should handle CORS requests. Accepts one of the following values:
 *                                              - **"anonymous"**: CORS requests will have the credentials flag set to 'same-origin'
 *                                              - **"use-credentials"**: CORS requests for this element will have the credentials flag set to 'include'
 * @param {string}  [className] - Optional className to apply custom styling to the container element
 * @param {object}  [style] - Style object to apply custom inlined styles to the hover player container
 * @param {string}  [pausedOverlayWrapperClassName] - Optional className to apply custom styling to the overlay contents' wrapper
 * @param {object}  [pausedOverlayWrapperStyle] - Style object to apply custom inlined styles to the paused overlay wrapper
 * @param {string}  [loadingOverlayWrapperClassName] - Optional className to apply custom styling to the loading state overlay contents' wrapper
 * @param {object}  [loadingOverlayWrapperStyle] - Style object to apply custom inlined styles to the loading overlay wrapper
 * @param {string}  [videoClassName] - Optional className to apply custom styling to the video element
 * @param {object}  [videoStyle] - Style object to apply custom inlined styles to the video element
 * @param {string}  [sizingMode='video'] - Describes sizing mode to use to determine how the player's contents should be styled. Accepts 4 possible values:
 *                                         - **"video"**: Everything should be sized based on the video element's dimensions - the overlays will expand to cover the video
 *                                         - **"overlay"**: Everything should be sized based on the paused overlay's dimensions - the video element will expand to fit inside those dimensions
 *                                         - **"container"**: Everything should be sized based on the player's outer container div - the overlays and video will all expand to cover the container
 *                                         - **"manual"**: Manual mode does not apply any special styling and allows the developer to exercise full control over how everything should be sized - this means you will likely need to provide your own custom styling for both the paused overlay and the video element
 *
 * @license MIT
 */
function HoverVideoPlayer(_ref) {
  var videoSrc = _ref.videoSrc,
      _ref$videoCaptions = _ref.videoCaptions,
      videoCaptions = _ref$videoCaptions === void 0 ? null : _ref$videoCaptions,
      _ref$focused = _ref.focused,
      focused = _ref$focused === void 0 ? false : _ref$focused,
      _ref$disableDefaultEv = _ref.disableDefaultEventHandling,
      disableDefaultEventHandling = _ref$disableDefaultEv === void 0 ? false : _ref$disableDefaultEv,
      _ref$hoverTargetRef = _ref.hoverTargetRef,
      hoverTargetRef = _ref$hoverTargetRef === void 0 ? null : _ref$hoverTargetRef,
      _ref$pausedOverlay = _ref.pausedOverlay,
      pausedOverlay = _ref$pausedOverlay === void 0 ? null : _ref$pausedOverlay,
      _ref$loadingOverlay = _ref.loadingOverlay,
      loadingOverlay = _ref$loadingOverlay === void 0 ? null : _ref$loadingOverlay,
      _ref$loadingStateTime = _ref.loadingStateTimeout,
      loadingStateTimeout = _ref$loadingStateTime === void 0 ? 200 : _ref$loadingStateTime,
      _ref$overlayTransitio = _ref.overlayTransitionDuration,
      overlayTransitionDuration = _ref$overlayTransitio === void 0 ? 400 : _ref$overlayTransitio,
      _ref$restartOnPaused = _ref.restartOnPaused,
      restartOnPaused = _ref$restartOnPaused === void 0 ? false : _ref$restartOnPaused,
      _ref$unloadVideoOnPau = _ref.unloadVideoOnPaused,
      unloadVideoOnPaused = _ref$unloadVideoOnPau === void 0 ? false : _ref$unloadVideoOnPau,
      _ref$muted = _ref.muted,
      muted = _ref$muted === void 0 ? true : _ref$muted,
      _ref$loop = _ref.loop,
      loop = _ref$loop === void 0 ? true : _ref$loop,
      _ref$preload = _ref.preload,
      preload = _ref$preload === void 0 ? null : _ref$preload,
      _ref$defaultControls = _ref.defaultControls,
      defaultControls = _ref$defaultControls === void 0 ? false : _ref$defaultControls,
      _ref$playsInline = _ref.playsInline,
      playsInline = _ref$playsInline === void 0 ? true : _ref$playsInline,
      _ref$crossOrigin = _ref.crossOrigin,
      crossOrigin = _ref$crossOrigin === void 0 ? 'anonymous' : _ref$crossOrigin,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? null : _ref$style,
      _ref$pausedOverlayWra = _ref.pausedOverlayWrapperClassName,
      pausedOverlayWrapperClassName = _ref$pausedOverlayWra === void 0 ? '' : _ref$pausedOverlayWra,
      _ref$pausedOverlayWra2 = _ref.pausedOverlayWrapperStyle,
      pausedOverlayWrapperStyle = _ref$pausedOverlayWra2 === void 0 ? null : _ref$pausedOverlayWra2,
      _ref$loadingOverlayWr = _ref.loadingOverlayWrapperClassName,
      loadingOverlayWrapperClassName = _ref$loadingOverlayWr === void 0 ? '' : _ref$loadingOverlayWr,
      _ref$loadingOverlayWr2 = _ref.loadingOverlayWrapperStyle,
      loadingOverlayWrapperStyle = _ref$loadingOverlayWr2 === void 0 ? null : _ref$loadingOverlayWr2,
      _ref$videoClassName = _ref.videoClassName,
      videoClassName = _ref$videoClassName === void 0 ? '' : _ref$videoClassName,
      _ref$videoStyle = _ref.videoStyle,
      videoStyle = _ref$videoStyle === void 0 ? null : _ref$videoStyle,
      _ref$sizingMode = _ref.sizingMode,
      sizingMode = _ref$sizingMode === void 0 ? _constants.SIZING_MODES.video : _ref$sizingMode;

  // Keep track of state to determine how the paused and loading overlays should be displayed
  var _React$useState = _react["default"].useState(_constants.HOVER_PLAYER_STATE.paused),
      overlayState = _React$useState[0],
      setOverlayState = _React$useState[1]; // Keep track of whether the video is unloaded, meaning its sources should be removed from
  // the DOM and unloaded for optimization purposes
  // This is only relevant if `unloadVideoOnPaused` is set to true


  var _React$useState2 = _react["default"].useState(unloadVideoOnPaused),
      isVideoUnloaded = _React$useState2[0],
      setIsVideoUnloaded = _React$useState2[1]; // Keep refs to previous state values for comparison in effect hooks


  var previousIsVideoUnloadedRef = _react["default"].useRef(isVideoUnloaded);

  var previousFocusedRef = _react["default"].useRef(false); // Keep a ref for all state variables related to the video's state
  // which need to be managed asynchronously as it attempts to play/pause


  var mutableVideoState = _react["default"].useRef(null);

  if (mutableVideoState.current === null) {
    // Set initial values for our video state
    mutableVideoState.current = {
      isPlayAttemptInProgress: false,
      isPlayAttemptCancelled: false,
      isPlayerUnmounted: false,
      // Keep refs for timeouts so we can keep track of and cancel them
      pauseTimeout: null,
      loadingStateTimeout: null,
      // Keep track of the video time that we should start from when the video is played again
      // This is particularly useful so we can restore our previous place in the video even if
      // we are unloading it every time it gets paused
      videoTimeToRestore: 0
    };
  } // Element refs


  var containerRef = _react["default"].useRef(null);

  var videoRef = _react["default"].useRef(null);
  /**
   * @function  pauseVideo
   *
   * Pauses the video and unloads it if necessary
   */


  var pauseVideo = _react["default"].useCallback(function () {
    var videoElement = videoRef.current;
    videoElement.pause();

    if (restartOnPaused) {
      // If we should restart the video, reset its time to the beginning next time we play
      videoElement.currentTime = 0;
    } // Hang onto the time that the video is currently at so we can restore it when we try to play
    // again even if the video was unloaded


    mutableVideoState.current.videoTimeToRestore = videoElement.currentTime;

    if (unloadVideoOnPaused) {
      // If necessary, unload the video now that it's paused
      setIsVideoUnloaded(true);
    }
  }, [restartOnPaused, unloadVideoOnPaused]);
  /**
   * @function playVideo
   *
   * Attempts to play the video if it is not already playing
   */


  var playVideo = _react["default"].useCallback(function () {
    // Clear any timeouts that may have been in progress
    clearTimeout(mutableVideoState.current.pauseTimeout);
    clearTimeout(mutableVideoState.current.loadingStateTimeout);
    var videoElement = videoRef.current; // Make sure our play attempt is no longer cancelled since the user is hovering on it again

    mutableVideoState.current.isPlayAttemptCancelled = false; // If the video is already playing, just make sure we keep the overlays hidden

    if ((0, _utils.getVideoState)(videoElement) === _constants.VIDEO_STATE.playing) {
      setOverlayState(_constants.HOVER_PLAYER_STATE.playing);
      return;
    }

    if (loadingOverlay) {
      // If we have a loading overlay, start a timeout to fade it in if it takes too long
      // for playback to start
      mutableVideoState.current.loadingStateTimeout = setTimeout(function () {
        // If the video is still loading when this timeout completes, transition the
        // player to show a loading state
        setOverlayState(_constants.HOVER_PLAYER_STATE.loading);
      }, loadingStateTimeout);
    } // If a play attempt is already in progress, don't start a new one


    if (mutableVideoState.current.isPlayAttemptInProgress) return; // We are now attempting to play the video

    mutableVideoState.current.isPlayAttemptInProgress = true; // Ensure we're at the correct video time to start playing from

    videoElement.currentTime = mutableVideoState.current.videoTimeToRestore; // Start playing the video and hang onto the play promise it returns

    var playPromise = videoElement.play();

    if (!playPromise || !playPromise.then) {
      // If videoElement.play() didn't return a promise, we'll manually create one
      // ourselves which mimics the same behavior
      playPromise = new Promise(function (resolve, reject) {
        // Declaring onVideoPlaybackFailed up here so we can refer to it and remove its event listener
        // if the video successfully starts playing
        var _onVideoPlaybackFailed; // Set up event listener to resolve the promise when the video player starts playing


        var onVideoPlaybackStarted = function onVideoPlaybackStarted() {
          // Remove the event listeners we added as cleanup now that the play attempt has succeeded
          videoElement.removeEventListener('playing', onVideoPlaybackStarted);
          videoElement.removeEventListener('error', _onVideoPlaybackFailed); // Resolve because we successfully started playing!

          resolve();
        };

        videoElement.addEventListener('playing', onVideoPlaybackStarted); // Set up event listener to reject the promise when the video player encounters an error

        _onVideoPlaybackFailed = function onVideoPlaybackFailed(event) {
          // Remove the event listeners we added as cleanup now that the play attempt has failed
          videoElement.removeEventListener('error', _onVideoPlaybackFailed);
          videoElement.removeEventListener('playing', onVideoPlaybackStarted); // Reject with the error that was thrown

          reject(event.error);
        };

        videoElement.addEventListener('error', _onVideoPlaybackFailed);
      });
    }

    playPromise.then(function () {
      // If the player was unmounted before the play promise could resolve, don't do anything
      if (mutableVideoState.current.isPlayerUnmounted) return;

      if (mutableVideoState.current.isPlayAttemptCancelled) {
        // If the play attempt was cancelled, immediately pause the video
        pauseVideo();
      } else {
        // If the play attempt wasn't cancelled, hide the overlays to reveal the video now that it's playing
        setOverlayState(_constants.HOVER_PLAYER_STATE.playing);
      }
    })["catch"](function (error) {
      console.error("HoverVideoPlayer playback failed for src " + videoElement.currentSrc + ":", error);

      if (!mutableVideoState.current.isPlayerUnmounted) {
        // If the player is still mounted, revert to a paused state
        pauseVideo();
      }
    })["finally"](function () {
      // The play attempt is now complete
      mutableVideoState.current.isPlayAttemptInProgress = false;
      mutableVideoState.current.isPlayAttemptCancelled = false;
      clearTimeout(mutableVideoState.current.loadingStateTimeout);
    });
  }, [loadingOverlay, loadingStateTimeout, pauseVideo]);
  /**
   * @function  onHoverStart
   *
   * Starts the video when the user mouses hovers on the player
   */


  var onHoverStart = _react["default"].useCallback(function () {
    if (isVideoUnloaded) {
      // If the video is currently unloaded, we need to make sure we update our state
      // to restore the video's sources before we attempt to play it
      setIsVideoUnloaded(false);
    } else {
      playVideo();
    }
  }, [isVideoUnloaded, playVideo]);
  /**
   * @function  onHoverEnd
   *
   * Stops the video and fades the paused overlay in when the user stops hovering on the player
   */


  var onHoverEnd = _react["default"].useCallback(function () {
    // Clear any timeouts that may have been in progress
    clearTimeout(mutableVideoState.current.pauseTimeout);
    clearTimeout(mutableVideoState.current.loadingStateTimeout);
    var videoElement = videoRef.current; // If the focused override prop is active, ignore any other events attempting to stop the video
    // Also don't do anything if the video is already paused

    if (focused || (0, _utils.getVideoState)(videoElement) === _constants.VIDEO_STATE.paused) return; // Start fading the paused overlay back in

    setOverlayState(_constants.HOVER_PLAYER_STATE.paused);

    if (mutableVideoState.current.isPlayAttemptInProgress) {
      // If we have a play attempt in progress, mark that the play attempt should be cancelled
      // so that as soon as the promise resolves, the video should be paused
      mutableVideoState.current.isPlayAttemptCancelled = true;
    } else if (pausedOverlay) {
      // If we have a paused overlay, set a timeout with a duration of the overlay's fade
      // transition since we want to keep the video playing until the overlay has fully
      // faded in and hidden it.
      mutableVideoState.current.pauseTimeout = setTimeout(function () {
        return pauseVideo();
      }, overlayTransitionDuration);
    } else {
      // If a play attempt isn't in progress and there is no paused overlay, just pause
      pauseVideo();
    }
  }, [focused, overlayTransitionDuration, pauseVideo, pausedOverlay]);
  /* ~~~~ EFFECTS ~~~~ */


  _react["default"].useEffect(function () {
    // If the focused prop hasn't changed, don't do anything
    if (previousFocusedRef.current === focused) return; // Use effect to start/stop the video when focused override prop changes

    if (focused) {
      onHoverStart();
    } else {
      onHoverEnd();
    }

    previousFocusedRef.current = focused;
  }, [focused, onHoverEnd, onHoverStart]);

  _react["default"].useEffect(function () {
    // If default event handling is disabled, we shouldn't check for touch events outside of the player
    if (disableDefaultEventHandling) return undefined;
    var hoverTargetElement = // If a ref to a custom hover target was provided, we'll use that as our target element
    hoverTargetRef ? hoverTargetRef.current : // If no custom target was provided, default to the player's container div
    containerRef.current; // Add all relevant event listeners to the target element to make
    // it start and stop correctly

    hoverTargetElement.addEventListener('mouseenter', onHoverStart);
    hoverTargetElement.addEventListener('mouseleave', onHoverEnd);
    hoverTargetElement.addEventListener('focus', onHoverStart);
    hoverTargetElement.addEventListener('blur', onHoverEnd);
    hoverTargetElement.addEventListener('touchstart', onHoverStart); // Event listener pauses the video when the user touches somewhere outside of the player

    function onWindowTouchStart(event) {
      if (!hoverTargetElement.contains(event.target)) {
        onHoverEnd();
      }
    }

    window.addEventListener('touchstart', onWindowTouchStart); // Remove all event listeners on cleanup

    return function () {
      hoverTargetElement.removeEventListener('mouseenter', onHoverStart);
      hoverTargetElement.removeEventListener('mouseleave', onHoverEnd);
      hoverTargetElement.removeEventListener('focus', onHoverStart);
      hoverTargetElement.removeEventListener('blur', onHoverEnd);
      hoverTargetElement.removeEventListener('touchstart', onHoverStart);
      window.removeEventListener('touchstart', onWindowTouchStart);
    };
  }, [disableDefaultEventHandling, hoverTargetRef, onHoverEnd, onHoverStart]);

  _react["default"].useEffect(function () {
    // Manually setting the `muted` attribute on the video element via an effect in order
    // to avoid a know React issue with the `muted` prop not applying correctly on initial render
    // https://github.com/facebook/react/issues/10389
    videoRef.current.muted = muted;
  }, [muted]);

  _react["default"].useEffect(function () {
    // Don't do anything if the video's unloaded state hasn't changed
    if (previousIsVideoUnloadedRef.current === isVideoUnloaded) return; // Since the video's sources have changed, perform a manual load to update
    // or unload the video's current source

    videoRef.current.load();

    if (!isVideoUnloaded) {
      // If the video was just changed from being unloaded, that means we're trying to play,
      // so let's kick off a play attempt now that the video's sources are restored
      playVideo();
    }

    previousIsVideoUnloadedRef.current = isVideoUnloaded;
  }, [isVideoUnloaded, onHoverStart, playVideo]);

  _react["default"].useEffect(function () {
    var videoElement = videoRef.current; // Ensure casting and PiP controls aren't shown on the video

    videoElement.disableRemotePlayback = true;
    videoElement.disablePictureInPicture = true;
    return function () {
      // Clear any outstanding timeouts when the component unmounts to prevent memory leaks
      clearTimeout(mutableVideoState.current.pauseTimeout);
      clearTimeout(mutableVideoState.current.loadingStateTimeout); // Mark that the player is unmounted so that we won't try to update the component state
      // if the play promise resolves afterward

      mutableVideoState.current.isPlayerUnmounted = true;
    };
  }, []);
  /* ~~~~ END EFFECTS ~~~~ */


  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-testid": "hover-video-player-container",
    ref: containerRef,
    className: className,
    style: _extends({
      position: 'relative'
    }, style)
  }, pausedOverlay && /*#__PURE__*/_react["default"].createElement("div", {
    style: _extends({}, _constants.pausedOverlayWrapperSizingStyles[sizingMode], {
      zIndex: 1,
      opacity: overlayState !== _constants.HOVER_PLAYER_STATE.playing ? 1 : 0,
      transition: "opacity " + overlayTransitionDuration + "ms"
    }, pausedOverlayWrapperStyle),
    className: pausedOverlayWrapperClassName,
    "data-testid": "paused-overlay-wrapper"
  }, pausedOverlay), loadingOverlay && /*#__PURE__*/_react["default"].createElement("div", {
    style: _extends({}, _constants.expandToFillContainerStyle, {
      zIndex: 2,
      opacity: overlayState === _constants.HOVER_PLAYER_STATE.loading ? 1 : 0,
      transition: "opacity " + overlayTransitionDuration + "ms"
    }, loadingOverlayWrapperStyle),
    className: loadingOverlayWrapperClassName,
    "data-testid": "loading-overlay-wrapper"
  }, loadingOverlay), /*#__PURE__*/_react["default"].createElement("video", {
    loop: loop,
    playsInline: playsInline,
    controls: defaultControls,
    preload: preload,
    crossOrigin: crossOrigin,
    ref: videoRef,
    style: _extends({}, _constants.videoSizingStyles[sizingMode], {
      objectFit: 'cover'
    }, videoStyle),
    className: videoClassName,
    "data-testid": "video-element"
  }, !isVideoUnloaded && // If the video is not unloaded, parse the `videoSrc` prop into an array of objects and render them
  // as sources for the video
  (0, _utils.formatVideoSrc)(videoSrc).map(function (_ref2) {
    var src = _ref2.src,
        type = _ref2.type;
    return /*#__PURE__*/_react["default"].createElement("source", {
      key: src,
      src: src,
      type: type
    });
  }), (0, _utils.formatVideoCaptions)(videoCaptions).map(function (_ref3) {
    var src = _ref3.src,
        srcLang = _ref3.srcLang,
        label = _ref3.label,
        isDefault = _ref3["default"];
    return /*#__PURE__*/_react["default"].createElement("track", {
      key: src,
      kind: "captions",
      src: src,
      srcLang: srcLang,
      label: label,
      "default": isDefault
    });
  })));
}

module.exports = exports.default;