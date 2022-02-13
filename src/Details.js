import { Component } from "react";
import { withRouter } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoudary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

class Details extends Component {
  // // Old way
  // constructor() {
  //   super();
  //   this.state = { loading: true };
  // }

  // New way
  state = { loading: true, showModal: false };

  async componentDidMount() {
    const res = await fetch(
      // match.params is how we get id from react-router
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    const data = await res.json();
    this.setState(
      Object.assign(
        { loading: false },
        // console.log(data.pets),
        data.pets[0]
      )
    );
  }

  toggleModal = () =>
    this.setState({ showModal: !this.state.showModal ? true : false });
  adopt = () => (window.location = "http://bit.ly/pet-adopt");

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
      showModal,
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
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
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
