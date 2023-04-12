import { React,useState,useEffect } from 'react';
import { Link,useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import './Front.css';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';

const Front = ({ handleClick2 }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Load the selectedFilter state from the URL state on mount
  return (
    <div>
      <div className="container">
      <Link onClick={e=>handleClick2("Brand","","Adidas")}>
        <img className="promotion" src=".\img\F.jpg" alt="Promotion Image" />
      </Link>

      <div className="BoxBrand">
        <Grid container>
          <Grid item xs={3}>
            <IconButton onClick={e=>handleClick2("Brand","","Adidas")}>
              <img className="logo" src=".\img\logoAdidas.png" alt="Logo adidas Image" />
            </IconButton>
          </Grid>
          <Grid item xs={3}>
            <IconButton onClick={e=>handleClick2("Brand","","Nike")}>
              <img className="logo" src=".\img\logoNike.png" alt="Logo nike Image" />
            </IconButton>
          </Grid>
          <Grid item xs={3}>
            <IconButton onClick={e=>handleClick2("Brand","","Converse")}>
              <img className="logo" src=".\img\logoConverse.png" alt="Logo converse Image" />
            </IconButton>
          </Grid>
          <Grid item xs={3}>
            <IconButton onClick={e=>handleClick2("Brand","","New Balance")}>
              <img className="logo" src=".\img\logoNewBalance.png" alt="Logo newbalance Image" />
            </IconButton>
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
        </div>
      </div>
    );
}

export default Front;
