import { textAlign } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductTable from './FrontComponent/ProductTable';

function ProductPage() {
    const [selectedFilter, setSelectedFilter] = useState(
      JSON.parse(localStorage.getItem('selectedFilter')) || {
        productType: '',
        productGender: '',
        productBrand: '',
        productPromotion: '',
      }
    );
  
    useEffect(() => {
      localStorage.setItem('selectedFilter', JSON.stringify(selectedFilter));
    }, [selectedFilter]);
  
    if (!selectedFilter) {
      return <div>Error: No filter selected.</div>;
    }
  
    return (
      <div>
        <div>
            <h1>
                {selectedFilter.productBrand}
            </h1>
            </div>
        <ProductTable selectedFilter={selectedFilter} />
      </div>
    );
  }
  

export default ProductPage;
