/** Past this score he/she gets angry: red lights, shaking, the angry model, spilled matcha. */
export const ANGRY_AT = 40;

export type Option = { label: string; weight: number };
export type Question = { prompt: string; options: Option[] };
/** Answer value for a skipped question: it is left out of the score entirely. */
export const SKIP = -1;
export type Answer = number | null;

// Fixed order. Every question's heaviest option is the last one and weighs 20,
// so picking the last option on every question scores exactly 100%.
export const QUESTIONS: Question[] = [
  {
    prompt: "Do you ride without a helmet?",
    options: [
      { label: "Never. Safety first.", weight: 0 },
      { label: "Only for a quick trip to the warung.", weight: 6 },
      { label: "Only when there's no roadblock ahead.", weight: 13 },
      { label: "Helmet is for storing snacks, not my head.", weight: 20 },
    ],
  },
  {
    prompt: "How do you feel about popping a wheelie (lajak) in traffic?",
    options: [
      { label: "Terrifying. No thanks.", weight: 0 },
      { label: "Tried it once, in an empty carpark.", weight: 6 },
      { label: "Front wheel up for a few seconds at the lights.", weight: 13 },
      { label: "Full lajak down the highway, one hand filming for TikTok.", weight: 20 },
    ],
  },
  {
    prompt: "Your exhaust pipe situation?",
    options: [
      { label: "Stock, straight from the showroom.", weight: 0 },
      { label: "A bit louder than stock. Nothing crazy.", weight: 6 },
      { label: "Bakar knalpot lipas. Wakes up the whole taman.", weight: 13 },
      { label: "Cover pipe for inspection day, real pipe back on by night.", weight: 20 },
    ],
  },
  {
    prompt: "It's 2am and the road is completely empty. You…",
    options: [
      { label: "Ride normally, follow the speed limit.", weight: 0 },
      { label: "Speed up a little. Nobody's watching.", weight: 6 },
      { label: "Full throttle. This is MY highway now.", weight: 13 },
      { label: "Organise a convoy race in the group chat.", weight: 20 },
    ],
  },
  {
    prompt: "Weaving through traffic (selit-selit)?",
    options: [
      { label: "I stay in my lane like a good citizen.", weight: 0 },
      { label: "Sometimes, if I'm running late.", weight: 6 },
      { label: "Every single jam, mirrors folded in.", weight: 13 },
      { label: "I selit between the bus and the divider. Zero gap needed.", weight: 20 },
    ],
  },
  {
    prompt: "A red light with no cars around. You…",
    options: [
      { label: "Stop and wait. Rules are rules.", weight: 0 },
      { label: "Wait, but inch forward impatiently.", weight: 6 },
      { label: "Slow-roll through if it's clearly empty.", weight: 13 },
      { label: "Potong lampu merah. Lampu tu cuma hiasan.", weight: 20 },
    ],
  },
  {
    prompt: "You spot a police roadblock ahead. You…",
    options: [
      { label: "Slow down, prepare your license.", weight: 0 },
      { label: "Take a small detour, just in case.", weight: 6 },
      { label: "U-turn immediately, no questions asked.", weight: 13 },
      { label: "Gas it and lari. Adrenaline of a lifetime.", weight: 20 },
    ],
  },
  {
    prompt: "Riding two-up (bonceng), how many is normal for you?",
    options: [
      { label: "Just me, or one passenger max.", weight: 0 },
      { label: "Two. Snug but safe-ish.", weight: 6 },
      { label: "Three. Adik duduk depan tangki.", weight: 13 },
      { label: "Four. Somehow. Nobody remembers how.", weight: 20 },
    ],
  },
  {
    prompt: "Your bike's underglow / LED lights situation?",
    options: [
      { label: "None. Stock headlight only.", weight: 0 },
      { label: "A small sticker or two.", weight: 6 },
      { label: "Underglow lights that change colour with the music.", weight: 13 },
      { label: "Full LED strip disco bike, visible from space.", weight: 20 },
    ],
  },
  {
    prompt: "At the mamak, engines start revving (sound war). You…",
    options: [
      { label: "Just eat your maggi goreng in peace.", weight: 0 },
      { label: "Watch from a distance, mildly entertained.", weight: 6 },
      { label: "Join in with a rev or two.", weight: 13 },
      { label: "Full throttle. Sound perang. Mamak uncle is not happy.", weight: 20 },
    ],
  },
  {
    prompt: "Filming content on the bike for social media?",
    options: [
      { label: "Never. Both hands on the handlebar, always.", weight: 0 },
      { label: "Maybe a quick clip while parked at the lights.", weight: 6 },
      { label: "Phone mounted, filming stunts regularly.", weight: 13 },
      { label: "Riding one-handed, filming a wheelie, captioned “bahaya jgn ikut.”", weight: 20 },
    ],
  },
  {
    prompt: "A friend does something reckless on the road. You…",
    options: [
      { label: "Tell them to slow down. That's dangerous.", weight: 0 },
      { label: "Laugh nervously and change the subject.", weight: 6 },
      { label: "Hype them up in the comments.", weight: 13 },
      { label: "Challenge them to do it again, but harder.", weight: 20 },
    ],
  },
  {
    prompt: "Basikal lajak nostalgia — did you ever mod a bicycle as a kid?",
    options: [
      { label: "No, I rode normally to school.", weight: 0 },
      { label: "Added a horn and some stickers.", weight: 6 },
      { label: "No brakes, no lights, maximum vibes.", weight: 13 },
      { label: "Sound system on the bicycle, louder than most motorcycles.", weight: 20 },
    ],
  },
  {
    prompt: "You get a saman (traffic summons). Your reaction?",
    options: [
      { label: "Pay it immediately. Lesson learned.", weight: 0 },
      { label: "Sigh, and pay it eventually.", weight: 6 },
      { label: "Ignore it and hope it disappears.", weight: 13 },
      { label: "Collect samans like trophies.", weight: 20 },
    ],
  },
  {
    prompt: "Racing a car at the traffic light (grand prix)?",
    options: [
      { label: "I don't race. I'm just going home.", weight: 0 },
      { label: "Maybe a little rev to test the engine.", weight: 6 },
      { label: "Absolutely. First one to the next light wins.", weight: 13 },
      { label: "I plan my route around traffic lights specifically for this.", weight: 20 },
    ],
  },
  {
    prompt: "How would your parents describe your riding style?",
    options: [
      { label: "“Very safe, we don't worry.”", weight: 0 },
      { label: "“A bit fast sometimes.”", weight: 6 },
      { label: "“We've stopped asking where he/she is at night.”", weight: 13 },
      { label: "“The neighbours know our address from the sound of his exhaust.”", weight: 20 },
    ],
  },
];

