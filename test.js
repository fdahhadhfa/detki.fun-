const axios = require("axios");

axios
  .get(`https://92.255.109.167:8080/api/getProducts`)
  .then((response) => {
    console.log(response);
  })
  .catch((err) => console.error(err));

setInterval(() => {}, 99999);
