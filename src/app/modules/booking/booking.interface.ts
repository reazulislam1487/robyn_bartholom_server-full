export type T_Booking = {
  /** Required */
  fullName: string;
  email: string;
  /** Optional company/production name */
  company?: string;
  /** Type of consultation (free-form or use a union of known types) */
  consultationType: string;
  /**
   * Preferred date in ISO format (YYYY-MM-DD).
   * You may also use `Date` if you prefer storing real Date objects on server.
   */
  preferredDate: Date;
  /**
   * Preferred time slot as a string (e.g. "10:00 AM", "14:00", or "10:00-10:30").
   * Alternatively store as "HH:mm" or use a combined datetime field.
   */
  preferredTime: string;
  /** Optional extra details the user provides */
  additionalInfo?: string;
  /** Booking status useful for backend workflows */
  status: "pending" | "accepted" | "decline" | "completed";
  /** ISO timestamps (set by backend) */
  createdAt?: string;
  updatedAt?: string;
};
