define(['SS/platformer/gameobject/static_entity'], function (SSStaticEntity, Coin) {

  return function (game_state, x, y, key, frame, properties) {
    SSStaticEntity.call(this, game_state, x, y, key, frame, properties);
    this.game_state.game.add.existing(this);

    this.game_state.game.physics.arcade.enable(this);
    
    this.animations.add("enabled",
        [
            'blockQuestion'
        ],
        1,
        true);
        
    this.animations.add("disabled",
        [
            'blockQuestionDisabled'
        ],
        1,
        true);
          
    this.animations.play('enabled');
    this.body.setSize(64, 64);
    this.body.allowGravity = false;
    this.body.immovable = true;
    this.used = false;
    this.activated = 0;
    this.count = this.count || 1;
    this.collision = true;
    this.cooldown = 500;
    this.lasthit = 0;
        
    //tweens
    this.tween = this.game_state.game.add.tween(this).to( { y: this.y - 20 }, 150, "Quart.easeOut");
    var reset = this.game_state.game.add.tween(this).to( { y: this.y }, 150, "Quart.easeOut");
    this.tween.chain(reset);
  }
  .inherits(SSStaticEntity)
  .extend({
    update: function () {
        if(this.lasthit > 0) {
            this.lasthit -= this.game_state.game.time.elapsed;
        }
    },
    
    hit: function (spaceman) {
        if(!this.used){
            if(this.lasthit <= 0 ) { 
                var spawned_entity = this.game_state.entityFactory.create({
                    type: this.spawn, 
                    x: this.x + 32, 
                    y: this.y - 32
                },
                    this.group || 'neutral'
                );
                spawned_entity.visible = false;
                this.tween.onComplete.add(function() {
                    var spawned_tween = this.game_state.game.add.tween(spawned_entity).to( { y: this.y - 100 }, 200, "Quart.easeOut");
                    
                    if(typeof(spawned_entity.tweenComplete) === "function") {
                        spawned_tween.onComplete.add(spawned_entity.tweenComplete, spawned_entity);
                    }
                    
                    spawned_entity.visible = true;
                    spawned_tween.start();
                    this.kill();
                }, this);
                
                this.activated++;
                this.tween.start();
                this.used = this.activated >= this.count;
                this.lasthit = this.cooldown;
            }
        }
    },
    
    kill: function () {
        if(this.alive && this.used) {
            this.alive = false;
            this.animations.play('disabled');
        }
    }
  })
});