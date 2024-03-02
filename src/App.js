import React, { useEffect, useState } from 'react';
//styles
import "./styles/reset.css";
import "./styles/style.css";
//routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//components
import Home from './pages/Home';
import History from './pages/History';
import Navbar from './components/Navbar';
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
        // console.log("local")
        setImageList(cachedData);

      } else {
        // console.log("api")
        fetchImages()
      }
    }

  }, [term]);


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home setTerm={setTerm} imageList={imageList} />} />
        <Route path='/history' element={<History />} />
      </Routes>
    </Router >

  );
}

export default App;
