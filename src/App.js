import React, { useEffect, useState } from 'react';

import "./styles/reset.css";
import "./styles/style.css";


import ImageList from './components/ImageList';
import SearchBar from "./components/SearchBar";
import API from "./API";

function App() {
  const initialState = "most popular";
  const [term, setTerm] = useState(initialState);
  const [imageList, setImageList] = useState([]);

  const fetchImages = async () => {
    try {
      const data = await API.fetchImages(term);
      setImageList(data.results)
      if (term) {
        localStorage.setItem(`${term}`, JSON.stringify(data.results));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (term.length === 0) {
      setImageList(JSON.parse(localStorage.getItem(initialState)));
    } else {
      const cachedData = localStorage.getItem(`${term}`);
      if (cachedData) {
        // console.log("local")
        setImageList(JSON.parse(cachedData));

      } else {
        // console.log("api")
        fetchImages()
      }
    }

  }, [term]);


  return (
    <div className="container">
      <SearchBar setTerm={setTerm} />
      <ImageList imageList={imageList} />
    </div>
  );
}

export default App;
