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
        const existingStorage = JSON.parse(localStorage.getItem("imagesData")) || [];
        const newSearchResult = { id: term, data: data.results }
        const updatedStorage = [...existingStorage, newSearchResult]
        localStorage.setItem("imagesData", JSON.stringify(updatedStorage));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (term.length === 0) {
      setTerm(initialState)
    } else {
      const existingStorage = JSON.parse(localStorage.getItem("imagesData")) || [];
      const cachedData = existingStorage.find((item) => item.id === term)?.data;
      if (cachedData) {
        console.log("local")
        setImageList(cachedData);

      } else {
        console.log("api")
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
