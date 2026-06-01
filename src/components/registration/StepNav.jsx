function StepNav({ steps, completedSteps }) {
  return (
    <nav className="step-nav" aria-label="Registration progress">
      {steps.map((step, index) => (
        <a
          className={completedSteps[index] || index === 0 ? "step-item active" : "step-item"}
          href={`#step-${index + 1}`}
          key={step}
        >
          <span>{index + 1}</span>
          {step}
        </a>
      ))}
    </nav>
  );
}

export default StepNav;
