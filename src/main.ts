import Phaser from 'phaser'

import HelloWorldScene from './scenes/HelloWorldScene'
import CratesScene from './scenes/crateScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'matter',
		matter: {
			debug: true
		}
	},
	scene: [CratesScene]
}

export default new Phaser.Game(config)
