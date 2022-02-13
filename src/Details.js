import { Component } from "react/cjs/react.production.min";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";

class Details extends Component {
  // Old way
  constructor() {
    super();
    this.state = { loading: true };
  }

  // // New way
  // state = {loading: true};

  async componentDidMount() {
    const res = await fetch(
      // match.params is how we get id from react-router
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    const data = await res.json();
    this.setState(
      Object.assign(
        {
          loading: false,
        },
        // console.log(data.pets),
        data.pets[0]
      )
    );
  }

  render() {
    // console.log(this.state);
    
    // // this is where you could add a fancy lading animation
    // if (this.state.loading){
    //   return <h2>loading...</h2>
    // }
    const { animal, breed, city, state, description, name } = this.state;
    return (
      <div className="details">
        <h1>{name}</h1>
        <h2>{animal} - {breed} - {city} - {state}</h2>
        <button>Adopt {name}</button>
        <p>{description}</p>
      </div>
    )
  }
}

export default withRouter(Details);
