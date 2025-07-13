import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Lightbulb, 
  Target, 
  Cog, 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Smartphone, 
  Brain,
  Database,
  Route,
  Zap,
  Globe,
  BarChart3,
  Headphones,
  Car,
  QrCode,
  Bell,
  ExternalLink,
  Sparkles
} from "lucide-react";

export default function SparkathonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* Header */}
        <div className="text-center py-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full shadow-xl">
              <Sparkles className="w-12 h-12 text-white animate-pulse" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-6">
            Walmart Sparkathon 2025
          </h1>
          <p className="text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            PocketPF: Transforming Walmart Shopping Through AI-Powered Navigation
          </p>
          <div className="flex justify-center gap-3 mt-6">
            <Badge className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 text-sm hover:from-blue-500 hover:to-blue-600 transition-all duration-300">
              <Brain className="w-4 h-4 mr-2" />
              AI-Powered
            </Badge>
            <Badge className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-4 py-2 text-sm hover:from-emerald-500 hover:to-emerald-600 transition-all duration-300">
              <Smartphone className="w-4 h-4 mr-2" />
              Mobile-First
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 text-sm hover:from-purple-500 hover:to-purple-600 transition-all duration-300">
              <Route className="w-4 h-4 mr-2" />
              Route Optimization
            </Badge>
          </div>
        </div>

        {/* Project Summary */}
        <Card className="bg-gradient-to-r from-slate-800 to-slate-700 border-2 border-amber-500/30 shadow-2xl shadow-amber-500/20 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border-b border-amber-500/30">
            <CardTitle className="flex items-center gap-3 text-2xl text-amber-300">
              <Lightbulb className="w-7 h-7" />
              Our Solution
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <p className="text-xl text-slate-200 leading-relaxed">
              <strong className="text-amber-300">AI-powered in-store navigation system</strong> that transforms Walmart shopping into efficient, guided experiences through intelligent route optimization and real-time directions.
            </p>
          </CardContent>
        </Card>

        {/* Problem Statement */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600/50 shadow-2xl backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-red-500/20 to-rose-500/20 border-b border-red-500/30">
            <CardTitle className="flex items-center gap-3 text-2xl text-red-300">
              <Target className="w-7 h-7" />
              Problem We're Solving
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <p className="text-lg text-slate-200 leading-relaxed">
              Walmart customers face significant navigation challenges in large Supercenters and Neighborhood Markets, leading to poor shopping experiences and operational inefficiencies.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-slate-700/50 to-slate-600/50 p-6 rounded-xl border border-slate-600/30">
                <h3 className="font-semibold text-xl mb-4 flex items-center gap-3 text-blue-300">
                  <Users className="w-6 h-6" />
                  Customer Pain Points
                </h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Lost customers in massive stores (180,000+ sq ft Supercenters)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Inefficient shopping trips (30-40% longer than needed)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Abandoned shopping missions due to frustration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Accessibility challenges for elderly and disabled customers</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-slate-700/50 to-slate-600/50 p-6 rounded-xl border border-slate-600/30">
                <h3 className="font-semibold text-xl mb-4 flex items-center gap-3 text-green-300">
                  <BarChart3 className="w-6 h-6" />
                  Walmart's Business Impact
                </h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span>Reduced customer satisfaction and NPS scores</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span>Lost sales opportunities from unfound items</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span>Increased operational costs for customer assistance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span>Suboptimal store traffic flow and congestion</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Solution Approach */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600/50 shadow-2xl backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-b border-emerald-500/30">
            <CardTitle className="flex items-center gap-3 text-2xl text-emerald-300">
              <Cog className="w-7 h-7" />
              Our Approach
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            
            <div className="bg-gradient-to-br from-slate-700/50 to-slate-600/50 p-6 rounded-xl border border-slate-600/30">
              <h3 className="font-semibold text-xl mb-4 flex items-center gap-3 text-purple-300">
                <Zap className="w-6 h-6" />
                Technology Stack
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-blue-400 font-medium">Frontend:</span>
                    <span className="text-slate-300">Next.js 15 + TypeScript</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-blue-400 font-medium">AI Processing:</span>
                    <span className="text-slate-300">Google AI Genkit</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-blue-400 font-medium">Database:</span>
                    <span className="text-slate-300">Supabase + PostgreSQL</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-blue-400 font-medium">UI Framework:</span>
                    <span className="text-slate-300">Tailwind CSS + Radix UI</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-blue-400 font-medium">Navigation:</span>
                    <span className="text-slate-300">Custom pathfinding algorithms</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-blue-400 font-medium">Mobile:</span>
                    <span className="text-slate-300">Responsive, touch-optimized</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="border-slate-600/50" />

            <div className="bg-gradient-to-br from-slate-700/50 to-slate-600/50 p-6 rounded-xl border border-slate-600/30">
              <h3 className="font-semibold text-xl mb-4 flex items-center gap-3 text-blue-300">
                <ShoppingCart className="w-6 h-6" />
                Walmart Store Integration
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/20 p-4 rounded-lg border border-blue-500/30">
                  <h4 className="font-medium mb-2 text-blue-300">Store Layouts</h4>
                  <p className="text-sm text-slate-300">5 Walmart-specific formats: Supercenter, XL, Neighborhood Market, Downtown, Express</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-500/20 p-4 rounded-lg border border-emerald-500/30">
                  <h4 className="font-medium mb-2 text-emerald-300">Product Database</h4>
                  <p className="text-sm text-slate-300">Integrated inventory with Great Value and brand alternatives</p>
                </div>
                <div className="bg-gradient-to-br from-purple-600/20 to-purple-500/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="font-medium mb-2 text-purple-300">Section Mapping</h4>
                  <p className="text-sm text-slate-300">Grocery, Electronics, Pharmacy, Vision Center coverage</p>
                </div>
              </div>
            </div>

            <Separator className="border-slate-600/50" />

            <div className="bg-gradient-to-br from-slate-700/50 to-slate-600/50 p-6 rounded-xl border border-slate-600/30">
              <h3 className="font-semibold text-xl mb-4 flex items-center gap-3 text-green-300">
                <TrendingUp className="w-6 h-6" />
                Business Value for Walmart
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span>Reduce shopping time by 25-35%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span>Increase sales conversion rates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span>Improve customer satisfaction scores</span>
                  </li>
                </ul>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span>Reduce associate assistance time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span>Provide valuable shopping analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    <span>Create competitive advantage</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Future Improvements */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600/50 shadow-2xl backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 border-b border-indigo-500/30">
            <CardTitle className="flex items-center gap-3 text-2xl text-indigo-300">
              <TrendingUp className="w-7 h-7" />
              Future Improvements & Roadmap
            </CardTitle>
            <CardDescription className="text-lg text-indigo-200">
              Expanding PocketPF into a comprehensive Walmart ecosystem solution
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Phase 1: Enhanced Navigation */}
              <div className="bg-gradient-to-br from-slate-700/50 to-slate-600/50 p-6 rounded-xl border border-slate-600/30">
                <h3 className="font-semibold text-xl text-purple-300 flex items-center gap-3 mb-4">
                  <Route className="w-6 h-6" />
                  Phase 1: Enhanced Navigation
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <QrCode className="w-5 h-5 text-blue-400 mt-1" />
                    <div>
                      <p className="font-medium text-slate-200">QR Code Integration</p>
                      <p className="text-sm text-slate-400">Scan shelf tags for instant product location and details</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Bell className="w-5 h-5 text-green-400 mt-1" />
                    <div>
                      <p className="font-medium text-slate-200">Smart Notifications</p>
                      <p className="text-sm text-slate-400">Alerts for deals, out-of-stock items, and alternative suggestions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Headphones className="w-5 h-5 text-purple-400 mt-1" />
                    <div>
                      <p className="font-medium text-slate-200">Voice Navigation</p>
                      <p className="text-sm text-slate-400">Hands-free directions with voice commands and audio guidance</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase 2: Smart Shopping */}
              <div className="bg-gradient-to-br from-slate-700/50 to-slate-600/50 p-6 rounded-xl border border-slate-600/30">
                <h3 className="font-semibold text-xl text-blue-300 flex items-center gap-3 mb-4">
                  <Brain className="w-6 h-6" />
                  Phase 2: Smart Shopping
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <BarChart3 className="w-5 h-5 text-orange-400 mt-1" />
                    <div>
                      <p className="font-medium text-slate-200">Predictive Shopping Lists</p>
                      <p className="text-sm text-slate-400">AI learns patterns to suggest items before you need them</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-red-400 mt-1" />
                    <div>
                      <p className="font-medium text-slate-200">Dynamic Pricing Integration</p>
                      <p className="text-sm text-slate-400">Real-time price comparisons and rollback notifications</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-teal-400 mt-1" />
                    <div>
                      <p className="font-medium text-slate-200">Social Shopping</p>
                      <p className="text-sm text-slate-400">Share lists with family, collaborative shopping experiences</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase 3: Store Operations */}
              <div className="bg-gradient-to-br from-slate-700/50 to-slate-600/50 p-6 rounded-xl border border-slate-600/30">
                <h3 className="font-semibold text-xl text-green-300 flex items-center gap-3 mb-4">
                  <Cog className="w-6 h-6" />
                  Phase 3: Store Operations
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Database className="w-5 h-5 text-indigo-400 mt-1" />
                    <div>
                      <p className="font-medium text-slate-200">Inventory Management</p>
                      <p className="text-sm text-slate-400">Real-time stock levels and automated reorder suggestions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BarChart3 className="w-5 h-5 text-pink-400 mt-1" />
                    <div>
                      <p className="font-medium text-slate-200">Traffic Analytics</p>
                      <p className="text-sm text-slate-400">Heatmaps and congestion analysis for store layout optimization</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-cyan-400 mt-1" />
                    <div>
                      <p className="font-medium text-slate-200">Associate Tools</p>
                      <p className="text-sm text-slate-400">Staff dashboard for customer assistance and inventory tasks</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase 4: Omnichannel */}
              <div className="bg-gradient-to-br from-slate-700/50 to-slate-600/50 p-6 rounded-xl border border-slate-600/30">
                <h3 className="font-semibold text-xl text-orange-300 flex items-center gap-3 mb-4">
                  <Globe className="w-6 h-6" />
                  Phase 4: Omnichannel Integration
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Car className="w-5 h-5 text-blue-400 mt-1" />
                    <div>
                      <p className="font-medium text-slate-200">Curbside Pickup</p>
                      <p className="text-sm text-slate-400">Seamless transition from in-store to pickup optimization</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Smartphone className="w-5 h-5 text-green-400 mt-1" />
                    <div>
                      <p className="font-medium text-slate-200">Walmart App Integration</p>
                      <p className="text-sm text-slate-400">Native integration with existing Walmart mobile ecosystem</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-purple-400 mt-1" />
                    <div>
                      <p className="font-medium text-slate-200">Multi-Store Support</p>
                      <p className="text-sm text-slate-400">Cross-store inventory and nationwide store location features</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-8 border-slate-600/50" />

            <div className="bg-gradient-to-r from-slate-700/50 via-indigo-600/20 to-purple-600/20 p-8 rounded-xl border border-indigo-500/30">
              <h3 className="font-semibold text-xl mb-4 text-center text-indigo-300">Long-term Vision</h3>
              <p className="text-slate-200 text-center leading-relaxed text-lg">
                Transform PocketPF into the definitive Walmart shopping companion that not only guides customers efficiently through stores but also enhances Walmart's operational intelligence, creates new revenue opportunities through targeted promotions, and establishes Walmart as the leader in retail technology innovation.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 border-2 border-indigo-400/50 shadow-2xl shadow-indigo-500/30 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Walmart Shopping?
            </h3>
            <p className="text-indigo-100 mb-8 max-w-2xl mx-auto text-lg">
              PocketPF represents the future of retail navigation - where AI meets customer experience to create shopping that's faster, smarter, and more enjoyable.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/" 
                className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Try the Demo
              </a>
              <a 
                href="https://github.com/Abhinavd1605/PocketPF" 
                className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-slate-600 flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-5 h-5" />
                View Source Code
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}