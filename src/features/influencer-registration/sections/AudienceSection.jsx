import FormCard from "../../../components/registration/FormCard";
import { ChoiceGrid, SelectInput, TextInput } from "../../../components/registration/FormControls";
import { audienceTypes } from "../../../data/influencerRegistration";

function AudienceSection({ form, updateField, toggleListValue }) {
  return (
    <FormCard
      id="step-4"
      icon="AD"
      title="Audience Demographics"
      subtitle="Help brands understand who watches your content."
    >
      <div className="field-grid two">
        <SelectInput
          label="Majority Audience Age Group"
          value={form.audienceAgeGroup}
          options={["13-17", "18-24", "25-34", "35-44", "45+"]}
          onChange={(value) => updateField("audienceAgeGroup", value)}
        />
        <SelectInput
          label="Majority Audience Gender"
          value={form.audienceGender}
          options={["Female", "Male", "Mixed", "Other"]}
          onChange={(value) => updateField("audienceGender", value)}
        />
        <SelectInput
          label="Top Audience Location"
          value={form.topAudienceLocation}
          options={["Metro India", "Tier 2 India", "Tier 3 India", "NRI", "Global"]}
          onChange={(value) => updateField("topAudienceLocation", value)}
        />
        <SelectInput
          label="Audience Purchasing Power"
          value={form.audiencePurchasingPower}
          options={["Budget", "Mid-range", "Premium", "Luxury"]}
          onChange={(value) => updateField("audiencePurchasingPower", value)}
        />
      </div>

      <ChoiceGrid
        label="What describes your audience best?"
        hint="select all that apply"
        values={form.audienceTypes}
        options={audienceTypes}
        onChange={(value) => toggleListValue("audienceTypes", value)}
      />
      <TextInput
        label="Any analytics screenshot link?"
        note="optional - boosts credibility"
        placeholder="Google Drive / Dropbox link to your insights screenshot"
        value={form.analyticsScreenshotUrl}
        onChange={(value) => updateField("analyticsScreenshotUrl", value)}
      />
    </FormCard>
  );
}

export default AudienceSection;
