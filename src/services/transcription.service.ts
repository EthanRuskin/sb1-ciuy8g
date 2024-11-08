import { env } from '../config/env';

export class TranscriptionService {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private stream: MediaStream | null = null;

  async startRecording(onTranscriptionUpdate: (text: string) => void) {
    try {
      // Get media stream with error handling
      this.stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      // Create and configure MediaRecorder
      this.mediaRecorder = new MediaRecorder(this.stream, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/ogg'
      });

      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
          this.transcribeLatestChunk(onTranscriptionUpdate);
        }
      };

      // Start recording in 5-second chunks
      this.mediaRecorder.start(5000);
    } catch (error) {
      this.cleanup();
      throw this.handleError(error);
    }
  }

  stopRecording(): Blob | null {
    try {
      if (this.mediaRecorder) {
        this.mediaRecorder.stop();
        this.cleanup();
        return new Blob(this.audioChunks, { 
          type: MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/ogg'
        });
      }
      return null;
    } catch (error) {
      this.cleanup();
      throw this.handleError(error);
    }
  }

  private cleanup() {
    // Stop all tracks in the media stream
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }

    // Clear the MediaRecorder
    if (this.mediaRecorder) {
      if (this.mediaRecorder.state !== 'inactive') {
        this.mediaRecorder.stop();
      }
      this.mediaRecorder = null;
    }
  }

  private async transcribeLatestChunk(onTranscriptionUpdate: (text: string) => void) {
    try {
      const latestChunk = this.audioChunks[this.audioChunks.length - 1];
      if (!latestChunk) return;

      const formData = new FormData();
      formData.append('audio', latestChunk);
      formData.append('encoding', 'WEBM_OPUS');
      formData.append('sampleRate', '48000');
      formData.append('languageCode', 'en-US');

      const response = await fetch(`${env.apiUrl}/api/transcription/transcribe`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Transcription request failed');
      }

      const { data } = await response.json();
      onTranscriptionUpdate(data.transcription);
    } catch (error) {
      console.error('Error transcribing audio chunk:', error);
      throw this.handleError(error);
    }
  }

  async getFullTranscription(): Promise<string> {
    try {
      if (this.audioChunks.length === 0) return '';

      const fullAudio = new Blob(this.audioChunks, { 
        type: MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/ogg'
      });
      
      const formData = new FormData();
      formData.append('audio', fullAudio);
      formData.append('encoding', 'WEBM_OPUS');
      formData.append('sampleRate', '48000');
      formData.append('languageCode', 'en-US');

      const response = await fetch(`${env.apiUrl}/api/transcription/transcribe`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to get full transcription');
      }

      const { data } = await response.json();
      return data.transcription;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: unknown): Error {
    if (error instanceof Error) {
      switch (error.name) {
        case 'NotAllowedError':
          return new Error('Microphone permission denied. Please allow microphone access to use this feature.');
        case 'NotFoundError':
          return new Error('No microphone found. Please connect a microphone and try again.');
        case 'NotReadableError':
          return new Error('Could not access your microphone. Please check your device settings.');
        case 'SecurityError':
          return new Error('Security error occurred while accessing the microphone.');
        default:
          return error;
      }
    }
    return new Error('An unexpected error occurred');
  }
}