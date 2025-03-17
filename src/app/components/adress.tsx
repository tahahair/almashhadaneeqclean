import React, { useState, useEffect } from 'react';

const AddressManager = () => {
  // تعريف حالات البيانات
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [link, setLink] = useState('');
  const [buildingName, setBuildingName] = useState('');
  const [savedAddresses, setSavedAddresses] = useState<{ id: number; label: string; title: string; city: string; link: string; buildingName: string; }[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [addressLabel, setAddressLabel] = useState('');
  const [showAddForm, setShowAddForm] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);

  // استرجاع العناوين المحفوظة عند تحميل الصفحة
  useEffect(() => {
    const addresses = JSON.parse(localStorage.getItem('savedAddresses') || '[]');
    setSavedAddresses(addresses);
    
    // إذا كان هناك عناوين محفوظة وكانت هذه أول مرة يُفتح فيها التطبيق، اعرض قائمة العناوين
    if (addresses.length > 0) {
      setShowAddForm(false);
    }
  }, []);

  // حفظ العنوان الحالي
  const handleSave = () => {
    if (!title || !city || !buildingName) {
      alert('الرجاء إدخال البيانات المطلوبة: العنوان، المدينة، واسم البناء');
      return;
    }
    setShowSaveDialog(true);
  };

  // تأكيد حفظ العنوان
  const confirmSave = () => {
    if (!addressLabel) {
      alert('الرجاء إدخال اسم للعنوان');
      return;
    }

    const newAddress = {
      id: Date.now(),
      label: addressLabel,
      title,
      city,
      link,
      buildingName
    };

    const updatedAddresses = [...savedAddresses, newAddress];
    setSavedAddresses(updatedAddresses);
    localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
    
    // إعادة تعيين الحقول
    resetForm();
    setShowSaveDialog(false);
    setShowAddForm(false);
  };

  // إعادة تعيين حقول النموذج
  const resetForm = () => {
    setTitle('');
    setCity('');
    setLink('');
    setBuildingName('');
    setAddressLabel('');
  };

  // تحميل عنوان محفوظ
interface Address {
    id: number;
    label: string;
    title: string;
    city: string;
    link: string;
    buildingName: string;
}

const loadAddress = (address: Address) => {
    setTitle(address.title);
    setCity(address.city);
    setLink(address.link);
    setBuildingName(address.buildingName);
    setSelectedAddress(address.id);
    setShowAddForm(true);
};

  // حذف عنوان محفوظ
const deleteAddress = (id: number) => {
    const confirmed = confirm('هل أنت متأكد من حذف هذا العنوان؟');
    if (confirmed) {
        const updatedAddresses = savedAddresses.filter((address: Address) => address.id !== id);
        setSavedAddresses(updatedAddresses);
        localStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
        
        if (updatedAddresses.length === 0) {
            setShowAddForm(true);
        }
    }
};

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg" dir="rtl">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-teal-600">نظام إدارة العناوين</h1>
        <p className="text-gray-500">احفظ عناوينك المفضلة للاستخدام السريع</p>
      </div>
      
      {/* عرض قائمة العناوين المحفوظة */}
      {!showAddForm && savedAddresses.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800 border-r-4 border-teal-500 pr-3">العناوين المحفوظة</h2>
          <div className="space-y-3">
            {savedAddresses.map(address => (
              <div 
                key={address.id} 
                className={`p-4 border-2 rounded-lg transition-all ${
                  selectedAddress === address.id 
                    ? 'border-teal-500 bg-teal-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div 
                      className={`w-5 h-5 flex items-center justify-center rounded-full border mr-2 ${
                        selectedAddress === address.id 
                          ? 'border-teal-500 bg-teal-500' 
                          : 'border-gray-400'
                      }`}
                      onClick={() => setSelectedAddress(address.id)}
                    >
                      {selectedAddress === address.id && (
                        <span className="text-white text-xs">✓</span>
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">{address.label}</div>
                      <div className="text-sm text-gray-500">{address.city} - {address.buildingName}</div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => loadAddress(address)}
                      className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded-lg text-sm transition-colors ml-2"
                    >
                      تعديل
                    </button>
                    <button 
                      onClick={() => deleteAddress(address.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => {
              resetForm();
              setSelectedAddress(null);
              setShowAddForm(true);
            }}
            className="mt-6 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg shadow transition-colors w-full flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            إضافة عنوان جديد
          </button>
        </div>
      )}
      
      {/* نموذج إدخال العنوان */}
      {showAddForm && (
        <div className="bg-white rounded-lg">
          <div className="space-y-5">
            <div>
              <label className="block text-gray-700 font-bold mb-2">العنوان:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition-all"
                placeholder="أدخل العنوان"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-bold mb-2">المدينة:</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition-all"
                placeholder="أدخل المدينة"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-bold mb-2">الرابط:</label>
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition-all"
                placeholder="أدخل الرابط (اختياري)"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-bold mb-2">اسم البناء:</label>
              <input
                type="text"
                value={buildingName}
                onChange={(e) => setBuildingName(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition-all"
                placeholder="أدخل اسم البناء"
              />
            </div>
          </div>
          
          <div className="mt-8 flex gap-3">
            <button 
              onClick={handleSave}
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all flex-1"
            >
              حفظ العنوان
            </button>
            {savedAddresses.length > 0 && (
              <button 
                onClick={() => setShowAddForm(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg shadow-md transition-all flex-1"
              >
                العودة للقائمة
              </button>
            )}
          </div>
        </div>
      )}
      
      {/* نافذة حفظ العنوان */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-teal-600">تسمية العنوان</h2>
            <p className="text-gray-600 mb-4">قم بإعطاء اسم مميز لهذا العنوان لتتمكن من تمييزه بسهولة</p>
            <div className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">اسم العنوان:</label>
              <input
                type="text"
                value={addressLabel}
                onChange={(e) => setAddressLabel(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-teal-500 focus:ring focus:ring-teal-200 focus:ring-opacity-50 transition-all"
                placeholder="مثال: المنزل، العمل، بيت العائلة"
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowSaveDialog(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg transition-all"
              >
                إلغاء
              </button>
              <button 
                onClick={confirmSave}
                className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all"
              >
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// تصدير المكون بالطريقة الصحيحة
const TabsPage = () => {
    return <AddressManager />;
  };
  
  export default TabsPage;