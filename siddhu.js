document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const progressBar = document.getElementById('progress-bar');
    const songItems = document.querySelectorAll('.tumse');

    let currentSongIndex = 0;
    let isPlaying = false;

    // Function to load and play the selected song
    function loadSong(songIndex) {
        const songItem = songItems[songIndex];
        const songSrc = songItem.querySelector('img').getAttribute('src').replace('.jpg', '.mp3');
        audioPlayer.src = songSrc;
        audioPlayer.play();
        isPlaying = true;
        playPauseBtn.src = "imgs/pause-solid.svg"; // Change to pause icon
    }

    // Event listener for song items
    songItems.forEach((songItem, index) => {
        songItem.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
        });
    });

    // Event listener for play/pause button
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            audioPlayer.pause();
            playPauseBtn.src = "imgs/play-solid.svg"; // Change to play icon
        } else {
            audioPlayer.play();
            playPauseBtn.src = "imgs/pause-solid.svg"; // Change to pause icon
        }
        isPlaying = !isPlaying;
    });

    // Update progress bar as the song plays
    audioPlayer.addEventListener('timeupdate', () => {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = progress;
    });

    // Seek functionality when progress bar is clicked
    progressBar.addEventListener('input', () => {
        const seekTime = (progressBar.value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = seekTime;
    });

    // Automatically play the next song when the current one ends
    audioPlayer.addEventListener('ended', () => {
        currentSongIndex = (currentSongIndex + 1) % songItems.length;
        loadSong(currentSongIndex);
    });
});

