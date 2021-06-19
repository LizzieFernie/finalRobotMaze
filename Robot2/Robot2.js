/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Robot2 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("5x35n5", "./Robot2/costumes/5x35n5.svg", { x: 50, y: 50 })
    ];

    this.sounds = [
      new Sound("robotBuzz", "./Robot2/sounds/robotBuzz.wav"),
      new Sound("winSound", "./Robot2/sounds/winSound.wav"),
      new Sound("Drum Bass3", "./Robot2/sounds/Drum Bass3.wav")
    ];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "dispWin" },
        this.whenIReceiveDispwin
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "moveRight" },
        this.whenIReceiveMoveright
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "switch" },
        this.whenIReceiveSwitch
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "win" }, this.whenIReceiveWin)
    ];
  }

  *whenIReceiveDispwin() {
    this.visible = true;
    yield* this.sayAndWait("You Win!", 2);
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
      this.visible = false;
      yield* this.sayAndWait("You Win", 2);
      this.broadcast("win");
    }
  }

  *whenIReceiveSwitch() {
    this.visible = false;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveWin() {
    this.visible = false;
  }
}
