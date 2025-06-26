import { useTranslation } from 'react-i18next';
import { Target, Eye, Heart, Zap, Shield, Cloud, BarChart3, Brain } from 'lucide-react';

export function AboutSection() {
  const { t } = useTranslation();

  // Helper function to safely get object array from translation
  const getTranslationObjectArray = (key: string, fallback: any[] = []): any[] => {
    const result = t(key, { returnObjects: true });
    return Array.isArray(result) ? result : fallback;
  };

  return (
    <section id="about" className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300/15 dark:bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/15 dark:bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hakkımızda Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-50 border border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-200 text-sm font-medium mb-8 shadow-sm">
              <Target className="w-4 h-4 mr-2" />
              {t('about.title')}
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-slate-50 mb-6">
              {t('about.title')}
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-stretch">
            <div className="flex flex-col justify-center space-y-8 bg-white border border-gray-200 dark:bg-slate-800/80 dark:border-slate-700/50 rounded-3xl p-8 shadow-lg">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 mt-1">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-slate-50 mb-3">{t('about.subtitle')}</h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      {t('about.description')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0 mt-1">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-slate-50 mb-3">{t('about.approach')}</h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      {t('about.highlight')}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">15+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('about.stats.experience')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">67+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('about.stats.modules')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">99%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('about.stats.satisfaction')}</div>
                </div>
              </div>
            </div>
            
            <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-3xl p-8 shadow-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-600/20 dark:to-purple-600/20"></div>
              <div className="relative h-full flex items-center justify-center">
                <img 
                  src="/gemi-insaat.png" 
                  alt="Gemi İnşa Sektöründe Yeni Bir Çağ Başlıyor" 
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-6 right-6 w-16 h-16 bg-white/90 dark:bg-slate-800/90 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                <Brain className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="absolute bottom-6 left-6 w-16 h-16 bg-white/90 dark:bg-slate-800/90 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Vision, Mission, Promises Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {/* Vizyon */}
          <div id="vision" className="group bg-white border border-gray-200 dark:bg-slate-800/80 dark:border-slate-700/50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 shadow-sm">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-50 ml-4">{t('vision.title')}</h3>
            </div>
            <div className="mb-6">
              <img 
                src="/vizyon.jpg" 
                alt="Vizyonumuz" 
                className="w-full h-48 object-cover rounded-xl shadow-lg"
              />
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              {t('vision.description')}
            </p>
          </div>

          {/* Misyon */}
          <div id="mission" className="group bg-white border border-gray-200 dark:bg-slate-800/80 dark:border-slate-700/50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 shadow-sm">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-50 ml-4">{t('mission.title')}</h3>
            </div>
            <div className="mb-6">
              <img 
                src="/misyon.jpg" 
                alt="Misyonumuz" 
                className="w-full h-48 object-cover rounded-xl shadow-lg"
              />
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              {t('mission.description')}
            </p>
          </div>

          {/* Vaatlerimiz */}
          <div id="promises" className="group bg-white border border-gray-200 dark:bg-slate-800/80 dark:border-slate-700/50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 shadow-sm">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-50 ml-4">{t('promises.title')}</h3>
            </div>
            <div className="mb-6">
              <img 
                src="/vaat.jpg" 
                alt="Ne Vaat Ediyoruz" 
                className="w-full h-48 object-cover rounded-xl shadow-lg"
              />
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
              {t('promises.description')}
            </p>
          </div>
        </div>

        {/* Teknolojik Vaatlerimiz */}
        <div className="text-center mb-16">
          <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-slate-50 mb-8">
            {t('about.technological_promises.title')}
          </h3>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            {t('about.technological_promises.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Zap,
              title: t('promises.features.0.title'),
              description: t('promises.features.0.description'),
              gradient: "from-yellow-500 to-orange-500"
            },
            {
              icon: Shield,
              title: t('promises.features.1.title'),
              description: t('promises.features.1.description'),
              gradient: "from-blue-500 to-purple-500"
            },
            {
              icon: Cloud,
              title: t('promises.features.2.title'),
              description: t('promises.features.2.description'),
              gradient: "from-cyan-500 to-blue-500"
            },
            {
              icon: BarChart3,
              title: t('promises.features.3.title'),
              description: t('promises.features.3.description'),
              gradient: "from-green-500 to-emerald-500"
            }
          ].map((feature, index) => (
            <div key={index} className="group bg-white border border-gray-200 dark:bg-slate-800/80 dark:border-slate-700/50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-slate-50 mb-3">
                {feature.title}
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* MMS'in Sunduğu Çözümler */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <div className="text-center mb-16">
          <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-slate-50 mb-8">
            {t('about.solutions.title')}
          </h3>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
            {t('about.solutions.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getTranslationObjectArray('about.solutions.items', []).map((solution, index) => {
            const icons = ["📋", "🤖", "📊", "🚀", "💾"];
            return (
            <div key={index} className="group bg-white border border-gray-200 dark:bg-slate-800/80 dark:border-slate-700/50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 shadow-sm">
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {icons[index]}
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-slate-50 mb-4">
                {solution.title}
              </h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {solution.description}
              </p>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 