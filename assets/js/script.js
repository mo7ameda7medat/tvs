// تبديل الأوضاع
function switchMode(mode, btn) {
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  btn.classList.add('active');
  
  const driverCard = document.getElementById('driverCard');
  const employeeCard = document.getElementById('employeeCard');
  
  if (mode === 'driver') {
    driverCard.classList.remove('hidden');
    employeeCard.classList.add('hidden');
  } else {
    driverCard.classList.add('hidden');
    employeeCard.classList.remove('hidden');
  }
}

// بحث السائق
function driverSearch() {
  const input = document.getElementById('driverSearchInput').value.trim();
  if (!input) { showCustomAlert('الرجاء إدخال رقم المخالفة أو اللوحة', 'error'); return; }
  document.getElementById('driverResult').classList.remove('hidden');
  document.getElementById('driverResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ✅ دالة دخول الموظف (مصححة نهائياً)
function handleEmployeeLogin(event) {
  // منع أي سلوك افتراضي للمتصفح (إعادة تحميل، إرسال نموذج، إلخ)
  if (event) event.preventDefault();
  
  try {
    const roleInput = document.querySelector('input[name="empRole"]:checked');
    if (!roleInput) {
      showCustomAlert('الرجاء اختيار نوع الحساب أولاً', 'error');
      return;
    }
    
    const role = roleInput.value;
    const id = document.getElementById('empIdInput').value.trim();
    const pass = document.getElementById('empPassInput').value.trim();

    if (!id || !pass) {
      showCustomAlert('الرجاء إدخال رقم التعريف وكلمة المرور', 'error');
      return;
    }

    // حفظ بيانات الجلسة
    const userData = {
      id: id,
      role: role,
      name: role === 'police' ? 'أحمد محمد الشرطي' : 'خالد علي مركز الدفع',
      rank: role === 'police' ? 'ملازم أول' : 'موظف إداري',
      unit: role === 'police' ? 'إدارة المرور - طرابلس' : 'وحدة التحصيل الإلكتروني'
    };
    
    localStorage.setItem('currentUser', JSON.stringify(userData));
    showCustomAlert('تم التحقق بنجاح، جاري التوجيه...', 'success');

    // توجيه فوري بدون تأخير لمنع الوميض
    setTimeout(() => {
      if (role === 'police') {
        window.location.href = 'police-dashboard.html';
      } else {
        window.location.href = 'payment-dashboard.html';
      }
    }, 300); // تأخير بسيط جداً فقط لإظهار رسالة النجاح
    
  } catch (err) {
    console.error('Login Error:', err);
    showCustomAlert('حدث خطأ غير متوقع', 'error');
  }
}

// أدوات مساعدة
function saveToLocalStorage(key, data) { localStorage.setItem(key, JSON.stringify(data)); }
function getFromLocalStorage(key) { const d = localStorage.getItem(key); return d ? JSON.parse(d) : null; }
function formatNumber(num) { return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
function validateLibyanPhone(phone) { return /^(09[1-5]\d{7})$/.test(phone); }

function showCustomAlert(message, type = 'info') {
  const alertDiv = document.createElement('div');
  alertDiv.className = `custom-alert ${type}`;
  alertDiv.textContent = message;
  alertDiv.style.cssText = `
    position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
    padding: 1rem 2rem; background: ${type === 'success' ? '#2e7d32' : type === 'error' ? '#d32f2f' : '#3b5bdb'};
    color: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 10000; animation: slideDown 0.3s ease;
  `;
  document.body.appendChild(alertDiv);
  setTimeout(() => alertDiv.remove(), 2500);
}

function logout() {
  localStorage.removeItem('currentUser');
  sessionStorage.removeItem('loggedIn');
  window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function() {
  // إضافة أنيميشن التنبيهات
  const style = document.createElement('style');
  style.textContent = `@keyframes slideDown { from { transform: translate(-50%, -100%); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }`;
  document.head.appendChild(style);

  // تأثير ظهور البطاقات عند التمرير
  const cards = document.querySelectorAll('.card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
  });
});

// ربط الدوال بالنطاق العام
window.switchMode = switchMode;
window.driverSearch = driverSearch;
window.handleEmployeeLogin = handleEmployeeLogin;
window.logout = logout;
window.showCustomAlert = showCustomAlert;