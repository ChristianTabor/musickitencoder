const XMLHttpRequest = require('xhr2');
const xhr = new XMLHttpRequest();
xhr.withCredentials = true;
const size = 2;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const newSongs = [];
const rankings = [];

async function test() {
    const data = null;
    xhr.addEventListener("readystatechange", function () {
        let result;
        let song;
        let found;
        if (this.readyState === this.DONE) {
            result = JSON.parse(this.responseText);
            for (const i in result) {
                for (const j in result[i]) {
                    if (result[i][j].attributes !== undefined) {
                        song = new Song(result[i][j].attributes.artistName, result[i][j].attributes.name)
                        console.log(song.artist + " " + song.title)
                        if (newSongs.filter(e => e.title === song.title).length <= 0) {
                            newSongs.push(song)
                            found = false;
                            for (const k in rankings) {
                                if (rankings[k].artist === song.artist) {
                                    found = true;
                                    rankings[k].value = rankings[k].value + 1;
                                }
                            }
                            if (!found) {
                                rankings.push(new Rankings(song.artist))
                            }
                        }
                    }
                }
            } 
        }
        for (const u in rankings) {
            console.log(rankings[u].artist + " " + rankings[u].value)
        }
        for (const u in newSongs) {
            console.log(newSongs[u].artist + " " + newSongs[u].title)
        }
        console.log("\n")
    });

    xhr.open("GET", "https://api.music.apple.com/v1/me/recent/played/tracks?limit=2&types=songs");
    xhr.setRequestHeader("Authorization", "Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjVSQ00zTjJQUjQifQ.eyJpYXQiOjE2NDc1MzkyMjYsImV4cCI6MTY2MzA5MTIyNiwiaXNzIjoiUzlCMzlDVVM0MiJ9.TNnL5aE3Krx6UufmlLR0In_JkJAeQAKvCkrVM1hiiH2GZOX9bhkimIjkXe2Ob8nT-bMDF-WBSvI8zYsHho5lcA");
    xhr.setRequestHeader("Music-User-Token", "AgDoKhQG30UgMCK9p2ShlocxDV8rdrFq9P2PUalvSBqWxSPGw5vc+CtcyCWbCnhL+VlXSl8juYkSS7+2rfjv5/SDg3cXcTOTZB3WDsfPw6H0W0UyaUiNILKAhz2U4hhYQMgmZoBSXlUdVvZYFtVNiGS/tEIJCn5zPAwSYHgCImn68tkFlcEa4Z+lEHPR+fRyY9lQ5INU1qJrfscrLoSfannir34GvzUhN3sxi9hMyl/V2JTjqA==");

    xhr.send(data);
    sleep(3000).then(() => {
        test();
    });
}

test();

class Rankings {
    constructor(artist) {
        this.artist = artist;
        this.value = 1;
    }
}

class Song {
    constructor(artist, title) {
        this.artist = artist;
        this.title = title;
    }
}

//https://api.music.apple.com/v1/me/recent/played/tracks?limit=12&types=songs