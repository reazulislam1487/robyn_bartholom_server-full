
import { Schema, model } from "mongoose";
import { T_CaseReviewRequtest } from "./caseReviewRequtest.interface";

const case_review_requtest_schema = new Schema<T_CaseReviewRequtest>(
  {
    attorneyName: { type: String, required: true },
    firm: { type: String, required: true },

    email: { type: String, required: true },
    phone: { type: String, required: true },

    caseType: {
      type: String,
      enum: ["Criminal", "Civil", "Family", "Corporate"],
      required: true,
    },

    retainerInterest: {
      type: String,
      enum: ["Consultation", "Full Retainer", "Expert Witness"],
      required: true,
    },

    briefCaseSummary: { type: String, required: true, maxlength: 500 },

    documents: [{ type: String }],

    agreementChecked: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export const case_review_requtest_model = model(
  "case_review_requtest",
  case_review_requtest_schema
);
