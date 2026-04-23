function PatientProfileCard({ patient }) {
  const info = [
    { label: "Date Of Birth", value: patient?.date_of_birth },
    { label: "Gender", value: patient?.gender },
    { label: "Contact Info.", value: patient?.phone_number },
    { label: "Emergency Contacts", value: patient?.emergency_contact },
    { label: "Insurance Provider", value: patient?.insurance_type },
  ];

  return (
    <section className="card-panel patient-profile-card">
      <img src={patient?.profile_picture} alt={patient?.name || "Patient"} className="profile-picture" />
      <h2 className="profile-name">{patient?.name}</h2>

      <ul className="profile-info-list">
        {info.map((item) => (
          <li key={item.label} className="profile-info-item">
            <div>
              <p className="mini-title">{item.label}</p>
              <p className="info-value">{item.value}</p>
            </div>
          </li>
        ))}
      </ul>

      <button type="button" className="primary-button">
        Show All Information
      </button>
    </section>
  );
}

export default PatientProfileCard;
