define(
  [
    'SS/platformer/factory',
    './friendly/spaceman',
    './hostile/slime',
    './hostile/snail',
    './hostile/fly',
    './neutral/coin',
    './neutral/goal',
    './neutral/powerup/mushroom_powerup',
    './neutral/block/block_question',
    './neutral/block/block_destructible'
  ],

  function (SSFactory, Spaceman, Slime, Snail, Fly, Coin, Goal, MushroomPowerup, BlockQuestion, BlockDestructible) {

    return function (game_state) {
      this.game_state = game_state;
    }
      .inherits(SSFactory)
      .extend({
        create: function (object, type) {
          var entity;
          object.properties = object.properties || {};
          object.properties.entityType = type;          
          switch (object.type) {
            // FRIENDLY
            case "player":
              entity = new Spaceman(this.game_state, object.x, object.y, 'player_small', null, object.properties);
              break;

            // HOSTILE
            case "slime":
              entity = new Slime(this.game_state, object.x, object.y, 'hostile', null, object.properties);
              break;

            case "snail":
              entity = new Snail(this.game_state, object.x, object.y, 'hostile', null, object.properties);
              break;

            case "fly":
              entity = new Fly(this.game_state, object.x, object.y, 'hostile', null, object.properties);
              break;

            // NEUTRAL
            case "coin":
              entity = new Coin(this.game_state, object.x, object.y, 'neutral', null, object.properties);
              break;       
              
            case "goal":
              object.properties.width = object.width;
              object.properties.height = object.height;
              entity = new Goal(this.game_state, object.x, object.y, null, null, object.properties);
              break;
              
            case "mushroomPowerup":
              entity = new MushroomPowerup(this.game_state, object.x, object.y, 'neutral', null, object.properties);
              break;
              
            case "blockQuestion":    
              object.properties.block = true;       
              entity = new BlockQuestion(this.game_state, object.x, object.y, 'neutral', null, object.properties);
              break;
              
            case "blockDestructible":    
              object.properties.block = true;       
              entity = new BlockDestructible(this.game_state, object.x, object.y, 'neutral', null, object.properties);
              break;              
          }
          if (entity) {
            this.game_state.groups[type].add(entity);
            return entity;
          }
          
          return null;
        }
      })
  });