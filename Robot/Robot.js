/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Robot extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("5x35n5", "./Robot/costumes/5x35n5.svg", { x: 70, y: 77 })
    ];

    this.sounds = [
      new Sound("robotBuzz", "./Robot/sounds/robotBuzz.wav"),
      new Sound("winSound", "./Robot/sounds/winSound.wav"),
      new Sound("Drum Bass3", "./Robot/sounds/Drum Bass3.wav")
    ];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "moveUp" },
        this.whenIReceiveMoveup
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "moveDown" },
        this.whenIReceiveMovedown
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "moveLeft" },
        this.whenIReceiveMoveleft
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "moveRight" },
        this.whenIReceiveMoveright
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "startGame" },
        this.whenIReceiveStartgame
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "switch" },
        this.whenIReceiveSwitch
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenIReceiveMoveup() {
    this.stage.vars.moves += 1;
    this.y += 43;
    if (this.touching(Color.rgb(0, 0, 0))) {
      this.y += -38.5;
    }
    if (this.touching(Color.rgb(143, 142, 128))) {
      yield* this.startSound("Drum Bass3");
      this.y += -43;
    }
    yield* this.startSound("robotBuzz");
    if (this.touching(this.sprites["Redflag"].andClones())) {
      yield* this.sayAndWait("You Win", 2);
      this.broadcast("win");
    }
  }

  *whenIReceiveMovedown() {
    this.stage.vars.moves += 1;
    this.y += -43;
    if (this.touching(Color.rgb(0, 0, 0))) {
      this.y += 37;
    }
    if (this.touching(Color.rgb(143, 142, 128))) {
      yield* this.startSound("Drum Bass3");
      this.y += 43;
    }
    yield* this.startSound("robotBuzz");
    if (this.touching(this.sprites["Redflag"].andClones())) {
      yield* this.sayAndWait("You Win", 2);
      this.broadcast("win");
    }
  }

  *whenIReceiveMoveleft() {
    this.stage.vars.moves += 1;
    this.x += -43;
    if (this.touching(Color.rgb(0, 0, 0))) {
      this.x += 43;
    }
    if (this.touching(Color.rgb(143, 142, 128))) {
      yield* this.startSound("Drum Bass3");
      this.x += 43;
    }
    yield* this.startSound("robotBuzz");
    if (this.touching(this.sprites["Redflag"].andClones())) {
      yield* this.startSound("winSound");
      this.broadcast("dispWin");
      yield* this.wait(2);
      this.broadcast("win");
    }
  }

  *whenIReceiveMoveright() {
    this.stage.vars.moves += 1;
    this.x += 43;
    if (this.touching(Color.rgb(0, 0, 0))) {
      this.x += -43;
    }
    if (this.touching(Color.rgb(143, 142, 128))) {
      yield* this.startSound("Drum Bass3");
      this.x += -43;
    }
    yield* this.startSound("robotBuzz");
    if (this.touching(this.sprites["Redflag"].andClones())) {
      this.broadcast("win");
    }
  }

  *whenIReceiveStartgame() {
    this.visible = true;
    this.goto(107, -65);
  }

  *whenIReceiveSwitch() {
    this.visible = false;
  }

  *whenGreenFlagClicked() {
    this.stage.vars.moves = 0;
    this.visible = false;
  }
}
