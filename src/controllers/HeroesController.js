const axios = require ("../config/axios/instance");
const formatDataHeroes = require("../utils/formatDataHeroes");
module.exports = {
  getHeroes: async (req, res) => {
    const { data } = await axios.get("/heroes");
    const heroes = await formatDataHeroes(data)
    return res.render("index", { heroes, recomendHeroes: [] });
  },
  getWinRate: async (data) => {
    
    return winRateHero;
  },
  searchHeroes: async (req, res) => {
    try {
      const roles = [
			{ name: "Carry",  count: 2 },
			{ name: "Durable", count: 1 },
			{ name: "Support", count: 2 },
		];
      const { hero } = req.body
      const { data } = await axios.get("/heroes");
      const heroesSplited = [...hero].filter(hero => hero !== '0')
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
      const heroesWithWinRatep = await Promise.all(heroesWithWinRate);
      const result = await  heroesWithWinRatep.filter((hero) => {
        return hero.filter((item) => item.winRate.length == heroesSplited.length);
      })[0]
      if(!result) return res.json({recomendHeroes:[]})
      const heroesWithCountWinRate = result.map( hero => {
        const countWinRate = parseFloat(  hero.winRate.reduce((a, b) => a + b, 0).toFixed(2))
        return {
          ...hero,
          cont_win_rate:(countWinRate - (50* heroesSplited.length)).toFixed(2)
        }
      })
      // sort by count winrate from hight to lowest
      heroesWithCountWinRate.sort((a, b) => b.cont_win_rate - a.cont_win_rate)
      console.log(heroesWithCountWinRate)
      if (heroesSplited.length < 5) {
        const heroesWithHighestWinRate = heroesWithCountWinRate.slice(0, 10)
        return res.json({recomendHeroes: heroesWithHighestWinRate});
      }
      const finalTeams = []
      heroesWithCountWinRate.forEach(element => {
        roles.forEach(role => {
          if (element.roles.includes(role.name) && role.count > 0) {
            role.count -= 1
            finalTeams.push(element)
          }
        })
      });
        return res.json({ recomendHeroes:finalTeams });
    } catch (error) {
      console.log(error)
      res.json({
        message: "error",
        error,

      })
    }
  }
  
}