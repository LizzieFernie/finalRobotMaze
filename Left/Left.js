/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Left extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("button", "./Left/costumes/button.png", { x: 360, y: 360 })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "switch" },
        this.whenIReceiveSwitch
      ),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "startGame" },
        this.whenIReceiveStartgame
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenbackdropswitchesto() {
    this.visible = true;
  }

  *whenIReceiveSwitch() {
    this.visible = false;
  }

  *whenthisspriteclicked() {
    this.broadcast("moveLeft");
  }

  *whenIReceiveStartgame() {
    this.visible = true;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }
}
