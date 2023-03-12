import React from 'react';
import { Link } from 'react-router-dom';
import './Front.css';

const Front = () => {
    return (
      <div className='container'>
        <Link to="/promotion">
          <img className='promotion' src=".\img\promotion3.png" alt="Promotion Image" />
        </Link>
        
        <ul>
          <li>
            <Link to="/adidas">
              <img className='logo' src=".\img\1.png" alt="Logo adidas Image" />
            </Link>
          </li>
          <li>
            <Link to="/nike">
              <img className='logo' src=".\img\2.png" alt="Logo nike Image" />
            </Link>
          </li>
          <li>
            <Link to="converse">
              <img className='logo' src=".\img\3.png" alt="Logo converse Image" />
            </Link>
          </li>
          <li>
            <Link to="newbalance">
              <img className='logo' src=".\img\4.png" alt="Logo newbalance Image" />
            </Link>
          </li>
        </ul>

      </div>
    );
}

export default Front;
