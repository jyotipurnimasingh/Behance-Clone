import React, { useState, useEffect } from 'react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    fetch('https://api.example.com/data')
     .then(response => response.json())
     .then(data => {
        setApiData(data);
      })
     .catch(error => {
        console.error('API error:', error);
      });
  }, []);

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
    setValue(e.target.value);
  };

  const handleSearchSuggestions = () => {
    if (searchQuery.length > 2) {
      const filteredData = apiData.filter(item => item.title.startsWith(searchQuery));
      setSearchSuggestions(filteredData);
    } else {
      setSearchSuggestions([]);
    }
  };

  return (
    <div>
      <Header
        setValue={setValue}
        searchQuery={searchQuery}
        searchSuggestions={searchSuggestions}
        data={apiData}
      />
      <center>
        <h1 style={{ fontFamily: 'Arial Black', fontSize: '36px', color: '#333', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>BEHANCE</h1>
        </center>

    
    </div>
  );
}
const Header = ({ setValue, searchQuery, searchSuggestions, data }) => {
    // console.log('data:', data);
    // console.log('searchQuery:', searchQuery);
  
    // if (!data) {
    //   return <div>Loading...</div>;
    // }
  
    return (
      <div>
        {/* <h1>Header</h1> */}
        <div className="dropdown-content">
          {data.filter(item => item.title.startsWith(searchQuery) && item.title !== searchQuery)
           .slice(0, 5)
           .map(item => (
              <div key={item.id} onClick={(e) => setValue(item.title)}>
                {item.title}
                <hr />
              </div>
            ))}
        </div>
      </div>
    );
  };

export default App;
