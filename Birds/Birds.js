/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Birds extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("birds", "./Birds/costumes/birds.png", { x: 480, y: 122.5 })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "seq" }, this.whenIReceiveSeq),
      new Trigger(Trigger.BROADCAST, { name: "flow" }, this.whenIReceiveFlow),
      new Trigger(Trigger.BROADCAST, { name: "algo" }, this.whenIReceiveAlgo),
      new Trigger(
        Trigger.BROADCAST,
        { name: "result2" },
        this.whenIReceiveResult2
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "result" },
        this.whenIReceiveResult
      )
    ];
  }

  *whenbackdropswitchesto() {
    this.goto(-4, 13);
    this.visible = true;
    yield* this.sayAndWait(
      "" + "Number of moves you made is " + this.stage.vars.moves,
      2
    );
    yield* this.sayAndWait("Minimum number of moves is 11!", 2);
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveSeq() {
    this.visible = false;
  }

  *whenIReceiveFlow() {
    this.visible = false;
  }

  *whenIReceiveAlgo() {
    this.visible = false;
  }

  *whenIReceiveResult2() {
    this.visible = true;
  }

  *whenIReceiveResult() {
    this.goto(-4, 13);
    this.visible = true;
  }
}
