import {SoundEffect} from './sfxr';

class SFX {
  constructor() {

    var sound = {
      "oldParams": true,
      "wave_type": 0,
      "p_env_attack": 0.38153589856145664,
      "p_env_sustain": 0.15096989154080154,
      "p_env_punch": 0.20844576537202952,
      "p_env_decay": 0.614277905936041,
      "p_base_freq": 0.1737,
      "p_freq_limit": 0,
      "p_freq_ramp": 0,
      "p_freq_dramp": 0,
      "p_vib_strength": 0,
      "p_vib_speed": 0,
      "p_arp_mod": -0.3162,
      "p_arp_speed": 0.6388881007792658,
      "p_duty": 0.9527112422149868,
      "p_duty_ramp": 0,
      "p_repeat_speed": 0,
      "p_pha_offset": 0,
      "p_pha_ramp": 0,
      "p_lpf_freq": 0.49306448218515486,
      "p_lpf_ramp": 0.9035469645334508,
      "p_lpf_resonance": 0.5173539743152502,
      "p_hpf_freq": 0,
      "p_hpf_ramp": 0,
      "sound_vol": 0.25,
      "sample_rate": 22050,
      "sample_size": 8
    };

    this.hello = new SoundEffect(sound).generate();
  }

  testAlert() {
    this.hello.getAudio().play();
  }
}

export { SFX as default}
