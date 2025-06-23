import { CheckCircle, Globe, Cog, Layers, DollarSign } from 'lucide-react';

export function FeaturesSection() {

  const features = [
    {
      icon: CheckCircle,
      title: "Sektöre Özgü Çözümler",
      description: "Gemi inşa süreçlerine ve terminolojisine tam uyumlu, sektöre özel modüller ve iş akışları sunar.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Globe,
      title: "Yerli Üretim",
      description: "Türkiye'deki gemi inşa sektörünün ihtiyaçlarına ve dinamiklerine göre geliştirilmiş, Türkçe dil desteği sağlayan bir yazılımdır.",
      gradient: "from-red-500 to-red-600"
    },
    {
      icon: Layers,
      title: "Esneklik ve Ölçeklenebilirlik",
      description: "Modüler yapısı sayesinde işletmelerin ihtiyaçlarına göre özelleştirilebilir ve ölçeklenebilir.",
      gradient: "from-blue-500 to-purple-500"
    },
    {
      icon: Cog,
      title: "Kullanıcı Dostu Arayüz",
      description: "Gemi inşa sektöründeki kullanıcıların iş yapış şekillerine uygun, basit ve anlaşılır bir arayüze sahiptir.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: DollarSign,
      title: "Rekabetçi Fiyatlandırma",
      description: "Yüksek maliyetli yabancı rakiplerine kıyasla rekabetçi fiyatlandırma modellyle öne çıkar.",
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/60 backdrop-blur-sm dark:bg-slate-800/60 text-blue-800 dark:text-blue-200 text-sm font-medium border border-blue-200/50 dark:border-blue-700/50 mb-8">
            <CheckCircle className="w-4 h-4 mr-2" />
            Özellikler
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-8">
            MMS'i Farklı Kılan Özellikler
          </h2>
                      <p className="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Gemi inşa sektörüne özel geliştirilmiş MMS, rakiplerinden farklı özellikleri ile öne çıkar ve işletmelere rekabet avantajı sağlar.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-200/50 dark:border-slate-700/50 overflow-hidden"
              >
                {/* Background Gradient on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-4">
                    {feature.title}
                  </h3>
                                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-green-500/10 to-cyan-500/10 rounded-full blur-xl"></div>
              </div>
            );
          })}
        </div>


      </div>
    </section>
  );
} 