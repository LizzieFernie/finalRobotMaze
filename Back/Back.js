/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Back extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("back", "./Back/costumes/back.svg", { x: 160, y: 55 })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.BROADCAST, { name: "algo" }, this.whenIReceiveAlgo),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(Trigger.BROADCAST, { name: "level" }, this.whenIReceiveLevel),
      new Trigger(Trigger.BROADCAST, { name: "flow" }, this.whenIReceiveFlow),
      new Trigger(Trigger.BROADCAST, { name: "seq" }, this.whenIReceiveSeq),
      new Trigger(
        Trigger.BROADCAST,
        { name: "result" },
        this.whenIReceiveResult
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "result2" },
        this.whenIReceiveResult2
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenIReceiveAlgo() {
    this.visible = true;
  }

  *whenthisspriteclicked() {
    this.stage.costume = "result2";
    this.broadcast("result2");
    this.visible = false;
  }

  *whenIReceiveLevel() {
    this.visible = false;
  }

  *whenIReceiveFlow() {
    this.visible = true;
  }

  *whenIReceiveSeq() {
    this.visible = true;
  }

  *whenIReceiveResult() {
    this.visible = false;
  }

  *whenIReceiveResult2() {
    this.visible = false;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }
}
