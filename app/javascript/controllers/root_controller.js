import { Controller } from "stimulus"
import createDemoChannel from "../channels/demo_channel"
import Connection from "./demo_connection"

export default class extends Controller {
  static targets = [ "main", "remote", 'name','error' ]

  constructor(props) {
    super(props)
    this.connection = new Connection
    this.connection.remoteStreamTarget = this.remoteTarget
    this.channel = createDemoChannel("my-room", this.connection)
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
    if(this.nameTarget.value === ''){
      this.errorTarget.innerHTML = 'Please enter your name first'
    } else {
      setCookie('name', this.nameTarget.value, 365)
      window.location.replace('/room')
    }
  }
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
