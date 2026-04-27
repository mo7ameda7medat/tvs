let currentViolation = null;

document.addEventListener('DOMContentLoaded', () => {
  const user = getFromLocalStorage('currentUser');
  if (!user || user.role !== 'payment') { window.location.href = 'index.html'; return; }
  document.getElementById('centerNameDisplay').textContent = user.name;
});

function searchViolation() {
  const query = document.getElementById('searchQuery').value.trim();
  if (!query) { showCustomAlert('أدخل رقم البحث أولاً', 'error'); return; }

  const db = getFromLocalStorage('violationsDB') || [];
  // بحث تجريبي أو حقيقي في قاعدة البيانات المحلية
  currentViolation = db.find(v => 
    v.id.includes(query) || 
    v.license.includes(query) || 
    v.plate.includes(query)
  );

  if (!currentViolation) {
    showCustomAlert('لم يتم العثور على مخالفة بهذا الرقم', 'error');
    document.getElementById('searchResult').classList.add('hidden');
    return;
  }

  // عرض البيانات
  document.getElementById('resId').textContent = currentViolation.id;
  document.getElementById('resDriver').textContent = currentViolation.license;
  document.getElementById('resVehicle').textContent = `${currentViolation.vehicle} - ${currentViolation.plate}`;
  document.getElementById('resType').textContent = currentViolation.type;
  document.getElementById('resAmount').textContent = `${currentViolation.amount} د.ل`;
  document.getElementById('resOfficer').textContent = currentViolation.officer;
  document.getElementById('resDate').textContent = currentViolation.date;

  const statusEl = document.getElementById('resStatus');
  const payBtn = document.getElementById('payBtn');
  
  if (currentViolation.status === 'paid') {
    statusEl.innerHTML = '✅ مدفوعة';
    statusEl.style.background = '#d4edda';
    statusEl.style.color = '#155724';
    payBtn.disabled = true;
    payBtn.style.opacity = '0.5';
    payBtn.textContent = 'تم السداد مسبقاً';
  } else {
    statusEl.innerHTML = '<span class="dot"></span>غير مدفوعة';
    statusEl.style.background = '#fff3cd';
    statusEl.style.color = '#856404';
    payBtn.disabled = false;
    payBtn.style.opacity = '1';
    payBtn.textContent = '💳 محاكاة الدفع الإلكتروني';
  }

  document.getElementById('searchResult').classList.remove('hidden');
}

function simulatePayment() {
  if (!currentViolation) return;
  
  currentViolation.status = 'paid';
  currentViolation.paidAt = new Date().toISOString();
  
  const db = getFromLocalStorage('violationsDB') || [];
  const idx = db.findIndex(v => v.id === currentViolation.id);
  if (idx !== -1) db[idx] = currentViolation;
  saveToLocalStorage('violationsDB', db);

  document.getElementById('payRef').textContent = 'PAY-' + Date.now().toString().slice(-6);
  document.getElementById('payModal').classList.add('active');
}

function printReceipt() { showCustomAlert('جاري تجهيز الإيصال للطباعة...', 'info'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }