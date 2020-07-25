import { Controller } from 'stimulus';
export default class extends Controller {
  static targets = ["query", "cocktails"]

  connect() {
    console.log("hello from stimulus")
  }

  submit() {
    const value = this.queryTarget.value
    fetch(`video_search?q=${value}`, {
      headers: {accept: 'application/json'}
    }).then((response) => response.json())
      .then(data => {
        var cocktailHTML = "";
        var cocktailArray = Object.values(data)
        cocktailArray.forEach(cocktail => {
          cocktailHTML += this.cocktailTemplate(cocktail)
        });
        this.cocktailsTarget.innerHTML = cocktailHTML;
      });
  }

  // submit() {
  //   const value = this.queryTarget.value
  //   fetch(`video_search/?q=${value}`, {
  //     headers: { accept: 'application/json'}
  //   }).then((response) => response.json())
  //     .then(data => console.log(data))
  // }

  cocktailTemplate(cocktail) {
    return `<div>
    <img src="${cocktail.thumbnail_url}"/><h4>${cocktail.title} <small> - ${cocktail.channel_title} ${cocktail.published_at}</small></h4>
    </div> `
  }
}
