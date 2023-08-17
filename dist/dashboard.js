let playingStatus = 'playing';

const playOrPause = () => {
    if (playingStatus === 'playing') {
        playingStatus = 'paused';
        document.getElementById('pause').setAttribute('hidden', '');
        document.getElementById('play').removeAttribute('hidden');
    } else {
        playingStatus = 'playing';
        document.getElementById('play').setAttribute('hidden', '');
        document.getElementById('pause').removeAttribute('hidden');
    }
};

const seconds = Date.now();
const total = 240000;

const updateProgress = () => {
    const progress = document.getElementById('progress');
    progress.setAttribute('value', (Date.now() - seconds) / total);
    requestAnimationFrame(updateProgress);
};
requestAnimationFrame(updateProgress);

const videoList = [
    {
        title: '科學超電磁砲Ｓ 第08話【ITEM】| Muse木棉花 動畫',
        url: 'https://www.youtube.com/watch?v=Buicum7pgDk',
    },
    {
        title: '科學超電磁砲Ｓ 第08話【ITEM】| Muse木棉花 動畫',
        url: 'https://www.youtube.com/watch?v=Buicum7pgDk',
    },
    {
        title: '科學超電磁砲Ｓ 第08話【ITEM】| Muse木棉花 動畫',
        url: 'https://www.youtube.com/watch?v=Buicum7pgDk',
    },
    {
        title: '科學超電磁砲Ｓ 第08話【ITEM】| Muse木棉花 動畫',
        url: 'https://www.youtube.com/watch?v=Buicum7pgDk',
    },
    {
        title: '科學超電磁砲Ｓ 第08話【ITEM】| Muse木棉花 動畫',
        url: 'https://www.youtube.com/watch?v=Buicum7pgDk',
    },
    {
        title: '科學超電磁砲Ｓ 第08話【ITEM】| Muse木棉花 動畫',
        url: 'https://www.youtube.com/watch?v=Buicum7pgDk',
    },
    {
        title: '科學超電磁砲Ｓ 第08話【ITEM】| Muse木棉花 動畫',
        url: 'https://www.youtube.com/watch?v=Buicum7pgDk',
    },
    {
        title: '科學超電磁砲Ｓ 第08話【ITEM】| Muse木棉花 動畫',
        url: 'https://www.youtube.com/watch?v=Buicum7pgDk',
    },
    {
        title: '科學超電磁砲Ｓ 第08話【ITEM】| Muse木棉花 動畫',
        url: 'https://www.youtube.com/watch?v=Buicum7pgDk',
    },
    {
        title: '科學超電磁砲Ｓ 第08話【ITEM】| Muse木棉花 動畫',
        url: 'https://www.youtube.com/watch?v=Buicum7pgDk',
    },
];
const list = document.getElementById('list');
videoList.forEach((video, index) => {
    const item = document.createElement('div');
    item.classList.add('item');
    item.innerHTML = `<a>${index + 1}</a><div><a href="${video.url}" target="_blank">${video.title}</a></div><button>❌</button>`;
    list.appendChild(item);
});
