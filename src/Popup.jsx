import { useEffect, useState } from "react";
import axios from "axios";
import "./Popup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
function Popup() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [results, setResults] = useState([]);
  const [response, setResponse] = useState([]);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setResponse(res.data);
    });
    var temp = response.filter((item) => {
      if (
        searchTerm &&
        !item.title.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      if (category && item.category != category) {
        return false;
      }
      if (price && item.price > price) {
        return false;
      }
      return true;
    });

    setResults(temp);
  }, [searchTerm, category, price]);
  return (
    <div className="outer">
      <div className="content">
        <div className="content-innner">
          <div className="filters">
            <div className="search-bar">
              <FontAwesomeIcon
                className="fcon"
                icon={faMagnifyingGlass}
                // size="xl"
              />
              <input
                className="box"
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search"
              />
            </div>
          </div>
          <div className="filters">
            <label htmlFor="categories">Category: </label>
            <select
              className="select"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="">None</option>
              <option value="men's clothing">Men's clothing</option>
              <option value="jewelery">Jewelery</option>
              <option value="electronics">Electronics</option>
              <option value="women's clothing">Women's clothing</option>
            </select>
          </div>
          <div className="filters">
            <label htmlFor="price">Price: </label>
            <select
              className="select"
              value={price}
              onChange={handlePriceChange}
            >
              <option value="">None</option>
              <option value="20">less than $20 </option>
              <option value="50">less than $50</option>
              <option value="100">less than $100</option>
              <option value="200">less than $200</option>
              <option value="500">less than $500</option>
              <option value="700">less than $700</option>
              <option value="1000">less than $1000</option>
              <option value="5000">less than $5000</option>
            </select>
          </div>
        </div>

        {/* creating a table to show the search results */}
        {results.length > 0 && (
          <table>
            <thead>
              <tr className="table-header">
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Popup;
