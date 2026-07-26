export interface Rider {
  id: string;
  name_en: string;
  name_bn: string;
  title_en: string;
  title_bn: string;
  tagline_en: string;
  tagline_bn: string;
  phase3_en: string;
  phase3_bn: string;
}

export const RIDERS: Rider[] = [
  {
    id: "karim",
    name_en: "Karim Vai",
    name_bn: "করিম ভাই",
    title_en: "The Philosopher",
    title_bn: "দার্শনিক রাইডার",
    tagline_en: "Every destination is just a journey in disguise.",
    tagline_bn: "প্রতিটি গন্তব্য আসলে একটি যাত্রার ছদ্মবেশ।",
    phase3_en: "Karim Vai has reached enlightenment. He is no longer moving forward or backward. He simply is.",
    phase3_bn: "করিম ভাই আলোকপ্রাপ্ত হয়েছেন। তিনি আর এগোচ্ছেন না, পেছাচ্ছেনও না। শুধু আছেন।",
  },
  {
    id: "momo",
    name_en: "Momo Apa",
    name_bn: "মোমো আপা",
    title_en: "The First Female Turtle Rider",
    title_bn: "প্রথম নারী টার্টেল রাইডার",
    tagline_en: "Breaking barriers. Also breaking speed limits. Downward.",
    tagline_bn: "বাধা ভাঙছেন। গতিসীমাও ভাঙছেন। নিচের দিকে।",
    phase3_en: "Momo Apa found a better route on Pinterest. Still downloading.",
    phase3_bn: "মোমো আপা Pinterest এ ভালো রাস্তা খুঁজে পেয়েছেন। ডাউনলোড হচ্ছে।",
  },
  {
    id: "babu",
    name_en: "Babu Bhai",
    name_bn: "বাবু ভাই",
    title_en: "The Eternal Optimist",
    title_bn: "চিরন্তন আশাবাদী",
    tagline_en: "Almost there! (He has been saying this for 20 minutes.)",
    tagline_bn: "প্রায় এসেই গেছি! (এটা ২০ মিনিট ধরে বলছেন।)",
    phase3_en: "Babu Bhai is still optimistic. Somehow this is worse.",
    phase3_bn: "বাবু ভাই এখনো আশাবাদী। কোনোভাবে এটা আরো খারাপ লাগছে।",
  },
  {
    id: "rocky",
    name_en: "Rocky Bhai",
    name_bn: "রকি ভাই",
    title_en: "The Veteran (15 years, 0 deliveries)",
    title_bn: "অভিজ্ঞ রাইডার (১৫ বছর, ০ ডেলিভারি)",
    tagline_en: "15 years of delivery experience. 0 successful deliveries.",
    tagline_bn: "১৫ বছরের অভিজ্ঞতা। একটিও সফল ডেলিভারি নেই।",
    phase3_en: "Rocky Bhai has retired. Effective immediately. Mid-route.",
    phase3_bn: "রকি ভাই অবসর নিয়েছেন। তাৎক্ষণিক কার্যকর। রাস্তার মাঝখানে।",
  },
  {
    id: "nodi",
    name_en: "Nodi Apa",
    name_bn: "নদী আপা",
    title_en: "The GPS Denier",
    title_bn: "GPS অবিশ্বাসী",
    tagline_en: "GPS is just a suggestion. She has instincts.",
    tagline_bn: "GPS শুধু একটা মতামত। তাঁর নিজস্ব অনুভূতি আছে।",
    phase3_en: "Nodi Apa's instincts said stop. She always listens to them.",
    phase3_bn: "নদী আপার অনুভূতি বলেছে থামো। তিনি সবসময় শোনেন।",
  },
  {
    id: "chhotu",
    name_en: "Chhotu Mia",
    name_bn: "ছোটু মিয়া",
    title_en: "The Youngest Rider (7 in turtle years = 140)",
    title_bn: "সবচেয়ে কম বয়সী (কচ্ছপ বয়সে ৭ = মানুষ বয়সে ১৪০)",
    tagline_en: "Full of energy. Zero sense of direction.",
    tagline_bn: "প্রচুর এনার্জি। দিকজ্ঞান শূন্য।",
    phase3_en: "Chhotu Mia fell asleep on the bike. He's a child. Give him a break.",
    phase3_bn: "ছোটু মিয়া বাইকের উপরেই ঘুমিয়ে পড়েছেন। সে বাচ্চা। মাফ করুন।",
  },
  {
    id: "professor",
    name_en: "Professor Tortoise",
    name_bn: "প্রফেসর কচ্ছপ",
    title_en: "PhD in Delivery Theory, 0 Practical Experience",
    title_bn: "ডেলিভারি তত্ত্বে পিএইচডি, বাস্তব অভিজ্ঞতা শূন্য",
    tagline_en: "Theoretically, the food should be there by now.",
    tagline_bn: "তত্ত্বগতভাবে, খাবারটা এতক্ষণে পৌঁছানোর কথা।",
    phase3_en: "Professor is recalculating. His formula had a small error. Or large.",
    phase3_bn: "প্রফেসর পুনরায় হিসাব করছেন। সূত্রে ছোট একটা ভুল ছিল। হয়তো বড়।",
  },
  {
    id: "dada",
    name_en: "Dada Bhai",
    name_bn: "দাদা ভাই",
    title_en: "The Retired Rickshaw Puller, New Career Goals",
    title_bn: "অবসরপ্রাপ্ত রিকশাচালক, নতুন ক্যারিয়ার",
    tagline_en: "Pulled rickshaws for 30 years. This is basically the same.",
    tagline_bn: "৩০ বছর রিকশা চালিয়েছেন। এটাও প্রায় একইরকম।",
    phase3_en: "Dada Bhai stopped to remember 'the old days'. He has many memories.",
    phase3_bn: "দাদা ভাই 'পুরনো দিনের' কথা মনে করছেন। অনেক স্মৃতি আছে।",
  },
  {
    id: "alien",
    name_en: "Zara (Exchange Rider from Planet Slow)",
    name_bn: "জারা (স্লো গ্রহ থেকে আগত এক্সচেঞ্জ রাইডার)",
    title_en: "First time on Earth. Roads are confusing.",
    title_bn: "পৃথিবীতে প্রথমবার। রাস্তাগুলো বিভ্রান্তিকর।",
    tagline_en: "On her planet, this would be considered fast.",
    tagline_bn: "তাঁর গ্রহে এটাকে দ্রুত বলা হয়।",
    phase3_en: "Zara contacted her home planet for navigation support. Signal weak.",
    phase3_bn: "জারা নেভিগেশনের জন্য নিজের গ্রহে যোগাযোগ করেছেন। সিগন্যাল দুর্বল।",
  },
  {
    id: "influencer",
    name_en: "Bella Bhai (50K followers)",
    name_bn: "বেলা ভাই (৫০ হাজার ফলোয়ার)",
    title_en: "Delivery Influencer. Content First, Delivery Second.",
    title_bn: "ডেলিভারি ইনফ্লুয়েন্সার। আগে কন্টেন্ট, পরে ডেলিভারি।",
    tagline_en: "Currently filming a reel of your food. For the aesthetic.",
    tagline_bn: "এই মুহূর্তে আপনার খাবারের রিল বানাচ্ছেন। অ্যাসথেটিকের জন্য।",
    phase3_en: "Bella Bhai went live on Instagram. Your food is in the background.",
    phase3_bn: "বেলা ভাই Instagram এ লাইভে গেছেন। আপনার খাবার পেছনে দেখা যাচ্ছে।",
  },
];

