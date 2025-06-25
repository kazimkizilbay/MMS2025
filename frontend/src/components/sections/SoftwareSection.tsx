import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Ship, 
  Wrench, 
  Anchor, 
  Cpu, 
  Brain,
  Zap,
  Shield,
  BarChart3,
  Cog,
  Users,
  Calendar,
  FileText,
  Truck,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Settings,
  Target,
  TrendingUp
} from 'lucide-react';

export function SoftwareSection() {
  const { t } = useTranslation();
  const [activeModule, setActiveModule] = useState('nb');

  const modules = {
    nb: {
      title: t('software.modules.nb.title'),
      description: t('software.modules.nb.description'),
      icon: Ship,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500',
      features: [
        { name: 'AI Destekli Proje Yönetimi', icon: Brain },
        { name: 'Akıllı Üretim Planlama', icon: Cog },
        { name: 'Tahminleme ve Optimizasyon', icon: TrendingUp },
        { name: 'Dijital İkiz Teknolojisi', icon: Cpu },
        { name: 'Otomatik Kalite Kontrol', icon: CheckCircle },
        { name: 'Akıllı Tedarik Zinciri', icon: Truck },
        { name: 'Gerçek Zamanlı İzleme', icon: BarChart3 },
        { name: 'Predictive Maintenance', icon: Settings },
        { name: 'Remark Modülü', icon: FileText },
        { name: 'Dizayn ve Döküman Modülü', icon: FileText },
        { name: 'Toplantı Modülü', icon: Users },
        { name: 'İmalat Modülü', icon: Cog },
        { name: 'Teknik Satınalma Modülü', icon: Truck },
        { name: 'Satış, Garanti ve Servis Modülü', icon: Shield },
        { name: 'Malzeme Yönetimi Modülü', icon: Truck },
        { name: 'Taşeron Yönetim Modülü', icon: Users },
        { name: 'Tersane Yönetim Modülü', icon: Ship },
        { name: 'Satınalma Modülü', icon: DollarSign },
        { name: 'İş Sağlığı ve Güvenliği Modülü', icon: Shield },
        { name: 'Depolama & Nakliye Modülü', icon: Truck },
        { name: 'Finans ve Muhasebe Modülü', icon: DollarSign },
        { name: 'İnsan Kaynakları Modülü', icon: Users },
        { name: 'Risk Yönetimi Modülü', icon: AlertTriangle },
        { name: 'Teklif/Sözleşme Yönetimi', icon: FileText },
        { name: 'Rapor Yönetimi Modülü', icon: BarChart3 },
        { name: 'İş Akış Yönetimi', icon: Target },
        { name: 'Eğitim Modülü', icon: Users }
      ]
    },
    srm: {
      title: t('software.modules.srm.title'),
      description: t('software.modules.srm.description'),
      icon: Wrench,
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500',
      features: [
        { name: 'Akıllı Bakım Planlama', icon: Calendar },
        { name: 'Predictive Analytics', icon: Brain },
        { name: 'Otomatik Arıza Tespiti', icon: AlertTriangle },
        { name: 'Dijital Müşteri Yönetimi', icon: Users },
        { name: 'AI Destekli Kaynak Optimizasyonu', icon: TrendingUp },
        { name: 'Akıllı Stok Yönetimi', icon: Truck },
        { name: 'Gerçek Zamanlı Performans İzleme', icon: BarChart3 },
        { name: 'Otomatik Raporlama', icon: FileText },
        { name: 'Müşteri Takip Modülü', icon: Users },
        { name: 'Pazarlama, Teklif ve Sözleşme Yönetimi', icon: Target },
        { name: 'Plan-Keşif-Proje Yönetimi', icon: FileText },
        { name: 'Tedarik Yönetimi', icon: Truck },
        { name: 'Atölye Yönetimi', icon: Cog },
        { name: 'Alt Yüklenici Yönetimi', icon: Users },
        { name: 'Üretim-İşletme Yönetimi', icon: Cog },
        { name: 'Kalite-Kontrol Yönetimi', icon: CheckCircle },
        { name: 'Dizayn-Döküman Yönetimi', icon: FileText },
        { name: 'Finans Modülü', icon: DollarSign },
        { name: 'Toplantı Modülü', icon: Users },
        { name: 'Tersane Yönetim Modülü', icon: Ship },
        { name: 'İş Sağlığı ve Güvenliği Modülü', icon: Shield }
      ]
    },
    yacht: {
      title: t('software.modules.yacht.title'),
      description: t('software.modules.yacht.description'),
      icon: Anchor,
      color: 'green',
      gradient: 'from-green-500 to-emerald-500',
      features: [
        { name: 'Kişiselleştirilmiş Tasarım AI', icon: Brain },
        { name: 'Lüks Müşteri Deneyimi Yönetimi', icon: Users },
        { name: 'Akıllı Proje Takibi', icon: Target },
        { name: 'Otomatik Kalite Güvence', icon: CheckCircle },
        { name: 'AI Destekli Malzeme Seçimi', icon: Cog },
        { name: 'Dijital Showroom', icon: Cpu },
        { name: 'Gerçek Zamanlı Üretim İzleme', icon: BarChart3 },
        { name: 'Predictive Delivery', icon: Truck },
        { name: 'Müşteri İlişkileri Yönetimi', icon: Users },
        { name: 'Teklif/Sözleşme Yönetimi', icon: FileText },
        { name: 'Yat Mimari Takip Modülü', icon: FileText },
        { name: 'Tasarım ve Mühendislik Modülü', icon: Cog },
        { name: 'Yat Üretim Yönetimi', icon: Cog },
        { name: 'Atölye Yönetimi', icon: Cog },
        { name: 'Tedarik Yönetimi', icon: Truck },
        { name: 'Depolama Yönetimi', icon: Truck },
        { name: 'Alt Yüklenici Yönetimi', icon: Users },
        { name: 'Finans Modülü', icon: DollarSign },
        { name: 'İş Sağlığı ve Güvenliği Modülü', icon: Shield }
      ]
    }
  };

  return (
    <section id="software" className="py-24 bg-gray-50 dark:bg-slate-900 relative overflow-hidden">
      {/* Decorative Background Blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-tr from-blue-200/30 to-purple-300/30 dark:from-blue-600/20 dark:to-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-green-200/30 to-emerald-300/30 dark:from-green-600/20 dark:to-emerald-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20 animate-in fade-in slide-in-from-top-2 duration-700">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100/80 dark:bg-blue-900/50 backdrop-blur-sm text-blue-800 dark:text-blue-200 text-sm font-medium mb-6 border border-blue-200/50 dark:border-blue-700/50">
            <Cpu className="w-4 h-4 mr-2" />
            {t('software.title')}
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-slate-50 mb-8">
            {t('software.title')}
          </h2>
          <p className="text-xl text-gray-700 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
            {t('software.description')}
          </p>
        </div>

        {/* Module Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 animate-in fade-in slide-in-from-bottom-2 duration-700">
          {Object.entries(modules).map(([key, module]) => {
            const IconComponent = module.icon;
            const isActive = activeModule === key;

            return (
              <button
                key={key}
                onClick={() => setActiveModule(key)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isActive
                    ? `bg-gradient-to-r ${module.gradient} text-white shadow-xl`
                    : `bg-white border border-gray-300 text-gray-700 dark:bg-slate-800/80 dark:border-slate-700/50 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 hover:shadow-lg shadow-sm`
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span>{module.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Module Content */}
        <div key={activeModule} className="bg-white border border-gray-200 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 dark:border-gray-700 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-right-2 duration-700">
          <div className={`bg-gradient-to-r ${modules[activeModule as keyof typeof modules].gradient} p-8 text-white`}>
            <div className="flex items-center space-x-4 mb-4">
              {(() => {
                const IconComponent = modules[activeModule as keyof typeof modules].icon;
                return <IconComponent className="w-8 h-8" />;
              })()}
              <h3 className="text-3xl font-bold">
                {modules[activeModule as keyof typeof modules].title}
              </h3>
            </div>
            <p className="text-lg opacity-90 leading-relaxed">
              {modules[activeModule as keyof typeof modules].description}
            </p>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules[activeModule as keyof typeof modules].features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-6 bg-gray-50 border border-gray-200 dark:bg-gray-800/70 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-br ${modules[activeModule as keyof typeof modules].gradient} rounded-lg flex items-center justify-center shadow-lg`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-900 dark:text-gray-300 font-medium">
                      {feature.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* MMS Paketleri Section */}
        <div className="mt-24 mb-16">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              MMS Paketleri
            </h3>
            <p className="text-xl text-gray-700 dark:text-slate-300 max-w-3xl mx-auto">
              İhtiyaçlarınıza uygun paket seçin ve dijital dönüşümünüzü başlatın
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Starter Package */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Ship className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  MMS Starter
                </h4>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Temel işlevler
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    5 modül
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Uygun fiyat
                  </li>
                </ul>
                <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-6 rounded-2xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Daha Fazla Bilgi
                </button>
              </div>
            </div>

            {/* Professional Package */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl"></div>
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                Popüler
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Wrench className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  MMS Professional
                </h4>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    İleri düzey çözümler
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    12 modül
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Karmaşık ihtiyaçlara uygun
                  </li>
                </ul>
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-2xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Daha Fazla Bilgi
                </button>
              </div>
            </div>

            {/* Enterprise Package */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Anchor className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  MMS Enterprise
                </h4>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    En kapsamlı çözümler
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    20 modül
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Tüm işletme ihtiyaçlarına yönelik
                  </li>
                </ul>
                <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-2xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Daha Fazla Bilgi
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Teknik Yapılabilirlik Section */}
        <div className="mt-24 mb-16">
          <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <h3 className="text-4xl font-bold mb-12 text-center">
                Teknik Yapılabilirlik
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {/* Kullanılan Teknolojiler */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center mb-4">
                    <Cpu className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-4">Kullanılan Teknolojiler</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Modern ve yaygın olarak kullanılan yazılım geliştirme teknolojileri ve araçları (Java, Python, JavaScript, MySQL, PostgreSQL, AWS, Azure, Google Cloud, Git, Jira, Confluence) kullanılarak geliştirilecektir.
                  </p>
                </div>

                {/* Mevcut Altyapı Uyumluluğu */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-4">Mevcut Altyapı Uyumluluğu</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Bulut tabanlı yapısı sayesinde işletmelerin karmaşık ve maliyetli donanım yatırımları yapmalarına gerek yoktur.
        </p>
                </div>

                {/* Entegrasyon */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-xl flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-4">Entegrasyon</h4>
                  <p className="text-gray-300 leading-relaxed">
                    Diğer yazılımlarla (muhasebe, CRM, tedarik zinciri vb.) entegre olabilecek şekilde tasarlanmıştır.
                  </p>
                </div>
              </div>

              {/* Ekip Yetkinlikleri */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h4 className="text-2xl font-bold mb-6 text-center">Ekip Yetkinlikleri</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center mb-3 mx-auto">
                      <Cpu className="w-6 h-6 text-white" />
                    </div>
                    <h5 className="font-semibold mb-2">Yazılım Geliştirme</h5>
                    <p className="text-sm text-gray-300">Deneyimli yazılım mühendisleri ve geliştiricileri</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center mb-3 mx-auto">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h5 className="font-semibold mb-2">Gemi İnşa Sektörü Bilgisi</h5>
                    <p className="text-sm text-gray-300">Sektör dinamiklerini, iş süreçlerini ve ihtiyaçlarını iyi bilen uzmanlar</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-xl flex items-center justify-center mb-3 mx-auto">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <h5 className="font-semibold mb-2">Veritabanı Yönetimi</h5>
                    <p className="text-sm text-gray-300">Veritabanı tasarımı, geliştirme ve yönetimi konusunda deneyimli uzmanlar</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-400 rounded-xl flex items-center justify-center mb-3 mx-auto">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h5 className="font-semibold mb-2">Bulut Teknolojileri</h5>
                    <p className="text-sm text-gray-300">Bulut platformları ve hizmetleri konusunda deneyimli uzmanlar</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center mb-3 mx-auto">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h5 className="font-semibold mb-2">Proje Yönetimi</h5>
                    <p className="text-sm text-gray-300">Projeyi planlama, yönetme ve tamamlama konusunda deneyimli proje yöneticileri</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-red-400 rounded-xl flex items-center justify-center mb-3 mx-auto">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <h5 className="font-semibold mb-2">İş Analizi</h5>
                    <p className="text-sm text-gray-300">İş ihtiyaçlarını analiz etme, çözümler tasarlama ve yazılım gereksinimlerini belirleme konusunda deneyimli iş analistleri</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-xl flex items-center justify-center mb-3 mx-auto">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <h5 className="font-semibold mb-2">Test ve Kalite Güvence</h5>
                    <p className="text-sm text-gray-300">Yazılımı test etme, hataları belirleme ve kalitesini sağlama konusunda deneyimli test uzmanları</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-xl flex items-center justify-center mb-3 mx-auto">
                      <Settings className="w-6 h-6 text-white" />
                    </div>
                    <h5 className="font-semibold mb-2">Sistem Yönetimi</h5>
                    <p className="text-sm text-gray-300">Sistem kurulumu, yapılandırması ve bakımı konusunda deneyimli sistem yöneticileri</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
} 