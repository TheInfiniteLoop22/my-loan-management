"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import type { UserProfile } from "@/utils/mockData"

interface UserProfileSetupProps {
  onProfileSubmit: (profile: UserProfile) => void
}

export function UserProfileSetup({ onProfileSubmit }: UserProfileSetupProps) {
  const [income, setIncome] = useState(0)
  const [expenses, setExpenses] = useState(0)
  const [creditScore, setCreditScore] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onProfileSubmit({ income, expenses, creditScore })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="income">Monthly Income</Label>
          <Input
            id="income"
            type="number"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="expenses">Monthly Expenses</Label>
          <Input
            id="expenses"
            type="number"
            value={expenses}
            onChange={(e) => setExpenses(Number(e.target.value))}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="creditScore">Credit Score</Label>
        <Input
          id="creditScore"
          type="number"
          value={creditScore}
          onChange={(e) => setCreditScore(Number(e.target.value))}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Submit Profile
      </Button>
    </form>
  )
}

