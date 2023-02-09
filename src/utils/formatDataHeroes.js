module.exports = async (data) => {
 return data.map((hero) => ({
		id: hero.id,
		name: hero.localized_name,
		roles: hero.roles,
		ability:
			hero.primary_attr === "agi"
				? "green"
				: hero.primary_attr === "str"
				? "strength"
				: "alliance",
 })); 
}