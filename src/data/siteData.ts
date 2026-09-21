// Site Data generated from original portfolio
export interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  content: string;
  readingTime: number;
}

export interface ProjectDetail {
  slug: string;
  name: string;
  year: string;
  type: string;
  description: string;
  colors: [string, string];
  role: string;
  challenge: string;
  outcome: string;
  decisions: [string, string][];
  detail?: {
    timeline?: [string, string][];
    artifacts?: string[];
    reflection?: string;
  };
}

export interface PhotoItem {
  image: string;
  position?: string;
  title: string;
  description?: string;
  location?: string;
  time?: string;
  [key: string]: any;
}

export interface PhotoSheet {
  slug: string;
  title: string;
  description: string;
  date: string;
  kind: string;
  number: number;
  image: string;
  images: PhotoItem[];
  [key: string]: any;
}

export interface PartnerItem {
  slug: string;
  name: string;
  title?: string;
  detail?: string;
  [key: string]: any;
  href: string;
  type: string;
  mark: string;
  image: string;
  headline: string;
  summary: string;
  note: string;
  focus?: string[];
  year?: string;
}

export interface ContactItem {
  slug: string;
  title: string;
  detail: string;
  href: string;
  group: string;
  order: number;
}

export const POSTS: Post[] = [
  {
    "slug": "ai-taste-and-the-human-hand",
    "title": "AI, taste and the human hand",
    "date": "2026-08-01T00:00:00.000Z",
    "summary": "AI can make more options, but it cannot decide which detail deserves to stay. That is still a question of taste.",
    "tags": [
      "ai",
      "art",
      "blog",
      "creative coding"
    ],
    "content": "\nAI has made the first draft cheaper. Images, prompts, code fragments and variations can arrive before the coffee has cooled. That speed is useful, but it changes where the real work begins.\n\n## More options are not more direction\n\nWhen almost anything can be generated, selection becomes part of the craft. A useful creative process needs constraints: a feeling to protect, an audience to respect and a reason for every element that remains. Without those things, a hundred options simply become a more polished form of indecision.\n\nI start with a small brief before opening any tool. It can be as simple as three words, a reference image and one sentence about the response I want from a person. The brief is not there to limit surprise. It is there to give surprise somewhere useful to land.\n\n## Use the machine as a sketchbook\n\nAI is most helpful when it sits early in the process. I use it to test a composition, question an assumption or make a strange connection quickly. It can produce a rough visual direction, a first code experiment or a list of names that I would not have reached alone.\n\nThe final decision still happens slowly. I compare an output against the surrounding page, the tone of the writing and the expectations of the person reading it. A good result is not the most detailed or the most technically impressive one. It is the one that makes the larger piece more coherent.\n\n## Taste is a practice\n\nTaste is not simply preference. It is the ability to notice when something is almost right, then keep working until it becomes clear. It is shaped by references, repetition, conversations and time away from the screen.\n\nThat is why the human hand still matters. It decides when to stop, what to remove and which imperfect detail makes the work feel alive. The goal is not to make work that looks generated. The goal is to make work that feels considered.\n\n## Leave room for responsibility\n\nSpeed does not remove responsibility. Before publishing, I check where an idea came from, whether a reference is being treated fairly and whether the output is useful for the people it reaches. Tools can increase capacity, but they do not replace judgement.\n\nThe most exciting future is not one where people disappear from creative work. It is one where more people can spend their attention on the decisions that matter.\n\n<PostCallout title=\"A practical test\">\nIf a generated idea cannot explain what it is helping a reader notice, it is probably decoration rather than direction.\n</PostCallout>\n\n<PostColumns>\n  <PostColumn title=\"Let AI accelerate\">\nUse it for rough options, early language, alternate compositions and questions that widen a first draft.\n  </PostColumn>\n  <PostColumn title=\"Keep judgement human\">\nUse your own context to decide what belongs, what needs care and what should be removed entirely.\n  </PostColumn>\n</PostColumns>\n",
    "readingTime": 3
  },
  {
    "slug": "notes-from-a-midnight-barista",
    "title": "Notes from a midnight barista",
    "date": "2026-07-25T00:00:00.000Z",
    "summary": "A small ritual for returning to unfinished ideas without turning them into pressure.",
    "tags": [
      "barista",
      "blog",
      "art",
      "process"
    ],
    "content": "\nThe best ideas rarely arrive as complete plans. More often they appear as a color, a line in a notebook or a feeling that stays after everyone has gone home. The job is not to force them into a project immediately. The job is to leave the door open long enough for them to return.\n\n## Keep the counter clear\n\nBefore starting something new, I leave a little room for old thoughts. A clean page, a warm drink and one question are usually enough: what is this idea trying to become?\n\nThis practice is deliberately small. I do not need a perfect workspace or an entire free day. I need a surface where a thought can be placed down without being judged. When the pressure to finish disappears, the useful parts of an idea become easier to see.\n\n## Make space for the unfinished\n\nSome notes turn into projects. Others remain a photograph, a small interaction or a sentence that helps a later decision make sense. None of that is wasted. An archive is not only a shelf for polished outcomes; it is a record of attention.\n\nI keep fragments close: a type treatment, a sound, a screenshot, an unfinished paragraph. They are reminders that creative work has a longer rhythm than a launch calendar. A fragment may need weeks or years before it finds the context that makes it useful.\n\n## A quieter definition of progress\n\nThe midnight barista is a reminder to work with patience. Not everything needs an audience immediately. Not every productive hour produces something shareable. Sometimes progress is returning to an old file and understanding why it did not work the first time.\n\nThat is the kind of archive I want this blog to be: useful, imperfect and still in motion. A place where a finished piece can sit next to the note that started it.\n\n<PostImage src=\"/images/studio-cafe.jpg\" alt=\"Quiet café counter in stained-glass light\" caption=\"A familiar counter is a useful place to return to when an idea needs more time.\" />\n\n<PostCallout title=\"Tonight's reminder\">\nThe useful thing is not always the finished thing. Sometimes it is simply noticing what deserves another visit tomorrow.\n</PostCallout>\n",
    "readingTime": 2
  },
  {
    "slug": "designing-interfaces-that-feel-alive",
    "title": "Designing interfaces that feel alive",
    "date": "2026-02-18T00:00:00.000Z",
    "summary": "Motion is most useful when it explains change, reinforces hierarchy and gives a product a sense of response.",
    "tags": [
      "motion",
      "interface",
      "design"
    ],
    "content": "\nAn interface does not need to move constantly to feel alive. It only needs to acknowledge actions in a way that helps people understand what just happened. Response is more important than spectacle.\n\n## Motion is feedback\n\nThe best transitions make state changes legible. A panel expands from the place it was requested, a selected item carries its position, and a notification appears without stealing focus. These small acknowledgements tell a person that the system understood them.\n\nWhen movement is decorative rather than communicative, it quickly becomes visual noise. I start every animation by asking which relationship it should make easier to understand. If there is no answer, the animation probably does not need to exist.\n\n## Give hierarchy a sense of time\n\nHierarchy is not only about size and color. It can also be about when something arrives. A primary action can appear first, while supporting details wait a fraction of a second. A page can introduce the important idea before revealing the texture around it.\n\nThe timing should remain subtle. The goal is not to make people watch an animation; it is to make the page feel like it has a natural order.\n\n## Design for interruption\n\nPeople scroll, tap, leave and return at unpredictable times. Motion should be interruptible and should preserve the current state. This makes a product feel more solid than any long, cinematic transition.\n\nWhen I test a motion system, I deliberately interrupt it. I resize the window, repeat a click, switch tabs and navigate away. A resilient interaction feels calm because it does not punish normal behaviour.\n\n## Let stillness do some work\n\nStillness creates contrast. A quiet interface gives a meaningful transition somewhere to land. When movement is used with restraint, it can make a digital product feel more attentive, more understandable and more human.\n\n<PostImage src=\"/images/design-desk.png\" alt=\"Design desk and work in progress\" caption=\"A system feels alive when each response has a reason, not because every surface is moving.\" />\n\n<PostTable headers={[\"Moment\", \"Useful response\"]} rows={[[\"A saved action\", \"A clear confirmation close to the action.\"], [\"A new section\", \"A subtle transition that preserves orientation.\"], [\"An error\", \"A specific recovery path instead of a generic warning.\"]]} />\n",
    "readingTime": 2
  },
  {
    "slug": "creative-motion-guide",
    "title": "A practical guide to creative motion",
    "date": "2026-01-09T00:00:00.000Z",
    "summary": "A small set of motion principles can make experimental interfaces feel intentional rather than busy.",
    "tags": [
      "motion",
      "creative coding"
    ],
    "content": "\nCreative motion is not a layer of decoration added at the end of a project. At its best, it gives a person a clearer sense of cause, effect and rhythm. It makes an interface feel responsive without demanding constant attention.\n\n## Start with the relationship\n\nBefore choosing an easing curve or a duration, identify the relationship that is changing. Is an item moving because it belongs somewhere new? Is a panel appearing because more information is now relevant? Is a transition protecting the feeling of continuity between two states?\n\nWhen the relationship is clear, the motion often becomes simple. A small shift in position, opacity or scale can do more than a dramatic animation with no explanation behind it.\n\n## Use rhythm, not spectacle\n\nAn interface needs contrast between quiet and active moments. If every card drifts, every icon pulses and every button reacts with the same intensity, the page becomes tiring. Save movement for moments where a person needs feedback or orientation.\n\nI prefer a short shared rhythm: one or two durations, a small family of easing curves and a consistent way for elements to enter or leave. The system feels more alive because it feels like one environment rather than a collection of separate tricks.\n\n## Design for interruption\n\nPeople scroll, tap, leave and return at unpredictable times. Motion should be interruptible and should preserve the current state. This makes a product feel more solid than any long, cinematic transition.\n\nTest what happens when a person clicks twice, changes direction or navigates away halfway through an animation. If the interface can recover gracefully, the motion is doing its real job.\n\n<PostColumns>\n  <PostColumn title=\"Motion as feedback\">\nUse a short shift to show that an action landed, a state changed or a new layer appeared.\n  </PostColumn>\n  <PostColumn title=\"Motion as character\">\nReserve expressive movement for moments where a product needs warmth, surprise or a distinct voice.\n  </PostColumn>\n</PostColumns>\n\n<PostCallout title=\"One rule for timing\">\nIf an animation makes the next action feel delayed, shorten it or remove it. The person should always remain in control.\n</PostCallout>\n\n## Respect the quiet option\n\nAlways support reduced motion preferences. This is not only an accessibility requirement; it is a design discipline. If the interface still communicates clearly without animation, the motion you add later has a stronger purpose.\n",
    "readingTime": 2
  },
  {
    "slug": "personal-design-system",
    "title": "Building a personal design system",
    "date": "2025-11-26T00:00:00.000Z",
    "summary": "A personal system is not a giant component library; it is a durable set of decisions that makes the next page easier.",
    "tags": [
      "design system",
      "frontend"
    ],
    "content": "\nA personal design system is not a giant component library. It is a durable set of decisions that makes the next page easier. The important part is not how many tokens or components it contains, but whether it helps you work with more consistency and less friction.\n\n## Begin with repeated choices\n\nLook for the decisions you make again and again: spacing, reading width, heading scale, border treatment, button language and the way a page responds to small screens. These repetitions are the beginning of a system.\n\nDocument the choice once, then use it long enough to learn where it works and where it breaks. A system becomes useful through use, not through a perfect first draft.\n\n## Keep tokens close to meaning\n\nNames should describe a role instead of a value. A token called `surface-muted` tells you more than one called `brown-300`. The first can survive a palette change; the second carries an old visual decision into every future screen.\n\nThe same principle applies to components. Build a card when you understand the job several cards share, not because two boxes happen to look similar on one page.\n\n## Allow exceptions on purpose\n\nConsistency does not mean sameness. Editorial work, photography and experimental pages often need a different pace. A personal system should make these exceptions intentional, not impossible.\n\nI keep a small core and a generous edge: stable typography, spacing and interaction patterns in the core; room for a new texture, illustration or motion treatment at the edge. This makes a site feel coherent without making it feel uniform.\n\n## Review after shipping\n\nThe best time to improve a system is after a page is real. Notice which rules were ignored, which components became complicated and which decisions made the next task easier. Then update the system around that evidence.\n\n<PostColumns>\n  <PostColumn title=\"The stable core\">\nTypography, spacing, color tokens and interaction rules that make each new page easier to recognise.\n  </PostColumn>\n  <PostColumn title=\"The flexible edge\">\nRoom for a special image, unusual composition or one-off piece of motion when the story needs it.\n  </PostColumn>\n</PostColumns>\n",
    "readingTime": 2
  },
  {
    "slug": "better-questions",
    "title": "Good interfaces start with better questions",
    "date": "2025-08-02T00:00:00.000Z",
    "summary": "Before arranging controls, understand what a person is trying to decide and what would make that decision easier.",
    "tags": [
      "product design",
      "ux"
    ],
    "content": "\nInterface work often begins too late, at the moment screens are already being drawn. The more valuable work happens earlier: naming the user’s decision and the information it requires.\n\n## Make intent visible\n\nEvery screen should make it obvious what someone can do, why it matters and what will happen next. Clarity is a visual and content problem at once. A button cannot be useful if the surrounding page has not explained the decision it represents.\n\nWhen reviewing an interface, I ask what a person is trying to accomplish in this exact moment. Are they comparing options, recovering from a mistake, looking for reassurance or simply moving forward? The answer changes the hierarchy more than any visual trend does.\n\n## Replace feature lists with decisions\n\nTeams often describe products through features: filters, dashboards, sharing, automation. People experience those features as decisions. Should I trust this result? Which option fits my situation? What happens if I continue?\n\nTurning a feature into a decision makes the next design step clearer. It suggests what needs emphasis, what can stay secondary and what information must be available before someone acts. It also reveals when a feature is solving a problem that does not actually exist.\n\n## Ask what would make this easier\n\nThe best research questions are generous. Instead of asking whether someone likes a layout, ask what made a task feel difficult. Instead of asking whether a label is clear, ask what they expected to happen next.\n\nGood questions create room for answers that the team did not predict. They keep a project close to real behaviour instead of forcing people to react to a finished solution.\n\n## Let the interface answer back\n\nOnce intent is clear, the interface can become quieter. Labels become more direct, motion can explain change and empty states can offer a useful next step. The result may look simpler, but it is carrying more understanding underneath.\n\nGood interfaces do not begin with a component library. They begin with attention to the decision in front of a person.\n\n<PostTable headers={[\"Question\", \"What it reveals\"]} rows={[[\"What is the person trying to finish?\", \"The true job behind a screen or flow.\"], [\"What could make this feel risky?\", \"Where reassurance, clarity or recovery is needed.\"], [\"What changes after this action?\", \"The feedback an interface must make visible.\"]]} />\n",
    "readingTime": 2
  },
  {
    "slug": "tiny-web-experiments",
    "title": "Tiny web experiments, big learning",
    "date": "2025-04-14T00:00:00.000Z",
    "summary": "Small prototypes are a low-risk way to learn rendering, interaction and the limits of a visual idea.",
    "tags": [
      "experiments",
      "webgl",
      "art"
    ],
    "content": "\nSmall prototypes are a low-risk way to learn rendering, interaction and the limits of a visual idea. They are not miniature products. They are questions with a visible answer.\n\n## Make the question small\n\nAn experiment works best when it asks one thing clearly. What happens when a cursor bends a field of particles? Can a page transition feel like paper moving through light? Does a particular shader still read well on a small screen?\n\nThe smaller the question, the easier it is to see what you learned. A prototype does not need an account system, a complete navigation model or a launch plan. It needs one behaviour that can be observed.\n\n## Keep the materials lightweight\n\nUse the simplest tools that let you test the idea. A CSS gradient may be enough before a WebGL scene. A short loop can prove an interaction before you build a reusable component. Lightweight materials make it easier to abandon an approach without feeling like you wasted a week.\n\n## Record the result\n\nEvery experiment deserves a short note: what was attempted, what surprised you and what should be tried next. A screenshot and three sentences can become a useful reference later, especially when a larger project reaches the same problem.\n\n## Let experiments inform real work\n\nThe point is not to turn every sketch into a feature. The point is to build instincts. After enough small experiments, you begin to recognise which visual ideas are worth protecting, which interactions are too expensive and which limitations can become part of the style.\n\nBig learning often arrives through a deliberately tiny window.\n\n<PostImage src=\"/images/studio-cafe.jpg\" alt=\"Sunlight across a quiet café\" caption=\"A small visual experiment can begin with something observed closely.\" />\n\n<PostColumns>\n  <PostColumn title=\"Keep it small\">\nGive an experiment one question, one interaction or one visual constraint. A tight frame makes it easier to learn.\n  </PostColumn>\n  <PostColumn title=\"Keep the trace\">\n\nSave a screenshot and a few words about the result. The archive is often more useful than the experiment itself.\n  </PostColumn>\n</PostColumns>\n",
    "readingTime": 2
  },
  {
    "slug": "shipping-imperfect-work",
    "title": "What I learned from shipping imperfect work",
    "date": "2024-12-05T00:00:00.000Z",
    "summary": "Shipping is not the end of design. It is the start of a feedback loop that turns assumptions into useful information.",
    "tags": [
      "process",
      "product",
      "blog"
    ],
    "content": "\nShipping is not the end of design. It is the start of a feedback loop that turns assumptions into useful information. A project can feel complete in a private file and still reveal entirely new questions when real people meet it.\n\n## Define what needs to be true\n\nBefore shipping, separate essential quality from imagined perfection. Does the page explain itself? Can someone complete the main task? Is the content accurate? Are obvious edge cases handled? These are the questions that protect a release.\n\nEverything else can be observed after it is real. The exact shadow, the final wording of a secondary label or a more elaborate animation may matter later, but they should not prevent learning from the first useful version.\n\n## Make feedback easy to notice\n\nFeedback is not always a survey response. It can be a support question, a repeated hesitation, an unexpected path through an interface or a sentence someone uses to describe the work. Decide in advance what signals will tell you whether the release is helping.\n\nSmall notes are often enough. I keep a short release log with what changed, what I expect to learn and what I noticed in the first few days. It turns vague reactions into a record that can guide the next iteration.\n\n## Treat imperfections as directions\n\nAn imperfect release is not permission to be careless. It is an agreement that some answers are better discovered in context. The important thing is to keep listening and to return with a clearer version.\n\nThe most durable products are not the ones that looked finished on day one. They are the ones whose teams kept paying attention after the launch.\n\n<PostCallout title=\"A small release ritual\">\nWrite down what changed, the question the release is meant to answer, and one signal you will revisit next week. It keeps improvement concrete.\n</PostCallout>\n\n<PostTable headers={[\"Before release\", \"After release\"]} rows={[[\"Name the smallest useful scope\", \"Listen for friction and unexpected use.\"], [\"Check the recovery paths\", \"Record what deserves another pass.\"], [\"Share the intent\", \"Turn feedback into the next decision.\"]]} />\n",
    "readingTime": 2
  }
];

