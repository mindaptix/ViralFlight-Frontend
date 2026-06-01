function FormCard({ id, icon, title, subtitle, children }) {
  return (
    <section className="form-card" id={id}>
      <div className="card-heading">
        <span className="card-icon">{icon}</span>
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </div>
      <div className="card-rule" />
      {children}
    </section>
  );
}

export default FormCard;
