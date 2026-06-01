import FormCard from "../../../components/registration/FormCard";
import { RadioGroup, SelectInput, TextInput } from "../../../components/registration/FormControls";

function PlatformsSection({ form, platforms, updateField, updatePlatform }) {
  return (
    <FormCard
      id="step-2"
      icon="SM"
      title="Social Media Platforms"
      subtitle="Add your handles and follower counts for each active platform."
    >
      <div className="platform-list">
        {platforms.map((platform) => (
          <div className="platform-row" key={platform.key}>
            <div className="platform-label">
              <span className={`platform-dot ${platform.key}`} />
              {platform.label}
            </div>
            <input
              aria-label={`${platform.label} handle`}
              placeholder={platform.first}
              value={form.platforms[platform.key].handle}
              onChange={(event) => updatePlatform(platform.key, "handle", event.target.value)}
            />
            <input
              aria-label={`${platform.label} followers`}
              placeholder={platform.second}
              value={form.platforms[platform.key].followers}
              onChange={(event) => updatePlatform(platform.key, "followers", event.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="divider" />

      <div className="field-grid three">
        <SelectInput
          label="Primary Platform"
          required
          value={form.primaryPlatform}
          options={platforms.map((item) => item.label)}
          onChange={(value) => updateField("primaryPlatform", value)}
        />
        <SelectInput
          label="Avg. Views / Reel"
          note="approx"
          value={form.avgViews}
          options={["0 - 5K", "5K - 25K", "25K - 100K", "100K - 500K", "500K+"]}
          onChange={(value) => updateField("avgViews", value)}
        />
        <TextInput
          label="Engagement Rate"
          note="approx %"
          placeholder="e.g. 3.5%"
          value={form.engagementRate}
          onChange={(value) => updateField("engagementRate", value)}
        />
      </div>

      <RadioGroup
        label="Are you verified on any platform?"
        value={form.verified}
        options={["Yes", "No"]}
        onChange={(value) => updateField("verified", value)}
      />
    </FormCard>
  );
}

export default PlatformsSection;