export const PROJECTS: ProjectDetail[] = [
  {
    slug: 'orbit-finance',
    name: 'Orbit Finance',
    year: '2026',
    type: 'Product design · AI Engine',
    description: 'A calmer way to understand personal finance through layered information, predictive AI and purposeful motion.',
    colors: ['#77b6ff', '#252ed9'],
    role: 'Strategy · Architecture · Motion',
    challenge: 'Turn a dense, frequently stressful financial dashboard into a surface that rewards quick orientation and deeper exploration.',
    outcome: 'A layered portfolio model, progressive disclosure and a motion language that makes changes legible without adding noise.',
    decisions: [
      ['Orient before analysing', 'The first screen answers only three questions: where you are, what changed and what deserves attention.'],
      ['Let detail arrive on demand', 'Layers reveal themselves from the summary outward, so complexity remains available without becoming the default view.'],
      ['Make change traceable', 'Every change carries a visible origin and destination, helping motion explain rather than decorate.']
    ],
    detail: {"timeline": [["01 / FRAME", "Mapped the moments where financial information becomes emotionally noisy."], ["02 / PROTOTYPE", "Tested layered summaries and transitions with real portfolio scenarios."], ["03 / TUNE", "Reduced motion and visual density until the interface felt immediately legible."]], "artifacts": ["Portfolio overview", "Cash-flow exploration", "Motion language"], "reflection": "Calm is not the absence of information. It is the confidence that information will appear at the moment it becomes useful."}
  },
  {
    slug: 'monogram',
    name: 'Monogram',
    year: '2025',
    type: 'Generative AI · Identity system',
    description: 'A generative identity system for a studio that moves between editorial, latent vectors and digital spaces.',
    colors: ['#f2baea', '#602b7a'],
    role: 'Generative System · Creative Coding',
    challenge: 'Create a brand language that changes dynamically across digital environments without losing recognizable silhouette.',
    outcome: 'A procedural glyph generator tied to sound and interaction, yielding an infinite library of distinct marks.',
    decisions: [
      ['Rules over templates', 'Defined mathematical constraints rather than static assets, allowing infinite variations.'],
      ['Preserve silhouette', 'Ensured the high-level boundary remains iconic regardless of internal vector mutations.'],
      ['Vector rendering', 'Optimized SVG bezier calculations for realtime 60fps web animation.']
    ],
    detail: {"timeline": [["01 / COLLECT", "Gathered the studio’s recurring visual gestures across print, web and moving image."], ["02 / GENERATE", "Turned those gestures into a small set of composable monogram rules."], ["03 / RELEASE", "Built templates and motion studies that made the system useful from day one."]], "artifacts": ["Mark grammar", "Editorial templates", "Motion studies"], "reflection": "A generative identity only works when its rules feel more memorable than any one output they create."}
  },
  {
    slug: 'field-notes',
    name: 'Field Notes',
    year: '2025',
    type: 'Editorial web · Knowledge retrieval',
    description: 'An online reading space designed to slow down and make long-form research ideas more tactile.',
    colors: ['#cce67f', '#3c6b43'],
    role: 'Editorial Architecture · Typography',
    challenge: 'Create a digital reading experience that feels as warm, intentional and quiet as reading on physical paper.',
    outcome: 'A distraction-free reading mode, custom typographic hierarchy, and intuitive marginalia for personal citations.',
    decisions: [
      ['Typography as interface', 'Reduced chrome to zero, using proportional line heights and font pairings to structure thought.'],
      ['Tactile navigation', 'Smooth spatial indicators and keyboard shortcuts for seamless page turning.'],
      ['Offline archive', 'Fully accessible offline with local browser cache synchronization.']
    ],
    detail: {"timeline": [["01 / LISTEN", "Identified the points where conventional article pages pull attention away from reading."], ["02 / EDIT", "Established a typographic rhythm and content hierarchy for sustained focus."], ["03 / SHIP", "Added only the navigation and interaction needed to make a long-form archive feel alive."]], "artifacts": ["Reading shell", "Article grammar", "Quiet navigation"], "reflection": "The best reading experiences make room for the reader’s own pace instead of competing for their attention."}
  },
  {
    slug: 'neuroflow-agent',
    name: 'NeuroFlow Agent',
    year: '2026',
    type: 'AI Research · Multi-Agent Swarm',
    description: 'Autonomous multi-agent orchestration framework for automated research synthesis and code generation.',
    colors: ['#ffaa40', '#9b3010'],
    role: 'Core AI Engineer · System Architecture',
    challenge: 'Coordinate heterogeneous LLM agents with specialized tools to execute complex multi-step reasoning without cascading hallucinations.',
    outcome: 'A directed acyclic graph (DAG) execution engine with self-reflection validation loops and sub-second task dispatching.',
    decisions: [
      ['Structured reflection', 'Each agent evaluates intermediate outputs against strict rubric contracts before handing off.'],
      ['Tool sandboxing', 'All external executions occur in isolated, reproducible micro-environments.'],
      ['Explainable traces', 'Every reasoning step is surfaced in an inspectable visual timeline for human-in-the-loop oversight.']
    ],
    detail: {
      timeline: [
        ['01 / FORMULATION', 'Designed agent roles, communication protocols, and JSON schema tool definitions.'],
        ['02 / BENCHMARK', 'Evaluated performance on reasoning benchmarks against human baselines.'],
        ['03 / PRODUCTION', 'Packaged into a lightweight Python and TypeScript SDK with live telemetry.']
      ],
      artifacts: ['Agent Orchestrator DAG', 'Evaluation Benchmark Suite', 'Interactive Trace Visualizer'],
      reflection: 'The intelligence of an agentic system lives less in the model weights alone and more in the clarity of the contracts between agents.'
    }
  }
];

