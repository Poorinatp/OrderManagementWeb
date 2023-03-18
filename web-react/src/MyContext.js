import { useState, createContext } from 'react';
export const MyContext = createContext(
    {
    api: 'http://localhost:8080/',
    setapi: () => { },
    showAlert: false,
    setShowAlert: () => {}
}
);

export const MyContextProvider = (props) => {
    const [showAlert, setShowAlert] = useState(false);
  
    return (
      <MyContext.Provider value={{ showAlert, setShowAlert }}>
        {props.children}
      </MyContext.Provider>
    );
  };