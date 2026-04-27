// تحديث التاريخ والوقت
function updateDateTime() {
  const now = new Date();
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  const dateTimeString = now.toLocaleDateString('ar-LY', options);
  document.getElementById('dateTime').textContent = dateTimeString;
}

// تحديث الإحصائيات
function updateStats() {
  // في الواقع، سيتم جلب البيانات من قاعدة البيانات
  const stats = {
    total: 1247,
    pending: 342,
    paid: 905,
    revenue: 45600
  };
  
  document.getElementById('totalViolations').textContent = formatNumber(stats.total);
  document.getElementById('pendingViolations').textContent = formatNumber(stats.pending);
  document.getElementById('paidViolations').textContent = formatNumber(stats.paid);
  document.getElementById('todayRevenue').textContent = formatNumber(stats.revenue);
}

// تحميل اسم المستخدم
function loadUserName() {
  const user = getFromLocalStorage('currentUser');
  if (user && user.name) {
    document.getElementById('dashboardUserName').textContent = user.name;
  }
}

// تحديث عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
  updateDateTime();
  setInterval(updateDateTime, 60000); // تحديث كل دقيقة
  
  updateStats();
  loadUserName();
});