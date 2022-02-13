import { useState, useEffect, useContext } from "react";
import ThemeContext from "./ThemeContext";
import useBreedList from "./useBreedList";
import Results from "./Results";

// Object.freeze makes ANIMAL state variable read only (not necessary using map in return)
const ANIMALS = Object.freeze(["bird", "cat", "dog", "rabbit", "reptile"]);

const SearchParams = () => {
  // Never put hooks in conditionals of loops
  // Hooks return a tuple that is being destructured
  // Dynamically updates input state from inputs using onChange/onBlur
  const [location, setLocation] = useState(""); //any string here will be rendered as initial value
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);
  const [theme, setTheme] = useContext(ThemeContext);

  useEffect(() => {
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // this second argument tells react when to fire off request. If left blank (no []) it will fire continuously. Any state variable placed inside [] will define the effect to run again on change of that state. If left [] it will fire just once.

  // // Example of cleaning up side effects when changes are made to the DOM
  // useEffect(() => {
  //   const timer = setTimeout(() => alert('hi'), 3000);
  //   return () => clearTimeout(timer);
  // }, [animal]);

  // Placing the function here allows use of COVE and access to state variables above
  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const data = await res.json();
    setPets(data.pets);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => setAnimal(e.target.value)}
            onBlur={(e) => setAnimal(e.target.value)}
          >
            {/* Drop down menu options */}
            <option />
            {/* Don't use index as key!! Pointless!! */}
            {/* after => "(" returns everything inside ")" */}
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="#86d6db">Baby Blue</option>
            <option value="#f2c799">Spicy Orange</option>
            <option value="#5a8f82">Cool Moss</option>
            <option value="#51657d">Dark Fog</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
