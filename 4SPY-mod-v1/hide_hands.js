pc.app.on("Map:Loaded", () => {
  setTimeout(() => {
    pc.app.root.findByName("WeaponCenter").findByName("CharacterHandsHolder").setLocalScale(0, 0, 0);
    pc.settings.hideArms = true
  }, 2000);
});