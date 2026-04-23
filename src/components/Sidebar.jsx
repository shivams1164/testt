function Sidebar({ patient }) {
  return (
    <aside className="sidebar card-panel">
      <div className="sidebar-top">
        <h2 className="section-title">Patients</h2>
        <span className="sidebar-search" aria-hidden="true">
          \u2315
        </span>
      </div>

      <div className="patient-list">
        <article className="patient-list-item active">
          <img
            src={patient?.profile_picture}
            alt={patient?.name || "Patient"}
            className="patient-avatar"
          />
          <div>
            <p className="patient-name">{patient?.name}</p>
            <p className="patient-meta">
              {patient?.gender}, {patient?.age}
            </p>
          </div>
          <span className="ellipsis" aria-hidden="true">
            \u22ef
          </span>
        </article>
      </div>
    </aside>
  );
}

export default Sidebar;
