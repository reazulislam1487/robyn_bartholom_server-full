export type T_Email = {
  to: string;
  subject: string;
  text: string;
  fullName?: string;
  replyTo: string;
  replies?: {
    message: string;
    sentBy: string; // email or name
    sentAt: Date;
  }[];
  read:  Boolean;
  provider?: string;
  status?: string | Number;
  responseId?: string;
  sentAt?: Date;
};
