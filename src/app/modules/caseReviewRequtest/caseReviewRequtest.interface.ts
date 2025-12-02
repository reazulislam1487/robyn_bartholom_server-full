export type T_CaseReviewRequtest = {
  attorneyName: string;
  firm: string;
  email: string;
  phone: string;

  caseType: "Criminal" | "Civil" | "Family" | "Corporate";
  retainerInterest: "Consultation" | "Full Retainer" | "Expert Witness";

  briefCaseSummary: string;
  documents?: string[];

  agreementChecked: boolean;
};
