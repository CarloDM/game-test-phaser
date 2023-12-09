import Phaser from "phaser";
import * as dat from 'dat.gui';

import CameraController from './cameraController';
import SelectionRect from './selectionRect';
import Tank from './tank';
import Wall from './wall';

import {createArray} from './collidersGenByimg';
export {config};


class setMapTest extends Phaser.Scene{
  constructor ()
  {super('setMapTest');
  this.wallsCord = []
  };
  
  preload(){

    const progress = this.add.graphics();

    this.load.on('progress', value =>
    {

        progress.clear();
        progress.fillStyle(0xffffff, 1);
        progress.fillRect(0, 270, 800 * value, 60);

    });

    this.load.on('complete', () =>
    {

        progress.destroy();

    });

    this.load.image('background','backgroundgrid-test.jpg');
    this.load.image('collisionMap','collision-map-test.png');
    this.load.image('wall','wall.png');
    this.load.image('tankdebug','tankdebug.png');
    this.wallsCord = createArray();
  };



  aspect = 2;

  create() {
    // const WALL_CATEGORY = Math.pow(2, 0); // Categoria per i muri
    // const TANK_CATEGORY = Math.pow(2, 1); // Categoria per i tank

    this.physics.world.setBounds(-650, -780, 2000, 2010);
    this.cameraController = new CameraController(this);
    // primi due valori sono di centratura immagine di 2000px
    this.add.image(700/this.aspect,450/this.aspect,'background');
    this.add.image(700/this.aspect,450/this.aspect,'collisionMap');

    const walls = this.physics.add.staticGroup();
    // this.wall1 = new Wall(this,  [180,155]);
    // this.wall2 = new Wall(this,  [250,255]);
    // this.wall3 = new Wall(this, [290,280]);
    // this.wall4 = new Wall(this,  [290,310]);
    // this.wall5 = new Wall(this,  [290,340]);
    // this.wall6 = new Wall(this,  [290,370]);
    
    // walls.addMultiple([this.wall1.wall, this.wall2.wall, this.wall3.wall, this.wall4.wall, this.wall5.wall, this.wall6.wall,]);

    // const cordL = this.wallsCord.length
    // for (let i = 0; i < cordL / 4 - 1; i++) {
    //   // const element = new Wall(this, [this.wallsCord[i].x -650 ,this.wallsCord[i].y -780]);
    //   // const CONSTANT_NAME = 'wall' + i; // Sostituisci con un nome significativo per la costante

    walls.create(200,400,'wall').setScale(10).refreshBody();

    //   // const wall = new Tank(this, i, [this.wallsCord[i].x -650 ,this.wallsCord[i].y -780]); 
    //   // Usa la costante
    //   // console.log(CONSTANT_NAME, this.wall);
    //   // walls.add(this.wall)
  //   }
  //   walls.getChildren().forEach(wall => {
  //     wall.body.setCollisionCategory(WALL_CATEGORY);
  //     wall.body.setCollidesWith([TANK_CATEGORY,WALL_CATEGORY ]);
  // });



    const tanks = this.physics.add.group();

    // primi tank sprite
    this.Tank1 = new Tank(this, 1 , [280,255]);
    this.Tank2 = new Tank(this, 2 , [350,255]);
    this.Tank3 = new Tank(this, 3 , [390,280]);
    this.Tank4 = new Tank(this, 4 , [390,310]);
    this.Tank5 = new Tank(this, 5 , [390,340]);
    this.Tank6 = new Tank(this, 6 , [390,370]);

    tanks.addMultiple([this.Tank1.tank,this.Tank2.tank, this.Tank3.tank, this.Tank4.tank, this.Tank5.tank, this.Tank6.tank,]);

  //   tanks.getChildren().forEach(tank => {
  //     tank.body.setCollisionCategory(TANK_CATEGORY);
  //     tank.body.setCollidesWith([TANK_CATEGORY, WALL_CATEGORY]); // Tank collidono con muri e altri tank
  // });
  console.log(this.wall1, this.Tank1)

    // console.log(this.Tank1.tank.body);
    // this.physics.add.collider(this.Tank1.tank, [this.Tank2.tank, this.Tank3.tank,this.Tank4.tank,this.Tank5.tank,this.Tank6.tank,]);
    // this.physics.add.collider(this.Tank1.tank, [this.Tank2.tank, this.Tank3.tank,this.Tank4.tank,this.Tank5.tank,this.Tank6.tank,]);
    // this.physics.add.collider(this.Tank2.tank, [this.Tank1.tank, this.Tank3.tank,this.Tank4.tank,this.Tank5.tank,this.Tank6.tank,]);
    // this.physics.add.collider(this.Tank3.tank, [this.Tank2.tank, this.Tank1.tank,this.Tank4.tank,this.Tank5.tank,this.Tank6.tank,]);
    // this.physics.add.collider(this.Tank4.tank, [this.Tank2.tank, this.Tank3.tank,this.Tank1.tank,this.Tank5.tank,this.Tank6.tank,]);
    // this.physics.add.collider(this.Tank5.tank, [this.Tank2.tank, this.Tank3.tank,this.Tank4.tank,this.Tank1.tank,this.Tank6.tank,]);
    // this.physics.add.collider(this.Tank6.tank, [this.Tank2.tank, this.Tank3.tank,this.Tank4.tank,this.Tank5.tank,this.Tank1.tank,]);

    this.physics.add.collider(tanks);
    this.physics.add.collider(walls, tanks);
    // this.physics.add.collider(tanks, walls);
    // this.physics.add.collider(walls);

    // selettore mouse
    this.input.mouse.disableContextMenu();
    this.selectionRectManager = new SelectionRect(this, [this.Tank1, this.Tank2, this.Tank3, this.Tank4, this.Tank5, this.Tank6]);


  };

  update(time, delta) {

    this.cameraController.update(delta)
    this.Tank1.update();
    this.Tank2.update();
    this.Tank3.update();
    this.Tank4.update();
    this.Tank5.update();
    this.Tank6.update();
  };
}

const config = {
  type: Phaser.AUTO,
  width: 1400/2,
  height: 900/2,
  loader:{
    baseURL: '/src/assets/'
  },
  scene: setMapTest,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0 }, // Nessuna gravità
      debug: true,
    },
  },
}
