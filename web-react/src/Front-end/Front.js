import { React,useState } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import './Front.css';

const Front = () => {
  // const [selectedFilter, setSelectedFilter] = useState({
  //   productType: "",
  //   productGender: "",
  //   productBrand: "",
  //   productPromotion:"",
  // });

    return (
      <div className='container'>
        <Link to="/promotion">
          <img className='promotion' src=".\img\F.jpg" alt="Promotion Image" />
        </Link>
        
        <div className='BoxBrand'>
          <Grid container >
            <Grid item xs={3}>
              <Link to="/adidas">
                <img className='logo' src=".\img\logoAdidas.png" alt="Logo adidas Image" />
              </Link>
            </Grid>
            <Grid item xs={3}>
              <Link to="/nike">
                <img className='logo' src=".\img\logoNike.png" alt="Logo nike Image" />
              </Link>
            </Grid>
            <Grid item xs={3}>
              <Link to="converse">
                <img className='logo' src=".\img\logoConverse.png" alt="Logo converse Image" />
              </Link>
            </Grid>
            <Grid item xs={3}>
              <Link to="newbalance">
                <img className='logo' src=".\img\logoNewBalance.png" alt="Logo newbalance Image" />
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
      </div>
    );
}

export default Front;
