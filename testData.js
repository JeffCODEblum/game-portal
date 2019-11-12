module.exports = {
    items: [
       {
           title: 'Super Chicken',
           description: 'You flew the coop now escape the predators in this casual arcade game.',
           body: 'Use W, A, S, D or swipe to move, escape the foxes, collect the coffe for an invincibility powerup',
           directory: 'super-chicken',
           width: '400',
           height: '600',
           audioTags: [
            { id: 'boopSound', path: 'files/boop.wav' },
            { id: 'gongSound', path: 'files/gong.wav' },
            { id: 'chimeSound', path: 'files/chime.wav' },
            { id: 'powerSound', path: 'files/power.wav' },
            { id: 'hit1Sound', path: 'files/hit1.wav' }
           ],
           scripts: [
            "files/config.js",
            "files/particleEngine.js",
            "files/particle.js",
            "files/powerUp.js",
            "files/powerUpEngine.js",
            "files/hud.js",
            "files/npcEngine.js",
            "files/npc.js",
            "files/viewport.js",
            "files/player.js",
            "files/ctrl.js",
            "files/spriteSet.js",
            "files/renderer.js",
            "files/tile.js",
            "files/map.js",
            "files/game.js",
            "files/index.js"
           ]
       },
       {
        title: 'Clustercluck',
        description: 'A chicken farming sim survival game. Start with a couple of chickens and see what you get!',
        body: 'W, A, S, D to move, mouse to grab/use items, E to drop an item. Protect the chickens, repair the fence, buy upgrades.',
        directory: 'clustercluck',
        width: '120',
        height: '80',
        audioTags: [
            {id: "chickSound", path: "chick.wav"},
            {id: "powerSound", path: "power.wav"},
            {id: "shootSound", path: "shoot2.wav"},
            {id: "coinSound", path: "coin.wav"},
            {id: "hurtSound", path: "./hit.wav"},
            {id: "hammerSound", path: "./shoot.wav"},
            {id: "hurtSound2", path: "./hurt.wav"},
            {id: "crackSound", path: "./crack.wav"},
            {id: "theme", path: "./themeShort.wav"}
        ],
        scripts: [
            "const.js",
            "renderer.js",
            "map.js",
            "player.js",
            "controller.js",
            "background.js",
            "itemManager.js",
            "chickenManager.js",
            "foxManager.js",
            "gun.js",
            "hud.js",
            "fx.js",
            "game.js"
        ]
        },
        {
            title: 'Crossy Craft',
            description: 'Minecraft-inspired voxels get a Crossy Road style, isometric aesthetic in this game engine concept.',
            body: 'W, A, S, D to move around and J to delete a block',
            directory: 'crossy-craft',
            width: '1600',
            height: '1200',
            audioTags: [
            ],
            scripts: [
                'main.js'
            ]
        },
        {
            title: 'ThreeJS FPS',
            description: 'A browser-based first person shooter concept.',
            body: 'W, A, S, D to move, mouse to look and shoot.',
            directory: 'threejs-fps',
            width: '100%',
            height: '100vh',
            audioTags: [
            ],
            scripts: [
                'main.js'
            ]
        },
        {
            title: 'Son of a Breach',
            description: 'Protect the castle from the goblin horde with 3 playable character classes.',
            body: 'Use W, A, S, D to move, arrow keys to attack, J to change classes.',
            directory: 'breach',
            width: '64',
            height: '64',
            audioTags: [
            ],
            scripts: [
                "const.js",
                "renderer.js",
                "map.js",
                "player.js",
                "controller.js",
                "npcManager.js",
                "viewport.js",
                "hud.js",
                "SpriteSet.js",
                "weapon.js",
                "index.js"
            ]
        },
        {
            title: 'Lattice',
            description: 'An arcade adventure game with goblins and swords.',
            body: 'Use W, A, S, D to move, J to attack',
            directory: 'lattice',
            width: '480',
            height: '320',
            audioTags: [
                {id: "coin", path: "Pickup_Coin9.wav"},
                {id: "hit", path: "Hit_Hurt5.wav"},
                {id: "hit2", path: "Hit_Hurt7.wav"}
            ],
            scripts: [
                "index.js"
            ]
        },
        {
            title: 'Island World',
            description: '',
            body: 'Use W, A, S, D to move, J to get in and out of the boat.',
            directory: 'island',
            width: '',
            height: '',
            audioTags: [
               
            ],
            scripts: [
                "index.js"
            ]
        }
    ]
}