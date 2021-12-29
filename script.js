//js function in web/script.js file

function disableChromeCast(timerId, message) {
	    console.log("scanning for video element..");
        var player = document.getElementsByTagName('video')[0];
        if (player != null) {
          player.disableRemotePlayback = true;
          clearInterval(timerId);
          console.log(message);
        }
}

function disableChromeCastIcon(message) {
    // scan for video element and repeat with the interval of 0.1 seconds
    let timerId = setInterval(() => disableChromeCast(timerId, message), 100);
}