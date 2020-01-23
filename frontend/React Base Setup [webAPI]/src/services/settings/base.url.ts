//locale
const localhost: string = "http://localhost:8080";

//production
const production: string = "my public API";

//production or stage
export const baseURL: string = process.env.NODE_ENV === "production" ?  production : localhost;