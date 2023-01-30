const axios = require ("../config/axios/instance")
module.exports = {
  getHeroes: async (req, res) => {
    const { data } = await axios.get("/heroes");
    const heroes = data.map((hero) => ({ id: hero.id, name: hero.localized_name,roles: hero.roles}))
    return res.render("index", { heroes });
  },
  getWinRate: async (data) => {
    
    return winRateHero;
  },
  searchHeroes: async (req, res) => {
    try {
      
      const { hero } = req.body
      const { data } = await axios.get("/heroes");
      const heroesSplited = hero.split(",")
      const heroes = [...data]
      const heroesWithWinRate = heroesSplited.map(async (element,index) => {
        const { data: matchUp } = await axios.get(`/heroes/${element}/matchups`)
        return matchUp.map(  match => {
          const hero = heroes.find(hero => hero.id === match.hero_id)
          if(hero.winRate == undefined) hero.winRate = []
          if (hero) {
            hero.winRate.push( parseFloat(((match.wins / match.games_played)*100).toFixed(2)) )
          }
          return hero
        })
      }); 
      console.log(heroesWithWinRate)
      const result = await heroesWithWinRate[heroesWithWinRate.length - 1]
      const heroesWithCountWinRate = result.map(hero => {
        const countWinRate = parseFloat(hero.winRate.reduce((a, b) => a + b, 0).toFixed(2))
        return {
          ...hero,
          countWinRate
        }
      })
        res.json(heroesWithCountWinRate);
    } catch (error) {
      console.log(error)
      res.json({
        message: "error",
        error,

      })
    }
  }
  
}