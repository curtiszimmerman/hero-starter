
/*\///////////////////////////////////////////////////////////////*\
|*|                                                              |*|
|*|            ---<( www.javascriptbattle.com )>---              |*|
|*|                                                              |*|
|*|                 curtis.zimmerman@gmail.com                   |*|
\*///////////////////////////////////////////////////////////////\*/

// we don't want to write a sloppy weenie of a warrior...
"use strict";

var stats = {
	check: false,
	fleeing: false,
	strategy: {
		current: false
	},
	target: {
		current: false
	},
	last: 'Stay',
	hitpoints: 1
};

var move = function( gameData, helpers ) {
	/*\//////////////////////////////////////////////////////////////////*\
	|*| seriously, our default network is to 1) find weaker enemies and |*|
	|*| destroy them, 2) find and claim diamond mines, 3) find and rob  |*|
	|*| graves. well, our default network is to defeat our enemies, to  |*|
	|*| see them driven before us and hear the lamentation of his women |*|
	\*//////////////////////////////////////////////////////////////////\*/

	function _check() {
		// check our immediate area for an appealing target, otherwise 
		// flee, fuck your buddy, or move towards an appealing target
		return false;
	};

	function _escape() {
		// devise and execute a short-term emergency juke... if and when 
		// our hero is followed by a stronger enemy, haul ass to a heal
		// potion, trying to position the enemy adjacent to our hero but 
		// the heal potion adjacent to our hero :)
		return false;
	};

	function _planMove() {
		return false;
	};

	function _target() {
		// find something outside of our immediate area
		return false;
	};

	// we prefer the following activities:
	// 1) slaughter
	// 2) mines, unclaimed
	// 3) mines, enemy
	// 4) priestly duties
	// 5) grave-robbing as a crime of opportunity
	// 6) healing as a long-term strategy for NOT DYING

	// example action trees:
	// a) target weak enemy, fight, run to nearest healing potion, return for scalp
	// b) on way to conquer mine, rob a grave
	// c) heal friend while he fights two baddies
	// d) run from groups of baddies until you get one by himself

	// quantify our immediate environment
	var justis = gameData.activeHero;
	stats.hitpoints = justis.health;
	// check describes the immediacy of kinetic warfare
	var check = false;

	var validDirections = ['North', 'East', 'South', 'West'];
	var validMoves = ['North', 'East', 'South', 'West', 'Stay'];

	// every soldier a sensor!
	var healPotion = helpers.findNearestHealthWell(gameData) || false;
	var enemy = helpers.findNearestEnemy(gameData) || false;
	var friend = helpers.findNearestTeamMember(gameData) || false;
	var fodder = helpers.findNearestWeakerEnemy(gameData) || false;
	var unownedMine = helpers.findNearestUnownedDiamondMine(gameData) || false;
	var enemyMine = helpers.findNearestNonTeamDiamondMine(gameData) || false;
	var bones = helpers.findNearestObjectDirectionAndDistance(gameData. board, justis, function(boardTile) {
		if (boardTile.type === 'Bones') {
			return true;
		}
	}) || false;

	/*\//////////////////////////////////////////////////////////////////*\
	|*| going against every bone in my combat infantry veteran body, we |*|
	|*| will try to put a teammate between our hero and the nearest     |*|
	|*| enemy unless that enemy is weaker than us (and more or less     |*|
	|*| isolated), since that's what douchebags would do to win a fight |*|
	\*//////////////////////////////////////////////////////////////////\*/
	
	// if nearest object is grave and hero is adjacent, rob it!
	if (bones && bones.distance === 1) {
		return stats.last = bones;
	} else if (stats.hitPoints < 100 && healPotion.distance === 1) {
		return stats.last = healPotion;
	// if we are hurt bad, head to a heal potion
	} else if (stats.hitpoints < 40) {
		return stats.last = healPotion;
	// throow a free heal at your buddy
	} else if (friend && friend.distance === 1 && last !== 'Stay') {
		return stats.last = friend; 
	// if the nearest enemy is weaker, go slaughter him and reave his soul
	} else if (fodder && enemy === fodder) {
		return stats.last = fodder;
	// otherwise head to the nearest unowned mine, or the nearest enemy mine
	} else if (unownedMine && enemyMine && unownedMine.distance < enemyMine.distance) {
		return stats.last = unownedMine;
	} else if (enemyMine) {
		return stats.last = enemyMine;
	} else if (enemy) {
		return stats.last = enemy;
	} else if (friend) {
		return stats.last = friend;
	} else {
		return stats.last = 'Stay';
	}
	return stats.last = 'South';
};

