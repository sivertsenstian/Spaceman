define(
  [
    'SS/platformer/state/base_state',
    'SS/platformer/gameobject/movable_entity',
    'level/map_loader',
    'level/parallax_background',
    'entities/entity_factory'
  ],

  function (SSBaseState, SSMovableEntity, MapLoader, ParallaxBackground, EntityFactory) {
    return function (level) {
      this.level = level;
    }
    .inherits(SSBaseState).extend({
      init: function () {
        this.mapLoader = new MapLoader(this);
        this.entityFactory = new EntityFactory(this);

        //Physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 980;

        this.groups = {
          'all': this.game.add.group(),
          'friendly': this.game.add.group(),
          'hostile': this.game.add.group(),
          'neutral': this.game.add.group()
        }
      },

      preload: function () {
        //Load map
        this.map = this.mapLoader.init(this.level);

        //Set background
        this.background = new ParallaxBackground(this.game, this.map.widthInPixels, this.map.heightInPixels, this.level.background_layers);
      },

      create: function () {
        //Load layers
        this.mapLoader.loadLayersOfType('background');
        this.mapLoader.loadLayersOfType('terrain');

        this.mapLoader.loadObjectsOfType('friendly');

        this.mapLoader.loadLayersOfType('foreground');
      },

      update: function () {

        for (var i = 0; i < this.groups.all.children.length; i++) {
          this.groups.all.children[i].update();
        }

        this.background.update(this.game.camera);
      },

      render: function () {
        if (this.game.debugmode) {
          this.game.time.advancedTiming = true;
          this.game.debug.cameraInfo(this.game.camera, 100, 32);
          this.game.debug.text(this.game.time.fps || '--', 2, 32, "#00ff00", '30px Arial');
          for (var i = 0; i < this.groups.all.children.length; i++) {
            this.game.debug.rectangle(this.groups.all.children[i].body, 'rgba(0,0,255,0.25)');
          }
        }
      }
    })

  });