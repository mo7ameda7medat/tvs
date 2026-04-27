function handleRegister(e) {
  e.preventDefault();
  
  const password = document.getElementById('regPassword').value;
  const confirmPassword = document.getElementById('regConfirmPassword').value;
  
  if (password !== confirmPassword) {
    showCustomAlert('كلمات المرور غير متطابقة', 'error');
    return;
  }
  
  const userData = {
    name: document.getElementById('regName').value,
    email: document.getElementById('regEmail').value,
    phone: document.getElementById('regPhone').value,
    rank: document.getElementById('regRank').value,
    password: password,
    id: 'OFF-' + Date.now(),
    createdAt: new Date().toISOString()
  };
  
  // حفظ المستخدم
  const users = getFromLocalStorage('users') || [];
  users.push(userData);
  saveToLocalStorage('users', users);
  
  showCustomAlert('تم إنشاء الحساب بنجاح!', 'success');
  
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1500);
}
function handleForgotPassword(e) {
  e.preventDefault();
  
  const email = document.getElementById('resetEmail').value;
  
  // محاكاة إرسال البريد
  showCustomAlert('تم إرسال رابط استعادة كلمة المرور إلى: ' + email, 'success');
  
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 2000);
}