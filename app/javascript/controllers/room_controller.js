import { Controller } from "stimulus"
import createDemoChannel from "../channels/demo_channel"
import Connection from "./demo_connection"

export default class extends Controller {
  static targets = [ "main", "remote", 'videoName']

  constructor(props) {
    super(props)
    this.connection = new Connection
    this.connection.remoteStreamTarget = this.remoteTarget
    this.channel = createDemoChannel("my-room", this.connection)
  }

  connect () {
    console.log("hello from room controller")
    this.element[this.identifier] = this // reference the stim controller https://leastbad.com/stimulus-power-move

    console.log(getCookie('name'))
    this.videoNameTarget.innerHTML = `You (${getCookie('name')})`

    //this.getUserMedia()
    //this.joinRoom()
  }

  getUserMedia() {
    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    }).then((stream) => {
      this.connection.localStream = stream
      this.mainTarget.srcObject = stream
      this.channel.send({type: "TOKEN"})
    })
  }

  joinRoom() {
    this.connection.loadStream()
    this.connection.createOffer()
  }
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
