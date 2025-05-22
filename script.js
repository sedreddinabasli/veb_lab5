let profileData = {
  contact: {
    phone: "+994 070-360-12-10",
    email: "abaslisedreddin@gmail.com", 
    city: "Sumgait City"
  },
  education: {
    year: "2024 - 2028",
    university: "AZERBAIJAN TECHNICAL UNIVERSITY",
    major: "Cybersecurity"
  },
  skills: {
    skill1: "Project Management",
    skill2: "Public Relations", 
    skill3: "Time Management",
    skill4: "Leadership"
  },
  languages: {
    english: "English (Pre-intermediate)",
    german: "German (Basic)"
  }
};

let originalData = JSON.parse(JSON.stringify(profileData));

const melumatlar = {
  "PROFILE": [
    "I have a deep interest in the field of information security. I am specializing in systems protection and security risk management."
  ],
  "WORK EXPERIENCE": [
    "CyberTech MMC (2024 - PRESENT) - Security Analyst: Threat Detection and Monitoring, Incident Response, Vulnerability Assessment, Risk Assessment and Management, Data Protection and Privacy.",
    "SyberSec MMC (2023 - 2024) - Marketing Manager & Specialist: Develop and maintain strong relationships with partners and agencies. Monitor and maintain brand consistency across all marketing materials."
  ],
  "REFERENCE": [
    "Ali Aliyev - Wardiere Inc. / CTO",
    "Vali Valiyev - Wardiere Inc. / CEO"
  ]
};

let savedData = [];
window.onload = function() {
  loadJsonData();
  loadData();
  setupForm();
  setupSections();
  setupEditButtons();
  setupResetButton();
};
function loadJsonData() {
  setTimeout(function() {
    console.log('JSON data yükləndi');
    updateDOM();
  }, 500);
}

function updateDOM() {
  updateField('phone', profileData.contact.phone);
  updateField('email', profileData.contact.email);
  updateField('city', profileData.contact.city);
    
  updateField('year', profileData.education.year);
  updateField('university', profileData.education.university);
  updateField('major', profileData.education.major);
  
  updateField('skill1', profileData.skills.skill1);
  updateField('skill2', profileData.skills.skill2);
  updateField('skill3', profileData.skills.skill3);
  updateField('skill4', profileData.skills.skill4);
  
  updateField('english', profileData.languages.english);
  updateField('german', profileData.languages.german);
}

function updateField(fieldName, value) {
  const element = document.querySelector(`[data-field="${fieldName}"]`);
  if (element) {
    const button = element.querySelector('.edit-btn');
    element.innerHTML = value + ' ';
    element.appendChild(button);
  }
}
function setupEditButtons() {
  const editButtons = document.querySelectorAll('.edit-btn');
  
  for (let i = 0; i < editButtons.length; i++) {
    editButtons[i].onclick = function() {
      const parent = this.parentElement;
      const field = parent.getAttribute('data-field');
      const currentText = parent.textContent.replace('Düzəliş', '').trim();
      
      const input = document.createElement('input');
      input.className = 'edit-input';
      input.value = currentText;
      
      const saveBtn = document.createElement('button');
      saveBtn.textContent = 'Saxla';
      saveBtn.className = 'save-edit-btn';
      
      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = 'Ləğv et';
      cancelBtn.className = 'cancel-edit-btn';
      
      const originalContent = parent.innerHTML;
      
      parent.innerHTML = '';
      parent.appendChild(input);
      parent.appendChild(saveBtn);
      parent.appendChild(cancelBtn);
    
      saveBtn.onclick = function() {
        const newValue = input.value.trim();
        if (newValue !== '') {
          saveFieldData(field, newValue);
          updateField(field, newValue);
          saveToStorage();
        }
      };
      cancelBtn.onclick = function() {
        parent.innerHTML = originalContent;
        setupSingleEditButton(parent.querySelector('.edit-btn'));
      };
      
      input.focus();
    };
  }
}

function setupSingleEditButton(button) {
  if (!button) return;
  
  button.onclick = function() {
    const parent = this.parentElement;
    const field = parent.getAttribute('data-field');
    const currentText = parent.textContent.replace('Düzəliş', '').trim();
    
    const input = document.createElement('input');
    input.className = 'edit-input';
    input.value = currentText;
    
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Saxla';
    saveBtn.className = 'save-edit-btn';
    
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Ləğv et';
    cancelBtn.className = 'cancel-edit-btn';
    
    const originalContent = parent.innerHTML;
    
    parent.innerHTML = '';
    parent.appendChild(input);
    parent.appendChild(saveBtn);
    parent.appendChild(cancelBtn);
    
    saveBtn.onclick = function() {
      const newValue = input.value.trim();
      if (newValue !== '') {
        saveFieldData(field, newValue);
        updateField(field, newValue);
        saveToStorage();
      }
    };
    
    cancelBtn.onclick = function() {
      parent.innerHTML = originalContent;
      setupSingleEditButton(parent.querySelector('.edit-btn'));
    };
    
    input.focus();
  };
}

