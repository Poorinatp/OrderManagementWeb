import { createContext } from 'react';
export const MyContext = createContext(
    {
    api: 'http://localhost:8080/',
    setapi: () => { }
}
);