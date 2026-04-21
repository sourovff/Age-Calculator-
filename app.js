// ==================== CREATE APP STRUCTURE ====================
function createAppStructure() {
  const root = document.getElementById('app-root');
  
  root.innerHTML = `
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo-icon">📅</div>
        <button class="theme-toggle" id="themeToggle">
          <i class="bi bi-moon-stars"></i>
          <span>Dark</span>
        </button>
      </div>
    </nav>

    <div class="main-container">
      <div class="hero">
        <span class="hero-badge">⚡ Real-Time Age Calculator</span>
        <h1>Age Calculator</h1>
      </div>

      <div class="card">
        <div class="card-header">
          <h3><i class="bi bi-calendar-heart" style="color: var(--primary);"></i> Enter Your Birth Date</h3>
        </div>
        <div class="card-body">
          <div class="input-field">
            <label><i class="bi bi-calendar"></i> Date of Birth</label>
            <div class="input-wrapper">
              <input type="date" id="dob" value="1995-06-15">
            </div>
            <div class="validation-message" id="validationMsg"></div>
          </div>
          <button class="btn-primary" id="calculateBtn">
            <i class="bi bi-calculator"></i> Calculate Age
          </button>
          <div class="live-indicator" id="liveIndicator" style="display: none;">
            <span class="live-dot"></span>
            <span>Real-time updates active</span>
          </div>
        </div>
      </div>

      <!-- Main Age Display -->
      <div class="card">
        <div class="card-header">
          <h3><i class="bi bi-graph-up" style="color: var(--secondary);"></i> Your Age</h3>
        </div>
        <div class="card-body">
          <div class="stats-grid">
            <div class="stat-card highlight">
              <div class="stat-value" id="years">--</div>
              <div class="stat-label">Years</div>
            </div>
            <div class="stat-card highlight">
              <div class="stat-value" id="months">--</div>
              <div class="stat-label">Months</div>
            </div>
            <div class="stat-card highlight">
              <div class="stat-value" id="days">--</div>
              <div class="stat-label">Days</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Detailed Time Stats -->
      <div class="card">
        <div class="card-header">
          <h3><i class="bi bi-clock-history"></i> Detailed Time Statistics</h3>
        </div>
        <div class="card-body">
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-value" id="totalDays">--</div>
              <div class="stat-label">Total Days</div>
            </div>
            <div class="stat-card">
              <div class="stat-value" id="totalHours">--</div>
              <div class="stat-label">Total Hours</div>
            </div>
            <div class="stat-card">
              <div class="stat-value" id="totalMinutes">--</div>
              <div class="stat-label">Total Minutes</div>
            </div>
            <div class="stat-card">
              <div class="stat-value" id="totalSeconds">--</div>
              <div class="stat-label">Total Seconds</div>
            </div>
            <div class="stat-card">
              <div class="stat-value" id="totalWeeks">--</div>
              <div class="stat-label">Total Weeks</div>
            </div>
            <div class="stat-card">
              <div class="stat-value" id="totalMonths">--</div>
              <div class="stat-label">Total Months</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Extra Info -->
      <div class="card">
        <div class="card-header">
          <h3><i class="bi bi-info-circle"></i> Additional Information</h3>
        </div>
        <div class="card-body">
          <div class="zodiac-row">
            <div class="info-box">
              <div style="font-size: 1.8rem; transition: transform 0.3s;" id="zodiacIcon">♌</div>
              <div class="stat-label" id="zodiacName">Zodiac Sign</div>
            </div>
            <div class="info-box">
              <div class="stat-value" id="nextBirthday">--</div>
              <div class="stat-label">Days Until Next Birthday</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer id="footer">
      <div class="footer-container">
        <div class="footer-social">
          <a href="https://facebook.com/sourovxray" target="_blank"><i class="bi bi-facebook"></i></a>
          <a href="https://instagram.com/sourovxray" target="_blank"><i class="bi bi-instagram"></i></a>
          <a href="https://t.me/sourovxray" target="_blank"><i class="bi bi-telegram"></i></a>
          <a href="https://twitter.com/sourovxray" target="_blank"><i class="bi bi-twitter-x"></i></a>
          <a href="https://github.com/sourovff" target="_blank"><i class="bi bi-github"></i></a>
          <a href="https://wa.me/8801789538134" target="_blank"><i class="bi bi-whatsapp"></i></a>
        </div>
        <div class="footer-text">
          <p>© 2026 SOUROV RAY | STATUS: <span style="color: #10b981;">ONLINE</span></p>
          <p>Developed with <i class="bi bi-heart-fill heart"></i> by <strong style="background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; background-clip: text; color: transparent;">SoURoV RaY</strong></p>
        </div>
      </div>
    </footer>
  `;
}

// Call the function to build the app
createAppStructure();

// ==================== AGE CALCULATOR LOGIC ====================
(function() {
  const dobInput = document.getElementById('dob');
  const calculateBtn = document.getElementById('calculateBtn');
  const validationMsg = document.getElementById('validationMsg');
  const liveIndicator = document.getElementById('liveIndicator');
  
  const yearsSpan = document.getElementById('years');
  const monthsSpan = document.getElementById('months');
  const daysSpan = document.getElementById('days');
  const totalDaysSpan = document.getElementById('totalDays');
  const totalHoursSpan = document.getElementById('totalHours');
  const totalMinutesSpan = document.getElementById('totalMinutes');
  const totalSecondsSpan = document.getElementById('totalSeconds');
  const totalWeeksSpan = document.getElementById('totalWeeks');
  const totalMonthsSpan = document.getElementById('totalMonths');
  const nextBirthdaySpan = document.getElementById('nextBirthday');
  const zodiacIconSpan = document.getElementById('zodiacIcon');
  const zodiacNameSpan = document.getElementById('zodiacName');

  let realtimeInterval = null;
  let isRealtimeActive = false;

  function formatNumber(num) {
    return num.toLocaleString();
  }

  function animateValue(element, start, end, duration = 300) {
    if (!element) return;
    const range = end - start;
    const startTime = performance.now();
    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = start + (range * progress);
      element.innerText = formatNumber(Math.floor(value));
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.innerText = formatNumber(end);
      }
    };
    requestAnimationFrame(update);
  }

  function validateDate(dateString) {
    if (!dateString) {
      validationMsg.innerText = 'Please select a date';
      validationMsg.className = 'validation-message show error';
      dobInput.classList.add('error');
      dobInput.classList.remove('valid');
      return false;
    }
    
    const birthDate = new Date(dateString);
    const today = new Date();
    
    if (isNaN(birthDate.getTime())) {
      validationMsg.innerText = 'Invalid date format';
      validationMsg.className = 'validation-message show error';
      dobInput.classList.add('error');
      dobInput.classList.remove('valid');
      return false;
    }
    
    if (birthDate > today) {
      validationMsg.innerText = 'Birth date cannot be in the future!';
      validationMsg.className = 'validation-message show error';
      dobInput.classList.add('error');
      dobInput.classList.remove('valid');
      return false;
    }
    
    const minDate = new Date('1900-01-01');
    if (birthDate < minDate) {
      validationMsg.innerText = 'Please enter a valid date (after 1900)';
      validationMsg.className = 'validation-message show error';
      dobInput.classList.add('error');
      dobInput.classList.remove('valid');
      return false;
    }
    
    validationMsg.innerText = '✓ Valid date';
    validationMsg.className = 'validation-message show success';
    dobInput.classList.add('valid');
    dobInput.classList.remove('error');
    return true;
  }

  function getZodiac(day, month) {
    const zodiacs = [
      { sign: "Capricorn", icon: "♑", start: [12,22], end: [1,19] },
      { sign: "Aquarius", icon: "♒", start: [1,20], end: [2,18] },
      { sign: "Pisces", icon: "♓", start: [2,19], end: [3,20] },
      { sign: "Aries", icon: "♈", start: [3,21], end: [4,19] },
      { sign: "Taurus", icon: "♉", start: [4,20], end: [5,20] },
      { sign: "Gemini", icon: "♊", start: [5,21], end: [6,20] },
      { sign: "Cancer", icon: "♋", start: [6,21], end: [7,22] },
      { sign: "Leo", icon: "♌", start: [7,23], end: [8,22] },
      { sign: "Virgo", icon: "♍", start: [8,23], end: [9,22] },
      { sign: "Libra", icon: "♎", start: [9,23], end: [10,22] },
      { sign: "Scorpio", icon: "♏", start: [10,23], end: [11,21] },
      { sign: "Sagittarius", icon: "♐", start: [11,22], end: [12,21] }
    ];
    
    for (let z of zodiacs) {
      if ((month === z.start[0] && day >= z.start[1]) || (month === z.end[0] && day <= z.end[1])) {
        return { sign: z.sign, icon: z.icon };
      }
    }
    return { sign: "Capricorn", icon: "♑" };
  }

  function calculateAndDisplay(isRealtime = false) {
    const dobValue = dobInput.value;
    
    if (!validateDate(dobValue)) {
      if (realtimeInterval) clearInterval(realtimeInterval);
      liveIndicator.style.display = 'none';
      isRealtimeActive = false;
      return false;
    }

    const birthDate = new Date(dobValue);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const oldYears = parseInt(yearsSpan.innerText) || 0;
    const oldMonths = parseInt(monthsSpan.innerText) || 0;
    const oldDays = parseInt(daysSpan.innerText) || 0;
    
    if (!isRealtime) {
      animateValue(yearsSpan, oldYears, years, 400);
      animateValue(monthsSpan, oldMonths, months, 400);
      animateValue(daysSpan, oldDays, days, 400);
    } else {
      yearsSpan.innerText = years;
      monthsSpan.innerText = months;
      daysSpan.innerText = days;
    }

    const totalDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonthsNum = Math.floor(totalDays / 30.44);

    const oldTotalDays = parseInt(totalDaysSpan.innerText.replace(/,/g, '')) || 0;
    
    if (!isRealtime) {
      animateValue(totalDaysSpan, oldTotalDays, totalDays, 500);
      totalHoursSpan.innerText = formatNumber(totalHours);
      totalMinutesSpan.innerText = formatNumber(totalMinutes);
      totalSecondsSpan.innerText = formatNumber(totalSeconds);
      totalWeeksSpan.innerText = formatNumber(totalWeeks);
      totalMonthsSpan.innerText = formatNumber(totalMonthsNum);
    } else {
      totalDaysSpan.innerText = formatNumber(totalDays);
      totalHoursSpan.innerText = formatNumber(totalHours);
      totalMinutesSpan.innerText = formatNumber(totalMinutes);
      totalSecondsSpan.innerText = formatNumber(totalSeconds);
      totalWeeksSpan.innerText = formatNumber(totalWeeks);
      totalMonthsSpan.innerText = formatNumber(totalMonthsNum);
    }

    let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < today) {
      nextBirthday = new Date(today.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate());
    }
    const daysUntilNext = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
    nextBirthdaySpan.innerText = formatNumber(daysUntilNext);

    const zodiac = getZodiac(birthDate.getDate(), birthDate.getMonth() + 1);
    zodiacIconSpan.style.transform = 'scale(1.2)';
    setTimeout(() => { zodiacIconSpan.style.transform = 'scale(1)'; }, 200);
    zodiacIconSpan.innerText = zodiac.icon;
    zodiacNameSpan.innerText = zodiac.sign;

    return true;
  }

  function calculateWithAnimation() {
    calculateBtn.classList.add('loading');
    calculateBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Calculating...';
    
    setTimeout(() => {
      calculateAndDisplay(false);
      calculateBtn.classList.remove('loading');
      calculateBtn.innerHTML = '<i class="bi bi-calculator"></i> Calculate Age';
    }, 300);
  }

  function startRealtime() {
    if (realtimeInterval) clearInterval(realtimeInterval);
    
    if (validateDate(dobInput.value)) {
      isRealtimeActive = true;
      liveIndicator.style.display = 'flex';
      realtimeInterval = setInterval(() => {
        calculateAndDisplay(true);
      }, 1000);
    } else {
      liveIndicator.style.display = 'none';
      isRealtimeActive = false;
    }
  }

  function stopRealtime() {
    if (realtimeInterval) {
      clearInterval(realtimeInterval);
      realtimeInterval = null;
    }
    liveIndicator.style.display = 'none';
    isRealtimeActive = false;
  }

  // Event Listeners
  calculateBtn.addEventListener('click', () => {
    calculateWithAnimation();
    stopRealtime();
    if (validateDate(dobInput.value)) {
      startRealtime();
    }
  });
  
  dobInput.addEventListener('input', () => {
    validateDate(dobInput.value);
    if (isRealtimeActive && validateDate(dobInput.value)) {
      calculateAndDisplay(true);
    } else if (!validateDate(dobInput.value)) {
      stopRealtime();
    }
  });
  
  dobInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      calculateWithAnimation();
      stopRealtime();
      if (validateDate(dobInput.value)) {
        startRealtime();
      }
    }
  });
  
  window.addEventListener('DOMContentLoaded', () => {
    if (validateDate(dobInput.value)) {
      calculateAndDisplay(false);
      startRealtime();
    }
  });

  // Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  const updateThemeButton = () => {
    const current = document.documentElement.getAttribute('data-theme');
    if (current === 'dark') {
      themeToggle.innerHTML = '<i class="bi bi-sun"></i><span>Light</span>';
    } else {
      themeToggle.innerHTML = '<i class="bi bi-moon-stars"></i><span>Dark</span>';
    }
  };
  updateThemeButton();

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton();
  });
})();