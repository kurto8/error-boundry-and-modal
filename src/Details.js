import { Component } from "react/cjs/react.production.min";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoudary";

class Details extends Component {
  // // Old way
  // constructor() {
  //   super();
  //   this.state = { loading: true };
  // }

  // New way
  state = { loading: true };

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
    
    // this is where you could add a fancy lading animation
    // if (this.state.loading){
    //   return <h2>loading...</h2>
    // }

    const {
      animal,
      breed,
      city,
      state,
      description,
      name,
      images,
    } = this.state;

    // throw new Error("lol it broke");

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal} - {breed} - {city} - {state}
          </h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

// HIGHER ORDER COMPONENT
const DetailsWithRouter = withRouter(Details);

// Example of nested HIGHER ORDER COMPONENTS
export default function DetailsWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <DetailsWithRouter />
    </ErrorBoundary>
  );
}
