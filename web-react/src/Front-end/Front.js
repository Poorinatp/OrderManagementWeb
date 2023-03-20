import { React,useState,useEffect } from 'react';
import { Link,useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import './Front.css';
import ProductPage from './ProductPage';
import { useNavigate } from 'react-router-dom';
import ProductTable from './FrontComponent/ProductTable';
import { Button } from '@mui/material';

const Front = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Load the selectedFilter state from the URL state on mount
  const [selectedFilter, setSelectedFilter] = useState(location.state?.selectedFilter || {
    productType: '',
    productGender: '',
    productBrand: '',
    productPromotion: '',
  });

  // Update the URL state when the selectedFilter state changes
  useEffect(() => {
    console.log(selectedFilter);
  }, [selectedFilter]);
  
  const updateFilter = (propertyName, propertyValue) => {
    setSelectedFilter((prevFilter) => ({
      ...prevFilter,
      [propertyName]: propertyValue,
    }));
  };

  const handleClick = (propertyName, propertyValue) => {
    updateFilter(propertyName, propertyValue);
    const updatedFilter = { ...selectedFilter, [propertyName]: propertyValue };
    localStorage.setItem('selectedFilter', JSON.stringify(updatedFilter));
    navigate('/ProductPage');
  };
  
  
  


  return (
    <div className="container">
      <Link to="/promotion">
        <img className="promotion" src=".\img\F.jpg" alt="Promotion Image" />
      </Link>

      <div className="BoxBrand">
        <Grid container>
          <Grid item xs={3}>
            <Link to="/ProductPage" onClick={() => handleClick('productBrand', 'Adidas')}>
              <img className="logo" src=".\img\logoAdidas.png" alt="Logo adidas Image" />
            </Link>
          </Grid>
          <Grid item xs={3}>
            <Link to="/ProductPage" onClick={() => handleClick('productBrand', 'Nike')}>
              <img className="logo" src=".\img\logoNike.png" alt="Logo nike Image" />
            </Link>
          </Grid>
          <Grid item xs={3}>
            <Link to="/ProductPage" onClick={() => handleClick('productBrand', 'Converse')}>
              <img className="logo" src=".\img\logoConverse.png" alt="Logo converse Image" />
            </Link>
          </Grid>
          <Grid item xs={3}>
            <Link to="/ProductPage" onClick={() => handleClick('productBrand', 'Newblance')}>
              <img className="logo" src=".\img\logoNewBalance.png" alt="Logo newbalance Image" />
            </Link>
          </Grid>
        </Grid>
      </div>
        <Grid container >
          <Grid item xs={9.3}>
            <Grid container >
              <Grid item xs={12}>
              <Link to="/Men">
              <img style={{width:"100%"}} src=".\img\FMen.jpg" alt="Men" />
            </Link>
              </Grid>
              <Grid item xs={6}>
              <Link to="/none">
              <img style={{width:"100%"}} src=".\img\3Men.jpg" alt="3Men" />
            </Link>
              </Grid>
              <Grid item xs={6}>
              <Link to="/sale">
              <img style={{width:"100%"}} src=".\img\Fsale2.jpg" alt="Sale" />
            </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2.7}>
            <Link to="/Women">
              <img style={{width:"100%"}} src=".\img\FWomen.jpg" alt="Women" />
            </Link>
          </Grid>

        </Grid>
        {/* <ProductTable selectedFilter={selectedFilter} /> */}
      </div>
    );
}

export default Front;
