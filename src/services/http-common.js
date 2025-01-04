import { getTokenDetail } from "../helpers/helper";
import axios from "axios";

// Get default API key from environment variables
let defaultAPIKey = process.env.REACT_APP_PUBLIC_API || '';
// Get token from localStorage
let token = localStorage.getItem("authUser") || '';

// Create and export an Axios instance
export default axios.create({
    baseURL: process.env.REACT_APP_PUBLIC_API,
    headers: {
        'Accept': 'application/json',
        "Content-type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Authorization": `Bearer ${token}`,
    }
});
