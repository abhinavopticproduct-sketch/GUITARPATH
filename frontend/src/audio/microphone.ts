export class MicrophoneAccess {
  private stream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;

  async requestPermission(): Promise<boolean> {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100,
        } 
      });
      return true;
    } catch (error) {
      console.error('Microphone access denied:', error);
      return false;
    }
  }

  async startListening(): Promise<AudioContext> {
    if (!this.stream) {
      throw new Error('Microphone permission not granted');
    }

    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
      sampleRate: 44100,
    });

    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 2048;
    this.analyser.smoothingTimeConstant = 0.8;

    this.source = this.audioContext.createMediaStreamSource(this.stream);
    this.source.connect(this.analyser);

    return this.audioContext;
  }

  stopListening(): void {
    if (this.source) {
      this.source.disconnect();
      this.source = null;
    }

    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }

    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }

    this.analyser = null;
  }

  getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  getAudioContext(): AudioContext | null {
    return this.audioContext;
  }

  isListening(): boolean {
    return this.audioContext !== null && this.audioContext.state === 'running';
  }
}
