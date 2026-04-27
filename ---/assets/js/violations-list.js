// تحميل المخالفات
function loadViolations() {
  const violations = getFromLocalStorage('violations') || [
    {
      violationNumber: 'MXF-2024-00847',
      licenseNumber: 'LIC-2024-12345',
      plateNumber: 'ط ر ب 123',
      vehicleType: 'سيارة خاصة',
      violationType: 'تجاوز السرعة',
      violationDate: '2025-04-10',
      amount: 150,
      status: 'pending'
    },
    {
      violationNumber: 'MXF-2024-00846',
      licenseNumber: 'LIC-2024-67890',
      plateNumber: 'ط ر ب 456',
      vehicleType: 'سيارة أجرة',
      violationType: 'وقوف خاطئ',
      violationDate: '2025-04-10',
      amount: 50,
      status: 'paid'
    }
  ];
  
  renderViolations(violations);
}

// عرض المخالفات
function renderViolations(violations) {
  const tbody = document.getElementById('violationsTableBody');
  tbody.innerHTML = '';
  
  violations.forEach(violation => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${violation.violationNumber}</td>
      <td>${violation.licenseNumber}</td>
      <td>${violation.plateNumber}</td>
      <td>${violation.violationType}</td>
      <td>${violation.violationDate}</td>
      <td>${violation.amount} د.ل</td>
      <td><span class="status-badge ${violation.status}">${violation.status === 'paid' ? 'مدفوعة' : 'غير مدفوعة'}</span></td>
      <td>
        <button class="btn-icon" onclick="viewViolation('${violation.violationNumber}')" title="عرض">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2"/>
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>
        <button class="btn-icon" onclick="editViolation('${violation.violationNumber}')" title="تعديل">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" stroke-width="2"/>
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// تصفية المخالفات
function filterViolations() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const statusFilter = document.getElementById('statusFilter').value;
  
  let violations = getFromLocalStorage('violations') || [];
  
  if (searchTerm) {
    violations = violations.filter(v => 
      v.violationNumber.toLowerCase().includes(searchTerm)
    );
  }
  
  if (statusFilter) {
    violations = violations.filter(v => v.status === statusFilter);
  }
  
  renderViolations(violations);
}

// تغيير الصفحة
function changePage(direction) {
  showCustomAlert('التنقل بين الصفحات', 'info');
}

// عرض تفاصيل المخالفة
function viewViolation(number) {
  showCustomAlert('عرض تفاصيل المخالفة: ' + number, 'info');
}

// تعديل المخالفة
function editViolation(number) {
  showCustomAlert('تعديل المخالفة: ' + number, 'info');
}

document.addEventListener('DOMContentLoaded', loadViolations);