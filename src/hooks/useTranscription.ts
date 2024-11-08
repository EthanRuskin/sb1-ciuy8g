import { useState, useCallback } from 'react';
import { TranscriptionService } from '../services/transcription.service';

export function useTranscription() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  
  const transcriptionService = new TranscriptionService();

  const checkMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      setHasPermission(true);
      return true;
    } catch (err) {
      setHasPermission(false);
      return false;
    }
  };

  const requestMicrophonePermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setHasPermission(true);
      return true;
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'NotAllowedError') {
          setError('Microphone permission denied. Please allow microphone access to use this feature.');
        } else if (err.name === 'NotFoundError') {
          setError('No microphone found. Please connect a microphone and try again.');
        } else {
          setError('Failed to access microphone. Please check your device settings.');
        }
      }
      setHasPermission(false);
      return false;
    }
  };

  const startRecording = useCallback(async () => {
    try {
      setError(null);

      // Check if we already have permission
      if (hasPermission === null) {
        const permitted = await checkMicrophonePermission();
        if (!permitted) {
          // Request permission if we don't have it
          const granted = await requestMicrophonePermission();
          if (!granted) return;
        }
      } else if (!hasPermission) {
        // If permission was previously denied, request it again
        const granted = await requestMicrophonePermission();
        if (!granted) return;
      }

      setIsRecording(true);
      await transcriptionService.startRecording((newText) => {
        setTranscription(prev => prev + ' ' + newText);
      });
    } catch (err) {
      console.error('Error starting recording:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred while starting the recording.');
      }
      setIsRecording(false);
    }
  }, [hasPermission, transcriptionService]);

  const stopRecording = useCallback(async () => {
    try {
      const audioBlob = transcriptionService.stopRecording();
      setIsRecording(false);
      
      if (audioBlob) {
        const fullTranscription = await transcriptionService.getFullTranscription();
        setTranscription(fullTranscription);
      }
    } catch (err) {
      console.error('Error stopping recording:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred while stopping the recording.');
      }
    }
  }, [transcriptionService]);

  return {
    isRecording,
    transcription,
    error,
    hasPermission,
    startRecording,
    stopRecording,
    requestMicrophonePermission
  };
}