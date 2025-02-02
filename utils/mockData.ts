export interface Loan {
  id: string
  type: string
  institution: string
  interestRate: number
  tenure: number
  features: string[]
  processingFee: number
}

export const mockLoans: Loan[] = [
  {
    id: "1",
    type: "Personal",
    institution: "Bank A",
    interestRate: 8.5,
    tenure: 36,
    features: ["Prepayment allowed", "No collateral required"],
    processingFee: 1,
  },
  {
    id: "2",
    type: "Home",
    institution: "Bank B",
    interestRate: 6.75,
    tenure: 240,
    features: ["Fixed interest rate", "Property insurance included"],
    processingFee: 0.5,
  },
  {
    id: "3",
    type: "Auto",
    institution: "Bank C",
    interestRate: 7.25,
    tenure: 60,
    features: ["Flexible repayment terms", "Quick approval"],
    processingFee: 1.5,
  },
  // Add more mock loans as needed
]

export interface UserProfile {
  income: number
  expenses: number
  creditScore: number
}

