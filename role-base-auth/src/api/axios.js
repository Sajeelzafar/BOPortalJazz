import axios from 'axios';
const PRODUCTION_URL = "https://jazzcashbackendsajeel.onrender.com/";
const BASE_URL = "http://localhost:3500";
const ZAHID_URL = "http://bo-portal-bk.jazzcash.com.pk"
export default axios.create({
    baseURL: ZAHID_URL,
    headers: { "Content-Type": "application/json" },
});

