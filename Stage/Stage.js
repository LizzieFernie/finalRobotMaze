/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("intro", "./Stage/costumes/intro.svg", {
        x: 240.36251831054688,
        y: 181.99999999999994
      }),
      new Costume("flowchart", "./Stage/costumes/flowchart.svg", {
        x: 237.91816693944364,
        y: 176.2499999999999
      }),
      new Costume("sequence", "./Stage/costumes/sequence.svg", {
        x: 242.54163395799011,
        y: 181.67874678435803
      }),
      new Costume("algorithm", "./Stage/costumes/algorithm.svg", {
        x: 242.54163395799011,
        y: 180.68675646142145
      }),
      new Costume("board", "./Stage/costumes/board.png", { x: 360, y: 360 }),
      new Costume("result", "./Stage/costumes/result.png", { x: 360, y: 360 }),
      new Costume("result2", "./Stage/costumes/result2.png", {
        x: 360,
        y: 360
      }),
      new Costume("level", "./Stage/costumes/level.png", { x: 316, y: 360 })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "win" }, this.whenIReceiveWin)
    ];

    this.vars.myVariable = 0;
    this.vars.moves = 11;
  }

  *whenGreenFlagClicked() {
    this.costume = "intro";
    this.broadcast("switch");
  }

  *whenIReceiveWin() {
    this.costume = "result";
    this.broadcast("switch");
    this.broadcast("result");
  }
}
