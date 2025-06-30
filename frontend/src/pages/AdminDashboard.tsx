import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Mail, Users, TrendingUp, Calendar, Download, RefreshCw } from 'lucide-react';
import { API_URL } from '../lib/config';

interface NewsletterStats {
  totalSubscribers: number;
  totalUnsubscribed: number;
  recentSubscribers: number;
  total: number;
}

interface Subscriber {
  _id: string;
  email: string;
  subscribedAt: string;
}

export function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<NewsletterStats | null>(null);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const token = localStorage.getItem('adminToken');
  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');

  useEffect(() => {
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchData();
  }, [token, navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // İstatistikleri getir
      const statsResponse = await fetch(`${API_URL}/admin/newsletter/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }

      // Email listesini getir
      const listResponse = await fetch(`${API_URL}/newsletter/list`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (listResponse.ok) {
        const listData = await listResponse.json();
        setSubscribers(listData.subscribers);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin');
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Email', 'Kayıt Tarihi'],
      ...subscribers.map(sub => [
        sub.email,
        new Date(sub.subscribedAt).toLocaleString('tr-TR')
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <img src="/logo.png" alt="MMS" className="h-10 w-10" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Hoş geldin, {adminUser.username}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Aktif Aboneler</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {stats?.totalSubscribers || 0}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Toplam Kayıt</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {stats?.total || 0}
                </p>
              </div>
              <Mail className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Son 30 Gün</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {stats?.recentSubscribers || 0}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">İptal Edenler</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {stats?.totalUnsubscribed || 0}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Email List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Email Listesi</h2>
              <div className="flex space-x-2">
                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                  <span>Yenile</span>
                </button>
                <button
                  onClick={exportToCSV}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>CSV İndir</span>
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Kayıt Tarihi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {subscribers.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                      Henüz abone yok
                    </td>
                  </tr>
                ) : (
                  subscribers.map((subscriber) => (
                    <tr key={subscriber._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {subscriber.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(subscriber.subscribedAt).toLocaleString('tr-TR')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
} 