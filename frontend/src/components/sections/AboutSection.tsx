import { useTranslation } from 'react-i18next';
import { Target, Eye, Heart, Zap, Shield, Cloud, BarChart3 } from 'lucide-react';

export function AboutSection() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hakkımızda Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-6">
              {t('about.title')}
            </h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
                {t('about.description')}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
                {t('about.highlight')}
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
              <img 
                src="/gemi-insaat.png" 
                alt="Gemi İnşa Sektöründe Yeni Bir Çağ Başlıyor" 
                className="relative w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Vision, Mission, Promises Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {/* Vizyon */}
          <div id="vision" className="group bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 ml-4">{t('vision.title')}</h3>
            </div>
            <div className="mb-6">
              <img 
                src="/vizyon.jpg" 
                alt="Vizyonumuz" 
                className="w-full h-48 object-cover rounded-xl shadow-lg"
              />
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
              {t('vision.description')}
            </p>
          </div>

          {/* Misyon */}
          <div id="mission" className="group bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 ml-4">{t('mission.title')}</h3>
            </div>
            <div className="mb-6">
              <img 
                src="/misyon.jpg" 
                alt="Misyonumuz" 
                className="w-full h-48 object-cover rounded-xl shadow-lg"
              />
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
              {t('mission.description')}
            </p>
          </div>

          {/* Vaatlerimiz */}
          <div id="promises" className="group bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50 ml-4">{t('promises.title')}</h3>
            </div>
            <div className="mb-6">
              <img 
                src="/vaat.jpg" 
                alt="Ne Vaat Ediyoruz" 
                className="w-full h-48 object-cover rounded-xl shadow-lg"
              />
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
              {t('promises.description')}
            </p>
          </div>
        </div>

        {/* Teknolojik Vaatlerimiz */}
        <div className="text-center mb-16">
          <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-8">
            Teknolojik Vaatlerimiz
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Modern teknolojilerle donatılmış çözümlerimizle geleceği bugünden inşa ediyoruz
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
            <div key={index} className="group bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-200/50 dark:border-slate-700/50">
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-3">
                {feature.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* MMS'in Sunduğu Çözümler */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <div className="text-center mb-16">
          <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-50 mb-8">
            MMS'in Sunduğu Çözümler
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Gemi inşa sektörüne özgü çözümler sunan MMS, projelerin daha verimli, kontrollü ve karlı bir şekilde yönetilmesini sağlar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: "📋",
              title: "Entegre Süreç Yönetimi",
              description: "Gemi inşa sürecinin farklı aşamalarını ve bileşenlerini entegre bir platformda birleştirerek koordinasyonu sağlar ve operasyonel hataları minimize eder."
            },
            {
              icon: "🤖",
              title: "Otomasyon ve Dijitalleşme",
              description: "Manuel süreçleri otomatikleştirerek ve dijitalleştirerek zaman kayıplarını önler ve verimliliği artırır."
            },
            {
              icon: "📊",
              title: "Maliyet Kontrolü",
              description: "Maliyetlerin etkin takibi ve yönetimi ile gereksiz harcamaların önüne geçerek karlılığı artırır."
            },
            {
              icon: "🚀",
              title: "Rekabet Gücü ve İnovasyon",
              description: "Kullanıcı dostu arayüzü, gelişmiş özellikleri ve sürekli güncellenen yapısıyla işletmelere rekabet avantajı sağlar."
            },
            {
              icon: "💾",
              title: "Bilgi ve Veri Yönetimi",
              description: "Toplanan verilerin etkili yönetimi ve analizi ile stratejik karar alma süreçlerini destekler."
            }
          ].map((solution, index) => (
            <div key={index} className="group bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-200/50 dark:border-slate-700/50">
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {solution.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                {solution.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 