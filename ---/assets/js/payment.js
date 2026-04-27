// تنسيق رقم البطاقة
document.addEventListener('DOMContentLoaded', function() {
  const cardNumberInput = document.getElementById('cardNumber');
  const expiryDateInput = document.getElementById('expiryDate');
  const cvvInput = document.getElementById('cvv');
  
  // تنسيق رقم البطاقة
  if (cardNumberInput) {
    cardNumberInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\s/g, '');
      let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
      e.target.value = formattedValue;
    });
  }
  
  // تنسيق تاريخ الانتهاء
  if (expiryDateInput) {
    expiryDateInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
      }
      e.target.value = value;
    });
  }
  
  // السماح بالأرقام فقط لـ CVV
  if (cvvInput) {
    cvvInput.addEventListener('input', function(e) {
      e.target.value = e.target.value.replace(/\D/g, '');
    });
  }
  
  // التحقق من رقم الهاتف
  const phoneInput = document.getElementById('phoneNumber');
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      e.target.value = e.target.value.replace(/\D/g, '');
    });
  }
});

// معالجة الدفع
function processPayment(e) {
  e.preventDefault();
  
  // جمع البيانات
  const paymentData = {
    cardName: document.getElementById('cardName').value,
    cardNumber: document.getElementById('cardNumber').value.replace(/\s/g, ''),
    expiryDate: document.getElementById('expiryDate').value,
    cvv: document.getElementById('cvv').value,
    phoneNumber: document.getElementById('phoneNumber').value,
    email: document.getElementById('email').value,
    violationNumber: document.getElementById('violNumber').textContent,
    amount: document.getElementById('violAmount').textContent,
    paymentDate: new Date().toISOString(),
    paymentRef: 'PAY-' + Date.now()
  };
  
  // التحقق من البيانات
  if (!validatePaymentData(paymentData)) {
    return;
  }
  
  // حفظ البيانات (محاكاة)
  saveToLocalStorage('lastPayment', paymentData);
  
  // عرض رسالة النجاح
  document.getElementById('paymentRef').textContent = paymentData.paymentRef;
  document.getElementById('confirmModal').classList.add('active');
  
  // إعادة تعيين النموذج
  document.getElementById('paymentForm').reset();
}

// التحقق من صحة البيانات
function validatePaymentData(data) {
  // التحقق من رقم البطاقة (16 رقم)
  if (data.cardNumber.length !== 16) {
    showCustomAlert('رقم البطاقة يجب أن يكون 16 رقم', 'error');
    return false;
  }
  
  // التحقق من CVV (3 أرقام)
  if (data.cvv.length !== 3) {
    showCustomAlert('رمز الأمان يجب أن يكون 3 أرقام', 'error');
    return false;
  }
  
  // التحقق من تاريخ الانتهاء
  if (!data.expiryDate.match(/^\d{2}\/\d{2}$/)) {
    showCustomAlert('صيغة تاريخ الانتهاء غير صحيحة (MM/YY)', 'error');
    return false;
  }
  
  // التحقق من رقم الهاتف الليبي
  if (!validateLibyanPhone(data.phoneNumber)) {
    showCustomAlert('رقم الهاتف يجب أن يبدأ بـ 09 ويتكون من 10 أرقام', 'error');
    return false;
  }
  
  return true;
}

// إغلاق النافذة
function closeModal() {
  document.getElementById('confirmModal').classList.remove('active');
  // العودة للصفحة الرئيسية
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 300);
}

// تحميل بيانات المخالفة من URL parameters
function loadViolationData() {
  const params = new URLSearchParams(window.location.search);
  const violationNumber = params.get('id');
  
  if (violationNumber) {
    // في الواقع، سيتم جلب البيانات من قاعدة البيانات
    // هنا نستخدم بيانات تجريبية
    document.getElementById('violNumber').textContent = violationNumber;
  }
}

// استدعاء الدالة عند تحميل الصفحة
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadViolationData);
} else {
  loadViolationData();
}