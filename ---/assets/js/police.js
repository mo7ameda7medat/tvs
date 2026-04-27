document.addEventListener('DOMContentLoaded', () => {
  const user = getFromLocalStorage('currentUser');
  if (!user || user.role !== 'police') { window.location.href = 'index.html'; return; }

  // ملء البيانات التلقائية
  document.getElementById('pName').value = user.name;
  document.getElementById('pRank').value = user.rank;
  document.getElementById('pUnit').value = user.unit;
  document.getElementById('officerNameDisplay').textContent = user.name;

  // تعيين التاريخ والوقت الحالي
  const now = new Date();
  document.getElementById('pDate').value = now.toISOString().split('T')[0];
  document.getElementById('pTime').value = now.toTimeString().slice(0, 5);
});

function submitViolation(e) {
  e.preventDefault();
  const user = getFromLocalStorage('currentUser');
  
  const violation = {
    id: 'MXF-' + Date.now().toString().slice(-6),
    officer: user.name,
    rank: user.rank,
    license: document.getElementById('pLicense').value,
    plate: document.getElementById('pPlate').value,
    vehicle: document.getElementById('pVehicle').value,
    type: document.getElementById('pType').value,
    date: document.getElementById('pDate').value,
    time: document.getElementById('pTime').value,
    location: document.getElementById('pLocation').value,
    amount: document.getElementById('pAmount').value,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  // حفظ في قاعدة بيانات محلية (نموذج)
  const db = getFromLocalStorage('violationsDB') || [];
  db.unshift(violation);
  saveToLocalStorage('violationsDB', db);

  document.getElementById('newVioNum').textContent = violation.id;
  document.getElementById('successModal').classList.add('active');
  document.getElementById('policeForm').reset();
}

function closeModal(id) { document.getElementById(id).classList.remove('active'); }