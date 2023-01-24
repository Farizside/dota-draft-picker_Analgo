const axios = require ("../config/axios/instance")
module.exports = {
  getHeroes: async (req, res) => {
    const { data } = await axios.get("/heroes");
    console.log(data)
    res.send(data);
  }
}