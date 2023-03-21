import React, { useEffect, useState } from "react";
import axios from "axios";
import'./ProductTable.css';

// const ProductTable = () => {
//   const [products, setProducts] = useState([]);
//   const [sortedProducts, setSortedProducts] = useState([]);
//   const [sortOrder, setSortOrder] = useState("asc");

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await axios("http://localhost:8080/product_detail");
//       setProducts(result.data);
//       setSortedProducts(result.data);
//     };

//     fetchData();
//   }, []);

//   const handleSort = (order) => {
//     if (order === "asc") {
//       const sorted = [...sortedProducts].sort((a, b) => a.product_price - b.product_price);
//       setSortedProducts(sorted);
//       setSortOrder("asc");
//     } else if (order === "desc") {
//       const sorted = [...sortedProducts].sort((a, b) => b.product_price - a.product_price);
//       setSortedProducts(sorted);
//       setSortOrder("desc");
//     }
//   };

//   return (
//     <div className="product-container">
//       <div className="sort-container">
//         <label htmlFor="sort">Sort By:</label>
//         <select id="sort" onChange={(e) => handleSort(e.target.value)}>
//           <option value="asc">Price (Low to High)</option>
//           <option value="desc">Price (High to Low)</option>
//         </select>
//       </div>
//       <div className="product-table">
//         {sortedProducts.map((product) => (
//           <div key={product.product_id} className="product-card">
//             <img className="product-img" src={product.product_urlimg} alt={product.product_descropton} />
//             <div className="product-name">{product.product_description}</div>
//             <div className="product-price">{product.product_price}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductTable;

const ProductTable = ({ selectedFilter }) => {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:8080/product_detail");
      setProducts(result.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filteredProducts = [...products];

    if (selectedFilter.productGender) {
      console.log(selectedFilter.productGender);
      filteredProducts = filteredProducts.filter(
        (product) => product.product_gender === selectedFilter.productGender
      );
    }

    if (selectedFilter.productBrand) {
      console.log(selectedFilter.productBrand);
      filteredProducts = filteredProducts.filter(
        (product) => product.product_brand === selectedFilter.productBrand
      );
    }

    if (selectedFilter.productType) {
      console.log(selectedFilter.productType);
      filteredProducts = filteredProducts.filter(
        (product) => product.product_type === selectedFilter.productType
      );
    }

    if (selectedFilter.productPromotion) {
      console.log(selectedFilter.productPromotion);
      filteredProducts = filteredProducts.filter(
        (product) => product.product_promotion === selectedFilter.productPromotion
      );
    }

    setSortedProducts(filteredProducts);
  }, [selectedFilter, products]);

  const handleSort = (order) => {
    if (order === "asc") {
      const sorted = [...sortedProducts].sort((a, b) => a.product_price - b.product_price);
      setSortedProducts(sorted);
      setSortOrder("asc");
    } else if (order === "desc") {
      const sorted = [...sortedProducts].sort((a, b) => b.product_price - a.product_price);
      setSortedProducts(sorted);
      setSortOrder("desc");
    }
  };

  return (
    <div className="product-container">
      <div className="sort-container">
        <label htmlFor="sort">Sort By:</label>
        <select id="sort" onChange={(e) => handleSort(e.target.value)}>
          <option value="asc">Price (Low to High)</option>
          <option value="desc">Price (High to Low)</option>
        </select>
      </div>
      <div className="product-table">
        {sortedProducts.map((product) => (
          <div key={product.product_id} className="product-card">
            <img className="product-img" src={product.product_urlimg} alt={product.product_descropton} />
            <div className="product-name">{product.product_description}</div>
            <div className="product-price">{product.product_price}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductTable;