function saveFieldData(field, value) {
  if (field === 'phone' || field === 'email' || field === 'city') {
    profileData.contact[field] = value;
  } else if (field === 'year' || field === 'university' || field === 'major') {
    profileData.education[field] = value;
  } else if (field.startsWith('skill')) {
    profileData.skills[field] = value;
  } else if (field === 'english' || field === 'german') {
    profileData.languages[field] = value;
  }
}

function setupResetButton() {
  document.getElementById('resetBtn').onclick = function() {
    if (confirm('Hamısını sıfırlamaq istəyirsiniz?')) {
      profileData = JSON.parse(JSON.stringify(originalData));
      updateDOM();
      setupEditButtons();
      alert('Hamısı sıfırlandı!');
    }
  };
}
function setupForm() {
  const form = document.getElementById('myForm');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    clearErrors();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const desc = document.getElementById('description').value.trim();
    
    let valid = true;
    
    if (name === '') {
      showError('nameError', 'Ad boşdur');
      document.getElementById('name').classList.add('error-input');
      valid = false;
    }
    
    if (email === '') {
      showError('emailError', 'E-poçt boşdur');
      document.getElementById('email').classList.add('error-input');
      valid = false;
    } else if (!email.includes('@')) {
      showError('emailError', 'E-poçt yanlışdır');
      document.getElementById('email').classList.add('error-input');
      valid = false;
    }
    
    if (desc === '') {
      showError('descError', 'Təsvir boşdur');
      document.getElementById('description').classList.add('error-input');
      valid = false;
    }
    
    if (valid) {
      addNewData(name, email, desc);
      form.reset();
      alert('Məlumat əlavə edildi!');
    }
  });
  
  document.getElementById('saveBtn').onclick = function() {
    saveData();
    alert('Məlumatlar saxlanıldı!');
  };
}

function showError(id, message) {
  document.getElementById(id).textContent = message;
}

function clearErrors() {
  document.getElementById('nameError').textContent = '';
  document.getElementById('emailError').textContent = '';
  document.getElementById('descError').textContent = '';
  
  document.getElementById('name').classList.remove('error-input');
  document.getElementById('email').classList.remove('error-input');
  document.getElementById('description').classList.remove('error-input');
}

function addNewData(name, email, desc) {
  const newItem = {
    name: name,
    email: email,
    description: desc,
    date: new Date().toLocaleDateString()
  };
  
  savedData.push(newItem);
  showAllData();
}

function showAllData() {
  const itemsDiv = document.getElementById('items');
  const dataListDiv = document.getElementById('dataList');
  
  if (savedData.length === 0) {
    dataListDiv.style.display = 'none';
    return;
  }
  
  itemsDiv.innerHTML = '';
  
  for (let i = 0; i < savedData.length; i++) {
    const item = savedData[i];
    const div = document.createElement('div');
    div.className = 'data-item';
    div.innerHTML = `
      <strong>Ad:</strong> ${item.name}<br>
      <strong>E-poçt:</strong> ${item.email}<br>
      <strong>Təsvir:</strong> ${item.description}<br>
      <strong>Tarix:</strong> ${item.date}
    `;
    itemsDiv.appendChild(div);
  }
  
  dataListDiv.style.display = 'block';
}

function saveData() {
  window.mySavedData = savedData;
}

function loadData() {
  if (window.mySavedData) {
    savedData = window.mySavedData;
    showAllData();
  }
}

function saveToStorage() {
  window.myProfileData = profileData;
}

function setupSections() {
  const bolmeler = document.getElementsByClassName("bolme");
  
  for (let i = 0; i < bolmeler.length; i++) {
    const bolme = bolmeler[i];
    const h2 = bolme.getElementsByTagName("h2")[0];
    const basliq = h2.textContent;
    const content = bolme.getElementsByClassName("content")[0];
    
    if (!content.classList.contains("icerik")) {
      content.classList.add("icerik");
    }
    
    if (melumatlar[basliq]) {
      const ul = document.createElement("ul");
      for (let j = 0; j < melumatlar[basliq].length; j++) {
        const li = document.createElement("li");
        li.textContent = melumatlar[basliq][j];
        
        li.onclick = function() {
          const yeni = prompt("Məlumatı dəyiş:", li.textContent);
          if (yeni) li.textContent = yeni;
        };
        ul.appendChild(li);
      }
      
      const input = content.querySelector("input");
      content.insertBefore(ul, input);
    }
    
    h2.onclick = function() {
      if (content.style.display === "none") {
        content.style.display = "block";
      } else {
        content.style.display = "none";
      }
    };
    
    const btn = content.querySelector(".addData");
    const input = content.querySelector("input");
    
    if (btn && input) {
      btn.onclick = function() {
        const melumat = input.value.trim();
        if (melumat === "") {
          alert("Bu sahə boşdur!");
          return;
        }
        
        let ul = content.getElementsByTagName("ul")[0];
        if (!ul) {
          ul = document.createElement("ul");
          content.insertBefore(ul, input);
        }
        const li = document.createElement("li");
        li.textContent = melumat;
        
        li.onclick = function() {
          const yeni = prompt("Məlumatı dəyiş:", li.textContent);
          if (yeni) li.textContent = yeni;
        };
        ul.appendChild(li);
        input.value = "";
        
        if (!melumatlar[basliq]) {
          melumatlar[basliq] = [];
        }
        melumatlar[basliq].push(melumat);
      };
    }
  }
}
