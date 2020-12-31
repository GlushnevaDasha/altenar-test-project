import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import { getSearchAll } from "../../utils/api";
import { CustomLoader } from "../../components/Loader";

export default function Home() {
  const [mas, setMas] = useState([]);
  const [isFeath, setFeath] = useState(true);

  // useEffect(() => {
  //   getData();
  // }, [mas]);

  async function getData() {
    setFeath(false);
    let data = await getSearchAll();
    if (data.error) {
      setMas(mas);
      setFeath(true);
    } else {
      console.log("data", data);
      setMas(data.results);
      setFeath(true);
    }
  }

  return (
    <div>
      <div className='search' style={{ display: "flex" }}>
        <input />
        <button onClick={() => getData()}>Поиск</button>
      </div>
      {isFeath ? (
        <div>
          {console.log("mas", mas)}
          {mas.length !== 0
            ? mas.map((item, index) => <Card key={index} object={item} />)
            : null}
        </div>
      ) : (
        <div>
          <CustomLoader />
        </div>
      )}
    </div>
  );
}
