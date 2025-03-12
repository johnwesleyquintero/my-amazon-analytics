
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, TrendingUp, Globe, Users } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <nav className="container mx-auto px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex">
              <div className="h-6 w-2 bg-burnt-sienna rounded-sm"></div>
              <div className="h-6 w-2 bg-shakespeare rounded-sm ml-0.5"></div>
              <div className="h-6 w-2 bg-gold rounded-sm ml-0.5"></div>
            </div>
            <div className="text-2xl font-bold font-manrope text-gray-900">
              My Amazon Guy
            </div>
          </div>
          <div className="space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-gray-700 hover:text-burnt-sienna">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-burnt-sienna hover:bg-burnt-sienna/90 text-white font-medium">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-manrope leading-tight">
              Transform Your <span className="text-burnt-sienna">Amazon</span> Analytics
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed font-roboto max-w-3xl mx-auto">
              Powerful analytics dashboard for monitoring and optimizing your Amazon advertising performance.
              Get started today and unlock the potential of your data.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-burnt-sienna hover:bg-burnt-sienna/90 text-white font-bold px-8 py-6 text-lg rounded-lg">
                Start Free Trial <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </Link>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 bg-white">
              <div className="bg-iceberg/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-shakespeare" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 font-manrope">Real-time Analytics</h3>
              <p className="text-gray-600 font-roboto">Monitor your Amazon advertising performance metrics in real-time with our intuitive dashboard.</p>
            </div>
            <div className="p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 bg-white">
              <div className="bg-apricot/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-burnt-sienna" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 font-manrope">Custom Reports</h3>
              <p className="text-gray-600 font-roboto">Generate detailed reports and export them in multiple formats for deeper insights.</p>
            </div>
            <div className="p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 bg-white">
              <div className="bg-hampton/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 font-manrope">Data Integration</h3>
              <p className="text-gray-600 font-roboto">Seamlessly integrate with your Amazon Ads data sources for comprehensive analysis.</p>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gradient-to-r from-catskill-white to-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-manrope">Trusted by Amazon Sellers Worldwide</h2>
              <p className="text-gray-600 max-w-2xl mx-auto font-roboto">Join thousands of successful Amazon sellers who have optimized their advertising with My Amazon Guy analytics.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
              <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center h-24 w-full">
                <div className="text-xl font-bold text-gray-800">500+ clients</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center h-24 w-full">
                <div className="text-xl font-bold text-gray-800">$50M+ managed</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center h-24 w-full">
                <div className="text-xl font-bold text-gray-800">98% retention</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-center h-24 w-full">
                <div className="text-xl font-bold text-gray-800">24/7 support</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="flex">
                <div className="h-6 w-2 bg-burnt-sienna rounded-sm"></div>
                <div className="h-6 w-2 bg-shakespeare rounded-sm ml-0.5"></div>
                <div className="h-6 w-2 bg-gold rounded-sm ml-0.5"></div>
              </div>
              <div className="text-xl font-bold font-manrope">
                My Amazon Guy
              </div>
            </div>
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} My Amazon Guy. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
