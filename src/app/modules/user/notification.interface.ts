export type TNotification = {
  emailNotifications: { type: Boolean; default: true };
  bookingNotifications: { type: Boolean; default: true };
  reviewNotifications: { type: Boolean; default: true };
  chatNotifications: { type: Boolean; default: true };
};
