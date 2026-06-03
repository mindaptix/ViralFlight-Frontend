import { useMemo, useState } from "react";
import RegistrationHero from "../../components/registration/RegistrationHero";
import StepNav from "../../components/registration/StepNav";
import {
  createInitialRegistrationForm,
  platforms,
  steps,
} from "../../data/influencerRegistration";
import AudienceSection from "./sections/AudienceSection";
import BasicInfoSection from "./sections/BasicInfoSection";
import CategorySection from "./sections/CategorySection";
import CollaborationSection from "./sections/CollaborationSection";
import PlatformsSection from "./sections/PlatformsSection";
import { apiRequest } from "../../services/apiClient";

const NEXT_STEPS = [
  { n: "01", title: "Profile Review", desc: "Our team reviews your profile within 24–48 hours." },
  { n: "02", title: "WhatsApp Confirmation", desc: "You'll receive a message once you're shortlisted." },
  { n: "03", title: "Brand Matching", desc: "We match you with campaigns that fit your niche." },
];

function SuccessScreen({ name, phone, email }) {
  return (
    <div className="py-16 px-4 pb-28">
      <div className="max-w-145 mx-auto">

        {/* Badge */}
        <div className="flex justify-center mb-7">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-[#fff3ee] border-[3px] border-[#ff5a2f] flex items-center justify-center shadow-[0_0_0_8px_rgba(255,90,47,0.08)]">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path d="M7 18.5L14 25.5L29 10" stroke="#ff5a2f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Eyebrow */}
        <p className="text-center text-[11px] font-bold tracking-[0.22em] text-[#ff5a2f] uppercase mb-3">
          Application Received
        </p>

        {/* Heading */}
        <h1 className="text-center text-[40px] font-extrabold text-[#17130f] leading-tight tracking-tight mb-4">
          You&apos;re in,<br />{name}!
        </h1>

        {/* Sub */}
        <p className="text-center text-[#706b62] text-[15px] leading-relaxed max-w-100 mx-auto mb-10">
          Your creator profile is with our team. Expect a WhatsApp confirmation within 48 hours.
        </p>

        {/* Registered card */}
        <div className="bg-white rounded-2xl border border-[#ede5d8] p-6 mb-4 shadow-[0_4px_24px_rgba(23,19,15,0.07)]">
          <p className="text-[10px] font-bold tracking-[0.18em] text-[#b0a494] uppercase mb-5">
            Registered With
          </p>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-11 h-11 rounded-xl bg-[#fff3ee] border border-[#ffd9cc] flex items-center justify-center shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff5a2f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.12 12 19.79 19.79 0 01.08 3.49 2 2 0 012.06 1.32h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 9.27a16 16 0 006.29 6.29l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2.08z" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] text-[#b0a494] mb-0.5">Phone</p>
              <p className="text-[15px] font-bold text-[#17130f]">{phone}</p>
            </div>
          </div>

          <div className="h-px bg-[#f2ebe0] mb-4" />

          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#fff3ee] border border-[#ffd9cc] flex items-center justify-center shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff5a2f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M2 7l10 7 10-7" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] text-[#b0a494] mb-0.5">Email</p>
              <p className="text-[15px] font-bold text-[#17130f]">{email}</p>
            </div>
          </div>
        </div>

        {/* Steps card */}
        <div className="bg-[#17130f] rounded-2xl p-6 mb-8">
          <p className="text-[10px] font-bold tracking-[0.18em] text-[#ff5a2f] uppercase mb-6">
            What Happens Next
          </p>
          <div className="flex flex-col gap-5">
            {NEXT_STEPS.map((item) => (
              <div key={item.n} className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-xl bg-[rgba(255,90,47,0.12)] border border-[rgba(255,90,47,0.25)] flex items-center justify-center shrink-0">
                  <span className="text-[#ff5a2f] text-[11px] font-extrabold">{item.n}</span>
                </div>
                <div className="pt-1">
                  <p className="text-white text-sm font-semibold mb-0.5">{item.title}</p>
                  <p className="text-[#6b6259] text-sm leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[13px] text-[#b0a494]">
          Thank you for joining ViralFlight. Let&apos;s build something great.
        </p>

      </div>
    </div>
  );
}

function InfluencerRegistrationForm() {
  const [form, setForm] = useState(createInitialRegistrationForm);
  const [submitted, setSubmitted] = useState(false);

  const completedSteps = useMemo(
    () => [
      form.fullName && form.displayName && form.phone && form.email,
      form.primaryPlatform || Object.values(form.platforms).some((item) => item.handle),
      form.primaryCategory.length > 0 && form.languages.length > 0 && form.contentFormats.length > 0,
      form.audienceAgeGroup || form.audienceTypes.length > 0,
      form.collaborationTypes.length > 0 && form.acceptedTerms,
    ],
    [form],
  );

  const updateField = (field, value) =>
    setForm((current) => ({ ...current, [field]: value }));

  const updatePlatform = (platformKey, field, value) =>
    setForm((current) => ({
      ...current,
      platforms: {
        ...current.platforms,
        [platformKey]: { ...current.platforms[platformKey], [field]: value },
      },
    }));

  const toggleListValue = (field, value, limit) =>
    setForm((current) => {
      const exists = current[field].includes(value);
      const next = exists
        ? current[field].filter((item) => item !== value)
        : limit && current[field].length >= limit
          ? current[field]
          : [...current[field], value];
      return { ...current, [field]: next };
    });

  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");
    try {
      await apiRequest("/api/influencers", {
        method: "POST",
        body: JSON.stringify(form),
      });
    } catch (err) {
      setSubmitError(err.message || "Submission failed. Try again.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <main className="app-shell">
      <RegistrationHero />
      <StepNav steps={steps} completedSteps={completedSteps} />

      {submitted ? (
        <SuccessScreen name={form.displayName} phone={form.phone} email={form.email} />
      ) : (
        <>
          <section className="website-intro" id="why">
            <div className="intro-copy">
              <span>Built for creators and agencies</span>
              <h2>Your profile should look as professional as your content.</h2>
              <p>
                This application captures the exact details brands need before shortlisting a
                creator: reach, niche, audience, content style, budgets, and collaboration
                boundaries.
              </p>
            </div>
            <div className="intro-grid">
              <article>
                <strong>01</strong>
                <h3>Creator identity</h3>
                <p>Personal details, city, bio, and profile links.</p>
              </article>
              <article>
                <strong>02</strong>
                <h3>Platform proof</h3>
                <p>Handles, followers, views, engagement, and analytics.</p>
              </article>
              <article>
                <strong>03</strong>
                <h3>Brand fit</h3>
                <p>Categories, audience, budgets, and work preferences.</p>
              </article>
            </div>
          </section>

          <section className="form-showcase" id="profile-form">
            <div className="form-showcase-copy">
              <p className="eyebrow light">Application Form</p>
              <h2>Complete your influencer profile</h2>
              <p>
                Fill each section carefully. Agencies use this information to match you with
                campaigns that fit your audience, pricing, and content strengths.
              </p>
            </div>
          </section>

          <form className="form-page" onSubmit={handleSubmit}>
            <BasicInfoSection form={form} updateField={updateField} />
            <PlatformsSection
              form={form}
              platforms={platforms}
              updateField={updateField}
              updatePlatform={updatePlatform}
            />
            <CategorySection
              form={form}
              updateField={updateField}
              toggleListValue={toggleListValue}
            />
            <AudienceSection
              form={form}
              updateField={updateField}
              toggleListValue={toggleListValue}
            />
            <CollaborationSection
              form={form}
              updateField={updateField}
              toggleListValue={toggleListValue}
            />

            <section className="submit-panel">
              <h2>Ready to get discovered?</h2>
              <p>
                Our team reviews every application within 48 hours. You'll receive a confirmation
                on WhatsApp.
              </p>
              <button type="submit">Submit Registration</button>
              <small>Your data is secure and never sold to third parties.</small>
              {submitError && <strong className="block mt-3 text-[#f87171] text-sm">{submitError}</strong>}
            </section>
          </form>
        </>
      )}
    </main>
  );
}

export default InfluencerRegistrationForm;
