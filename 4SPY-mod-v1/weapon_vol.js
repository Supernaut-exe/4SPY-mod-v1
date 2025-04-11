const weaponVolume = 1; // Value ranges from 0 to 1, 0 being 0% volume and 1 being 100% volume

pc.app.on('Map:Loaded', () => {
    const weapons = [
        'Scar',
        'Shotgun',
        'Sniper', 
        'Tec-9',
        'M4',
        'LMG', 
        'Desert-Eagle',
        'Dagger',
        'AK-47',
        'AWP'
    ];
    weapons.forEach((weaponName) => {
        pc.app.root.findByName(weaponName).sound.volume = weaponVolume;
    });
});
