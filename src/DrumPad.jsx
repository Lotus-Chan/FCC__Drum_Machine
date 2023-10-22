import { React, Component } from "react";
import Display from "./Display";

class DrumPad extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pads: [
        {
          id: "Q",
          audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
          name: "heater1"
        },
        {
          id: "W",
          audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
          name: "heater2"
        },
        {
          id: "E",
          audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
          name: "heater3"
        },
        {
          id: "A",
          audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
          name: "heater4"
        },
        {
          id: "S",
          audio: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
          name: "clap"
        },
        {
          id: "D",
          audio: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
          name: "open-hihat"
        },
        {
          id: "Z",
          audio: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
          name: "kick-n-hat"
        },
        {
          id: "X",
          audio: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
          name: "kick"
        },
        {
          id: "C",
          audio: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
          name: "closed-hihat"
        }
      ],
      currentPad: null
    };

    this.playAudio = this.playAudio.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.choosePad = this.choosePad.bind(this);
  }

  // Needed to allocate and clean up the resources used when listening for a keypress
  componentDidMount() {
    document.addEventListener("keypress", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.handleKeyPress);
  }

  playAudio = (id) => {
    const audio = document.getElementById(id);
    if (audio instanceof HTMLMediaElement) {
      audio.play();
      const currentPad = this.state.pads.find((pad) => pad.id === id);
      this.setState({ currentPad: currentPad });
      return;
    }
    console.log("Failed to play audio");
  };

  handleKeyPress(event) {
    const pressedKey = event.key.toUpperCase();
    const pad = this.state.pads.find((pad) => pad.id === pressedKey);

    if (pad) {
      const audioElement = document.getElementById(pad.id);

      if (audioElement instanceof HTMLMediaElement) {
        audioElement.currentTime = 0;
        audioElement.play();
        return;
      }
    }
    console.log("Failed to play audio");
  }

  choosePad(pads) {
    this.setState({ currentPad: pads });
  }

  render() {
    return (
      <div className="drum-pad-container">
        {" "}
        {this.state.pads.map((pads) => (
          <div
            className="drum-pad"
            id={pads.name}
            key={pads.id}
            onClick={() => {
              this.playAudio(pads.id);
            }}
          >
            <audio id={pads.id} src={pads.audio} className="clip"></audio>
            {pads.id}
          </div>
        ))}
        <Display currentPad={this.state.currentPad} />
      </div>
    );
  }
}

export default DrumPad;
