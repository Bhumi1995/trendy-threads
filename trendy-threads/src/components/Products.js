import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        console.log(data);
      });
  }, []);

  // Handle search icon click
  const handleSearchClick = () => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    console.log("search clicked", filtered);
  };

  return (
    <div className="p-4">
      {/* Search Input with icon */}
      <div className="relative mb-4 m-auto w-full md:w-1/2">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 w-full border rounded mb-4"
        />
        {/* Search Icon */}
        <div
          className="absolute inset-y-0 right-4 bottom-4 flex items-center pl-3 cursor-pointer"
          onClick={handleSearchClick}
        >
          <FaSearch className="text-gray-500" />
        </div>
      </div>

      {/* Product List */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={product.image}
                alt={product.title}
                className="w-16 h-16 sm:w-32 sm:h-32 md:w-48 md:h-48"
              />
              <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
              <p className="text-gray-600">${product.price}</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add to Cart
              </button>
            </div>
          ))}
        </div> // Display a message if no products are found
      ) : (
        <div className="text-center text-red-500 font-semibold mt-8">
          No products found.
        </div>
      )}
    </div>
  );
};

export default Products;
