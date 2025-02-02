"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { LoanCard } from "./LoanCard"
import { mockLoans } from "@/utils/mockData"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function LoanComparisonTool() {
  const [amount, setAmount] = useState(10000)
  const [loanType, setLoanType] = useState("All")
  const [tenure, setTenure] = useState(12)
  const [interestRange, setInterestRange] = useState([0, 20])
  const [selectedInstitutions, setSelectedInstitutions] = useState<string[]>([])

  const filteredLoans = mockLoans.filter((loan) => {
    return (
      (loanType === "All" || loan.type === loanType) &&
      loan.interestRate >= interestRange[0] &&
      loan.interestRate <= interestRange[1] &&
      (selectedInstitutions.length === 0 || selectedInstitutions.includes(loan.institution))
    )
  })

  const institutions = Array.from(new Set(mockLoans.map((loan) => loan.institution)))

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Loan Search Criteria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Loan Amount</Label>
              <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loanType">Loan Type</Label>
              <Select value={loanType} onValueChange={setLoanType}>
                <SelectTrigger id="loanType">
                  <SelectValue placeholder="Select Loan Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Home">Home</SelectItem>
                  <SelectItem value="Auto">Auto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tenure">Tenure (months)</Label>
              <Input id="tenure" type="number" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Interest Rate Range</Label>
              <Slider min={0} max={20} step={0.1} value={interestRange} onValueChange={setInterestRange} />
              <div className="flex justify-between text-sm text-gray-500">
                <span>{interestRange[0]}%</span>
                <span>{interestRange[1]}%</span>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <Label>Financial Institutions</Label>
            <div className="flex flex-wrap gap-2">
              {institutions.map((institution) => (
                <Button
                  key={institution}
                  variant={selectedInstitutions.includes(institution) ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedInstitutions((prev) =>
                      prev.includes(institution) ? prev.filter((i) => i !== institution) : [...prev, institution],
                    )
                  }}
                >
                  {institution}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Matching Loans</h2>
          <p className="text-sm text-gray-500">{filteredLoans.length} loans found</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLoans.map((loan) => (
            <LoanCard key={loan.id} loan={loan} amount={amount} />
          ))}
        </div>
      </div>
    </div>
  )
}

