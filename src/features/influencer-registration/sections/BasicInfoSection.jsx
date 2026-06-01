import FormCard from "../../../components/registration/FormCard";
import { SelectInput, TextInput } from "../../../components/registration/FormControls";
import { states } from "../../../data/influencerRegistration";

function BasicInfoSection({ form, updateField }) {
  return (
    <FormCard
      id="step-1"
      icon="BI"
      title="Basic Information"
      subtitle="Your personal details are visible only to verified brands."
    >
      <div className="field-grid two">
        <TextInput
          label="Full Name"
          required
          placeholder="e.g. Priya Sharma"
          value={form.fullName}
          onChange={(value) => updateField("fullName", value)}
        />
        <TextInput
          label="Display / Creator Name"
          required
          placeholder="e.g. @PriyaCreates"
          value={form.displayName}
          onChange={(value) => updateField("displayName", value)}
        />
        <TextInput
          label="Phone Number"
          required
          placeholder="+91 9XXXXXXXXX"
          value={form.phone}
          onChange={(value) => updateField("phone", value)}
        />
        <TextInput
          label="Email Address"
          required
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(value) => updateField("email", value)}
        />
      </div>

      <div className="field-grid three">
        <TextInput
          label="City / Town"
          required
          placeholder="e.g. Mumbai"
          value={form.city}
          onChange={(value) => updateField("city", value)}
        />
        <SelectInput
          label="State"
          required
          value={form.state}
          options={states}
          onChange={(value) => updateField("state", value)}
        />
        <SelectInput
          label="Based In"
          required
          value={form.basedIn}
          options={["India", "Outside India", "Both"]}
          onChange={(value) => updateField("basedIn", value)}
        />
      </div>

      <div className="field-grid two">
        <SelectInput
          label="Gender"
          value={form.gender}
          options={["Prefer not to say", "Female", "Male", "Non-binary"]}
          onChange={(value) => updateField("gender", value)}
        />
        <TextInput
          label="Date of Birth"
          type="date"
          value={form.dob}
          onChange={(value) => updateField("dob", value)}
        />
      </div>

      <TextInput
        label="One-line Bio"
        required
        note="shown to brands"
        placeholder="e.g. Fitness coach sharing science-backed tips for busy professionals"
        value={form.bio}
        onChange={(value) => updateField("bio", value)}
      />
      <TextInput
        label="Profile Photo URL"
        note="Instagram / Google Drive link"
        placeholder="https://..."
        value={form.profilePhotoUrl}
        onChange={(value) => updateField("profilePhotoUrl", value)}
      />
    </FormCard>
  );
}

export default BasicInfoSection;
