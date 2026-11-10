class SoundManager {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;
  public isSpeechEnabled: boolean = true;

  constructor() {
    // Read mute preference from localStorage if available
    try {
      const savedMute = localStorage.getItem('kids_ws_muted');
      if (savedMute !== null) {
        this.isMuted = savedMute === 'true';
      }
      const savedSpeech = localStorage.getItem('kids_ws_speech');
      if (savedSpeech !== null) {
        this.isSpeechEnabled = savedSpeech !== 'false';
      }
    } catch {
      // ignore in iframe/restricted storage
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem('kids_ws_muted', String(this.isMuted));
    } catch {}
    return this.isMuted;
  }

  public toggleSpeech(): boolean {
    this.isSpeechEnabled = !this.isSpeechEnabled;
    try {
      localStorage.setItem('kids_ws_speech', String(this.isSpeechEnabled));
    } catch {}
    return this.isSpeechEnabled;
  }

  // Gentle pop when hovering/tapping a letter
  public playTilePop(pitchModifier = 0) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const freq = 400 + Math.min(pitchModifier * 35, 450);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.3, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {}
  }

  // Sweet chime arpeggio when a word is discovered
  public playWordFound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        const startTime = this.ctx.currentTime + idx * 0.09;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.12, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.28);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.28);
      });
    } catch {}
  }

  // Sparkle chime when hint button is clicked
  public playSparkle() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const notes = [659.25, 880, 1174.66, 1318.51, 1567.98];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        const startTime = this.ctx.currentTime + idx * 0.06;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.09, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.2);
      });
    } catch {}
  }

  // Grand celebration fanfare on level clear
  public playVictory() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const fanfare = [
        { note: 523.25, dur: 0.15, delay: 0.0 }, // C5
        { note: 659.25, dur: 0.15, delay: 0.15 }, // E5
        { note: 783.99, dur: 0.15, delay: 0.3 }, // G5
        { note: 1046.5, dur: 0.45, delay: 0.45 }, // C6
        { note: 880.0, dur: 0.15, delay: 0.95 }, // A5
        { note: 1046.5, dur: 0.6, delay: 1.12 }, // C6
      ];

      fanfare.forEach(({ note, dur, delay }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        const startTime = this.ctx.currentTime + delay;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note, startTime);

        gain.gain.setValueAtTime(0.15, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + dur);
      });
    } catch {}
  }

  // Gentle invalid sound (soft plop)
  public playInvalid() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch {}
  }

  // Clear speech for 6-year-old phonics
  public speakWord(word: string, onEnd?: () => void) {
    if (!this.isSpeechEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      onEnd?.();
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Cancel ongoing speech
      const utter = new SpeechSynthesisUtterance(word);
      utter.rate = 0.85; // Slightly slower for clarity
      utter.pitch = 1.15; // Friendly, warm kid tone
      utter.lang = 'en-US';

      if (onEnd) {
        utter.onend = () => onEnd();
        utter.onerror = () => onEnd();
      }

      window.speechSynthesis.speak(utter);
    } catch {
      onEnd?.();
    }
  }

  // Spells the word letter by letter, then says the whole word!
  public spellAndSpeakWord(word: string, onEnd?: () => void) {
    if (!this.isSpeechEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      onEnd?.();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const lettersSpaced = word.toUpperCase().split('').join(' . ');
      const fullText = `${lettersSpaced} ... ${word}!`;
      const utter = new SpeechSynthesisUtterance(fullText);
      utter.rate = 0.82;
      utter.pitch = 1.1;
      utter.lang = 'en-US';

      if (onEnd) {
        utter.onend = () => onEnd();
        utter.onerror = () => onEnd();
      }

      window.speechSynthesis.speak(utter);
    } catch {
      onEnd?.();
    }
  }

  // Cheerful praise
  public cheerWordFound(word: string) {
    const compliments = [
      `Awesome! You found ${word}!`,
      `Great job! ${word}!`,
      `Super star! You got ${word}!`,
      `You did it! ${word}!`,
      `Hooray! ${word}!`,
    ];
    const pick = compliments[Math.floor(Math.random() * compliments.length)];
    this.speakWord(pick);
  }
}

export const soundManager = new SoundManager();
