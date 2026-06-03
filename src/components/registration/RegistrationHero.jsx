function RegistrationHero() {
  return (
    <>
      <header className="site-header">
        <a className="brand-mark" href="#top" aria-label="VF App home">
          <span>VF</span>
          App
        </a>
        <nav aria-label="Main navigation">
          <a href="#why">Why VF</a>
          <a href="#profile-form">Creator Form</a>
          <a href="#step-5">Collaborations</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="/admin" className="text-[#6b6259] hover:text-[#ff5a2f] text-sm font-semibold transition-colors">Admin</a>
          <a className="header-cta" href="#profile-form">Apply Now</a>
        </div>
      </header>

      <section className="hero-section" id="top">
        <div className="hero-content">

          <div className="hero-copy-block">
            <p className="eyebrow">Creator Agency Network</p>
            <h1>
              Your creator profile for<br />
              <span>premium brand</span> campaigns.
            </h1>
            <p className="hero-copy">
              One polished profile — brands discover you, agencies shortlist you.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#profile-form">
                Start Registration
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft:"8px"}}>
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <a className="secondary-action" href="#why">How it works</a>
            </div>
            <div className="hero-metrics">
              <span><strong>48h</strong> Review</span>
              <span><strong>25+</strong> Niches</span>
              <span><strong>1K+</strong> Creators</span>
            </div>
          </div>

          <aside className="creator-preview" aria-label="Creator card preview">
            <div className="preview-header">
              <span>VF Talent Desk</span>
              <strong className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgba(255,90,47,0.15)] border border-[rgba(255,90,47,0.3)] text-[#ff7a55] text-[11px] font-extrabold uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a2f] animate-pulse" />
                Live
              </strong>
            </div>
            <div className="profile-visual">
              <div className="profile-ring">
                <span>PC</span>
              </div>
              <div>
                <h2>Priya Creates</h2>
                <p>Fashion, beauty, lifestyle</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[rgba(15,118,110,0.18)] border border-[rgba(15,118,110,0.3)] text-[#5eead4] text-[11px] font-bold">✓ Verified</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[rgba(255,90,47,0.14)] border border-[rgba(255,90,47,0.28)] text-[#ff7a55] text-[11px] font-bold">Top Creator</span>
                </div>
              </div>
            </div>
            <div className="insight-grid">
              <span><strong>92K</strong>Instagram</span>
              <span><strong>7.8%</strong>Engagement</span>
              <span><strong>18–34</strong>Audience</span>
              <span><strong>Rs. 25K+</strong>Campaigns</span>
            </div>
            <div className="creator-card featured">
              <div className="creator-avatar">BR</div>
              <div>
                <strong>Matched brief</strong>
                <span>Luxury skincare launch, reels + stories</span>
              </div>
              <em>96%</em>
            </div>
            <div className="campaign-strip">
              <div className="flex items-center justify-between mb-2.5">
                <span>Profile strength</span>
                <strong className="text-[#ff5a2f] text-base font-black">92%</strong>
              </div>
              <div className="h-1.5 rounded-full bg-[#ede5d8] overflow-hidden mb-2.5">
                <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-[#ff5a2f] to-[#f1c66d]" />
              </div>
              <p className="m-0 text-[13px] font-bold text-[#17130f]">Ready for agency review</p>
            </div>
          </aside>

        </div>
      </section>
    </>
  );
}

export default RegistrationHero;
