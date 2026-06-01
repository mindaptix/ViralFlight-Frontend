import FormCard from "../../../components/registration/FormCard";
import { ChoiceGrid, RadioGroup } from "../../../components/registration/FormControls";
import {
  categories,
  contentFormats,
  languages,
  subcategories,
} from "../../../data/influencerRegistration";

function CategorySection({ form, updateField, toggleListValue }) {
  return (
    <FormCard
      id="step-3"
      icon="CC"
      title="Content Category"
      subtitle="Select your primary category and up to 3 subcategories. Brands filter by these."
    >
      <ChoiceGrid
        label="Primary Category"
        hint="Select all categories that match your content"
        required
        values={form.primaryCategory}
        options={categories}
        onChange={(value) => toggleListValue("primaryCategory", value)}
      />
      <ChoiceGrid
        label="Subcategories"
        hint="Select up to 3 that best describe your content"
        values={form.subcategories}
        options={subcategories}
        limit={3}
        onChange={(value) => toggleListValue("subcategories", value, 3)}
      />
      <ChoiceGrid
        label="Content Language(s)"
        required
        values={form.languages}
        options={languages}
        onChange={(value) => toggleListValue("languages", value)}
      />
      <ChoiceGrid
        label="Content Format(s)"
        required
        values={form.contentFormats}
        options={contentFormats}
        onChange={(value) => toggleListValue("contentFormats", value)}
      />
      <RadioGroup
        label="Posting Frequency"
        value={form.postingFrequency}
        options={["Daily", "3-5x/week", "1-2x/week", "Few times/month"]}
        onChange={(value) => updateField("postingFrequency", value)}
      />
    </FormCard>
  );
}

export default CategorySection;
