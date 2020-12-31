import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import { getSearchAll } from "../../utils/api";

export default function Home() {
  const [mas, setMas] = useState([]);

  // useEffect(() => {
  //   getData();
  // }, [mas]);

  async function getData() {
    let data = await getSearchAll();
    if (data.error) {
      setMas(mas);
    } else {
      console.log("data", data);
      setMas(data.results);
    }
  }

  return (
    <div>
      <div className='search' style={{ display: "flex" }}>
        <input />
        <button onClick={() => getData()}>Поиск</button>
      </div>
      <div>
        {console.log("mas", mas)}
        {mas.length !== 0
          ? mas.map((item, index) => <Card key={index} object={item} />)
          : null}
      </div>
    </div>
  );
}
