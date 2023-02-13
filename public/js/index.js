// if user click tr in table then use css tr-selected
const card = ({ name, win_rate, roles, label }) => {
  return ` <div class="card my-4 li-pick col mt-0" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${label.toLowerCase().split(' ').join('_') }.png" id="hero-image" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title" id="hero-name">${name}</h5>
        <p class="card-text" id="hero-winrate">(${win_rate})</p>
        <p class="card-text">
          <div class=" text-white" style="background: #3C3B4E;">
            <div class="row g-2 row-cols-3 mx-auto px-auto" id="hero-roles">
              ${roles}
            </div>
          </div>
        </p>
      </div>
    </div>
  </div>
</div>`;
}
const roleCard = (role) => {
  return `<p  class=" text-white box-role text-center py-1 px-2 col mx-1 " data-role="${role}" id="hero-list-role">${role}</p>`;
}

let selectedPicker =0
const table = document.querySelector("#heroes-list-table");

table.addEventListener("click", (e) => {
  const tr = e.target.closest("tr");
  if (!tr) return;
  const current = table.querySelector(".tr-selected");
  if (current) {
    current.classList.remove("tr-selected");
  }
  const id = tr.cells[0].innerHTML;
  const image = tr.cells[1].lastElementChild.src;
  const name = tr.cells[2].innerHTML;
  const ability = tr.cells[3].lastElementChild.src;
  tr.classList.add("tr-selected");
  picker = document.querySelector(`.picker-${selectedPicker}`);

  picker.querySelector("#picker-hero-id-" + selectedPicker).innerHTML = id;
  picker.querySelector("#picker-hero-name-" + selectedPicker).innerHTML = name;
  picker.querySelector("#picker-hero-img-" + selectedPicker).src = image;
  picker.querySelector("#picker-hero-ability-" + selectedPicker).src = ability;
});

const heroesData = document.querySelector("#heroes-list-table");

document
	.querySelector("#search-hero-table")
	.addEventListener("input", async (e) => {
		// .addEventListener(, async (e) => {
		const rowLength = heroesData.rows.length;
		const searchValue = e.target.value.toLowerCase();
		for (let i = 0; i < rowLength; i++) {
			const heroName =
        heroesData.rows[i].cells[2].innerHTML.toLowerCase();
      const roleName = heroesData.rows[i].cells[4].lastElementChild.innerHTML.toLowerCase();
			if (heroName.indexOf(searchValue) > -1 || roleName.indexOf(searchValue) > -1) {
				heroesData.rows[i].style.display = "";
			} else {
				heroesData.rows[i].style.display = "none";
			}
		}
		// const heroesHtml = document.querySelector("#heroes-list-table");
	});

document.querySelectorAll(".picker").forEach(element => {
  
  element.addEventListener("click", (e) => {
    pickerClass = Array.from(e.target.closest(".picker").classList);
    selectedPicker = pickerClass[2][pickerClass[2].length - 1];
  });
})

document.querySelector('[name="generate"]').addEventListener('click', async (e) => {
  e.preventDefault();
  const selectedHeroes = []
  
  document.querySelectorAll(".picker-hero-ids")
    .forEach((element) => {
      if(element.innerHTML != "0")selectedHeroes.push(element.innerHTML);
		}); 
  const heroes = await fetch("/search", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ hero: selectedHeroes }),
  }).then((res) => res.json());
  let heroCards =""
  heroes.recomendHeroes.forEach((hero) => {
    role=""
    hero.roles.forEach(item => {
      role += roleCard(item)
    })
				heroCards += card({
					name: hero.localized_name,
					win_rate: hero.cont_win_rate,
          roles: role,
          label: hero.label
				});
  });
document.querySelector("#recomend-hero-container").innerHTML =heroCards ;
});
