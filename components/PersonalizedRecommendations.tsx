"use client"

import { useState } from "react"
import { UserProfileSetup } from "./UserProfileSetup"
import { LoanCard } from "./LoanCard"
import { type UserProfile, mockLoans, type Loan } from "@/utils/mockData"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function getRecommendedLoans(profile: UserProfile): Loan[] {
  const { income, expenses, creditScore } = profile
  const monthlyDisposableIncome = income - expenses

  return mockLoans.filter((loan) => {
    const maxEMI = monthlyDisposableIncome * 0.4 // Assume max EMI is 40% of disposable income
    const emi =
      ((loan.interestRate / 12 / 100) * 10000 * Math.pow(1 + loan.interestRate / 12 / 100, loan.tenure)) /
      (Math.pow(1 + loan.interestRate / 12 / 100, loan.tenure) - 1)

    return (
      emi <= maxEMI &&
      ((creditScore >= 750 && loan.interestRate <= 10) ||
        (creditScore >= 650 && loan.interestRate <= 12) ||
        (creditScore >= 550 && loan.interestRate <= 15))
    )
  })
}

export function PersonalizedRecommendations() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [recommendedLoans, setRecommendedLoans] = useState<Loan[]>([])

  const handleProfileSubmit = (profile: UserProfile) => {
    setUserProfile(profile)
    setRecommendedLoans(getRecommendedLoans(profile))
  }

  return (
    <div className="space-y-8">
      {!userProfile ? (
        <Card>
          <CardHeader>
            <CardTitle>User Profile Setup</CardTitle>
            <CardDescription>
              Please provide your financial information to get personalized loan recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UserProfileSetup onProfileSubmit={handleProfileSubmit} />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Monthly Income</dt>
                  <dd className="text-2xl font-semibold">${userProfile.income}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Monthly Expenses</dt>
                  <dd className="text-2xl font-semibold">${userProfile.expenses}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Credit Score</dt>
                  <dd className="text-2xl font-semibold">{userProfile.creditScore}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Personalized Loan Recommendations</h2>
            <p className="text-gray-600">Based on your profile, here are some recommended loans:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedLoans.map((loan) => (
                <LoanCard key={loan.id} loan={loan} amount={10000} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