// Export the move function here
module.exports = move;

/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

/* 

	The only function that is required in this file is the "move" function

	You MUST export the move function, in order for your code to run
	So, at the bottom of this code, keep the line that says:

	module.exports = move;

	The "move" function must return "North", "South", "East", "West", or "Stay"
	(Anything else will be interpreted by the game as "Stay")
	
	The "move" function should accept two arguments that the website will be passing in: 
		- a "gameData" object which holds all information about the current state
			of the battle

		- a "helpers" object, which contains useful helper functions
			- check out the helpers.js file to see what is available to you

		(the details of these objects can be found on javascriptbattle.com/#rules)

	This file contains four example heroes that you can use as is, adapt, or
	take ideas from and implement your own version. Simply uncomment your desired
	hero and see what happens in tomorrow's battle!

	Such is the power of Javascript!!!

*/

//TL;DR: If you are new, just uncomment the 'move' function that you think sounds like fun!
//       (and comment out all the other move functions)

// // The "Safe Diamond Miner"
/*var move = function(gameData, helpers) {
	var myHero = gameData.activeHero;

	//Get stats on the nearest health well
	var healthWellStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
		if (boardTile.type === 'HealthWell') {
			return true;
		}
	});
	var distanceToHealthWell = healthWellStats.distance;
	var directionToHealthWell = healthWellStats.direction;
	

	if (myHero.health < 40) {
		//Heal no matter what if low health
		return directionToHealthWell;
	} else if (myHero.health < 100 && distanceToHealthWell === 1) {
		//Heal if you aren't full health and are close to a health well already
		return directionToHealthWell;
	} else if (myHero.health < 100 && distanceToHealthWell === 1) {
		//Heal if you aren't full health and are close to a health well already
		return directionToHealthWell;
	} else {
		//If healthy, go capture a diamond mine!
		return helpers.findNearestNonTeamDiamondMine(gameData);
	}
};*/

// // The "Priest"
// // This hero will heal nearby friendly champions.
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;
//   if (myHero.health < 60) {
//     return helpers.findNearestHealthWell(gameData);
//   } else {
//     return helpers.findNearestTeamMember(gameData);
//   }
// };

// // The "Unwise Assassin"
// // This hero will attempt to kill the closest enemy hero. No matter what.
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;
//   if (myHero.health < 30) {
//     return helpers.findNearestHealthWell(gameData);
//   } else {
//     return helpers.findNearestEnemy(gameData);
//   }
// };

// // The "Careful Assassin"
// // This hero will attempt to kill the closest weaker enemy hero.
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;
//   if (myHero.health < 50) {
//     return helpers.findNearestHealthWell(gameData);
//   } else {
//     return helpers.findNearestWeakerEnemy(gameData);
//   }
// };

// // The "Safe Diamond Miner"
/*var move = function(gameData, helpers) {
	var myHero = gameData.activeHero;

	//Get stats on the nearest health well
	var healthWellStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
		if (boardTile.type === 'HealthWell') {
			return true;
		}
	});
	var distanceToHealthWell = healthWellStats.distance;
	var directionToHealthWell = healthWellStats.direction;
	

	if (myHero.health < 40) {
		//Heal no matter what if low health
		return directionToHealthWell;
	} else if (myHero.health < 100 && distanceToHealthWell === 1) {
		//Heal if you aren't full health and are close to a health well already
		return directionToHealthWell;
	} else {
		//If healthy, go capture a diamond mine!
		return helpers.findNearestNonTeamDiamondMine(gameData);
	}
};*/

// // The "Selfish Diamond Miner"
// // This hero will attempt to capture diamond mines (even those owned by teammates).
// var move = function(gameData, helpers) {
//   var myHero = gameData.activeHero;

//   //Get stats on the nearest health well
//   var healthWellStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
//     if (boardTile.type === 'HealthWell') {
//       return true;
//     }
//   });

//   var distanceToHealthWell = healthWellStats.distance;
//   var directionToHealthWell = healthWellStats.direction;

//   if (myHero.health < 40) {
//     //Heal no matter what if low health
//     return directionToHealthWell;
//   } else if (myHero.health < 100 && distanceToHealthWell === 1) {
//     //Heal if you aren't full health and are close to a health well already
//     return directionToHealthWell;
//   } else {
//     //If healthy, go capture a diamond mine!
//     return helpers.findNearestUnownedDiamondMine(gameData);
//   }
// };
