export class AudioProcessor {
  private analyser: AnalyserNode;
  private bufferLength: number;
  private dataArray: Float32Array;

  constructor(analyser: AnalyserNode) {
    this.analyser = analyser;
    this.bufferLength = analyser.frequencyBinCount;
    this.dataArray = new Float32Array(this.bufferLength);
  }

  getAudioData(): Float32Array {
    this.analyser.getFloatTimeDomainData(this.dataArray);
    return this.dataArray;
  }

  getFrequencyData(): Uint8Array {
    const frequencyArray = new Uint8Array(this.bufferLength);
    this.analyser.getByteFrequencyData(frequencyArray);
    return frequencyArray;
  }

  getRMS(audioData: Float32Array): number {
    let sum = 0;
    for (let i = 0; i < audioData.length; i++) {
      sum += audioData[i] * audioData[i];
    }
    return Math.sqrt(sum / audioData.length);
  }

  detectSilence(audioData: Float32Array, threshold: number = 0.01): boolean {
    const rms = this.getRMS(audioData);
    return rms < threshold;
  }

  applyHighPassFilter(audioData: Float32Array, cutoff: number = 80): Float32Array {
    // Simple high-pass filter approximation
    const filtered = new Float32Array(audioData.length);
    const alpha = 0.1;
    let previous = 0;

    for (let i = 0; i < audioData.length; i++) {
      filtered[i] = alpha * (previous + audioData[i] - audioData[Math.max(0, i - 1)]);
      previous = filtered[i];
    }

    return filtered;
  }

  applyNoiseGate(audioData: Float32Array, threshold: number = 0.02, ratio: number = 10): Float32Array {
    const gated = new Float32Array(audioData.length);
    
    for (let i = 0; i < audioData.length; i++) {
      const amplitude = Math.abs(audioData[i]);
      if (amplitude < threshold) {
        gated[i] = audioData[i] / ratio;
      } else {
        gated[i] = audioData[i];
      }
    }

    return gated;
  }

  normalizeAudio(audioData: Float32Array): Float32Array {
    const max = Math.max(...audioData.map(Math.abs));
    if (max === 0) return audioData;

    const normalized = new Float32Array(audioData.length);
    for (let i = 0; i < audioData.length; i++) {
      normalized[i] = audioData[i] / max;
    }

    return normalized;
  }
}
