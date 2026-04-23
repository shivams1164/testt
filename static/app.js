const API_URL = "https://fedskillstest.coalitiontechnologies.workers.dev";
const AUTH = btoa("coalition:skills-test");
const TARGET = "Jessica Taylor";

async function getPatient() {
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Basic ${AUTH}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const patients = await response.json();
  return patients.find((item) => item.name === TARGET);
}

function renderSidebar(patient) {
  document.getElementById("patientList").innerHTML = `
    <article class="patient-list-item">
      <img src="${patient.profile_picture}" alt="${patient.name}" class="patient-avatar" />
      <div>
        <p class="patient-name">${patient.name}</p>
        <p class="patient-meta">${patient.gender}, ${patient.age}</p>
      </div>
      <span>...</span>
    </article>
  `;
}

function renderProfile(patient) {
  const details = [
    ["Date Of Birth", patient.date_of_birth],
    ["Gender", patient.gender],
    ["Contact Info.", patient.phone_number],
    ["Emergency Contacts", patient.emergency_contact],
    ["Insurance Provider", patient.insurance_type],
  ];

  document.getElementById("profileCard").innerHTML = `
    <img class="profile-picture" src="${patient.profile_picture}" alt="${patient.name}" />
    <h2 class="profile-name">${patient.name}</h2>
    <ul>
      ${details
        .map(
          ([label, value]) => `
            <li class="profile-info-item">
              <p class="mini-title">${label}</p>
              <p class="info-value">${value}</p>
            </li>
          `
        )
        .join("")}
    </ul>
    <button class="primary-button">Show All Information</button>
  `;
}

function renderStats(patient) {
  const latest = patient.diagnosis_history[patient.diagnosis_history.length - 1];
  const cards = [
    ["Respiratory Rate", `${latest.respiratory_rate.value} bpm`, latest.respiratory_rate.levels, "\ud83e\udec1", "blue"],
    ["Temperature", `${latest.temperature.value}\u00b0F`, latest.temperature.levels, "\ud83c\udf21\ufe0f", "peach"],
    ["Heart Rate", `${latest.heart_rate.value} bpm`, latest.heart_rate.levels, "\u2764\ufe0f", "pink"],
  ];

  document.getElementById("statsCards").innerHTML = cards
    .map(
      ([title, value, note, icon, tone]) => `
        <article class="stat-card ${tone}">
          <div class="stat-icon">${icon}</div>
          <p class="mini-title">${title}</p>
          <p class="big-value">${value}</p>
          <p class="mini-note">${note}</p>
        </article>
      `
    )
    .join("");
}

function renderDiagnostics(patient) {
  document.getElementById("diagnosticsBody").innerHTML = patient.diagnostic_list
    .map(
      (item) => `
        <tr>
          <td>${item.name}</td>
          <td>${item.description}</td>
          <td>${item.status}</td>
        </tr>
      `
    )
    .join("");
}

function renderLabResults(patient) {
  document.getElementById("labList").innerHTML = patient.lab_results
    .map((item) => `<li class="lab-row"><span>${item}</span><span>\u2b73</span></li>`)
    .join("");
}

function renderChart(patient) {
  const recent = patient.diagnosis_history.slice(-6);
  const latest = recent[recent.length - 1].blood_pressure;

  document.getElementById("chartStats").innerHTML = `
    <div class="chart-stat-item">
      <span class="dot systolic"></span>
      <p class="mini-title">Systolic</p>
      <p class="big-value">${latest.systolic.value}</p>
      <p class="mini-note">${latest.systolic.levels}</p>
    </div>
    <div class="chart-stat-item">
      <span class="dot diastolic"></span>
      <p class="mini-title">Diastolic</p>
      <p class="big-value">${latest.diastolic.value}</p>
      <p class="mini-note">${latest.diastolic.levels}</p>
    </div>
  `;

  const ctx = document.getElementById("bloodPressureChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: recent.map((item) => `${item.month}, ${item.year}`),
      datasets: [
        {
          label: "Systolic",
          data: recent.map((item) => item.blood_pressure.systolic.value),
          borderColor: "#d66fe1",
          backgroundColor: "rgba(214, 111, 225, 0.15)",
          tension: 0.35,
        },
        {
          label: "Diastolic",
          data: recent.map((item) => item.blood_pressure.diastolic.value),
          borderColor: "#7f69e1",
          backgroundColor: "rgba(127, 105, 225, 0.12)",
          tension: 0.35,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          min: 50,
          max: 180,
        },
      },
    },
  });
}

async function init() {
  try {
    const patient = await getPatient();
    renderSidebar(patient);
    renderProfile(patient);
    renderStats(patient);
    renderDiagnostics(patient);
    renderLabResults(patient);
    renderChart(patient);
  } catch (error) {
    document.body.innerHTML = `<p style="font-family:sans-serif;padding:2rem;color:#8f2d2d;">${error.message}</p>`;
  }
}

init();
