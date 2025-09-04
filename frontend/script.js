const API_URL = 'http://localhost:5002/marksheet/marksheets';

const form = document.getElementById('marksheetForm');
const tableBody = document.querySelector('#marksheetTable tbody');

// Delete Modal
const deleteModal = document.getElementById('deleteModal');
const confirmDeleteBtn = document.getElementById('confirmDelete');
const cancelDeleteBtn = document.getElementById('cancelDelete');
let deleteRollno = null;

// Update Modal
const updateModal = document.getElementById('updateModal');
const updateForm = document.getElementById('updateForm');
const cancelUpdateBtn = document.getElementById('cancelUpdate');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    rollno: form.rollno.value,
    name: form.name.value,
    maths: form.maths.value,
    science: form.science.value,
    english: form.english.value
  };
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  form.reset();
  loadMarksheets();
});

async function loadMarksheets() {
  const res = await fetch(API_URL);
  const marksheets = await res.json();
  tableBody.innerHTML = '';
  marksheets.forEach(m => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${m.rollno}</td>
      <td>${m.name}</td>
      <td>${m.maths}</td>
      <td>${m.science}</td>
      <td>${m.english}</td>
      <td>
        <button onclick="showDeleteModal(${m.rollno})">Delete</button>
        <button onclick="showUpdateModal(${m.rollno}, '${m.name}', ${m.maths}, ${m.science}, ${m.english})">Update</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Delete Modal Logic
window.showDeleteModal = function(rollno) {
  deleteRollno = rollno;
  deleteModal.style.display = 'block';
};
confirmDeleteBtn.onclick = async function() {
  await fetch(`${API_URL}/${deleteRollno}`, { method: 'DELETE' });
  deleteModal.style.display = 'none';
  loadMarksheets();
};
cancelDeleteBtn.onclick = function() {
  deleteModal.style.display = 'none';
  deleteRollno = null;
};

// Update Modal Logic
window.showUpdateModal = function(rollno, name, maths, science, english) {
  updateModal.style.display = 'block';
  updateForm.updateRollno.value = rollno;
  updateForm.updateName.value = name;
  updateForm.updateMaths.value = maths;
  updateForm.updateScience.value = science;
  updateForm.updateEnglish.value = english;
  // Set dynamic title
  updateModal.querySelector('h2').textContent = `Update Marksheet - ${name}`;
};
updateForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const rollno = updateForm.updateRollno.value;
  const data = {
    rollno: rollno,
    name: updateForm.updateName.value,
    maths: updateForm.updateMaths.value,
    science: updateForm.updateScience.value,
    english: updateForm.updateEnglish.value
  };
  await fetch(`${API_URL}/${rollno}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  updateModal.style.display = 'none';
  loadMarksheets();
});
cancelUpdateBtn.onclick = function() {
  updateModal.style.display = 'none';
};

window.onload = loadMarksheets;