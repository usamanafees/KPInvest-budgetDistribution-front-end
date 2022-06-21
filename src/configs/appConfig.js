require('dotenv').config()
export const ENV = {
    baseUrl: (process.env.NODE_ENV === "production") ? process.env.REACT_APP_BASE_URL : 'http://localhost:5001',
    publicUrl: (process.env.NODE_ENV === "production") ? process.env.REACT_APP_URL : 'http://localhost:3000' 
}