import { VIDEO_STATE } from './constants';
/**
 * @function getVideoState
 *
 * Takes a video element and returns its current playing state
 *
 * @param {node} videoElement
 */

export function getVideoState(videoElement) {
  if (videoElement.paused || videoElement.ended) {
    return VIDEO_STATE.paused;
  } // If the video isn't paused but its readyState indicates it isn't loaded enough
  // to play yet, it is loading


  if (videoElement.readyState < 3) {
    return VIDEO_STATE.loading;
  } // If the video isn't paused and its ready state indicates it's loaded enough to play,
  // assume it's playing


  return VIDEO_STATE.playing;
}
/**
 * @typedef   {object}  VideoSource
 * @property  {string}  src - The src URL string to use for a video player source
 * @property  {string}  type - The media type of the video, ie 'video/mp4'
 */

/**
 * @function  formatVideoSrc
 *
 * Takes a videoSrc value and formats it as an array of VideoSource objects which can be used to render
 * <source> elements for the video
 *
 * @param {(string|string[]|VideoSource|VideoSource[])}  videoSrc - Source(s) to use for the video player. Accepts 3 different formats:
 *                                                                   - **String**: the URL string to use as the video player's src
 *                                                                   - **Object**: an object with attributes:
 *                                                                     - src: The src URL string to use for a video player source
 *                                                                     - type: The media type of the video source, ie 'video/mp4'
 *                                                                   - **Array**: if you would like to provide multiple sources, you can provide an array of URL strings and/or objects with the shape described above
 *
 * @returns {VideoSource[]} Array of formatted VideoSource objects which can be used to render <source> elements for the video
 */

export function formatVideoSrc(videoSrc) {
  var formattedVideoSources = [];

  if (videoSrc == null) {
    // A videoSrc value is required in order to make the video player work
    console.error("Error: 'videoSrc' prop is required for HoverVideoPlayer component");
  } else {
    // Make sure we can treat the videoSrc value as an array
    var rawVideoSources = Array.isArray(videoSrc) ? videoSrc : [videoSrc]; // Parse our video source values into an array of VideoSource objects that can be used to render sources for the video

    for (var i = 0, numSources = rawVideoSources.length; i < numSources; i += 1) {
      var source = rawVideoSources[i];

      if (typeof source === 'string') {
        // If the source is a string, it's an src URL so format it into a VideoSource object and add it to the array
        formattedVideoSources.push({
          src: source
        });
      } else if (source && source.src) {
        // If the source is an object with an src, just add it to the array
        formattedVideoSources.push({
          src: source.src,
          type: source.type
        });
      } else {
        // Log an error if one of the videoSrc values is invalid
        console.error("Error: invalid value provided to HoverVideoPlayer prop 'videoSrc':", source);
      }
    }
  }

  return formattedVideoSources;
}
/**
 * @typedef   {object}  VideoCaptionsTrack
 * @property  {string}  src - The src URL string for the captions track file
 * @property  {string}  srcLang - The language code for the language that these captions are in
 * @property  {string}  label - The title of the captions track
 * @property  {boolean} default - Whether this track should be used by default if the user's preferences don't match an available srcLang
 */

/**
 * @function formatVideoCaptions
 *
 * Takes a videoCaptions value and formats it as an array of VideoCaptionsTrack objects which can be used to render
 * <track> elements for the video
 *
 * @param {(string|string[]|VideoCaptionsTrack|VideoCaptionsTrack[])} videoCaptions - Captions track(s) to use for the video player for accessibility. Accepts 3 different formats:
 *                                                                                     - **String**: the URL string to use as the captions track's src
 *                                                                                     - **Object**: an object with attributes:
 *                                                                                       - src: The src URL string for the captions track file
 *                                                                                       - srcLang: The language code for the language that these captions are in (ie, 'en', 'es', 'fr')
 *                                                                                       - label: The title of the captions track
 *                                                                                       - default: Whether this track should be used by default if the user's preferences don't match an available srcLang
 *                                                                                     - **Array**: if you would like to provide multiple caption tracks, you can provide an array of objects with the shape described above
 *
 * @returns {VideoCaptionsTrack[]}  Array of formatted VideoCaptionsTrack objects which can be used to render <track> elements for the video
 */

export function formatVideoCaptions(videoCaptions) {
  var formattedVideoCaptions = []; // If captions were provided, format them for use for the video

  if (videoCaptions != null) {
    // Make sure we can treat the videoCaptions value as an array
    var rawVideoCaptions = Array.isArray(videoCaptions) ? videoCaptions : [videoCaptions]; // Parse our raw video captions values into an array of formatted VideoCaptionsTrack
    // objects that can be used to render caption tracks for the video

    for (var i = 0, numCaptions = rawVideoCaptions.length; i < numCaptions; i += 1) {
      var captions = rawVideoCaptions[i];

      if (captions && captions.src) {
        formattedVideoCaptions.push({
          src: captions.src,
          srcLang: captions.srcLang,
          label: captions.label,
          "default": Boolean(captions["default"])
        });
      } else {
        // Log an error if one of the videoCaptions values is invalid
        console.error("Error: invalid value provided to HoverVideoPlayer prop 'videoCaptions'", captions);
      }
    }
  }

  return formattedVideoCaptions;
}