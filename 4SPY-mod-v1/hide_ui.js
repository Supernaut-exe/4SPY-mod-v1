// CREDIT TO NEXI FOR THE CODE <3

pc.app.on("Map:Loaded", () => {
  setTimeout(() => {
    gameplayStuff();
  }, 2000);
});

pc.app.on("Player:Leave", () => {
  window.location.replace("https://venge.io");
});

setTimeout(() => {
  pc.app.scripts.list()[7].prototype.onHeadshot = function (t, e) {
    this.app.fire("DealtDamage:Trigger", e, t, true),
      this.screenEntity.sound.play("Headshot"),
      this.hitmarkerEntity.element.opacity = 1,
      this.hitmarkerEntity.setLocalScale(0.3, 0.3, 0.3),
      this.hitmarkerEntity
        .tween(this.hitmarkerEntity.getLocalScale())
        .to(
          {
            x: 1.2,
            y: 1.2,
            z: 1.2,
          },
          0.25,
          pc.BackOut
        )
        .start(),
      (this.lastHeadshot = Date.now());
  };
}, 1000);

function gameplayStuff() {
  const game = pc.app.root.findByName("Game");
  if (!game) {
    console.error("Game object not found.");
    return;
  }

  const overlay = game.findByName("Overlay");
  const characterSound = game.findByName("CharacterSound");
  const playerHolder = game.findByName("PlayerHolder");

  if (overlay && overlay.sound && overlay.sound.slots["Headshot"]) {
    overlay.sound.slots["Headshot"].overlap = true;
  }

  if (playerHolder) {
    setTimeout(() => {
      const LiliumDefault = pc.app.assets.getAssetById(29694230).resources[0];
      const ShinDefault = pc.app.assets.getAssetById(32463625).resources[0];
      const EchoDefault = pc.app.assets.getAssetById(37198907).resources[0];
      const KuluDefault = pc.app.assets.getAssetById(55399331).resources[0];

      playerHolder.children.forEach((child) => {
        const enemyScript = child.script.enemy;
        if (enemyScript.heroSkin == "Default") {
          if (child.findByName("ModelHolder")) {
            const modelHolder = child.findByName("ModelHolder");

            modelHolder.findByName("Lilium").model.meshInstances[0].material.diffuseMap = LiliumDefault;
            modelHolder.findByName("Lilium").model.meshInstances[0].material.update();

            modelHolder.findByName("Shin").model.meshInstances[0].material.diffuseMap = ShinDefault;
            modelHolder.findByName("Shin").model.meshInstances[0].material.update();

            if (enemyScript.hero == "Echo") {
              console.log("Found an Echo in the game");
              modelHolder.findByName("Echo").model.meshInstances[0].material.diffuseMap = EchoDefault;
              modelHolder.findByName("Echo").model.meshInstances[0].material.update();
            } else if (enemyScript.hero == "Kulu") {
              console.log("Found a Kulu in the game");
              modelHolder.findByName("Kulu").model.meshInstances[0].material.diffuseMap = KuluDefault;
              modelHolder.findByName("Kulu").model.meshInstances[0].material.update();
            }
          }
        }
      });
    }, 2000);
  } else {
    console.error("PlayerHolder not found.");
  }

  if (characterSound && characterSound.sound && characterSound.sound.slots) {
    characterSound.sound.slots["Shin-Jump-1"].volume = 0.5;
    characterSound.sound.slots["Shin-Jump-2"].volume = 0.5;
    characterSound.sound.slots["Lilium-Jump-1"].volume = 0.6;
    characterSound.sound.slots["Lilium-Jump-2"].volume = 0.6;
    characterSound.sound.slots["Lilium-Grunt-1"].volume = 1;
    characterSound.sound.slots["Lilium-Grunt-2"].volume = 1;
    characterSound.sound.slots["Lilium-Grunt-3"].volume = 1;
    characterSound.sound.slots["Lilium-Death-1"].volume = 1;
    characterSound.sound.slots["Echo-Jump-1"].volume = 1;
    characterSound.sound.slots["Echo-Jump-2"].volume = 1;
    characterSound.sound.slots["Shin-Jump-1"].volume = 0.8;
    characterSound.sound.slots["Shin-Jump-2"].volume = 0.8;
  }

  if (pc.app.scripts.list()[166]) {
    pc.app.scripts.list()[166].prototype.showAds = null;
  }

  const unlockItemReward = game.findByName("UnlockItemReward");
  if (unlockItemReward) {
    unlockItemReward.enabled = false;
  }

  pc.app.on("Overlay:Leaderboard", LeaderboardChanges);

  function LeaderboardChanges() {
    try {
      const leaderboard = overlay.findByName("Leaderboard");
      if (leaderboard) {
        leaderboard.children.forEach((child) => {
          if (child.element) {
            child.element.opacity = 0;
          } else {
            console.warn("No element component found for child:", child);
          }
        });
      }
    } catch (error) {
      console.error("Error modifying leaderboard:", error);
    }
  }
}
