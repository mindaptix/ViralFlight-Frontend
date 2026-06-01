export const steps = ["Basic Info", "Platforms", "Category", "Audience", "Collaboration"];

export const states = [
  "Andhra Pradesh",
  "Delhi",
  "Gujarat",
  "Haryana",
  "Karnataka",
  "Maharashtra",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
];

export const platforms = [
  { key: "instagram", label: "Instagram", first: "@handle", second: "Followers" },
  { key: "youtube", label: "YouTube", first: "Channel URL", second: "Subscribers" },
  { key: "tiktok", label: "TikTok", first: "@handle", second: "Followers" },
  { key: "moj", label: "Moj / Reels", first: "@handle", second: "Followers" },
  { key: "facebook", label: "Facebook", first: "Page URL", second: "Likes / Followers" },
  { key: "linkedin", label: "LinkedIn", first: "Profile URL", second: "Connections / Followers" },
  { key: "twitter", label: "X (Twitter)", first: "@handle", second: "Followers" },
];

export const categories = [
  "Lifestyle",
  "Tech & Innovation",
  "Design & Editing",
  "Finance & Money",
  "Real Estate & Home",
  "Education & Learning",
  "Medical Professionals",
  "Health & Wellness",
  "Art & Creativity",
  "Music, Dance & Performing",
  "Business & Entrepreneurship",
  "Parenting & Family",
  "NRI & International",
  "Entertainment & Pop Culture",
  "Law, Policy & Society",
  "Fashion",
  "Beauty",
  "Food & Beverage",
  "Fitness & Sports Training",
  "Travel & Adventure",
  "Automotive",
  "Comedy & Skits",
  "Gaming & Anime",
  "Sports & Athletics",
  "Spirituality & Astrology",
  "Pets & Animals",
];

export const subcategories = [
  "UI/UX Design",
  "Visual Editing",
  "Video Editing",
  "Photo Editing",
  "Content Creation Tools",
];

export const languages = [
  "Hindi",
  "English",
  "Hinglish",
  "Tamil",
  "Telugu",
  "Kannada",
  "Malayalam",
  "Marathi",
  "Bengali",
  "Punjabi",
  "Gujarati",
  "Other",
];

export const contentFormats = [
  "Short Videos / Reels",
  "Long-form Videos",
  "Static Posts / Carousels",
  "Stories",
  "Live Streams",
  "Blogs / Articles",
  "Podcasts",
];

export const audienceTypes = [
  "Students",
  "Working professionals",
  "Homemakers",
  "Business owners",
  "Parents",
  "Teenagers",
  "Senior citizens",
  "Gamers",
];

export const collaborationTypes = [
  "Paid Promotions",
  "Barter / Product Exchange",
  "Affiliate / Commission",
  "Brand Ambassador",
  "Co-created Content",
  "Event Attendance",
  "Dedicated Video",
  "Story Mentions",
];

export const brandCategories = [
  "FMCG & Food",
  "Fashion & Apparel",
  "Beauty & Personal Care",
  "Tech & Gadgets",
  "Finance & FinTech",
  "EdTech & Online Courses",
  "Health & Pharma",
  "Travel & Hospitality",
  "Real Estate",
  "Gaming & Apps",
  "Automobiles",
  "D2C / Startups",
];

export const blockedCategories = [
  "Alcohol / Tobacco",
  "Gambling / Fantasy Sports",
  "Political Parties",
  "Cryptocurrency",
  "Adult / Explicit Content",
];

export const createInitialRegistrationForm = () => ({
  fullName: "",
  displayName: "",
  phone: "",
  email: "",
  city: "",
  state: "",
  basedIn: "",
  gender: "Prefer not to say",
  dob: "",
  bio: "",
  profilePhotoUrl: "",
  platforms: platforms.reduce(
    (acc, item) => ({
      ...acc,
      [item.key]: { handle: "", followers: "" },
    }),
    {},
  ),
  primaryPlatform: "",
  avgViews: "",
  engagementRate: "",
  verified: "No",
  primaryCategory: [],
  subcategories: [],
  languages: [],
  contentFormats: [],
  postingFrequency: "",
  audienceAgeGroup: "",
  audienceGender: "",
  topAudienceLocation: "",
  audiencePurchasingPower: "",
  audienceTypes: [],
  analyticsScreenshotUrl: "",
  collaborationTypes: [],
  minBudget: "",
  turnaround: "",
  brandCategories: [],
  blockedCategories: [],
  workedWithBrands: "",
  notableBrands: "",
  bestCampaign: "",
  extraNotes: "",
  source: "",
  referralCode: "",
  acceptedTerms: false,
});
