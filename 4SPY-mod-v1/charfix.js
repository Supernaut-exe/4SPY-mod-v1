pc.Application.getApplication().once("postrender", function () {

    pc.app.scripts.list()[11].prototype.setHeroSkin = function(){
        var self     = this;
        var skinName = this.heroSkin;
    
        if(this.heroSkin == 'Default'){
            skinName = this.hero + '-' + this.heroSkin + '.jpg';
        }
    
        //console.log('Load skin for ', this.username, skinName, this.hero, this.heroSkin);
        
        if(
            skinName && 
            this.characterEntity
        ){
            if(
                skinName.search('Model-') > -1 ||
                skinName.search('.glb') > -1
            ){
                var assetID = this.app.assets.find(
                    skinName
                ).id;
                this.characterEntity.model.asset = assetID;
    
                var asset   = this.app.assets.get(assetID);
                asset.ready(function(){
                    self.handEntity  = self.characterEntity.findByName(self.handEntityName);
                    self.weaponHolder.reparent(self.handEntity);
                    console.log('Loaded model skin '  + self.username);
                });
            }else{
                var material = this.characterEntity.model.material.clone();
                var texture = pc.app.assets.find(this.hero + '-' + this.heroSkin + '.jpg');
                var meshInstances = this.characterEntity.model.meshInstances;
                
                //console.log(skinName, texture);
                if(meshInstances && meshInstances.length > 0){
                    for (var i = 0; i < meshInstances.length; ++i) { 
                        var mesh = meshInstances[i];
                        mesh.material = material;
                    }
    
                    if(texture){
                        material.diffuseMap = texture.resource;
                        material.update();
                    }
                }
                this.weaponHolder.reparent(this.handEntity);
            }
            this.characterEntity.animation.play('Idle');
        }else{
            this.weaponHolder.reparent(this.handEntity);
        }
    };

    pc.app.scripts.list()[9].prototype.createPlayer = function(data){
        var player = this.enemyEntity.clone();
            player.enabled = true;
            player.script.enemy.playerId = data.playerId;
            player.script.enemy.username = data.username;
            player.script.enemy.team     = data.team;
            //player.script.enemy.skin   = data.skin;
            player.script.enemy.level    = data.level;
            player.script.enemy.group    = data.group;
    
            player.script.enemy.skin     = data.skin;
            player.script.enemy.heroSkin = data.heroSkin;
        
            player.script.enemy.setUsername(data.username, data.team, data.level);
            player.script.enemy.killMessage = data.killMessage;
        
            //set weapon
            player.script.enemy.weaponSkins = data.weaponSkins;
            player.script.enemy.setWeapon(data.weapon);
            player.script.enemy.setCharacterSkin(data.skin, 'Default', data.dance);
    
        this.playerHolder.addChild(player);
        this.players.push(player);
    };
    console.log('Force Default Skin');
});

pc.app.on("Game:PlayerJoin", (state) => {
    var shinTexture = pc.app.assets.find('Shin-Default.jpg');
    if (state) {
        for (let i = 2; i <= pc.app.root.findByName("Game").findByName("PlayerHolder").children.length - 1; i++) {
            if(pc.app.root.findByName('PlayerHolder').children[i].script.enemy.skin != 'Shin'){
                pc.app.root.findByName('PlayerHolder').children[i].script.enemy.setCharacterSkin(pc.app.root.findByName('PlayerHolder').children[i].script.enemy.skin, "Default", pc.app.root.findByName('PlayerHolder').children[i].script.enemy.danceName);
            }else{
                pc.app.root.findByName('PlayerHolder').children[i].findByName('ModelHolder').findByName('Shin').model.meshInstances[0].material.diffuse = shinTexture.resource;
                pc.app.root.findByName('PlayerHolder').children[i].findByName('ModelHolder').findByName('Shin').model.meshInstances[0].material.update();
            }
        }
    }
})