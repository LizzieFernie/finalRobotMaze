/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Right extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("button", "./Right/costumes/button.png", { x: 360, y: 360 })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
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
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "board" }, this.whenIReceiveBoard)
    ];
  }

  *whenthisspriteclicked() {
    this.broadcast("moveRight");
  }

  *whenIReceiveStartgame() {
    this.visible = true;
  }

  *whenIReceiveSwitch() {
    this.visible = false;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveBoard() {
    this.visible = true;
  }
}
