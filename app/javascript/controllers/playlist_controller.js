import { Controller } from 'stimulus';
export default class extends Controller {
  player
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

  play() {
    console.log('play')
    //console.log(player)

    player.playVideo()
    // if(!this.videoActive()) {
    //   this.youtubeTarget.removeClass('d-none')
    //   this.localVideoTarget.addClass('d-none')
    //  // this.youtubeTarget.src = `http://www.youtube.com/embed/${}?enablejsapi=1&autoplay=1`
    // }
  }

  pause() {
    console.log('pause')
    player.pauseVideo()
  }

  videoActive() {
    !this.youtubeTarget.hasClass('d-none')
  }

  resultTemplate(result) {
    return `<div>
    <img src="${result.thumbnail_url}" class='d-inline-block'><h4>${result.title} <small> - ${result.user_name} ${result.runtime}</small></h4>
    <button data-action="playlist#remove" data-id="${result.id}" data-disable-with="Working">Remove</button>
    </div>`
  }
}
function getMetaValue(name) {
  const element = document.head.querySelector(`meta[name="${name}"]`)
  return element.getAttribute('content')
}
