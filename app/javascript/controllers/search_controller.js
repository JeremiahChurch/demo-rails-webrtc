import { Controller } from 'stimulus';
export default class extends Controller {
  static targets = ["query", "results"]

  connect() {
    console.log("hello from search controller")
  }

  submit() {
    const value = this.queryTarget.value
    fetch(`video_search?q=${value}`, {
      headers: {accept: 'application/json'}
    }).then((response) => response.json())
      .then(data => {
        var resultHTML = "";
        var resultArray = Object.values(data)
        resultArray.forEach(result => {
          resultHTML += this.resultTemplate(result)
        });
        this.resultsTarget.innerHTML = resultHTML;
      });
  }

  addToList(event) {
    console.log(event.target.dataset.id)
    const d = event.target.dataset

    const data = {playlist: {video_id: d.id, title: d.title, user_name: getCookie('name'), runtime: d.runtime, thumbnail_url: d.thumbnail_url }}

    fetch('playlists', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'X-CSRF-Token': getMetaValue('csrf-token'),
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(data),
    }).then(() => {
      this.clearResults()
      document.querySelector('#playlist').playlist.getPlaylist()
    })
  }

  clearResults() {
    this.queryTarget.value = ''
    this.resultsTarget.innerHTML = ''
  }

  resultTemplate(result) {
    return `<div>
    <img src="${result.thumbnail_url}" class='d-inline-block' width="80">${result.title} <small> - ${result.channel_title} ${result.published_at}</small>
    <button data-action="search#addToList" 
            data-id="${result.id}" 
            data-title="${result.title}"
            data-runtime="${result.runtime}"
            data-thumbnail_url="${result.thumbnail_url}"
            >Add to List</button>
    </div>`
  }
}

function getMetaValue(name) {
  const element = document.head.querySelector(`meta[name="${name}"]`)
  return element.getAttribute('content')
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
