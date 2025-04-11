const weaponpos = { x: -0.01, y: 0, z: 0.45 }

pc.app.on('Player:Focused', function (state) {
    try {
        if (state) {
        } else {
            pc.app.root.findByName("WeaponCenter").setLocalPosition(weaponpos.x, weaponpos.y, weaponpos.z)
        }
    } catch (error) {
        console.log(error)
    }
});  