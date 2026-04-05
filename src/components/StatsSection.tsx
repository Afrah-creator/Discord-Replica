export default function StatsSection() {
  const stats = [
    { value: "150M+", label: "Monthly Active Users" },
    { value: "19M+", label: "Active Servers Weekly" },
    { value: "4B+", label: "Daily Messages" },
    { value: "1.3B+", label: "Voice Minutes Daily" },
  ];

  return (
    <section style={{ padding: '48px 0', background: '#2b2c30', borderTop: '1px solid #3f4045', borderBottom: '1px solid #3f4045' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
          {stats.map((stat, i) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 900, background: 'linear-gradient(135deg, #5865F2, #9b59b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 8 }}>{stat.value}</p>
              <p style={{ color: '#949ba4', fontSize: 14 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
