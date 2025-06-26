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
    <section id="hero" className="relative min-h-screen bg-gray-50 dark:bg-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400/15 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/15 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/8 to-purple-400/8 dark:from-blue-500/5 dark:to-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Sparkles className="absolute top-1/4 left-1/4 w-6 h-6 text-blue-500/40 dark:text-blue-400/30 animate-bounce delay-300" />
        <Zap className="absolute top-1/3 right-1/4 w-8 h-8 text-purple-500/40 dark:text-purple-400/30 animate-bounce delay-700" />
        <Shield className="absolute bottom-1/3 left-1/5 w-7 h-7 text-green-500/40 dark:text-green-400/30 animate-bounce delay-1000" />
        <TrendingUp className="absolute bottom-1/4 right-1/3 w-6 h-6 text-orange-500/40 dark:text-yellow-400/30 animate-bounce delay-1300" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="text-center">
          {/* Main Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                      {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-50 border border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-200 text-sm font-medium mb-8 shadow-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              {t('hero.badge')}
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-slate-50 mb-6 sm:mb-8 leading-tight px-4 sm:px-0">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 dark:from-blue-400 dark:via-purple-400 dark:to-green-400 bg-clip-text text-transparent">
                {t('hero.title')}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-slate-300 mb-4 sm:mb-6 px-4 sm:px-0">
              {t('hero.subtitle')}
            </p>

            {/* Description */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-slate-300 max-w-4xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0">
              {t('hero.description')}
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { icon: Sparkles, text: t('hero.features.ai') },
                { icon: Zap, text: t('hero.features.realtime') },
                { icon: Shield, text: t('hero.features.secure') },
                { icon: TrendingUp, text: t('hero.features.scalable') }
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 px-4 py-2 bg-white/80 border border-gray-200 text-gray-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 rounded-full text-sm shadow-sm backdrop-blur-sm"
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
                  {t('hero.cta')}
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            
              <button className="px-8 py-4 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 dark:text-slate-300 font-semibold rounded-xl transition-all duration-300 shadow-sm">
                {t('hero.cta_secondary')}
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className={`mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {[
              { 
                number: '15+', 
                label: t('hero.stats.experience'),
                icon: TrendingUp,
                gradient: 'from-blue-500 to-cyan-500',
                bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20'
              },
              { 
                number: '67+', 
                label: t('hero.stats.modules'),
                icon: Sparkles,
                gradient: 'from-purple-500 to-pink-500',
                bgGradient: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20'
              },
              { 
                number: '99%', 
                label: t('hero.stats.satisfaction'),
                icon: Shield,
                gradient: 'from-green-500 to-emerald-500',
                bgGradient: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20'
              }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className={`relative bg-gradient-to-br ${stat.bgGradient} border border-gray-200 dark:border-slate-700/50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 shadow-lg overflow-hidden group z-10`}>
                  {/* Background Decoration */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl -z-10"></div>
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-4xl font-bold text-gray-900 dark:text-slate-50 mb-3">{stat.number}</div>
                    <div className="text-lg font-medium text-gray-700 dark:text-slate-300">{stat.label}</div>
                  </div>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/10 dark:to-slate-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Animated Wave Background */}
      <svg
        className="absolute bottom-0 left-0 w-full h-40 text-white dark:text-slate-900"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,60 C150,80 350,0 600,50 C850,100 1050,20 1200,80 L1200,120 L0,120 Z"
        >
          <animate
            attributeName="d"
            dur="5s"
            repeatCount="indefinite"
            values="
              M0,60 C150,80 350,0 600,50 C850,100 1050,20 1200,80 L1200,120 L0,120 Z;
              M0,20 C300,140 500,10 700,120 C900,200 1100,30 1200,100 L1200,120 L0,120 Z;
              M0,100 C250,30 450,160 650,40 C850,180 1000,60 1200,120 L1200,120 L0,120 Z;
              M0,60 C150,80 350,0 600,50 C850,100 1050,20 1200,80 L1200,120 L0,120 Z
            "
          />
        </path>
      </svg>
    </section>
  );
} 