/** answers[i] is the chosen option index for QUESTIONS[i], null if unanswered, SKIP if skipped. */
export function scoreFor(answers: Answer[]): number {
  let total = 0;
  let max = 0;
  QUESTIONS.forEach((q, i) => {
    const a = answers[i];
    if (a === SKIP) return;
    max += Math.max(...q.options.map((o) => o.weight));
    if (a !== null && a !== undefined) total += q.options[a].weight;
  });
  return max ? Math.round((total / max) * 100) : 0;
}

export type Diagnosis = { title: string; emoji: string; blurb: string };

export function diagnose(score: number): Diagnosis {
  if (score <= 30)
    return {
      title: "Innocent Rider",
      emoji: "😇",
      blurb:
        "Helmet on, indicator on, full stop at every red light. The road is measurably safer because you exist. Respect.",
    };
  if (score <= 70)
    return {
      title: "Weekend Warrior",
      emoji: "😎",
      blurb:
        "You know the thrill, you've felt the wind, but you still wear a helmet and pay your saman on time. Balanced. Boring, but balanced.",
    };
  return {
    title: "Certified Mat Rempit",
    emoji: "🏍️",
    blurb:
      "Terpaling rempit. The mechanic knows you by name, the traffic police know your plate number, and your exhaust wakes up three housing areas. Slow down before mak marah.",
  };
}
