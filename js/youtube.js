// youtube.js
$(document).ready(function() {
    const apiKey = 'AIzaSyA7lctSsPY07B9KFKPMJs5GQnidlYbmKT4';
    const channelId = 'UCDY88Bf1Nvb8VUSQrpUGk5Q';

    function fetchVideos() {
        $.get(`https://www.googleapis.com/youtube/v3/search`, {
            key: apiKey,
            channelId: channelId,
            part: 'snippet',
            order: 'date',
            maxResults: 10
        })
        .done(function(data) {
            displayVideos(data.items);
        })
        .fail(function(err) {
            console.error('Erreur lors de la récupération des vidéos:', err);
        });
    }

    function displayVideos(videos) {
        const container = $('#video-container');
        container.empty();

        videos.forEach(video => {
            const videoId = video.id.videoId;
            const title = video.snippet.title;
            const thumbnail = video.snippet.thumbnails.medium.url;

            const videoElement = `
                <div class="video-card">
                    <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                        <img src="${thumbnail}" alt="${title}">
                        <h3>${title}</h3>
                    </a>
                </div>
            `;

            container.append(videoElement);
        });
    }

    fetchVideos();
});
