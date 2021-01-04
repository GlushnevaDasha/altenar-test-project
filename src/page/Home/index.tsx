import React, { useState, useEffect } from "react";
import Card from "../../components/Card";
import { getSearchAll } from "../../utils/api";
import { CustomLoader } from "../../components/Loader";
import { noConection } from "../../utils/data";
export default function Home() {
  const [mas, setMas] = useState([]);
  const [search, setSearch] = useState("");

  const [isFeath, setFeath] = useState(true);

  // useEffect(() => {
  //   getData();
  // }, [mas]);

  async function getData() {
    setFeath(false);
    console.log("search", search);
    let data = await getSearchAll(search);
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
        <input
          type='text'
          placeholder={"Введите хоть что нибудь"}
          // className="input100"
          value={search}
          onChange={event => {
            setSearch(event.target.value);
          }}
        />
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
