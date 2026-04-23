function StatsCards({ diagnosis }) {
  const statItems = [
    {
      title: "Respiratory Rate",
      value: `${diagnosis?.respiratory_rate?.value ?? "-"} bpm`,
      note: diagnosis?.respiratory_rate?.levels ?? "",
      icon: "\ud83e\udec1",
      tone: "blue",
    },
    {
      title: "Temperature",
      value: `${diagnosis?.temperature?.value ?? "-"}\u00b0F`,
      note: diagnosis?.temperature?.levels ?? "",
      icon: "\ud83c\udf21\ufe0f",
      tone: "peach",
    },
    {
      title: "Heart Rate",
      value: `${diagnosis?.heart_rate?.value ?? "-"} bpm`,
      note: diagnosis?.heart_rate?.levels ?? "",
      icon: "\u2764\ufe0f",
      tone: "pink",
    },
  ];

  return (
    <div className="stats-grid">
      {statItems.map((item) => (
        <article key={item.title} className={`stat-card ${item.tone}`}>
          <div className="stat-icon">{item.icon}</div>
          <p className="mini-title">{item.title}</p>
          <p className="big-value">{item.value}</p>
          <p className="mini-note">{item.note}</p>
        </article>
      ))}
    </div>
  );
}

export default StatsCards;
