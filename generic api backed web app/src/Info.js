import "./info.css"
import { useState, useEffect } from 'react';

export default function Info({ name, data }) {
  const [itemsMap, setItemsMap] = useState(new Map());
  
  useEffect(() => {
    const myMap = new Map();

    if (data && data.results && Array.isArray(data.results)) {
      data.results.forEach(item => {
      myMap.set(item.name, item.desc);
      // console.log(myMap)
      });
      setItemsMap(myMap);
    }
  }, [data]);

  // console.log(itemsMap)
  return !data || !name ? (
    <p></p>

  ) : data?.count === 0 || !data?.results ? (
    <div>
      <br/><pinfo>No data for {name}</pinfo> <br/><br/>
      <img
        src="https://media-public.canva.com/OyD-M/MAD5Z9OyD-M/1/tl.png"
        alt="D&D dice natural 1"
        style={{width: '50vmin', height: '50vmin'}}
      />
    </div>

  ) : (
    <div>
    <h2 className="items">Here are {data.count} items for {name}:</h2>
    <ul className = "item-list-style">
        {Array.from(itemsMap).map(([key, value]) => (
          <li key={key}>
            <h3>{key}</h3> <p></p> <pdesc>{value}</pdesc><br /> <br/>
          </li>
        ))}
      </ul>
  </div>    
  );
}