export type T_Reviews = {
  name: string;
  email: string;
  role?: string;
  rating: number;
  yourReview: string;
  status: "pending" | "approved" | "rejected";
  createDate: Date;
};
