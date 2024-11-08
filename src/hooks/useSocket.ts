import { useEffect, useCallback } from 'react';
import { socketClient } from '../lib/socket';

export function useSocket() {
  const connect = useCallback((token: string) => {
    socketClient.connect(token);
  }, []);

  const disconnect = useCallback(() => {
    socketClient.disconnect();
  }, []);

  const onNotification = useCallback((callback: (notification: any) => void) => {
    socketClient.on('notification', callback);
    return () => socketClient.off('notification', callback);
  }, []);

  const onCallStarted = useCallback((callback: (data: any) => void) => {
    socketClient.on('call:started', callback);
    return () => socketClient.off('call:started', callback);
  }, []);

  const onCallEnded = useCallback((callback: (data: any) => void) => {
    socketClient.on('call:ended', callback);
    return () => socketClient.off('call:ended', callback);
  }, []);

  const onTranscription = useCallback((callback: (data: any) => void) => {
    socketClient.on('call:transcription', callback);
    return () => socketClient.off('call:transcription', callback);
  }, []);

  const joinCall = useCallback((callId: string) => {
    socketClient.joinCall(callId);
  }, []);

  const leaveCall = useCallback((callId: string) => {
    socketClient.leaveCall(callId);
  }, []);

  const sendTranscription = useCallback((callId: string, text: string) => {
    socketClient.sendTranscription(callId, text);
  }, []);

  return {
    connect,
    disconnect,
    onNotification,
    onCallStarted,
    onCallEnded,
    onTranscription,
    joinCall,
    leaveCall,
    sendTranscription
  };
}