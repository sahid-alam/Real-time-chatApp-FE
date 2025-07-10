import { WebSocketMessage, JoinMessage, ChatSendMessage } from '../types/chat';

export class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private onMessageCallback: ((message: WebSocketMessage) => void) | null = null;
  private onStatusChangeCallback: ((status: string) => void) | null = null;

  constructor(
    private url: string = 'ws://localhost:8080',
    private onMessage?: (message: WebSocketMessage) => void,
    private onStatusChange?: (status: string) => void
  ) {
    if (onMessage) this.onMessageCallback = onMessage;
    if (onStatusChange) this.onStatusChangeCallback = onStatusChange;
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.url);
        
        this.ws.onopen = () => {
          this.reconnectAttempts = 0;
          this.onStatusChangeCallback?.('connected');
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const message: WebSocketMessage = JSON.parse(event.data);
            this.onMessageCallback?.(message);
          } catch (error) {
            console.error('Failed to parse WebSocket message:', error);
          }
        };

        this.ws.onclose = () => {
          this.onStatusChangeCallback?.('disconnected');
          this.attemptReconnect();
        };

        this.ws.onerror = (error) => {
          this.onStatusChangeCallback?.('error');
          reject(error);
        };

      } catch (error) {
        reject(error);
      }
    });
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      this.onStatusChangeCallback?.('connecting');
      
      setTimeout(() => {
        this.connect().catch(() => {
          this.attemptReconnect();
        });
      }, this.reconnectDelay * this.reconnectAttempts);
    }
  }

  send(message: JoinMessage | ChatSendMessage): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not connected');
    }
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
} 