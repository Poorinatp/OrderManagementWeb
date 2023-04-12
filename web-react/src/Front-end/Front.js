import { React,useState,useEffect } from 'react';
import { Link,useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import './Front.css';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, Paper, Typography } from '@mui/material';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';


const BestSeller = ({ bestSeller, saveProductId }) => {
  return (
    <div>
      <Typography variant="h3" component="h3" sx={{ p:2, mt: 2, mb: 2, textShadow: '1px 1px 1px rgba(0,0,0,0.5)', textAlign:'left' }}>
        Best Seller
      </Typography>
      <Grid container spacing={2} sx={{ mb:5}}>
        {bestSeller.slice(0,9).map((row, index) => (
          <Grid key={"grid"+index} item xs={12} sm={6} md={4} lg={4}>
            <Paper elevation={3} sx={{ p: 1 }}>
              <Link to={`/Product`}  key={`link${index}`} onClick={() => saveProductId(row.product_id)} >
                  <Paper key={"paper"+index} sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                    <img style={{ width: '100%',maxHeight:'500px' }} src={row.product_urlimg} alt={row.product_description} />
                    <Typography key={"description"+index} variant="h8">
                      {row.product_description}
                    </Typography>
                    <Typography key={"price"+index}>{row.product_price}</Typography>
                  </Paper>
                </Link>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const Front = ({ handleClick1, handleClick2, productsorder}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSeller, setOpenSeller] = useState(false);
  // find 10 best seller from productsorder
  const [bestSeller, setBestSeller] = useState([]);
  useEffect(() => {
    let seller = [];
    // if product_id is same add product amount
    productsorder.forEach((item) => {
      let index = seller.findIndex((i) => i.product_id === item.product_id);
      if (index === -1) {
        seller.push({ product_id: item.product_id, quantity: item.product_amount, product_description: item.product_description, product_price: item.product_price, product_urlimg: item.product_urlimg });
      } else {
        seller[index].quantity += item.product_amount;
      }
    });
    // sort by quantity
    seller.sort((a, b) => b.quantity - a.quantity);
    seller = seller.slice(0, 10);
    setBestSeller(seller);
  }, [productsorder]);
  
  function saveProductId(productId) {
    localStorage.setItem('productId', productId);
  }
  
  return (
    <div>
      <div className="container">
      <Button onClick={e=>handleClick2("Brand","","Adidas")}>
        <img className="promotion" src=".\img\F.jpg" alt="Promotion Image" />
      </Button>
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
      {!openSeller&&<>
        <Grid container >
          <Grid item xs={9.3}>
            <Grid container >
              <Grid item xs={12}>
              <IconButton onClick={e=>handleClick1("Men","Shoes")}>
              <img style={{width:"100%"}} src=".\img\FMen.jpg" alt="Men" />
            </IconButton>
              </Grid>
              <Grid item xs={6}>
              <IconButton onClick={e=>handleClick1("Men","")}>
              <img style={{width:"100%"}} src=".\img\3Men.jpg" alt="3Men" />
            </IconButton>
              </Grid>
              <Grid item xs={6}>
              <IconButton onClick={e=>handleClick1("Men","")}>
              <img style={{width:"100%"}} src=".\img\Fsale2.jpg" alt="Sale" />
              </IconButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2.7}>
            <Link to="/Women">
              <img style={{width:"100%"}} src=".\img\FWomen.jpg" alt="Women" />
            </Link>
          </Grid>
        </Grid>
        <Grid container sx={{mb:5}}>
          <Grid item xs={3}>
            <Button onClick={e=>setOpenSeller(true)} style={{width:"100%",height:"100%"}}>
              <img style={{width:"100%"}} src=".\img\Fbestseller.jpg" alt="Seller" />
            </Button>
          </Grid>
          <Grid item xs={9} sx={{ display:'flex', justifyContent: 'flex-end', alignItems:'center'}}>
            <Grid container sx={{ alignItems:'right' }}>
              {bestSeller.slice(0,2).map((row,index) => (
              <Grid key={"grid"+index} item xs={6} sm={6} md={6} lg={6} sx={{p:2}}>
                <Link to={`/Product`}  key={`link${index}`} onClick={() => saveProductId(row.product_id)} >
                  <Paper key={"paper"+index} sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                    <img style={{ width: '100%',maxHeight:'500px' }} src={row.product_urlimg} alt={row.product_description} />
                    <Typography key={"description"+index} variant="h8">
                      Product Name: {row.product_description}
                    </Typography>
                  </Paper>
                </Link>
              </Grid>
            ))}
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{p:2}}>
                <Button onClick={e=>setOpenSeller(true)}>
                  <ExpandCircleDownOutlinedIcon style={{ transform: "rotate(270deg)", color: "black" }} />
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        </>
        }
        {openSeller&&<BestSeller bestSeller={bestSeller} setOpenSeller={setOpenSeller}/>}
        </div>
      </div>
    );
}

export default Front;
