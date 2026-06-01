import FormCard from "../../../components/registration/FormCard";
import {
  ChoiceGrid,
  RadioGroup,
  SelectInput,
  TextareaInput,
  TextInput,
} from "../../../components/registration/FormControls";
import {
  blockedCategories,
  brandCategories,
  collaborationTypes,
} from "../../../data/influencerRegistration";

function CollaborationSection({ form, updateField, toggleListValue }) {
  return (
    <FormCard
      id="step-5"
      icon="CP"
      title="Collaboration Preferences"
      subtitle="Tell brands how you like to work and what you charge."
    >
      <ChoiceGrid
        label="Types of Collaboration You Are Open To"
        required
        values={form.collaborationTypes}
        options={collaborationTypes}
        onChange={(value) => toggleListValue("collaborationTypes", value)}
      />

      <div className="field-grid two">
        <SelectInput
          label="Minimum Budget Per Campaign"
          value={form.minBudget}
          options={["Under Rs. 5,000", "Rs. 5,000 - Rs. 15,000", "Rs. 15,000 - Rs. 50,000", "Rs. 50,000+"]}
          onChange={(value) => updateField("minBudget", value)}
        />
        <SelectInput
          label="Preferred Deliverable Turnaround"
          value={form.turnaround}
          options={["24-48 hours", "3-5 days", "1 week", "2+ weeks"]}
          onChange={(value) => updateField("turnaround", value)}
        />
      </div>

      <ChoiceGrid
        label="Brand Categories You Are Open To Working With"
        values={form.brandCategories}
        options={brandCategories}
        onChange={(value) => toggleListValue("brandCategories", value)}
      />
      <ChoiceGrid
        label="Categories You Will NOT Work With"
        values={form.blockedCategories}
        options={blockedCategories}
        onChange={(value) => toggleListValue("blockedCategories", value)}
      />
      <RadioGroup
        label="Have you worked with brands before?"
        required
        value={form.workedWithBrands}
        options={["Yes", "No"]}
        onChange={(value) => updateField("workedWithBrands", value)}
      />

      <TextInput
        label="Notable Brands You Have Worked With"
        note="optional"
        placeholder="e.g. Myntra, boAt, Mamaearth, Zomato"
        value={form.notableBrands}
        onChange={(value) => updateField("notableBrands", value)}
      />
      <TextareaInput
        label="Best collaboration / campaign example"
        note="link or describe"
        placeholder="Share a link to your best brand collab or describe it briefly..."
        value={form.bestCampaign}
        onChange={(value) => updateField("bestCampaign", value)}
      />
      <TextareaInput
        label="Anything else you want brands to know?"
        placeholder="e.g. I only promote products I personally use. Available for travel shoots across India."
        value={form.extraNotes}
        onChange={(value) => updateField("extraNotes", value)}
      />
      <SelectInput
        label="How did you hear about VF App?"
        value={form.source}
        options={["Instagram", "Friend / Referral", "Brand", "Google Search", "Event", "Other"]}
        onChange={(value) => updateField("source", value)}
      />
      <TextInput
        label="Referral Code"
        note="if any"
        placeholder="e.g. VF2024XYZ"
        value={form.referralCode}
        onChange={(value) => updateField("referralCode", value)}
      />

      <label className="terms-box">
        <input
          type="checkbox"
          checked={form.acceptedTerms}
          onChange={(event) => updateField("acceptedTerms", event.target.checked)}
        />
        <span>
          I agree to VF App's <a href="#terms">Terms of Service</a> and{" "}
          <a href="#privacy">Privacy Policy</a>. I confirm all information provided is accurate.
        </span>
      </label>
    </FormCard>
  );
}

export default CollaborationSection;