export const SHEETS: PhotoSheet[] = [
  {
    "slug": "contact-sheet-001",
    "title": "HUD Game Studies",
    "description": "A personal archive of interesting work by others: game screens, interface ideas and memorable design moments.",
    "date": "2026-08-09",
    "kind": "contact-sheet",
    "number": 1,
    "seedVersion": 2,
    "image": "/images/hud-001-kena.jpg",
    "images": [
      {
        "image": "/images/hud-001-kena.jpg",
        "position": "center",
        "title": "Forest menu",
        "description": "A quiet title screen that makes navigation feel like entering a place.",
        "location": "Kena: Bridge of Spirits",
        "time": "Opening screen"
      },
      {
        "image": "/images/hud-002-investigation.jpg",
        "position": "center",
        "title": "Evidence in the light",
        "description": "Maps, tapes and shadows build a scene before the player reads a single clue.",
        "location": "Investigation interface",
        "time": "00:22"
      },
      {
        "image": "/images/hud-003-profile.jpg",
        "position": "center",
        "title": "Character dossier",
        "description": "A profile screen framed as a pinned case file: identity, memory and choice.",
        "location": "Narrative character UI",
        "time": "Profile select"
      },
      {
        "image": "/images/hud-004-cast.jpg",
        "position": "center",
        "title": "Cast on the desk",
        "description": "Portrait cards turn a character roster into a tactile collection of stories.",
        "location": "Hero collection screen",
        "time": "Campaign launch"
      },
      {
        "image": "/images/hud-005-menu.jpg",
        "position": "center",
        "title": "New game ritual",
        "description": "Paper panels and bold options make the first decision feel ceremonial.",
        "location": "Start menu",
        "time": "New session"
      },
      {
        "image": "/images/hud-006-event.jpg",
        "position": "center",
        "title": "Event map",
        "description": "Tickets, location pins and layered cards turn a schedule into a journey.",
        "location": "Live event interface",
        "time": "Event briefing"
      },
      {
        "image": "/images/hud-007-entry.jpg",
        "position": "center",
        "title": "Enter your world",
        "description": "A name-entry screen that treats the player as part of the scene.",
        "location": "Onboarding interface",
        "time": "First entry"
      }
    ],
    "createdAt": "2026-08-09T16:00:00.000Z"
  },
  {
    "slug": "aaa",
    "title": "Barista & Sweet Things",
    "description": "A small café study of iced coffee, soft light, pastries and the quiet work behind a sweet counter.",
    "date": "2026-08-09",
    "kind": "contact-sheet",
    "number": 2,
    "seedVersion": 2,
    "image": "/images/barista-001-strawberry-cake.jpg",
    "images": [
      {
        "image": "/images/barista-001-strawberry-cake.jpg",
        "position": "center",
        "title": "Strawberry interval",
        "description": "Iced latte, matcha and three slices of cake sharing the afternoon table.",
        "location": "Café terrace",
        "time": "14:12"
      },
      {
        "image": "/images/barista-002-coffee-table.jpg",
        "position": "center",
        "title": "Coffee with company",
        "description": "Layered lattes and small desserts collected around a slow conversation.",
        "location": "Neighbourhood café",
        "time": "15:05"
      },
      {
        "image": "/images/barista-003-waffle.jpg",
        "position": "center",
        "title": "Waffle, two blacks",
        "description": "A scoop of vanilla over a warm waffle beside clean, dark coffee.",
        "location": "Counter table",
        "time": "16:18"
      },
      {
        "image": "/images/barista-004-iced-coffee.jpg",
        "position": "center",
        "title": "Ice & caramel",
        "description": "The small rituals of a drink: ice, crema, cutlery and a sweet plate.",
        "location": "Window seat",
        "time": "16:42"
      },
      {
        "image": "/images/barista-005-dessert.jpg",
        "position": "center",
        "title": "Dessert after dark",
        "description": "Cold milk coffee, ice cream and the last bite before the lights go low.",
        "location": "Night café",
        "time": "20:16"
      },
      {
        "image": "/images/barista-006-late-notes.jpg",
        "position": "center",
        "title": "Notes before shift",
        "description": "A late desk, a notebook and the calm focus that carries into tomorrow.",
        "location": "Home studio",
        "time": "22:47"
      },
      {
        "image": "/images/barista-007-donut-prep.jpg",
        "position": "center",
        "title": "Donut prep",
        "description": "A barista finishing each small detail before the first customer arrives.",
        "location": "Bakery counter",
        "time": "08:36"
      }
    ],
    "createdAt": "2026-08-09T17:00:00.000Z"
  }
];

