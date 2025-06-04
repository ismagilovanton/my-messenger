import { ChatMessage } from '../types/chat.types';

type WebSocketEvents = {
  onMessage?: (data: ChatMessage) => void;
  onClose?: () => void;
  onError?: (error: Event) => void;
  onOpen?: () => void;
  onHistory?: (data: Array<ChatMessage>) => void;
};

class WebSocketService {
  private socket: WebSocket | null = null;

  private events: WebSocketEvents;

  private reconnectTimeout = 3000;

  private userId?: number;

  private chatId?: number;

  private token?: string;

  constructor(events: WebSocketEvents = {}) {
    this.events = events;
  }

  public connect(chatId: number, userId: number, token: string) {

    this.userId = userId;
    this.chatId = chatId;
    this.token = token;

    try {
      this.socket = new WebSocket(
        `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`,
      );

      this.addEventListeners();

     
    } catch (error) {
      console.error('Ошибка при подключении к WebSocket:', error);
      this.reconnect();

    }
  }

  public send(message: unknown) {
    if (!this.socket) {
      throw new Error('WebSocket не подключен');
    }

    this.socket.send(JSON.stringify(message));
  }

  public close() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  private reconnect() {
    setTimeout(() => {
      if (this.userId && this.chatId && this.token) {
        this.connect(this.chatId, this.userId, this.token);
      }
    }, this.reconnectTimeout);
  }

  private addEventListeners() {
    if (!this.socket) return;

    this.socket.addEventListener('open', () => {
      console.log('WebSocket соединение установлено');
      this.events.onOpen?.();
      
      this.send({
        content: '0',
        type: 'get old',
      });
    });

    this.socket.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);
  
        if (data.type === 'user connected') {
          return;
        }
  
        if (Array.isArray(data)) {
          
          return this.events.onHistory?.(data);
        }
        
        this.events.onMessage?.(data);
      } catch (error) {
        console.log(error);
      }
    });

    this.socket.addEventListener('error', (event) => {
      console.error('Ошибка WebSocket:', event);
      this.events.onError?.(event);
    });

    this.socket.addEventListener('close', (event) => {
      console.log('WebSocket соединение закрыто');
      this.events.onClose?.();
      if (!event.wasClean) {
        this.reconnect();
      }
    });
  }
}

export default WebSocketService;

