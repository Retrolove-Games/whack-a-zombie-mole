import {SoundEffect} from './sfxr';
import SampleTable from './SampleTable';

class SFX {
  constructor() {
    // Create sound bank
    this.table = new Map();

    for (const value in SampleTable) {
      this.table.set(value, (new SoundEffect(SampleTable[value])).generate());
    }
  }

  testAlert() {
    this.table.get('menu').getAudio().play();
  }

  playSample(sample) {
    if (this.table.has(sample)) {
      this.table.get(sample).getAudio().play();
    } 
    else {
      throw new Error("There's no such sample in a bank!");
    }
  }
}

export { SFX as default}