export const PARTNERS: PartnerItem[] = [
  {
    "slug": "genkaiz",
    "name": "Genkaiz",
    "href": "https://genkaiz.net/",
    "type": "CREATIVE PARTNER",
    "mark": "G",
    "image": "/images/genkaiz-preview.png",
    "headline": "A gaming space built around discovery.",
    "summary": "Genkaiz is a Vietnamese platform focused on game accounts and related player services.",
    "note": "Its energetic game-first identity brings a different kind of digital culture into this archive: fast, specific and community-driven.",
    "focus": [
      "Gaming culture",
      "Digital community",
      "Creative partner"
    ]
  },
  {
    "slug": "guga-studio",
    "name": "Guga Studio",
    "href": "https://gugastudio.org/",
    "type": "CREATIVE PARTNER",
    "mark": "GS",
    "image": "/images/guga-preview.png",
    "headline": "Small figures with a collector’s sense of detail.",
    "summary": "Guga Studio creates collector-grade chibi figurines for people who enjoy character, craft and playful objects.",
    "note": "A partnership space for celebrating tactile work, character design and the joy of objects made with care.",
    "focus": [
      "Character culture",
      "Collectible design",
      "Creative partner"
    ]
  },
  {
    "slug": "oto-chat",
    "name": "oto.chat",
    "href": "https://www.oto.chat/",
    "type": "MEDIA SUPPORT",
    "mark": "Oto",
    "image": "/images/oto-preview.png",
    "headline": "A small AI companion for the desktop.",
    "summary": "oto.chat presents Oto, an AI desktop pet designed to make everyday desktop time a little more playful.",
    "note": "Supporting the communication side of this space through an approachable, character-led digital presence.",
    "focus": [
      "AI companion",
      "Digital character",
      "Media support"
    ],
    "title": "oto.chat",
    "detail": "",
    "group": "MEDIA SUPPORT",
    "order": "",
    "description": "oto.chat presents Oto, an AI desktop pet designed to make everyday desktop time a little more playful.",
    "date": "2026-08-05",
    "createdAt": "2026-08-05T16:08:59.289Z"
  }
];

