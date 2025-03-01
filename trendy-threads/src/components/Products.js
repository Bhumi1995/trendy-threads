import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [loading, setLoading] = useState(true); // Initially set to true

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  // Get unique categories from products
  const categories = [...new Set(products.map((product) => product.category))];

  // Price range options
  const priceRanges = [
    { label: "Under $25", value: "0-25" },
    { label: "$25 - $50", value: "25-50" },
    { label: "$50 - $100", value: "50-100" },
    { label: "Over $100", value: "100-10000" },
  ];
  //

  // Handle search icon click
  const handleSearchClick = () => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    console.log("search clicked", filtered);
  };
  // Handle filter changes
  const handleFilterChange = () => {
    const filtered = products.filter((product) => {
      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true;
      const matchesPrice = priceRange
        ? product.price >= parseFloat(priceRange.split("-")[0]) &&
          product.price <= parseFloat(priceRange.split("-")[1])
        : true;
      return matchesCategory && matchesPrice;
    });
    setFilteredProducts(filtered); // Update the filtered products state
  };

  // Apply filters when category or price range changes
  useEffect(() => {
    handleFilterChange();
  }, [selectedCategory, priceRange]);

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

      {/* Left Bar Filter functionality */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4">
        <div className="p-4 bg-gray-100 rounded-lg h-100">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-2">Category</h3>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 border rounded w-full"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <h3 className="font-medium mb-2">Price Range</h3>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="p-2 border rounded w-full"
            >
              <option value="">All Prices</option>
              {priceRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <ClipLoader color="#000000" size={50} />
          </div>
        ) : (
          <div className="md:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white p-4 rounded-lg shadow-md"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-16 h-16 sm:w-32 sm:h-32 md:w-48 md:h-48"
                    />
                    <h2 className="text-sm font-semibold mt-2">
                      {product.title}
                    </h2>
                    <p className="text-gray-600 text-sm">${product.price}</p>
                    <button className="mt-4 bg-black text-white w-full px-4 py-2 rounded hover:bg-white hover:text-black cursor-pointer">
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
        )}
      </div>
    </div>
  );
};

export default Products;
