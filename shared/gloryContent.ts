/** GLORY content contract shared by the public site and the protected control room. */
import { z } from "zod";

const shortText = z.string().trim().min(1).max(240);
const paragraph = z.string().trim().min(1).max(1_600);
const optionalUrl = z.union([z.literal(""), z.string().url().max(2_000)]);

const allocationSchema = z.object({
  label: shortText,
  percentage: z.number().min(0).max(100),
  amount: shortText,
  tone: z.string().regex(/^#[0-9a-fA-F]{6}$/),
});

const roadmapSchema = z.object({
  number: z.string().regex(/^\d{2}$/),
  title: shortText,
  status: z.enum(["COMPLETED", "IN PROGRESS", "PLANNED"]),
  entries: z.array(shortText).min(1).max(8),
});

const chapterSchema = z.object({
  number: z.string().regex(/^\d{2}$/),
  title: shortText,
  body: paragraph,
});

export const gloryContentSchema = z.object({
  brand: z.object({
    name: shortText,
    symbol: shortText,
    tagline: shortText,
  }),
  hero: z.object({
    eyebrow: shortText,
    lineOne: shortText,
    lineTwo: shortText,
    lineThree: shortText,
    body: paragraph,
  }),
  contract: z.object({
    address: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
    bscScanUrl: z.string().url(),
    network: shortText,
    standard: shortText,
    decimals: z.string().regex(/^\d+$/),
    totalSupply: shortText,
    verified: z.boolean(),
    mint: shortText,
    owner: shortText,
    tax: shortText,
    blacklist: shortText,
    pause: shortText,
  }),
  foundation: z.object({
    title: shortText,
    body: paragraph,
    pillars: z.array(z.object({ number: z.string().regex(/^\d{2}$/), title: shortText, body: paragraph })).length(3),
  }),
  ecosystem: z.object({ title: shortText, body: paragraph, productName: shortText }),
  token: z.object({ title: shortText, body: paragraph }),
  tokenomics: z.object({ title: shortText, body: paragraph, allocations: z.array(allocationSchema).min(1).max(12) }),
  transparency: z.object({ title: shortText, body: paragraph, items: z.array(z.object({ title: shortText, body: paragraph })).min(1).max(6) }),
  roadmap: z.object({ title: shortText, body: paragraph, phases: z.array(roadmapSchema).min(1).max(8) }),
  community: z.object({ title: shortText, body: paragraph, xUrl: optionalUrl, telegramUrl: optionalUrl, discordUrl: optionalUrl }),
  whitepaper: z.object({ version: shortText, title: shortText, lead: paragraph, pdfUrl: optionalUrl, chapters: z.array(chapterSchema).length(13) }),
});

export type GloryContent = z.infer<typeof gloryContentSchema>;

export const DEFAULT_GLORY_CONTENT: GloryContent = {
  brand: { name: "GLORY", symbol: "GLRY", tagline: "BUILD. EARN. BELONG." },
  hero: { eyebrow: "OFFICIAL GLORY PLATFORM", lineOne: "BUILD.", lineTwo: "EARN.", lineThree: "BELONG.", body: "A digital ecosystem built around utility, rewards and community." },
  contract: { address: "0xC7717427b4f2c4dC6C65999554CBF2F95F9A2d33", bscScanUrl: "https://bscscan.com/address/0xC7717427b4f2c4dC6C65999554CBF2F95F9A2d33", network: "BNB Chain Mainnet", standard: "ERC-20 compatible / BEP-20 compatible", decimals: "18", totalSupply: "1,000,000,000 GLRY", verified: true, mint: "None", owner: "None", tax: "None", blacklist: "None", pause: "None" },
  foundation: { title: "MORE THAN A TOKEN.", body: "GLORY is a digital ecosystem built around utility, rewards and community. GLRY is the native utility token designed to connect the products, users and experiences within the GLORY ecosystem.", pillars: [{ number: "01", title: "UTILITY", body: "GLRY is designed to provide utility across the GLORY ecosystem." }, { number: "02", title: "REWARDS", body: "Users can participate in ecosystem activities and future reward programs." }, { number: "03", title: "COMMUNITY", body: "GLORY is designed to grow through users, creators, partners and community participation." }] },
  ecosystem: { title: "THE GLORY ECOSYSTEM", body: "GLRY connects the products, users and experiences being built within GLORY. The first layer is 6lory, a task-based digital rewards platform.", productName: "6lory" },
  token: { title: "MEET GLRY", body: "GLRY is the native utility token of the GLORY ecosystem, deployed on BNB Chain with a fixed supply and verified contract." },
  tokenomics: { title: "BUILT FOR THE LONG TERM.", body: "The following is the planned ecosystem allocation. It is not a representation of completed on-chain distributions or wallet allocations.", allocations: [{ label: "Ecosystem & Rewards", percentage: 30, amount: "300,000,000 GLRY", tone: "#c6a66a" }, { label: "Liquidity", percentage: 20, amount: "200,000,000 GLRY", tone: "#a78b60" }, { label: "Treasury", percentage: 15, amount: "150,000,000 GLRY", tone: "#73604a" }, { label: "Community", percentage: 12, amount: "120,000,000 GLRY", tone: "#e1c78f" }, { label: "Partnerships", percentage: 8, amount: "80,000,000 GLRY", tone: "#8d785b" }, { label: "Marketing", percentage: 7, amount: "70,000,000 GLRY", tone: "#b49a6e" }, { label: "Team", percentage: 5, amount: "50,000,000 GLRY", tone: "#5e5141" }, { label: "Reserve", percentage: 3, amount: "30,000,000 GLRY", tone: "#dbc185" }] },
  transparency: { title: "BUILT IN PUBLIC.", body: "GLORY prioritizes verifiable, public information over unsubstantiated claims. Contract details can be independently reviewed on BscScan.", items: [{ title: "VERIFIED CONTRACT", body: "Source code is verified on BscScan." }, { title: "FIXED SUPPLY", body: "1,000,000,000 GLRY total supply." }, { title: "NO POST-DEPLOYMENT MINT", body: "The deployed token contract does not provide a post-deployment mint function." }, { title: "NO OWNER / ADMIN", body: "The deployed token contract does not use an owner/admin control mechanism." }, { title: "TRANSPARENT", body: "Official contract address is publicly available." }] },
  roadmap: { title: "THE ROAD AHEAD", body: "The roadmap describes intended development direction. Planned phases are not represented as existing features.", phases: [{ number: "01", title: "FOUNDATION", status: "COMPLETED", entries: ["GLRY deployment", "BNB Chain Mainnet", "Fixed supply", "Contract verification", "Token infrastructure"] }, { number: "02", title: "IDENTITY", status: "IN PROGRESS", entries: ["GLORY brand identity", "Official website", "Whitepaper", "Tokenomics publication", "Community infrastructure"] }, { number: "03", title: "ECOSYSTEM", status: "PLANNED", entries: ["6lory ecosystem integration", "Reward infrastructure", "Community programs"] }, { number: "04", title: "LIQUIDITY", status: "PLANNED", entries: ["DEX integration", "Initial liquidity", "Liquidity transparency"] }, { number: "05", title: "EXPANSION", status: "PLANNED", entries: ["Additional GLORY products", "Partner ecosystem", "New utility layers", "International expansion"] }] },
  community: { title: "JOIN GLORY.", body: "GLORY is designed to grow through community participation. Official channels are being prepared; no unofficial social links are published here.", xUrl: "", telegramUrl: "", discordUrl: "" },
  whitepaper: { version: "GLORY / WEB WHITEPAPER / V1.0", title: "The system behind GLORY.", lead: "This living, web-native paper documents the GLORY ecosystem, GLRY contract foundations, planned allocation and risk-aware approach to participation.", pdfUrl: "", chapters: [{ number: "01", title: "Executive Summary", body: "GLORY is a digital ecosystem built around utility, rewards and community. GLRY is the native utility token designed to connect the products, users and experiences within the ecosystem." }, { number: "02", title: "The GLORY Vision", body: "GLORY is being built as a long-term participation layer: a place where products, community programs and partners can share a common utility foundation." }, { number: "03", title: "Ecosystem", body: "The GLORY ecosystem is intended to bring together rewards, partner activity, community participation and product experiences through GLRY. 6lory is presented as one of the first product layers, a task-based digital rewards platform." }, { number: "04", title: "GLRY Token", body: "GLRY is deployed on BNB Chain as an ERC-20 compatible, BEP-20 compatible token with 18 decimals and a fixed total supply of 1,000,000,000 GLRY." }, { number: "05", title: "Tokenomics", body: "The published allocation is a planned ecosystem allocation. It is not presented as completed on-chain distribution, wallet allocation, or a commitment to a specific release date. Team allocation is subject to a planned vesting / release schedule." }, { number: "06", title: "6lory", body: "6lory is planned as a task-based digital rewards platform within the GLORY ecosystem. Product details, eligibility mechanics and live integrations will only be announced when available." }, { number: "07", title: "Reward Economy", body: "Future rewards are intended to relate to ecosystem activity and participation. GLORY does not represent participation as guaranteed income, guaranteed returns or a promise of token value." }, { number: "08", title: "Treasury & Transparency", body: "Transparency begins with independently reviewable data. The official GLRY contract is public on BscScan and the token contract source is verified." }, { number: "09", title: "Liquidity", body: "DEX integration, initial liquidity and liquidity transparency are planned roadmap items. No unannounced market data, liquidity figure, listing or price is represented on this website." }, { number: "10", title: "Security", body: "The deployed GLRY contract has a fixed supply and does not provide a post-deployment mint function, owner/admin control mechanism, tax, blacklist or pause mechanism. These are technical attributes, not a guarantee of safety." }, { number: "11", title: "Roadmap", body: "The roadmap distinguishes completed, in-progress and planned phases. A planned item is not presented as current functionality or a guaranteed delivery date." }, { number: "12", title: "Risk Disclosure", body: "Digital assets involve substantial uncertainty and risk. Information on this website is for ecosystem communication and should not be understood as financial, legal or tax advice, nor as a solicitation or assurance of performance." }, { number: "13", title: "Contract Information", body: "Official GLRY contract information is presented as public, independently verifiable technical data." }] },
};

export function cloneDefaultGloryContent(): GloryContent {
  return structuredClone(DEFAULT_GLORY_CONTENT);
}
