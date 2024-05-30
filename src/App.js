import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import ImageModal from './components/ImageModal';
import { behanceItem } from './Data';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        const titles = data.map(item => item.title);
        setSearchSuggestions(titles);
      })
      .catch(error => console.error('Error fetching suggestions:', error));
  }, []);

  const handleSearch = (e) => {
    const userInput = e.target.value;
    setSearchQuery(userInput);

    if (userInput.trim() === '') {
      setSearchSuggestions([]);
      return;
    }

    const filtered = searchSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(userInput.toLowerCase())
    );
    setSearchSuggestions(filtered);
  };

  const handleSuggestionSelect = (suggestion) => {
    setSearchQuery(suggestion);
    setSearchSuggestions([]);
  };

  const addTask = (task) => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setSearchQuery('');
    }
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const toggleLike = (index) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [index]: !prevLikes[index],
    }));
  };

  return (
    <div className="main relative overflow-hidden">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchSuggestions={searchSuggestions}
        handleSearch={handleSearch}
      />
      {searchQuery.trim() !== '' && (
        <SearchBar
          suggestions={searchSuggestions}
          onSuggestionSelect={handleSuggestionSelect}
          inputValue={searchQuery}
          onChange={handleSearch}
        />
      )}
      <div className="App">
        <div className="search-bar-container">
          <SearchBar
            suggestions={searchSuggestions}
            onSuggestionSelect={handleSuggestionSelect}
            inputValue={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="add-task-container">
          <button onClick={() => addTask(searchQuery)}>Add Task</button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {task}
              <div className="add-task-container">
                <button onClick={() => removeTask(index)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="image-gallery">
        {behanceItem.map((item, index) => (
          <div key={index} className="image-item">
            <img src={item.featureImg} alt={item.featureTxt} onClick={() => handleImageClick(item.featureImg)} />
            <p>{item.featureTxt}</p>
            <button onClick={() => toggleLike(index)}>
              {likes[index] ? <AiFillLike color="red" /> : <AiOutlineLike />}
            </button>
          </div>
        ))}
      </div>

      <Footer />

      <ImageModal isOpen={selectedImage !== null} image={selectedImage} onClose={closeModal} />
    </div>
  );
}

export default App;
