export function calculateEMI(principal: number, rate: number, tenure: number): number {
  const monthlyRate = rate / 12 / 100
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1)
  return Math.round(emi * 100) / 100
}

export function calculateTotalRepayment(emi: number, tenure: number): number {
  return Math.round(emi * tenure * 100) / 100
}

