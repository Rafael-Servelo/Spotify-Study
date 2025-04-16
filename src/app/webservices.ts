import axios from "axios";

const baseURL = "https://api.spotify.com/v1";
const clientID = "45aef6434be440319537976fa686e060";
const secret = "a7bc30bb543c4caf83de1a59517e300c";
const userID = "21sr34se72fr6osxl6tbjw3fy";
let token = "";
let getPlaylistUser = "";

axios
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
    let data = res.data;
    token = data.access_token;

    axios
      .get(`${baseURL}/users/${userID}/playlists`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        getPlaylistUser = res.data
      }).catch((e)=>{
        console.log(e)
      });
  });

export { getPlaylistUser };
