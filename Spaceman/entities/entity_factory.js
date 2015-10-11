define(
  [
    'SS/platformer/factory',
    './friendly/spaceman',
    './hostile/slime',
    './hostile/snail',
    './hostile/fly'
  ],

  function (SSFactory, Spaceman, Slime, Snail, Fly) {

    return function (game_state) {
      this.game_state = game_state;
    }
      .inherits(SSFactory)
      .extend({
        create: function (object) {
          var entity;
          switch (object.type) {
            case "player":
              entity = new Spaceman(this.game_state, object.x, object.y, 'player', null, object.properties);
              this.game_state.groups.all.push(entity);
              this.game_state.groups.friendly.push(entity);
              //this.game_state.groups.all.add(entity);
              //this.game_state.groups.friendly.add(entity);
              break;

            case "slime":
              entity = new Slime(this.game_state, object.x, object.y, 'slime', null, object.properties);
              this.game_state.groups.all.push(entity);
              this.game_state.groups.hostile.push(entity);
              //this.game_state.groups.all.add(entity);
              //this.game_state.groups.hostile.add(entity);
              break;

            case "snail":
              entity = new Snail(this.game_state, object.x, object.y, 'snail', null, object.properties);
              this.game_state.groups.all.push(entity);
              this.game_state.groups.hostile.push(entity);
              //this.game_state.groups.all.add(entity);
              //this.game_state.groups.hostile.add(entity);
              break;

            case "fly":
              entity = new Fly(this.game_state, object.x, object.y, 'fly', null, object.properties);
              this.game_state.groups.all.push(entity);
              this.game_state.groups.hostile.push(entity);
              //this.game_state.groups.all.add(entity);
              //this.game_state.groups.hostile.add(entity);
              break;
          }
        }
      })
  });