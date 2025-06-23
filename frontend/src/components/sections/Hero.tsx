import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Sparkles, Zap, Shield, TrendingUp } from 'lucide-react';

export function Hero() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const openDemoForm = () => {
    // Demo form bölümüne scroll yap
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      // Kısa bir gecikme sonrası demo formunu aç
      setTimeout(() => {
        const demoButton = contactSection.querySelector('button[data-demo-trigger]') as HTMLButtonElement;
        if (demoButton) {
          demoButton.click();
        }
      }, 800);
    }
  };

  return (
    <section id="hero" className="relative min-h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Sparkles className="absolute top-1/4 left-1/4 w-6 h-6 text-blue-400/30 animate-bounce delay-300" />
        <Zap className="absolute top-1/3 right-1/4 w-8 h-8 text-purple-400/30 animate-bounce delay-700" />
        <Shield className="absolute bottom-1/3 left-1/5 w-7 h-7 text-green-400/30 animate-bounce delay-1000" />
        <TrendingUp className="absolute bottom-1/4 right-1/3 w-6 h-6 text-yellow-400/30 animate-bounce delay-1300" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="text-center">
          {/* Main Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge */}
                          <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-200 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 mr-2" />
              Marine Management System (MMS)
            </div>

            {/* Title */}
            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 dark:text-slate-50 mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                Marine Management
            </span>
              <br />
                              <span className="text-slate-900 dark:text-slate-50">System</span>
            </h1>

          {/* Description */}
            <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              Gemi inşa sektörü için yenilikçi ERP çözümleri.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { icon: Sparkles, text: 'AI-Powered' },
                { icon: Zap, text: 'Real-time' },
                { icon: Shield, text: 'Secure' },
                { icon: TrendingUp, text: 'Scalable' }
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={openDemoForm}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25"
              >
                <span className="flex items-center">
                  Demo Talep Et
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
            </button>
            
              <button className="px-8 py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl transition-all duration-300 border border-slate-200 dark:border-slate-700">
                Daha Fazla Bilgi
            </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className={`mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {[
              { number: '15+', label: 'Yıl Deneyim' },
              { number: '67+', label: 'Modül' },
              { number: '99%', label: 'Müşteri Memnuniyeti' }
            ].map((stat, index) => (
              <div key={index} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300">
                <div className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">{stat.number}</div>
                <div className="text-slate-600 dark:text-slate-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-20 text-white dark:text-gray-900" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
} 