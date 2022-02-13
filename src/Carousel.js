import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  // if I dont get images passed down as props I will have some default ones here
  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  // using arrow function here eliminates the need for .bind(this) on line 36
  handleIndexClick = (e) => {
    // console.log(this)
    this.setState({
      // dataset is HTML verbage, this accesses data-index on img tag below
      // "+" converts incoming event string a number
      active: +e.target.dataset.index
    })
  }

  render() {
    const { active } = this.state; // mutable (changeable) state --toggle active
    const { images } = this.props; // passed state form parent --read only

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" /> 
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            <img
              key={photo}
              src={photo}
              data-index={index}
              onClick={this.handleIndexClick}
              // onClick={this.handleIndexClick.bind(this)}
              className={index === active ? "active" : ""}
              alt="animal thumbnail" />
          ))}
        </div>
      </div>
    )
  }
}

export default Carousel;