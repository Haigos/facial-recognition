import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageUrlLink from './components/ImageUrlLink/ImageUrlLink';
import Rank from './components/Rank/Rank';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Component } from 'react';
import Clarifai from 'clarifai'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

const app = new Clarifai.App({
  apiKey: "e739326c74ee42148d46c4d33f1888c4",
});

const particlesInit = async (main) => {
  console.log(main);
  await loadFull(main);
};

const particlesLoaded = (container) => {
  console.log(container);
};

const options = {
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 100,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 1,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 150,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 0.1, max: 1 },
    },
  },
  detectRetina: true
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: "",
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('input-image')
    const width = Number(image.width)
    const height = Number(image.height)
    console.log(width, height)

    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height)
    }
  }

  displayFace = (box) => {
    console.log(box)
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        if (response) {
          fetch('https://polar-caverns-61829.herokuapp.com:3000/image', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
        }
        this.displayFace(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err))
  };

  onRouteChage = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state
    return (
      <div className="App">
        <Particles
          className='particles'
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={options}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChage} />
        {route === 'home'
          ?
          <>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageUrlLink onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </>
          : (
            this.state.route === 'signin'
              ?
              <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChage} />
              :
              <Register loadUser={this.loadUser} onRouteChange={this.onRouteChage} />
          )
        }
      </div>
    );
  }
}

export default App;
