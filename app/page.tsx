import { LoanComparisonTool } from "@/components/LoanComparisonTool"
import { PersonalizedRecommendations } from "@/components/PersonalizedRecommendations"
import { RepaymentPlanSimulator } from "@/components/RepaymentPlanSimulator"
import { UserDashboard } from "@/components/UserDashboard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, PersonStanding, BarChart3, LayoutDashboard, DollarSign } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <header className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto text-center">
          <div className="inline-block p-2 bg-primary-foreground rounded-full mb-4">
            <DollarSign className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-4">Loan Management System</h1>
          <p className="text-xl mb-8">Compare, Simulate, and Manage Your Loans with Ease</p>
          <div className="flex justify-center space-x-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-foreground text-primary">
              <Calculator className="w-4 h-4 mr-1" />
              Loan Comparison
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-foreground text-primary">
              <BarChart3 className="w-4 h-4 mr-1" />
              Repayment Simulation
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-foreground text-primary">
              <PersonStanding className="w-4 h-4 mr-1" />
              Personalized Recommendations
            </span>
          </div>
        </div>
      </header>
      <main className="container mx-auto py-12 px-4">
        <Tabs defaultValue="dashboard" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 max-w-3xl mx-auto">
            <TabsTrigger value="dashboard" className="flex items-center justify-center space-x-2 py-3">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="comparison" className="flex items-center justify-center space-x-2 py-3">
              <Calculator className="w-5 h-5" />
              <span>Loan Comparison</span>
            </TabsTrigger>
            <TabsTrigger value="simulator" className="flex items-center justify-center space-x-2 py-3">
              <BarChart3 className="w-5 h-5" />
              <span>Repayment Simulator</span>
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center justify-center space-x-2 py-3">
              <PersonStanding className="w-5 h-5" />
              <span>Recommendations</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
            <UserDashboard />
          </TabsContent>
          <TabsContent value="comparison">
            <LoanComparisonTool />
          </TabsContent>
          <TabsContent value="simulator">
            <RepaymentPlanSimulator />
          </TabsContent>
          <TabsContent value="recommendations">
            <PersonalizedRecommendations />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

