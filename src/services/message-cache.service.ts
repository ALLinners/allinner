import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageCacheService {
  private state = new Map<string, any>();

  setState(key: string, value: any) {
    this.state.set(key, value);
  }

  getState(key: string): any | undefined {
    return this.state.get(key);
  }

  deleteState(key: string) {
    this.state.delete(key);
  }
}
