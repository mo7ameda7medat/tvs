// تحميل بيانات الشرطي التلقائية
function loadOfficerData() {
  const user = getFromLocalStorage('currentUser');
  if (user) {
    document.getElementById('officerName').value = user.name || 'أحمد محمد علي';
    document.getElementById('officerRank').value = user.rank || 'ملازم أول';
    document.getElementById('officerId').value = user.id || 'OFF-2024-001';
  } else {
    // بيانات تجريبية
    document.getElementById('officerName').value = 'أحمد محمد علي';
    document.getElementById('officerRank').value = 'ملازم أول';
    document.getElementById('officerId').value = 'OFF-2024-001';
  }
}

// تعيين التاريخ والوقت الحاليين
function setCurrentDateTime() {
  const now = new Date();
  document.getElementById('violationDate').value = now.toISOString().split('T')[0];
  document.getElementById('violationTime').value = now.toTimeString().slice(0, 5);
}

// تقديم المخالفة
function submitViolation(e) {
  e.preventDefault();
  
  const violationData = {
    officerName: document.getElementById('officerName').value,
    officerRank: document.getElementById('officerRank').value,
    officerId: document.getElementById('officerId').value,
    licenseNumber: document.getElementById('licenseNumber').value,
    plateNumber: document.getElementById('plateNumber').value,
    vehicleType: document.getElementById('vehicleType').value,
    violationType: document.getElementById('violationType').value,
    violationDate: document.getElementById('violationDate').value,
    violationTime: document.getElementById('violationTime').value,
    location: document.getElementById('violationLocation').value,
    amount: document.getElementById('violationAmount').value,
    notes: document.getElementById('violationNotes').value,
    violationNumber: 'MXF-' + Date.now(),
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  // حفظ في localStorage (محاكاة)
  const violations = getFromLocalStorage('violations') || [];
  violations.unshift(violationData);
  saveToLocalStorage('violations', violations);
  
  // عرض رقم المخالفة
  document.getElementById('newViolationNumber').textContent = violationData.violationNumber;
  document.getElementById('confirmModal').classList.add('active');
  
  // إعادة تعيين النموذج
  document.getElementById('issueForm').reset();
  setCurrentDateTime();
}

// إغلاق النافذة
function closeIssueModal() {
  document.getElementById('confirmModal').classList.remove('active');
  window.location.href = 'dashboard.html';
}

// التهيئة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
  loadOfficerData();
  setCurrentDateTime();
});