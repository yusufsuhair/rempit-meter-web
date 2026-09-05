/** Past this score dia jadi marah: lampu merah, gegar, model marah, matcha tumpah. */
export const ANGRY_AT = 40;

export type Option = { label: string; weight: number };
export type Question = { prompt: string; options: Option[] };
/** Answer value for a skipped question: it is left out of the score entirely. */
export const SKIP = -1;
export type Answer = number | null;

// Turutan tetap. Pilihan paling berat untuk setiap soalan ialah yang terakhir, beratnya 20,
// jadi pilih pilihan terakhir untuk semua soalan akan bagi skor tepat 100%.
export const QUESTIONS: Question[] = [
  {
    prompt: "Awak tunggang tanpa helmet ke?",
    options: [
      { label: "Tak pernah. Safety first.", weight: 0 },
      { label: "Untuk pergi warung sekejap je.", weight: 6 },
      { label: "Bila takde roadblock depan je.", weight: 13 },
      { label: "Helmet tu tempat simpan snek, bukan kepala.", weight: 20 },
    ],
  },
  {
    prompt: "Macam mana perasaan awak buat lajak dalam trafik?",
    options: [
      { label: "Takut gila. Tak nak.", weight: 0 },
      { label: "Pernah cuba sekali, kat parking kosong.", weight: 6 },
      { label: "Angkat depan sekejap kat lampu isyarat.", weight: 13 },
      { label: "Lajak penuh sepanjang lebuh raya, sebelah tangan rakam untuk TikTok.", weight: 20 },
    ],
  },
  {
    prompt: "Situasi ekzos motor awak macam mana?",
    options: [
      { label: "Stok, terus dari showroom.", weight: 0 },
      { label: "Lagi bising sikit dari stok. Tak la teruk sangat.", weight: 6 },
      { label: "Bakar knalpot lipas. Kejutkan seluruh taman.", weight: 13 },
      { label: "Cover pipe masa nak inspection, pasang balik pipe betul time malam.", weight: 20 },
    ],
  },
  {
    prompt: "Pukul 2 pagi dan jalan kosong sepenuhnya. Awak…",
    options: [
      { label: "Tunggang biasa, ikut had laju.", weight: 0 },
      { label: "Laju sikit. Takde orang tengok pun.", weight: 6 },
      { label: "Full throttle. Ni lebuh raya AKU sekarang.", weight: 13 },
      { label: "Anjur konvoi lumba dalam group chat.", weight: 20 },
    ],
  },
  {
    prompt: "Selit-selit dalam jem?",
    options: [
      { label: "Saya duduk dalam lane macam rakyat baik.", weight: 0 },
      { label: "Kadang-kadang, kalau dah lambat.", weight: 6 },
      { label: "Setiap kali jem, lipat cermin dua-dua.", weight: 13 },
      { label: "Saya selit antara bas dengan pembahagi jalan. Tak payah gap pun boleh.", weight: 20 },
    ],
  },
  {
    prompt: "Lampu merah, takde kereta langsung. Awak…",
    options: [
      { label: "Berhenti dan tunggu. Peraturan tetap peraturan.", weight: 0 },
      { label: "Tunggu, tapi maju sikit-sikit sebab tak sabar.", weight: 6 },
      { label: "Slow-roll je kalau memang kosong.", weight: 13 },
      { label: "Potong lampu merah. Lampu tu cuma hiasan.", weight: 20 },
    ],
  },
  {
    prompt: "Awak nampak roadblock polis depan. Awak…",
    options: [
      { label: "Slow down, sediakan lesen.", weight: 0 },
      { label: "Ambil jalan lain sikit, just in case.", weight: 6 },
      { label: "U-turn terus, tak tanya soalan.", weight: 13 },
      { label: "Gas dan lari. Adrenaline sekali seumur hidup.", weight: 20 },
    ],
  },
  {
    prompt: "Bonceng, berapa orang biasa untuk awak?",
    options: [
      { label: "Saya sorang je, atau satu penumpang maksimum.", weight: 0 },
      { label: "Dua orang. Padat tapi selamat-ish.", weight: 6 },
      { label: "Tiga orang. Adik duduk depan tangki.", weight: 13 },
      { label: "Empat orang. Entah macam mana. Tiada siapa ingat macam mana.", weight: 20 },
    ],
  },
  {
    prompt: "Situasi lampu underglow / LED motor awak?",
    options: [
      { label: "Takde. Lampu depan stok je.", weight: 0 },
      { label: "Ada sticker satu dua.", weight: 6 },
      { label: "Lampu underglow yang tukar warna ikut lagu.", weight: 13 },
      { label: "Motor disco LED penuh, nampak dari angkasa.", weight: 20 },
    ],
  },
  {
    prompt: "Kat mamak, enjin start rev (sound war). Awak…",
    options: [
      { label: "Makan maggi goreng dengan aman je.", weight: 0 },
      { label: "Tengok dari jauh, agak terhibur.", weight: 6 },
      { label: "Join sekali, rev satu dua kali.", weight: 13 },
      { label: "Full throttle. Sound perang. Pakcik mamak dah naik angin.", weight: 20 },
    ],
  },
  {
    prompt: "Rakam content atas motor untuk media sosial?",
    options: [
      { label: "Tak pernah. Dua-dua tangan atas handlebar, sentiasa.", weight: 0 },
      { label: "Rakam sekejap masa berhenti kat lampu isyarat.", weight: 6 },
      { label: "Phone pasang, rakam stunt selalu.", weight: 13 },
      { label: "Tunggang sebelah tangan, rakam lajak, caption “bahaya jgn ikut.”", weight: 20 },
    ],
  },
  {
    prompt: "Member buat something reckless atas jalan. Awak…",
    options: [
      { label: "Suruh dia slow down. Tu bahaya.", weight: 0 },
      { label: "Gelak gemuruh dan tukar topik.", weight: 6 },
      { label: "Hype dia dalam komen.", weight: 13 },
      { label: "Cabar dia buat lagi, lagi ganas.", weight: 20 },
    ],
  },
  {
    prompt: "Nostalgia basikal lajak — pernah tak modify basikal masa kecik-kecik?",
    options: [
      { label: "Tak, saya kayuh biasa je pergi sekolah.", weight: 0 },
      { label: "Tambah hon dan beberapa sticker.", weight: 6 },
      { label: "Takde brek, takde lampu, maximum vibes.", weight: 13 },
      { label: "Pasang sound system atas basikal, lagi kuat dari kebanyakan motor.", weight: 20 },
    ],
  },
  {
    prompt: "Awak kena saman. Reaksi awak?",
    options: [
      { label: "Bayar terus. Dah dapat pengajaran.", weight: 0 },
      { label: "Hela nafas, bayar jugak akhirnya.", weight: 6 },
      { label: "Ignore je, harap hilang sendiri.", weight: 13 },
      { label: "Kumpul saman macam trofi.", weight: 20 },
    ],
  },
  {
    prompt: "Lumba dengan kereta kat lampu isyarat (grand prix)?",
    options: [
      { label: "Saya tak lumba. Saya nak balik rumah je.", weight: 0 },
      { label: "Rev sikit test enjin je.", weight: 6 },
      { label: "Mestilah. Siapa sampai dulu kat lampu depan menang.", weight: 13 },
      { label: "Saya plan route ikut lampu isyarat khas untuk ni.", weight: 20 },
    ],
  },
  {
    prompt: "Macam mana mak ayah awak describe cara awak tunggang?",
    options: [
      { label: "“Selamat je, kami tak risau.”", weight: 0 },
      { label: "“Laju sikit kadang-kadang.”", weight: 6 },
      { label: "“Kami dah stop tanya dia kat mana time malam.”", weight: 13 },
      { label: "“Jiran-jiran tahu alamat kami dari bunyi ekzos dia.”", weight: 20 },
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
      title: "Penunggang Baik",
      emoji: "😇",
      blurb:
        "Helmet pakai, signal on, berhenti penuh kat setiap lampu merah. Jalan raya provenly lagi selamat sebab awak wujud. Respect.",
    };
  if (score <= 70)
    return {
      title: "Rempit Hujung Minggu",
      emoji: "😎",
      blurb:
        "Awak tahu thrill dia, dah rasa angin tu, tapi still pakai helmet dan bayar saman on time. Balanced. Boring, tapi balanced.",
    };
  return {
    title: "Mat Rempit Bertauliah",
    emoji: "🏍️",
    blurb:
      "Terpaling rempit. Mekanik kenal awak dengan nama, polis trafik hafal plat motor awak, dan ekzos awak kejutkan tiga kawasan taman. Slow down sebelum mak marah.",
  };
}
