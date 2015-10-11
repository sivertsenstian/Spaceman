define(
    [
        'SS/platformer/state/base_state',
        'level/asset_loader',
        './play_state'
    ],

    function (SSBaseState, AssetLoader, PlayState) {
        return function (level) {
            this.level = level;
        }
        .inherits(SSBaseState)
        .extend({
            preload: function () {
                var loader = new AssetLoader(this.game);
                loader.load(this.level.assets);

                //this.game.load.tilemap('level_tilemap', 'assets/maps/level1_map.json', null, Phaser.Tilemap.TILED_JSON);
                ////this.game.load.image('tiles_ground', 'assets/images/spritesheet_ground.png');
                ////this.game.load.image('items', 'assets/spritesheets/items.png');

                //this.game.load.image('mainmenu_background', 'assets/backgrounds/menu.jpg');

                //this.game.load.image('parallax_background', 'assets/backgrounds/bg.png');
                //this.game.load.image('parallax_far', 'assets/backgrounds/far.png');
                //this.game.load.image('parallax_middle', 'assets/backgrounds/middle.png');

                

                //this.game.load.spritesheet('player', 'assets/spritesheets/player_walk.png', 66, 93, 3);
                //this.game.load.spritesheet('slime', 'assets/spritesheets/enemy_slime.png', 50, 25, 3);
                //this.game.load.spritesheet('snail', 'assets/spritesheets/enemy_snail.png', 60, 32, 2);
                //this.game.load.spritesheet('fly', 'assets/spritesheets/enemy_fly.png', 72, 36, 2);
            },

            create: function () {
                this.game.state.add('play', new PlayState(this.level));
                this.state.start('play');
            }
        })

    });