export const CONTACTS: ContactItem[] = [
  {
    "slug": "email",
    "title": "EMAIL",
    "detail": "hyperpotions199x@gmail.com",
    "href": "mailto:hyperpotions199x@gmail.com",
    "group": "DIRECT CONTACT",
    "order": 1
  },
  {
    "slug": "kakao-mail",
    "title": "KAKAO MAIL",
    "detail": "Natsukaze.work@kakao.com",
    "href": "mailto:Natsukaze.work@kakao.com",
    "group": "DIRECT CONTACT",
    "order": 2
  },
  {
    "slug": "instagram",
    "title": "INSTAGRAM",
    "detail": "@kimi.ga.kawaii",
    "href": "https://www.instagram.com/kimi.ga.kawaii",
    "group": "SOCIAL CHANNELS",
    "order": 3
  },
  {
    "slug": "tiktok",
    "title": "TIKTOK",
    "detail": "@kimigakawaii_desu",
    "href": "https://www.tiktok.com/@kimigakawaii_desu",
    "group": "SOCIAL CHANNELS",
    "order": 4
  },
  {
    "slug": "youtube",
    "title": "YOUTUBE",
    "detail": "@kimigakawai",
    "href": "https://www.youtube.com/@kimigakawai",
    "group": "SOCIAL CHANNELS",
    "order": 5
  },
  {
    "slug": "twitch",
    "title": "TWITCH",
    "detail": "kimigakawaii_desu",
    "href": "https://www.twitch.tv/kimigakawaii_desu",
    "group": "SOCIAL CHANNELS",
    "order": 6
  },
  {
    "slug": "x-twitter",
    "title": "X / TWITTER",
    "detail": "@kimigakawaii_",
    "href": "https://x.com/kimigakawaii_",
    "group": "SOCIAL CHANNELS",
    "order": 7
  },
  {
    "slug": "pinterest",
    "title": "PINTEREST",
    "detail": "Kimigakawaii",
    "href": "https://www.pinterest.com/kimigakawaii_/",
    "group": "SOCIAL CHANNELS",
    "order": 8
  },
  {
    "slug": "github",
    "title": "GITHUB",
    "detail": "kimigakawaii-dev",
    "href": "https://github.com/kimigakawaii-dev",
    "group": "WORK, GAMES & SUPPORT",
    "order": 9
  },
  {
    "slug": "itch-io",
    "title": "ITCH.IO",
    "detail": "kimigakawaii-dev",
    "href": "https://kimigakawaii-dev.itch.io/",
    "group": "WORK, GAMES & SUPPORT",
    "order": 10
  },
  {
    "slug": "nexus-mods",
    "title": "NEXUS MODS",
    "detail": "Kimigakawaii",
    "href": "https://www.nexusmods.com/profile/Kimigakawaii",
    "group": "WORK, GAMES & SUPPORT",
    "order": 11
  },
  {
    "slug": "ko-fi",
    "title": "KO-FI",
    "detail": "Support the work",
    "href": "https://ko-fi.com/kimigakawaii_",
    "group": "WORK, GAMES & SUPPORT",
    "order": 12
  },
  {
    "slug": "patreon",
    "title": "PATREON",
    "detail": "Kimigakawaii",
    "href": "https://www.patreon.com/cw/Kimigakawaii_",
    "group": "WORK, GAMES & SUPPORT",
    "order": 13
  }
];

export const SITE_METADATA = {
  name: 'SEIZ / NATSUKAZE',
  title: 'SEIZ / NATSUKAZE — Midnight barista & AI Archive',
  eyebrow: '설레SEIZ / NATSUKAZE · MIDNIGHT BARISTA',
  description: 'AI Engineering, Creative Coding, and Notes on Modern Intelligent Systems.',
  tagline: 'Experiments, Models & Systems for the Modern AI Era.',
  bioEn: 'Hello, I’m an AI engineering student preparing to graduate. This is where I write about deep learning, intelligent systems, creative coding, and turning ambitious ideas into polished digital experiences.',
  bioVi: 'Xin chào, tôi là sinh viên ngành Kỹ thuật AI chuẩn bị tốt nghiệp. Đây là không gian tôi ghi chép về deep learning, hệ thống thông minh, creative coding và hiện thực hóa các ý tưởng thành trải nghiệm số chỉn chu.',
  status: 'OPEN FOR AI ENGINEER & RESEARCH ROLES',
  timezone: 'BANGKOK / HANOI / GMT+7',
  location: 'Vietnam'
};
