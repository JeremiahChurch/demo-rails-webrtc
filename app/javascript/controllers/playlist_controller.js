import { Controller } from 'stimulus';
export default class extends Controller {
  nextSong = null
  static targets = ["results"]

  connect() {
    console.log("hello from playlist controller")
    this.element[this.identifier] = this // reference the stim controller https://leastbad.com/stimulus-power-move
    this.getPlaylist()
  }

  getPlaylist() {
    fetch('playlists', {
      headers: {accept: 'application/json'}
    }).then((response) => response.json())
      .then(data => {
        var resultHTML = "";
        var resultArray = Object.values(data)
        resultArray.forEach(result => {
          resultHTML += this.resultTemplate(result)
        });
        if (resultHTML === '') {
          resultHTML = 'No videos on playlist - please add more by searching and adding'
        }
        this.resultsTarget.innerHTML = resultHTML;
        if (data[0]) {
          this.nextSong = data[0]
        }
      });
  }

  remove(event) {
    fetch(`playlists/${event.target.dataset.id}`, {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        'X-CSRF-Token': getMetaValue('csrf-token'),
        'content-type': 'application/json',
        accept: 'application/json',
      },
    }).then(() => {
      this.getPlaylist()
    })
  }

  removeID(id) {
    fetch(`playlists/${id}`, {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        'X-CSRF-Token': getMetaValue('csrf-token'),
        'content-type': 'application/json',
        accept: 'application/json',
      },
    }).then(() => {
      this.getPlaylist()
    })
  }

  play() {
    console.log('play')
    //console.log(player)
    player.playVideo()
  }

  pause() {
    console.log('pause')
    player.pauseVideo()
  }

  next() {
    if (this.nextSong && player) {
      console.log(this.nextSong)
      player.loadVideoById(this.nextSong['video_id'])
      player.playVideo()
      this.removeID(this.nextSong['id'])
    } else{
      console.log('no next song, no next')
    }
  }

  resultTemplate(result) {
    return `<div>
    <img src="${result.thumbnail_url}" class='d-inline-block' width="80">${result.title} <small> - ${result.user_name} ${result.runtime}</small>
    <button data-action="playlist#remove" data-id="${result.id}" data-disable-with="Working">Remove</button>
    </div>`
  }
}
function getMetaValue(name) {
  const element = document.head.querySelector(`meta[name="${name}"]`)
  return element.getAttribute('content')
}
