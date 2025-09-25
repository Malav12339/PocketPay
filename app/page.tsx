import Link from "next/link";
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Globe, 
  CreditCard, 
  CheckCircle
} from "lucide-react";
import AuthButtons from "./components/AuthButtons";
// import MobileMenu from "./components/MobileMenu";
import ScrollingNav from "./components/ScrollingNav";
import HeroButtons from "./components/HeroButtons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

// Server Component - Main Homepage
export default async function Home() {
  const session = await getServerSession(authOptions)

  if(session) {
    redirect("/dashboard")
  }
  
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Send money instantly with our advanced payment infrastructure"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Bank-Grade Security",
      description: "Your transactions are protected with end-to-end encryption"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Reach",
      description: "Pay anyone, anywhere in the world with competitive exchange rates"
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Multiple Payment Methods",
      description: "Cards, bank transfers, digital wallets - we support them all"
    }
  ];

  const stats = [
    { number: "10M+", label: "Active Users" },
    { number: "₹500B+", label: "Transaction Volume" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  const securityFeatures = [
    "End-to-end encryption for all transactions",
    "Multi-factor authentication support",
    "Real-time fraud monitoring",
    "PCI DSS Level 1 compliance"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Navigation */}
      <ScrollingNav />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight">
              The Future of
              <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Digital Payments
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Send, receive, and manage money with unprecedented speed and security. 
              Experience the next generation of financial freedom with QuickPayz.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <HeroButtons />
              <AuthButtons />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-indigo-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="text-blue-400">QuickPayz</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Built for the modern world, designed for everyone. Experience payments like never before.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group p-8 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer">
                <div className="text-blue-400 mb-4 group-hover:text-purple-400 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Security <span className="text-blue-400">First</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Your money and data are protected by military-grade encryption and advanced fraud detection systems.
              </p>
              
              <div className="space-y-4">
                {securityFeatures.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 cursor-pointer hover:text-blue-100 transition-colors">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative cursor-pointer">
              <div className="w-full h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl backdrop-blur-sm border border-white/10 flex items-center justify-center hover:border-blue-400/50 transition-colors">
                <Shield className="w-32 h-32 text-blue-400 animate-pulse" />
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Payments?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join millions of users who trust QuickPayz for fast, secure, and reliable transactions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/signup"
              className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-10 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-2xl cursor-pointer"
            >
              <span>Start Free Today</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="py-12 px-4 bg-black/30 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0 cursor-pointer hover:scale-105 transition-transform">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center font-bold">
                Q
              </div>
              <span className="text-xl font-bold">QuickPayz</span>
            </div>
            
            <div className="text-gray-400 text-sm">
              © 2025 QuickPayz. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}