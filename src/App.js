import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DndProvider } from "react-dnd"; // Import DndProvider
import { HTML5Backend } from "react-dnd-html5-backend";

import { FavouritesProvider } from "./Context/FavouritesContext";
import Signup from "./Components/Signup";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import SearchBar from "./Components/SearchBar";
import SearchForm from "./Components/SearchForm";
import PropertiesList from "./Components/PropertiesList";
import ResultsPage from "./Components/ResultsPage";
import FavList from "./Components/FavList";
import Footer from "./Components/Footer";

function App() {
  return (
    <DndProvider backend={HTML5Backend}> {/* Wrap with DndProvider */}
      <FavouritesProvider>
        <Router>
          <Navbar /> {/* Navbar will remain on top of all pages */}
          <div style={{ flex: 1 }}> {/* Main content area */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/search" element={<SearchBar />} />
              <Route path="/ads" element={<PropertiesList />} />
              <Route path="/searchform" element={<SearchForm />} />
              <Route path="/result" element={<ResultsPage />} />
              <Route path="/favlist" element={<FavList />} />
            </Routes>
          </div>
          <Footer /> {/* Footer remains at the bottom */}
        </Router>
      </FavouritesProvider>
    </DndProvider>
  );
}

export default App;
