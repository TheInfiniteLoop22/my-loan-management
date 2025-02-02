"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, DollarSign, CalendarIcon, TrendingUp } from "lucide-react"

interface UserLoan {
  id: string
  name: string
  outstandingBalance: number
  nextPaymentDue: Date
  totalInterestPaid: number
  isOverdue: boolean
}

const mockUserLoans: UserLoan[] = [
  {
    id: "1",
    name: "Home Loan",
    outstandingBalance: 200000,
    nextPaymentDue: new Date(2023, 5, 15),
    totalInterestPaid: 15000,
    isOverdue: false,
  },
  {
    id: "2",
    name: "Car Loan",
    outstandingBalance: 15000,
    nextPaymentDue: new Date(2023, 5, 1),
    totalInterestPaid: 2000,
    isOverdue: true,
  },
  {
    id: "3",
    name: "Personal Loan",
    outstandingBalance: 5000,
    nextPaymentDue: new Date(2023, 5, 30),
    totalInterestPaid: 500,
    isOverdue: false,
  },
]

export function UserDashboard() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const getDueDates = (date: Date): UserLoan[] => {
    return mockUserLoans.filter(
      (loan) =>
        loan.nextPaymentDue.getDate() === date.getDate() &&
        loan.nextPaymentDue.getMonth() === date.getMonth() &&
        loan.nextPaymentDue.getFullYear() === date.getFullYear(),
    )
  }

  const totalOutstanding = mockUserLoans.reduce((sum, loan) => sum + loan.outstandingBalance, 0)
  const totalInterestPaid = mockUserLoans.reduce((sum, loan) => sum + loan.totalInterestPaid, 0)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalOutstanding.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Across all loans</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Interest Paid</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalInterestPaid.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Lifetime interest payments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUserLoans.length}</div>
            <p className="text-xs text-muted-foreground">Currently active loans</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Date(Math.min(...mockUserLoans.map((loan) => loan.nextPaymentDue.getTime()))).toLocaleDateString()}
            </div>
            <p className="text-xs text-muted-foreground">Upcoming payment due</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Loan Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {mockUserLoans.map((loan) => (
              <div key={loan.id} className="flex items-center">
                <div className="space-y-1 flex-1">
                  <p className="text-sm font-medium leading-none">
                    {loan.name}
                    {loan.isOverdue && (
                      <Badge variant="destructive" className="ml-2">
                        Overdue
                      </Badge>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Next payment: {loan.nextPaymentDue.toLocaleDateString()}
                  </p>
                </div>
                <div className="ml-auto font-medium">${loan.outstandingBalance.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Repayment Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border mx-auto"
              />
              <div>
                <h3 className="text-lg font-semibold mb-2">Payments due on {selectedDate?.toLocaleDateString()}</h3>
                {getDueDates(selectedDate || new Date()).map((loan) => (
                  <div key={loan.id} className="mb-2 flex justify-between items-center">
                    <span>{loan.name}</span>
                    <span className="font-medium">${loan.outstandingBalance.toFixed(2)}</span>
                  </div>
                ))}
                {getDueDates(selectedDate || new Date()).length === 0 && (
                  <p className="text-muted-foreground">No payments due on this date.</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Loan Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {mockUserLoans.map((loan) => {
                const totalLoanAmount = loan.outstandingBalance + loan.totalInterestPaid
                const progress = (loan.totalInterestPaid / totalLoanAmount) * 100
                return (
                  <div key={loan.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{loan.name}</span>
                      <span>{progress.toFixed(0)}% paid</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {mockUserLoans.some((loan) => loan.isOverdue) && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Overdue Payments</AlertTitle>
          <AlertDescription>
            You have overdue payments on one or more loans. Please make the payments as soon as possible to avoid
            additional charges.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}

