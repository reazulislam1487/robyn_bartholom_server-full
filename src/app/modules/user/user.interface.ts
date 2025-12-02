export type TUser = {
  firstName?: string;
  lastName?: string;
  email: string;
  professionalTitle?: string;
  password?: string;
  imageUrl?: string;
  phone?: string;
  title?: string;
  bio?: string;
  location?: string;
  publicId?: string;
  // Notification Preferences
  notificationPreferences: {
    emailNotifications: { type: Boolean; default: true };
    bookingNotifications: { type: Boolean; default: true };
    reviewNotifications: { type: Boolean; default: true };
    chatNotifications: { type: Boolean; default: true };
  };
};

