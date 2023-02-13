const heroes = require("../../public/json/hero.json");
module.exports = async (data) => {
	
	return data.map((hero) => {
		let label = hero.localized_name;
		heroes.forEach((heroData) => { 
			label = heroData.name === hero.localized_name ? heroData.label : label;
		})
		console.log(label)
		return {
			id: hero.id,
			name: hero.localized_name,
			roles: hero.roles,
			label: label,
			ability:
				hero.primary_attr === "agi"
					? "parang"
					: hero.primary_attr === "str"
						? "strength"
						: "alliance",
		}
	}); 
}