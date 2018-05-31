// All of this should be encapsulated into a function / class.

// Audio element
var audio;
// WebAudio context for analysis and playback
var audioContext;

var paused = false;

var playButton;
var pauseButton;
var buttonDiv;

function removeAllChildren(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function updateButtonState() {
    removeAllChildren(buttonDiv);
    if (paused) {
        buttonDiv.appendChild(playButton);
    } else {
        buttonDiv.appendChild(pauseButton);
    }
}

function start() {
    audio = document.createElement('audio');
    audio.loop = true;
    audio.addEventListener('canplay', function() {
        if (!audioContext) {
            audioContext = new AudioContext();
            let source = audioContext.createMediaElementSource(audio);
            let analyser = audioContext.createAnalyser();
            let gain = audioContext.createGain();
            source.connect(analyser);
            analyser.connect(gain);
            gain.connect(audioContext.destination);
        }
        if (paused) {
            audio.pause();
        } else {
            audio.play();
        }
    });
    audio.src = '3c33c415862bb7964d256f4749408247da6596f2167dca2c86cc38f83c244aa6.mp3';

    playButton = new Image();
    playButton.src = 'play_black.png';
    pauseButton = new Image();
    pauseButton.src = 'pause_black.png';
    buttonDiv = document.getElementById('button');
    buttonDiv.addEventListener('click', function() {
        if (paused) {
            audio.play();
        } else {
            audio.pause();
        }
        paused = !paused;
        updateButtonState();
    });

    updateButtonState();
}
