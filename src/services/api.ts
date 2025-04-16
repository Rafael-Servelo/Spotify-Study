import axios from "axios";

const clientID = "45aef6434be440319537976fa686e060";
const secret = "a7bc30bb543c4caf83de1a59517e300c";

const api = axios.create({
  baseURL: "https://api.spotify.com",
});

let token = api
  .post(
    "https://accounts.spotify.com/api/token",
    `grant_type=client_credentials&client_id=${clientID}&client_secret=${secret}`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  )
  .then((res) => {
    return res.data.access_token;
  });

export { api, token };
