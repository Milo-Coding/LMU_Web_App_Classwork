import { useEffect, useState } from "react";  
import Title from "./Title.js";
import Entry from "./Entry.js";
import Info from "./Info.js";
import './App.css';
import { getMagicItem } from "./api.js";
import Loader from "./Loader.js";
import Logo from "./Logo.js";

function App() {
  const [name, setName] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [emptySearch, setEmpty] = useState(true);

  useEffect(() => {
    if (!name) {
      setEmpty(true);
      return;
    }

    async function fetchData() {
      try {
        const search = await getMagicItem(name);
        setData(search)
        setLoading(false)
        // console.log("fetch done")
      } catch (error) {
        setError(error)
      }
    }
    
    setLoading(true);
    setData(null);
    setError(null);
    setEmpty(false);
    fetchData()
  }, [name]);

  //TODO: add an image to the empty and loading screen
  return (
    <div className="App">
      <Title text="D&D Magic Item Lookup" />
      <Entry action={setName} />

      {emptySearch && <pinfo>Enter something into the search bar to see some related items</pinfo>}
      {emptySearch && <Logo/>}

      {loading && <pload>Loading...</pload>}
      {loading && <Loader/>}

      {error ? (
        <span>Sorry something went wrong</span>
      ) : (
        <Info name={name} data={data} />
      )}
      
    </div>
  );
}

export default App;
