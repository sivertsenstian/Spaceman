define(
  [
    'SS/platformer/state/base_state',
    'level/map_loader',
    'level/parallax_background',
    'entities/entity_factory'
  ],

  function (SSBaseState, MapLoader, ParallaxBackground, EntityFactory) {
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
      },

      preload: function () {
        //Load map
        this.map = this.mapLoader.init(this.level);

        //Set background
        this.background = new ParallaxBackground(this.game, this.map.widthInPixels, this.map.heightInPixels, this.level.background_layers);

        //Set groups
        //this.groups = {
        //  'all': this.game.add.group(),
        //  'friendly': this.game.add.group(),
        //  'hostile': this.game.add.group(),
        //  'neutral': this.game.add.group()
        //}
        this.groups = {
          'all': [],
          'friendly': [],
          'hostile': [],
          'neutral': []
        }
      },

      create: function () {
        //Load layers
        this.mapLoader.loadLayersOfType('background');
        this.mapLoader.loadLayersOfType('terrain');

        this.mapLoader.loadObjectsOfType('friendly');
        this.mapLoader.loadObjectsOfType('hostile');

        this.mapLoader.loadLayersOfType('foreground');
      },

      update: function () {
        this.background.update(this.game.camera);
      },

      render: function () {
        if (this.game.debugmode) {
          //RENDER RECTANGLE FOR ENTITIES
          for (var i = 0; i < this.groups.all.length; i++) {
            this.game.debug.rectangle(this.groups.all[i].body, 'rgba(255,0,255,0.35)');
          }
          this.game.time.advancedTiming = true;
          this.game.debug.cameraInfo(this.game.camera, 100, 32);
          this.game.debug.text(this.game.time.fps || '--', 2, 32, "#00ff00", '30px Arial');
        }
      },

      restart: function () {
        console.log("RESTARTING LEVEL");
        this.game.state.restart(true, false);
      }
    })

  });