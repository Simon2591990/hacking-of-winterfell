function run(first_strike_army_name, no_of_dragons, no_of_white_lords) {

	 class dragon  {
		constructor(id) {
			this.id = id
			this.baseDamage = 600,
			this.baseDefence = 600,
			this.damage = 600,
			this.defence = 600
		}
	}
	
	class infantry  {
		constructor(id) {
			this.id = id
			this.baseDamage = 2,
			this.baseDefence = 2,
			this.damage = 2,
			this.defence = 2
		}
	}
	
	class white {
		constructor(id) {
			this.id = id
			this.baseDamage = 50,
			this.baseDefence = 100,
			this.damage = 50,
			this.defence = 100
		}
	}
	class walker {
		constructor(id) {
			this.id = id
			this.baseDamage = 1,
			this.baseDefence = 3,
			this.damage = 1,
			this.defence = 3
		}
	}
	
	
	const dragons = []
	for (let i = 0; i < no_of_dragons; i++){
		dragons.push(new dragon(i))
	}
	
	const infantries = []
	for (let i = 0; i < 5000; i++){
		infantries.push(new infantry(i))
	}
	
	const whites = []
	for (let i = 0; i < no_of_white_lords; i++){
		whites.push(new white(i))
	}
	
	const walkers = []
	for (let i = 0; i < 10000; i++){
		walkers.push(new walker(i))
	}
	

	const attack = (attackers, defenders) => {
		if (defenders.length > 0){
			for (attacker of attackers){
				for (let i = defenders.length -1; i > -1; i -= 1){
					if (attacker.damage > 0){
						let defence = defenders[i].defence
						let damage = attacker.damage
						
						defenders[i].defence -= damage
						attacker.damage -= defence
						if (defenders[i].defence < 1){
							defenders.splice(i,1)
						}				
					}
				}
			}
		}
	}

	const resetDamage = (unitType) => {
		for (unit of unitType){
			unit.damage = unit.baseDamage
		}
	}

	const round = (attacker1, attacker2, defender1, defender2) => {
		attack(attacker1, defender1)		
		attack(attacker1, defender2)		
		attack(attacker2, defender1)		
		attack(attacker2, defender2)
		attack(defender1, attacker1)		
		attack(defender1, attacker2)		
		attack(defender2, attacker1)		
		attack(defender2, attacker2)
		resetDamage	(attacker1)	
		resetDamage	(attacker2)
		resetDamage(defender1)	
		resetDamage(defender2)	
	}
	
	let roundCounter = 0
	const play = () => {
		while ( dragons.length > 0 || infantries.length > 0 || whites.length > 0 || walkers.lenght > 0){
			if (first_strike_army_name === "Seven Armies"){
				round(dragons, infantries, whites, walkers)
				roundCounter += 1
			}
			else {
				round(whites, walkers, dragons, infantries)
				roundCounter += 1
			}

			if (dragons.length == 0 && infantries.length == 0){
				result = `walkers win at round ${roundCounter}`
				return
			}
			else if ( whites.length == 0 && walkers.length == 0){
				result = `humanity wins at round ${roundCounter}`
				return
			}
		}	
	}

	
	play()
	
    return result
}

run("Seven Armies", 1,1000)
