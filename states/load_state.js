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
            },

            create: function () {
                this.game.state.add('play', new PlayState(this.level));
                this.state.start('play');
            }
        })

    });