import Phaser from 'phaser'

const KEY_CRATE = 'crate'

class Crate extends Phaser.Physics.Matter.Image
{
    constructor(scene: Phaser.Scene,x: number, y: number, key: string)
    {
        super(scene.matter.world, x, y, key)
    }
}
export default class CratePool extends Phaser.GameObjects.Group
{
	constructor(scene: Phaser.Scene, config: Phaser.Types.GameObjects.Group.GroupConfig = {})
	{
		const defaults: Phaser.Types.GameObjects.Group.GroupConfig = {
			classType: Crate    ,
			maxSize: -1
		}

		super(scene, Object.assign(defaults, config))
	}

	spawn(x = 0, y = 0, key: string = KEY_CRATE)
	{
        const spawnExisting = this.countActive(false) > 0
        const crate: Crate = super.get(x, y, key)

        if (!crate)
        {
            return
        }

        if (spawnExisting)
        {
            crate.setVisible(true)
		    crate.setActive(true)
            crate.world.add(crate.body)
        }
        
        return crate
	}

	despawn(crate: Crate)
	{
        crate.setActive(false)
		crate.setVisible(false)
		crate.removeInteractive()
		crate.world.remove(crate.body)
	}

    initializeWithSize(size: number)
	{
		if (this.getLength() > 0 || size <= 0)
		{
			return
		}

		this.createMultiple({
			key: KEY_CRATE,
			quantity: size,
			visible: false,
			active: false
		})
	}
}

Phaser.GameObjects.GameObjectFactory.register('cratePool', function () {
	// @ts-ignore
	return this.updateList.add(new CratePool(this.scene));
})

export {
	KEY_CRATE
}