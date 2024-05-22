export type MessageType = 'catch-job-description' | 'page-loaded';
export interface Message {
  type: MessageType;
  message?: string;
}