export interface StatusJoke {
  id: number;
  bucket: "early" | "mid" | "late";
  en: string;
  bn: string;
}

export const STATUS_JOKES: StatusJoke[] = [
  { id: 1, bucket: "early", en: "🐢 Your rider stopped to have an existential crisis. He's fine. Probably.", bn: "🐢 রাইডার একটু অস্তিত্বের সংকটে পড়েছেন। ঠিক আছেন। মনে হয়।" },
  { id: 2, bucket: "early", en: "📍 Rider location: somewhere between your house and regret.", bn: "📍 রাইডারের অবস্থান: আপনার বাড়ি আর অনুশোচনার মাঝামাঝি কোথাও।" },
  { id: 3, bucket: "early", en: "🌙 It's a beautiful night for a slow ride. Your rider agrees. Too much.", bn: "🌙 ধীরে চলার জন্য চমৎকার রাত। রাইডার একমত। একটু বেশিই।" },
  { id: 4, bucket: "early", en: "🏍️ Rider is going full speed. For a turtle, this is impressive. For you, it is not.", bn: "🏍️ রাইডার পুরো গতিতে যাচ্ছেন। কচ্ছপের জন্য চমৎকার। আপনার জন্য না।" },
  { id: 5, bucket: "early", en: "📱 Rider is checking his phone. It's not your order notification.", bn: "📱 রাইডার ফোন দেখছেন। আপনার অর্ডারের নোটিফিকেশন না।" },
  { id: 6, bucket: "early", en: "☁️ Rider looked at the sky. Felt things. Still looking.", bn: "☁️ রাইডার আকাশের দিকে তাকালেন। কিছু একটা অনুভব করলেন। এখনো তাকিয়ে আছেন।" },
  { id: 7, bucket: "early", en: "🗺️ Google Maps said turn right. Rider said hold on let me think about it.", bn: "🗺️ Google Maps বলল ডানে যান। রাইডার বললেন একটু ভাবতে দিন।" },
  { id: 8, bucket: "early", en: "🌿 Rider spotted a shortcut. It was not a shortcut.", bn: "🌿 রাইডার একটা শর্টকাট দেখলেন। শর্টকাট ছিল না।" },
  { id: 9, bucket: "early", en: "🐢 Your order is being escorted at a historically low velocity.", bn: "🐢 আপনার অর্ডার ঐতিহাসিকভাবে কম গতিতে আসছে।" },
  { id: 10, bucket: "early", en: "🌧️ Rider noticed some clouds. Stopped to assess the weather situation. Thorough.", bn: "🌧️ রাইডার কিছু মেঘ দেখলেন। আবহাওয়া পরিস্থিতি মূল্যায়ন করতে থামলেন।" },
  { id: 11, bucket: "mid", en: "🐢 Fun fact: turtles have been around for 200 million years. Yours has been on this route for 14 minutes. Feels longer.", bn: "🐢 মজার তথ্য: কচ্ছপরা ২০ কোটি বছর ধরে আছে। আপনারটা এই রাস্তায় ১৪ মিনিট। মনে হচ্ছে বেশি।" },
  { id: 12, bucket: "mid", en: "💭 Rider is thinking about life choices. Not his. Yours. For ordering this late.", bn: "💭 রাইডার জীবনের সিদ্ধান্ত নিয়ে ভাবছেন। তাঁর না। আপনার। এত রাতে অর্ডার করার।" },
  { id: 13, bucket: "mid", en: "🏁 Rider is 'almost there'. This is the 4th time we've said this. We believe him less each time.", bn: "🏁 রাইডার 'প্রায় এসেই গেছেন'। এটা ৪র্থবার বলা হলো। বিশ্বাস কমছে।" },
  { id: 14, bucket: "mid", en: "🎵 Rider found a good song on the radio. He's not skipping it. The song is 7 minutes long.", bn: "🎵 রাইডার রেডিওতে ভালো গান পেলেন। স্কিপ করবেন না। গানটা ৭ মিনিটের।" },
  { id: 15, bucket: "mid", en: "🤝 Rider stopped to help an elderly person cross the road. Noble. Unfortunate timing.", bn: "🤝 রাইডার একজন বৃদ্ধকে রাস্তা পার করাচ্ছেন। মহৎ কাজ। সময়টা ঠিক হয়নি।" },
  { id: 16, bucket: "mid", en: "🔦 Rider is navigating by feel now. He says it's more authentic.", bn: "🔦 রাইডার এখন অনুভূতি দিয়ে পথ চলছেন। বলছেন এটা বেশি আসল।" },
  { id: 17, bucket: "mid", en: "🐢 Your food has now been on the road longer than some relationships.", bn: "🐢 আপনার খাবার এখন কিছু সম্পর্কের চেয়ে বেশি সময় রাস্তায় আছে।" },
  { id: 18, bucket: "mid", en: "😤 Rider took a wrong turn. Then another. He's calling it a 'scenic loop'.", bn: "😤 রাইডার ভুল মোড় নিলেন। তারপর আরেকটা। এটাকে 'দর্শনীয় চক্কর' বলছেন।" },
  { id: 19, bucket: "mid", en: "🐢 Speed update: rider is moving at the speed of a thoughtful decision.", bn: "🐢 গতি আপডেট: রাইডার একটি চিন্তাশীল সিদ্ধান্তের গতিতে যাচ্ছেন।" },
  { id: 20, bucket: "mid", en: "🌙 Rider looked at the moon for inspiration. The moon offered none. He's still looking.", bn: "🌙 রাইডার চাঁদের দিকে অনুপ্রেরণার জন্য তাকালেন। চাঁদ কিছু দিল না। এখনো তাকিয়ে।" },
  { id: 21, bucket: "late", en: "🐢 Live traffic update: one turtle. Moving slowly. No incidents. No progress.", bn: "🐢 লাইভ ট্র্যাফিক আপডেট: একটি কচ্ছপ। ধীরে চলছে। কোনো ঘটনা নেই। কোনো অগ্রগতি নেই।" },
  { id: 22, bucket: "late", en: "🏠 Rider can see your building. He has been able to see it for 6 minutes. He's processing.", bn: "🏠 রাইডার আপনার বিল্ডিং দেখতে পাচ্ছেন। ৬ মিনিট ধরে দেখছেন। প্রসেসিং চলছে।" },
  { id: 23, bucket: "late", en: "🐢 You're waiting. The rider is also waiting. For what? Nobody knows.", bn: "🐢 আপনি অপেক্ষা করছেন। রাইডারও করছেন। কীসের জন্য? কেউ জানে না।" },
  { id: 24, bucket: "late", en: "📍 Rider is between two roads and cannot choose. A metaphor, perhaps.", bn: "📍 রাইডার দুটো রাস্তার মাঝে আটকে আছেন। বেছে নিতে পারছেন না। একটা রূপক, সম্ভবত।" },
  { id: 25, bucket: "late", en: "🐢 The turtle is tired. We're not judging. We're just updating you.", bn: "🐢 কচ্ছপটা ক্লান্ত। আমরা বিচার করছি না। শুধু জানাচ্ছি।" },
  { id: 26, bucket: "late", en: "🌿 Rider stopped. Not for tea. Not for directions. Just... stopped.", bn: "🌿 রাইডার থামলেন। চায়ের জন্য না। রাস্তার জন্য না। শুধু... থামলেন।" },
  { id: 27, bucket: "late", en: "🐢 This is taking longer than expected. We expected a lot.", bn: "🐢 এটা প্রত্যাশার চেয়ে বেশি সময় নিচ্ছে। আমাদের প্রত্যাশা অনেক ছিল।" },
  { id: 28, bucket: "late", en: "📡 We lost contact with the rider. We had contact? Unclear.", bn: "📡 রাইডারের সাথে যোগাযোগ হারিয়ে গেছে। যোগাযোগ ছিল? অস্পষ্ট।" },
  { id: 29, bucket: "late", en: "🐢 Rider's last known location: 400 metres away. Last known time: 11 minutes ago.", bn: "🐢 রাইডারের শেষ পরিচিত অবস্থান: ৪০০ মিটার দূরে। শেষ পরিচিত সময়: ১১ মিনিট আগে।" },
  { id: 30, bucket: "late", en: "🐢 Something is coming. Slowly. From somewhere. We think it's your food.", bn: "🐢 কিছু একটা আসছে। ধীরে। কোথাও থেকে। মনে হচ্ছে আপনার খাবার।" },
];

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function buildJokeQueue(): StatusJoke[] {
  const early = STATUS_JOKES.filter((j) => j.bucket === "early");
  const mid = STATUS_JOKES.filter((j) => j.bucket === "mid");
  const late = STATUS_JOKES.filter((j) => j.bucket === "late");
  return [...shuffle(early).slice(0, 4), ...shuffle(mid).slice(0, 4), ...shuffle(late).slice(0, 4)];
}

export function pickRider(): Rider {
  return RIDERS[Math.floor(Math.random() * RIDERS.length)];
}
