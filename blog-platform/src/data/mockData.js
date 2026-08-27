export const categories = [
  { id: 'tech', name: 'Technology', icon: 'cpu', color: 'blue', count: 0 },
  { id: 'design', name: 'Design', icon: 'palette', color: 'purple', count: 0 },
  { id: 'ai', name: 'Artificial Intelligence', icon: 'brain', color: 'orange', count: 0 },
  { id: 'career', name: 'Career', icon: 'briefcase', color: 'green', count: 0 },
  { id: 'lifestyle', name: 'Lifestyle', icon: 'heart', color: 'pink', count: 0 },
  { id: 'productivity', name: 'Productivity', icon: 'zap', color: 'indigo', count: 0 },
];

export const mockAuthors = [
  {
    id: 'author-1',
    name: 'Maanik Agarwal',
    username: 'maanik',
    avatar: '',
    bio: 'Senior Software Engineer at Google. Passionate about building scalable systems and mentoring the next generation of developers. Writing about tech, career growth, and productivity.',
    social: {
      twitter: 'https://twitter.com/sarahchen',
      github: 'https://github.com/sarahchen',
      linkedin: 'https://linkedin.com/in/sarahchen',
      website: 'https://sarahchen.dev',
    },
    stats: {
      posts: 24,
      followers: 12500,
      following: 342,
    },
    joinedAt: '2022-01-15',
  },
  {
    id: 'author-2',
    name: 'Marcus Johnson',
    username: 'marcusj',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Product Designer at Figma. Helping teams build better products through thoughtful design. Advocate for design systems and accessibility.',
    social: {
      twitter: 'https://twitter.com/marcusj',
      github: 'https://github.com/marcusj',
      linkedin: 'https://linkedin.com/in/marcusj',
      dribbble: 'https://dribbble.com/marcusj',
    },
    stats: {
      posts: 18,
      followers: 8900,
      following: 567,
    },
    joinedAt: '2021-08-22',
  },
  {
    id: 'author-3',
    name: 'Dr. Emily Rodriguez',
    username: 'emilyrodriguez',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    bio: 'AI Research Scientist at DeepMind. PhD in Machine Learning from Stanford. Researching the intersection of AI, ethics, and human-computer interaction.',
    social: {
      twitter: 'https://twitter.com/emilyrodriguez',
      github: 'https://github.com/emilyrodriguez',
      linkedin: 'https://linkedin.com/in/emilyrodriguez',
      website: 'https://emilyrodriguez.ai',
    },
    stats: {
      posts: 15,
      followers: 23400,
      following: 123,
    },
    joinedAt: '2020-03-10',
  },
  {
    id: 'author-4',
    name: 'Alex Kim',
    username: 'alexkim',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Full-stack Developer & Technical Writer. Building developer tools and writing about modern web development, TypeScript, and React ecosystem.',
    social: {
      twitter: 'https://twitter.com/alexkim',
      github: 'https://github.com/alexkim',
      linkedin: 'https://linkedin.com/in/alexkim',
      website: 'https://alexkim.dev',
    },
    stats: {
      posts: 31,
      followers: 6700,
      following: 892,
    },
    joinedAt: '2022-06-05',
  },
];

const generateMockPosts = () => [
  {
    id: 'post-1',
    title: 'Building Scalable React Applications: Architecture Patterns That Scale',
    slug: 'building-scalable-react-applications-architecture-patterns',
    excerpt: 'Learn the essential architectural patterns and best practices for building React applications that can grow with your team and product requirements.',
    content: `Building Scalable React Applications: Architecture Patterns That Scale

React has become the go-to library for building modern web applications. But as your application grows, so does the complexity. In this comprehensive guide, we'll explore battle-tested architectural patterns that help you build scalable, maintainable React applications.

Why Architecture Matters

When you're building a small application, it's easy to put everything in a single component. But as your team grows and features multiply, poor architecture leads to:

- Tight coupling between components
- Difficult testing and debugging
- Slow development velocity
- Inconsistent patterns across the codebase

Core Principles

1. Separation of Concerns

Keep your business logic separate from your UI components. This makes your code more testable and reusable.

// Bad: Business logic mixed with UI
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userId]);
  
  return <div>{user?.name}</div>;
}

// Good: Custom hook for data fetching
function useUser(userId) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userId]);
  
  return user;
}

function UserProfile({ userId }) {
  const user = useUser(userId);
  return <div>{user?.name}</div>;
}

2. Component Composition Over Inheritance

React favors composition over inheritance. Build small, focused components that do one thing well.

3. State Colocation

Keep state as close to where it's used as possible. Lift state up only when necessary.

Folder Structure

src/
components/          # Shared UI components
  ui/             # Basic building blocks (Button, Input, Modal)
  forms/          # Form-specific components
  layout/         # Layout components (Header, Footer, Sidebar)
features/           # Feature-based modules
  auth/
  dashboard/
  settings/
hooks/              # Shared custom hooks
utils/              # Utility functions
services/           # API services
stores/             # Global state (Zustand/Redux)
types/              # TypeScript types

Key Patterns

1. Container/Presentational Pattern

Separate data-fetching logic from presentation.

2. Custom Hooks for Reusable Logic

Extract common logic into custom hooks.

3. Compound Components

Build flexible component APIs using compound components.

4. Render Props / Hooks for Cross-Cutting Concerns

Handle concerns like authentication, theming, and data fetching.

Performance Optimization

- Use React.memo for expensive components
- Implement useMemo and useCallback judiciously
- Code-split with React.lazy and Suspense
- Virtualize long lists with react-window

Testing Strategy

- Unit test custom hooks and utilities
- Integration test component interactions
- E2E test critical user flows
- Visual regression testing for UI components

Conclusion

Scalable architecture isn't about following a rigid set of rules, it's about making intentional decisions that serve your team and product. Start simple, refactor when you feel pain, and always optimize for developer experience.

What patterns have worked well for your team? Share your experiences in the comments below!`,
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop',
    category: 'tech',
    authorId: 'author-1',
    author: null,
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    readingTime: 12,
    likes: 247,
    bookmarks: 89,
    views: 5432,
    comments: [],
    tags: ['react', 'architecture', 'scalability', 'best-practices'],
    featured: true,
    status: 'published',
  },
  {
    id: 'post-2',
    title: 'Design Systems 101: Building Consistent UI at Scale',
    slug: 'design-systems-101-building-consistent-ui-at-scale',
    excerpt: 'A comprehensive guide to creating and maintaining design systems that enable teams to build consistent, accessible interfaces faster.',
    content: `Design Systems 101: Building Consistent UI at Scale

Design systems have become essential for modern product teams. They provide a shared language between designers and developers, ensuring consistency across products while accelerating development velocity.

What is a Design System?

A design system is a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications.

Core Components

1. Design Tokens - The atomic values (colors, spacing, typography)
2. Components - Reusable UI elements built from tokens
3. Patterns - Common UX patterns and compositions
4. Documentation - Guidelines and usage examples
5. Tools - Build processes, testing, and distribution

Getting Started

Step 1: Audit Your Current UI

Before building, understand what you have. Inventory all colors, spacing values, component variations, and patterns currently in use.

Step 2: Define Design Tokens

Design tokens are the foundation. They're platform-agnostic values that represent design decisions.

{
  "color": {
    "primary": {
      "50": "#f0f9ff",
      "100": "#e0f2fe",
      "500": "#0ea5e9",
      "900": "#0c4a6e"
    },
    "semantic": {
      "background": "{color.neutral.50}",
      "text": "{color.neutral.900}",
      "border": "{color.neutral.200}"
    }
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px",
    "lg": "24px",
    "xl": "32px"
  },
  "typography": {
    "fontFamily": {
      "sans": "Inter, system-ui, sans-serif",
      "mono": "JetBrains Mono, monospace"
    },
    "fontSize": {
      "xs": "12px",
      "sm": "14px",
      "base": "16px",
      "lg": "18px",
      "xl": "20px"
    }
  }
}

Step 3: Build Core Components

Start with the most used components: Button, Input, Card, Modal, Tooltip.

Tools & Workflow

Design Tools
- Figma - Design token management, component libraries
- Storybook - Component documentation and testing
- Chromatic - Visual regression testing

Development Tools
- Style Dictionary - Transform tokens for multiple platforms
- Token Studio - Figma plugin for token management
- Changesets - Version management and publishing

Governance

Establish clear processes for:
- Contributing new components
- Deprecating old patterns
- Version releases
- Breaking change communication

Measuring Success

Track metrics like:
- Adoption rate across teams
- Time to build new features
- Design consistency scores
- Developer satisfaction

Conclusion

A design system is a product, not a project. It requires ongoing investment, clear ownership, and strong communication between design and engineering. Start small, iterate fast, and always prioritize developer experience.

Ready to start your design system journey? Check out our starter kit in the resources section!`,
    coverImage: 'https://images.unsplash.com/photo-1558655146-9f40138edf1a?w=800&h=450&fit=crop',
    category: 'design',
    authorId: 'author-2',
    author: null,
    publishedAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    readingTime: 8,
    likes: 189,
    bookmarks: 156,
    views: 3210,
    comments: [],
    tags: ['design-systems', 'ui', 'figma', 'components'],
    featured: true,
    status: 'published',
  },
  {
    id: 'post-3',
    title: 'The Future of AI in Software Development: Beyond Code Generation',
    slug: 'future-ai-software-development-beyond-code-generation',
    excerpt: 'Explore how AI is transforming software development beyond simple code generation, from architecture decisions to testing and documentation.',
    content: `The Future of AI in Software Development: Beyond Code Generation

The conversation around AI in software development has largely focused on code generation, tools like GitHub Copilot, Cursor, and CodeWhisperer. But the real transformation is happening in areas far beyond writing code.

Current State: Code Generation

Today's AI coding assistants excel at:
- Boilerplate generation
- Syntax completion
- Simple refactoring
- Test case generation
- Documentation writing

But they struggle with:
- Complex architectural decisions
- Business logic understanding
- Cross-system integration
- Security vulnerability detection
- Performance optimization

The Next Wave: AI-Augmented Development Lifecycle

1. Architectural Intelligence

AI systems that understand your entire codebase and can:
- Suggest architectural patterns based on requirements
- Identify anti-patterns and technical debt
- Predict scaling bottlenecks
- Recommend migration strategies

2. Intelligent Testing

Beyond generating test cases, AI can:
- Identify untested critical paths
- Generate property-based tests
- Simulate edge cases and failure scenarios
- Optimize test suite execution order
- Detect flaky tests automatically

3. Automated Code Review

AI-powered code review that:
- Enforces team conventions automatically
- Detects security vulnerabilities
- Suggests performance improvements
- Identifies maintainability concerns
- Provides contextual documentation

4. Knowledge Management

- Automatic documentation generation from code
- Living architecture diagrams
- Onboarding assistants for new team members
- Context-aware code search and explanation

Human-AI Collaboration Patterns

The Navigator-Driver Model

Human acts as navigator (high-level decisions), AI as driver (implementation details).

The Reviewer-Author Model

AI generates initial implementation, human reviews and refines.

The Pair Programming Model

Continuous back-and-forth collaboration on complex problems.

Challenges & Considerations

Trust & Verification

How do we verify AI-generated code? We need:
- Formal verification tools
- Property-based testing
- Runtime monitoring
- Gradual rollout strategies

Skill Atrophy

Over-reliance on AI may weaken fundamental skills. Balance is key.

Intellectual Property

Who owns AI-generated code? Legal frameworks are still evolving.

Preparing for the Future

1. Invest in fundamentals - Architecture, algorithms, system design
2. Learn prompt engineering - Treat it as a new programming paradigm
3. Build evaluation frameworks - Measure AI output quality
4. Establish guardrails - Security, compliance, quality gates
5. Foster AI literacy - Team-wide understanding of capabilities/limits

Conclusion

AI won't replace developers, it will amplify them. The developers who thrive will be those who learn to effectively collaborate with AI, focusing their human creativity on high-value problems while delegating routine tasks.

The future belongs to developers who can architect systems, understand business context, and make judgment calls, with AI as their most powerful tool yet.

What's your experience with AI coding tools? Where do you see the biggest impact? Let's discuss in the comments!`,
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
    category: 'ai',
    authorId: 'author-3',
    author: null,
    publishedAt: '2024-01-25T09:15:00Z',
    updatedAt: '2024-01-25T09:15:00Z',
    readingTime: 15,
    likes: 423,
    bookmarks: 234,
    views: 8765,
    comments: [],
    tags: ['ai', 'machine-learning', 'software-development', 'future'],
    featured: true,
    status: 'published',
  },
  {
    id: 'post-4',
    title: 'Negotiating Your Tech Salary: A Data-Driven Approach',
    slug: 'negotiating-tech-salary-data-driven-approach',
    excerpt: 'Master the art of salary negotiation with concrete strategies, market data, and psychological tactics that have helped developers increase offers by 20-40%.',
    content: `Negotiating Your Tech Salary: A Data-Driven Approach

Salary negotiation is one of the highest-leverage activities in your career. A single conversation can compound to hundreds of thousands of dollars over your career. Yet most developers avoid it or handle it poorly.

Why Negotiation Matters

The Compound Effect

A $10,000 increase today becomes:
- $100,000+ over 10 years (just base salary)
- $300,000+ with raises and bonuses
- $1M+ if invested properly

The Asymmetry

Companies negotiate salaries daily. You do it every few years. They have data, processes, and experience. You need to level the playing field.

Preparation Phase (Start 3-6 Months Early)

1. Market Research

Collect data from multiple sources:

| Source | Reliability | Best For |
|--------|-------------|----------|
| Levels.fyi | High | Big Tech, unicorns |
| Blind | Medium | Unverified but realistic |
| Glassdoor | Low-Medium | General ranges |
| H1B Data | High | Base salary floors |
| Recruiter conversations | High | Current market rates |

2. Build Your Leverage

Best leverage: Competing offers
- Interview at 3-5 companies simultaneously
- Timeline alignment is crucial
- Be transparent about process stage

Strong leverage: Unique value
- Specialized expertise (ML, security, distributed systems)
- Proven track record (open source, publications, patents)
- Internal referral + external offer

Good leverage: Market data
- Concrete numbers from reliable sources
- Recent offer data from peers
- Company-specific compensation data

3. Know Your Numbers

Calculate your:
- Walk-away number (minimum acceptable)
- Target number (realistic goal)
- Dream number (stretch goal)
- Total compensation (base + equity + bonus + benefits)

The Negotiation Framework

Phase 1: Delay the Number

Recruiter: "What are your salary expectations?"

You: "I'm focused on finding the right role and team fit. I'm sure we can find a package that works for both of us. What's the budgeted range for this position?"

Phase 2: Anchor High

When pressed, give a range with your target at the bottom:

"I'm looking for something in the $180k-$220k base range, with equity that reflects the impact I'll drive."

Phase 3: The Counteroffer

When they offer $170k base:

"Thank you for the offer. I'm excited about the team and mission. Based on my research and the value I bring, specifically [concrete examples], I was targeting $200k base. Can we get closer to that?"

Phase 4: Expand the Pie

If base is capped, negotiate:
- Signing bonus (easiest win, one-time cost for them)
- Equity refresh (annual grants, not just initial)
- Performance bonus (higher percentage, clearer metrics)
- Remote work flexibility
- Learning budget ($3k-$5k/year)
- Conference attendance
- Accelerated review cycle (6 months instead of 12)

Psychological Tactics

1. Use Precise Numbers

$187,500 feels more researched than $190,000.

2. Silence Is Powerful

After stating your number, stop talking. Let them fill the silence.

3. Frame Collaboratively

"We're partners in this. Help me understand the constraints so we can find a creative solution."

4. Anchor to Value, Not Need

Not: "I need $200k for my mortgage."
Instead: "I'll drive $2M+ in value through [specific initiatives]."

Common Mistakes to Avoid

1. Sharing current salary (illegal in many states, always disadvantages you)
2. Accepting first offer (always negotiable)
3. Negotiating via email only (phone/video builds rapport)
4. Making it personal (keep it professional, data-driven)
5. Not getting it in writing (verbal promises evaporate)

Scripts for Common Scenarios

"We don't have budget for that"

"I understand budget constraints. What would it take to get to $X? Is there a title adjustment, equity increase, or performance milestone that could bridge the gap?"

"That's the top of our band"

"I respect the band structure. Could we explore a higher band given [specific qualification]? Or structure a guaranteed promotion review in 6 months with defined criteria?"

"We need an answer by tomorrow"

"I want to give this the consideration it deserves. Can we have until [specific date]? This is a significant career decision."

After the Offer

1. Get everything in writing - Offer letter, equity grant, bonus structure
2. Review with a lawyer - Especially for equity, IP clauses, non-competes
3. Compare total compensation - Not just base salary
4. Consider the whole package - Culture, growth, work-life balance, mission

Resources

- Levels.fyi - Compensation data
- H1BGrader - Salary data from visa filings
- Rora - Negotiation coaching
- Fearless Salary Negotiation - Josh Doody's course
- Never Split the Difference - Chris Voss (FBI negotiator)

Conclusion

Negotiation is a skill, not a talent. It improves with practice. Every interview cycle is an opportunity to practice, gather data, and refine your approach.

The best time to negotiate was when you got your first offer. The second best time is now.

What's your biggest negotiation win or lesson learned? Share in the comments!`,
    coverImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=450&fit=crop',
    category: 'career',
    authorId: 'author-4',
    author: null,
    publishedAt: '2024-02-01T16:45:00Z',
    updatedAt: '2024-02-01T16:45:00Z',
    readingTime: 10,
    likes: 312,
    bookmarks: 445,
    views: 6789,
    comments: [],
    tags: ['career', 'negotiation', 'salary', 'job-search'],
    featured: false,
    status: 'published',
  },
  {
    id: 'post-5',
    title: 'Morning Routines of Highly Effective Developers',
    slug: 'morning-routines-highly-effective-developers',
    excerpt: 'Discover the morning habits that set top performers apart. From deep work blocks to strategic planning, learn to design a routine that maximizes your cognitive potential.',
    content: `Morning Routines of Highly Effective Developers

Your morning sets the trajectory for your entire day. The most effective developers don't leave their mornings to chance, they design them intentionally.

The Science of Morning Productivity

Cortisol Awakening Response

Cortisol peaks 30-45 minutes after waking. This natural alertness window is your prime time for difficult cognitive work.

Decision Fatigue

Willpower is a finite resource. Every trivial decision (what to wear, what to eat, what to do first) depletes your capacity for important decisions later.

Attention Residue

Switching tasks leaves "residue" that impairs performance on the next task. Single-tasking in the morning preserves cognitive bandwidth.

Core Principles

1. No Phone First

The moment you check notifications, you're reacting to others' priorities. Protect the first 60-90 minutes.

2. Hydrate Before Caffeinate

After 7-8 hours without water, you're mildly dehydrated. Even 2% dehydration impairs cognitive performance.

3. Move Your Body

Even 5 minutes of movement increases BDNF (brain-derived neurotrophic factor), improving learning and memory.

4. Define the One Thing

Identify the single most impactful task for the day. Do it first.

Routine Templates

The Deep Work Routine (90 minutes)

| Time | Activity | Purpose |
|------|----------|---------|
| 0:00 | Wake, hydrate (500ml water) | Rehydrate, cortisol management |
| 0:10 | Light movement/stretching | Increase blood flow, BDNF |
| 0:20 | Meditation/breathing (10 min) | Reduce anxiety, improve focus |
| 0:30 | Review daily "One Thing" | Prime attention, set intention |
| 0:35 | Deep work block (60-90 min) | Highest leverage work |

The Balanced Routine (2 hours)

| Time | Activity |
|------|----------|
| 6:00 | Wake, hydrate, bathroom |
| 6:10 | Exercise (30 min) - run, lift, yoga |
| 6:40 | Shower, dress |
| 6:55 | Breakfast + reading (20 min) |
| 7:15 | Planning & prioritization (15 min) |
| 7:30 | Deep work block (90 min) |

The Minimalist Routine (30 minutes)

For those with early meetings or family constraints:

| Time | Activity |
|------|----------|
| 0:00 | Wake, hydrate |
| 0:05 | 5 min movement |
| 0:10 | 5 min planning (write top 3) |
| 0:15 | 15 min deep work on #1 |

Developer-Specific Practices

Code Review First Thing

Review others' PRs while your mind is fresh. You'll catch more issues and unblock teammates.

Learning Block

30 minutes reading papers, docs, or tutorials. Compound knowledge daily.

Side Project Time

Protect 30-60 minutes for your own projects before work demands take over.

Technical Planning

Architect solutions on paper before touching code. Reduces rework significantly.

Evening Preparation (The Night Before)

Your morning starts the night before:

1. Write tomorrow's "One Thing" - Eliminate morning decision fatigue
2. Prepare environment - Open relevant files, close distracting tabs
3. Set phone to grayscale - Reduce morning temptation
4. Sleep hygiene - 7-8 hours, cool room, no screens 30 min before bed

Common Pitfalls

The "Quick Check" Trap

"I'll just check Slack for 2 minutes", 45 minutes later...

Solution: Physical phone barrier (different room, locked drawer).

Over-Optimization

Spending 2 hours designing the perfect 30-minute routine.

Solution: Pick a template, run it for 2 weeks, then iterate.

All-or-Nothing Thinking

Missed one day? "My routine is ruined."

Solution: Consistency > perfection. Aim for 80% adherence.

Copying Without Adapting

Following someone else's routine exactly.

Solution: Steal principles, customize practices to your biology and constraints.

Measuring Effectiveness

Track weekly:
- Deep work hours completed
- Energy level (1-10) at 10am, 2pm, 6pm
- Progress on "One Thing"
- Subjective focus quality

Adjust based on data, not feelings.

Advanced: Chronotype Alignment

| Chronotype | Peak Alertness | Ideal Deep Work |
|------------|----------------|-----------------|
| Lion (early) | 6-10 AM | 5:30-8:30 AM |
| Bear (standard) | 10 AM-2 PM | 8:00-11:00 AM |
| Wolf (late) | 12 PM-4 PM | 10:00 AM-1:00 PM |
| Dolphin (irregular) | Varies | When naturally alert |

Take the chronotype quiz, then align your routine.

Tools & Resources

- Alarm: Sunrise alarm clock (gradual light)
- Hydration: Large water bottle by bed
- Movement: Yoga mat, resistance bands visible
- Planning: Paper notebook (no notifications)
- Focus: Forest app, Freedom, or simple timer
- Tracking: Notion, Obsidian, or paper journal

Sample Weekly Plan

| Day | Focus | Routine Variant |
|-----|-------|-----------------|
| Mon | Project planning | Balanced |
| Tue | Deep coding | Deep Work |
| Wed | Learning/reading | Balanced |
| Thu | Deep coding | Deep Work |
| Fri | Review & admin | Minimalist |
| Sat | Side project | Balanced |
| Sun | Rest/planning | Minimalist |

Conclusion

There's no universal perfect routine. The best routine is one you'll actually do consistently. Start with a template, measure results, iterate ruthlessly.

Your morning is the only time you fully control. Invest it wisely.

What does your current morning look like? What one change would have the biggest impact? Share below!`,
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=450&fit=crop',
    category: 'productivity',
    authorId: 'author-1',
    author: null,
    publishedAt: '2024-02-10T07:00:00Z',
    updatedAt: '2024-02-10T07:00:00Z',
    readingTime: 7,
    likes: 156,
    bookmarks: 278,
    views: 4321,
    comments: [],
    tags: ['productivity', 'morning-routine', 'habits', 'deep-work'],
    featured: false,
    status: 'published',
  },
  {
    id: 'post-6',
    title: 'Remote Work Mastery: Building Culture Across Time Zones',
    slug: 'remote-work-mastery-building-culture-across-time-zones',
    excerpt: 'Practical strategies for building strong team culture, effective communication, and high-trust collaboration in distributed teams spanning multiple continents.',
    content: `Remote Work Mastery: Building Culture Across Time Zones

Distributed teams are the new normal. But most companies still operate with co-located assumptions. Let's fix that.

The Remote Reality

The Challenges

- Communication overhead - No hallway conversations
- Time zone friction - Limited overlap hours
- Isolation - Missing social connection
- Visibility bias - "Out of sight, out of mind"
- Cultural differences - Varying norms and expectations

The Opportunities

- Global talent pool - Hire the best, anywhere
- Asynchronous default - Better documentation, fewer meetings
- Deep work friendly - Control over environment
- Diverse perspectives - Global team = global insights
- Resilience - Distributed by design

Communication Architecture

Synchronous vs Asynchronous

Default to async. Sync for:
- Building relationships
- Complex ambiguity resolution
- Celebration and recognition
- Urgent decisions

Async for:
- Status updates
- Decisions with clear options
- Code reviews
- Documentation
- Planning

The Communication Stack

| Purpose | Tool | Norms |
|---------|------|-------|
| Quick questions | Slack/Discord | Response within 4 hours |
| Deep discussion | Threads/Notion | 24-hour response SLA |
| Decisions | RFC docs | Comment, Decide, Document |
| Social | Donut, virtual coffee | Opt-in, scheduled |
| Emergency | Phone/PagerDuty | True emergencies only |

Meeting Hygiene

Every meeting must have:
- Clear purpose (decide, discuss, inform, connect)
- Agenda shared 24h in advance
- Written summary with action items
- Recording for async consumption

Meeting types:
- Daily standup - Async written updates
- Weekly sync - 30 min, relationship-focused
- Monthly all-hands - Celebrate, align, Q&A
- Quarterly planning - 2-3 hours, highly structured

Time Zone Management

Core Hours

Establish 3-4 hours of overlap where everyone is available.

Example (US + Europe + Asia):
- Team A: 9 AM - 5 PM EST
- Team B: 2 PM - 10 PM GMT
- Team C: 10 PM - 6 AM SGT
- Overlap: 2 PM - 5 PM EST / 7 PM - 10 PM GMT / 3 AM - 6 AM SGT (bad)

Better: Hire in clusters
- Americas cluster (UTC-8 to UTC-4)
- EMEA cluster (UTC+0 to UTC+3)
- APAC cluster (UTC+8 to UTC+11)

Follow-the-Sun Handoffs

Structure work so progress continues 24/7:
- EOD summary: "Here's where I left off, here's what's next"
- Morning pickup: "Here's what happened overnight, here's my plan"

Time Zone Equity

- Rotate meeting times fairly
- Record everything
- No "optional" meetings that become mandatory
- Respect non-working hours strictly

Building Trust Remotely

Trust Equation

Trust = (Credibility + Reliability + Intimacy) / Self-Orientation

Remote-specific tactics:

Credibility:
- Share work in progress, not just polished results
- Write thoughtful RFCs and design docs
- Public learning (share what you're studying)

Reliability:
- Do what you say, when you say
- Proactive status updates
- Clear escalation paths

Intimacy:
- Virtual coffee chats (non-work)
- Share personal context (within comfort)
- Remember details about teammates' lives

Low Self-Orientation:
- Give credit generously
- Ask "how can I help?" regularly
- Celebrate others' wins publicly

Culture Building Rituals

Weekly
- Monday: Team priorities + personal check-in
- Friday: Wins, learnings, gratitude

Monthly
- AMA with leadership
- Skill share sessions
- Virtual team activities (games, cooking, escape rooms)

Quarterly
- In-person meetups (budget for this!)
- Strategy alignment
- Team health assessments

Annual
- Company retreat
- Career conversations
- Culture survey + action planning

Onboarding Remote Employees

Pre-Start (Week -1)
- Ship equipment + swag
- Grant access to all tools
- Assign onboarding buddy
- Send schedule for first week

Week 1
- Daily 1:1 with manager
- Meet the team (15 min each)
- Codebase walkthrough
- First small win (deploy something)

Month 1
- Weekly manager check-ins
- Cross-team shadowing
- First retrospective contribution
- 30-day feedback survey

Performance Management

Output Over Hours

Measure:
- Outcomes (features shipped, bugs fixed, docs written)
- Impact (revenue, user satisfaction, team enablement)
- Growth (skills acquired, mentoring, process improvements)

Avoid:
- Hours logged
- Green squares on GitHub
- Message response time
- Camera-on time

Tools Worth Investing In

- Async video: Loom, Vidcast
- Collaborative docs: Notion, Confluence, Google Docs
- Virtual whiteboard: Miro, FigJam
- Team health: TeamRetro, Parabol
- Engagement: Donut, RandomCoffee
- Timezone: Every Time Zone, World Time Buddy

Scaling Remote Culture

Dunbar's Number

Teams of ~150 max for cohesive culture. Beyond that:
- Split into tribes/squads
- Invest in cross-team rituals
- Strong written culture essential

Documentation as Culture

Your handbook IS your culture. Invest in:
- Onboarding docs
- Decision logs
- Process documentation
- "How we work" guides

Crisis Management

Incident Response

- Clear escalation procedures
- On-call rotations respecting time zones
- Blameless postmortems
- Async postmortem reviews

Team Conflict

- Address early, privately
- Use video for difficult conversations
- Mediation process documented
- Follow-up in writing

The Future: Hybrid by Design

The best remote practices improve co-located work too:
- Better documentation
- More intentional meetings
- Outcome-based evaluation
- Flexibility as default

Conclusion

Remote work isn't a compromise, it's a capability. Teams that master distributed collaboration unlock global talent, resilience, and innovation.

The tools are commoditized. The practices are learnable. The culture is a choice.

What's your biggest remote work challenge? What's worked surprisingly well? Let's learn from each other!`,
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=450&fit=crop',
    category: 'lifestyle',
    authorId: 'author-2',
    author: null,
    publishedAt: '2024-02-15T11:20:00Z',
    updatedAt: '2024-02-15T11:20:00Z',
    readingTime: 11,
    likes: 203,
    bookmarks: 167,
    views: 3890,
    comments: [],
    tags: ['remote-work', 'culture', 'distributed-teams', 'management'],
    featured: false,
    status: 'published',
  },
  {
    id: 'post-7',
    title: 'TypeScript Advanced Patterns: From Generics to Template Literals',
    slug: 'typescript-advanced-patterns-generics-template-literals',
    excerpt: 'Level up your TypeScript skills with advanced type patterns including conditional types, template literals, mapped types, and real-world library patterns.',
    content: `TypeScript Advanced Patterns: From Generics to Template Literals

TypeScript's type system is Turing complete. Let's explore the patterns that separate junior from senior TypeScript developers.

Generics Beyond Basics

Constrained Generics

// Basic constraint
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

// Multiple constraints
function merge<T extends object, U extends object>(a: T, b: U): T & U {
  return { ...a, ...b };
}

// Default type parameters
interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  error?: string;
}

Generic Factories

// Factory pattern with generics
function createStore<T>(initialState: T) {
  let state = initialState;
  const listeners = new Set<() => void>();
  
  return {
    getState: () => state,
    setState: (next: T | ((prev: T) => T)) => {
      state = typeof next === 'function' ? next(state) : next;
      listeners.forEach(listener => listener());
    },
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

const userStore = createStore({ name: '', email: '', isAdmin: false });
const countStore = createStore(0);

Conditional Types

Basic Syntax

type IsString<T> = T extends string ? true : false;

type Test1 = IsString<'hello'>; // true
type Test2 = IsString<42>; // false

Distributive Conditional Types

type ToArray<T> = T extends any ? T[] : never;

type Result = ToArray<string | number>;
// string[] | number[] (distributed!)

// Non-distributive
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;
type Result2 = ToArrayNonDist<string | number>;
// (string | number)[]

Infer Keyword

type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type Parameters<T> = T extends (...args: infer P) => any ? P : never;
type ConstructorParameters<T> = T extends new (...args: infer P) => any ? P : never;

// Custom inference
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type UnwrapArray<T> = T extends (infer U)[] ? U : T;

Template Literal Types

String Manipulation

type EventName<T extends string> = \`on\${Capitalize<T>}\`;

type ClickEvent = EventName<'click'>; // 'onClick'
type HoverEvent = EventName<'hover'>; // 'onHover'

// CSS-in-JS patterns
type CSSProperty<T extends string> = \`--\${T}\`;

type Spacing = CSSProperty<'spacing-sm' | 'spacing-md' | 'spacing-lg'>;
// '--spacing-sm' | '--spacing-md' | '--spacing-lg'

Parsing and Construction

// Parse route parameters
type ParseRoute<T extends string> = T extends \`/\${infer Rest}\` 
  ? ParseRouteSegment<Rest> 
  : never;

type ParseRouteSegment<T extends string> = T extends \`\${infer Param}/\${infer Rest}\`
  ? Param extends \`:\${infer Name}\`
    ? { [K in Name]: string } & ParseRouteSegment<Rest>
    : ParseRouteSegment<Rest>
  : T extends \`:\${infer Name}\`
  ? { [K in Name]: string }
  : {};

// Usage
type UserRoute = ParseRoute<'/users/:id/posts/:postId'>;
// { id: string } & { postId: string }

Mapped Types

Basic Mapping

type MakeOptional<T> = {
  [K in keyof T]?: T[K];
};

type MakeRequired<T> = {
  [K in keyof T]-?: T[K];
};

type MakeReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

Key Remapping (TS 4.1+)

type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<K & string>}\`]: () => T[K];
};

type User = { name: string; age: number };
type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number }

// Filter keys
type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

type UserStrings = PickByType<User, string>; // { name: string }

Recursive Types

type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

Utility Type Patterns

Branded Types

type Brand<T, B> = T & { __brand: B };

type UserId = Brand<string, 'UserId'>;
type PostId = Brand<string, 'PostId'>;

function getUser(id: UserId) { /* ... */ }
// getUser('random-string'); // Error
// getUser('123' as UserId); // OK

Variadic Tuple Types (TS 4.0+)

type TupleToUnion<T extends readonly any[]> = T[number];

type Concat<T extends readonly any[], U extends readonly any[]> = [...T, ...U];

type Head<T extends readonly any[]> = T extends readonly [infer H, ...any[]] ? H : never;
type Tail<T extends readonly any[]> = T extends readonly [any, ...infer T] ? T : never;

Real-World Library Patterns

1. Builder Pattern with Type Safety

class QueryBuilder<T> {
  private query: Partial<{
    select: string[];
    where: Record<string, any>;
    orderBy: string;
    limit: number;
  }> = {};

  select<K extends keyof T>(...fields: K[]): this {
    this.query.select = fields as string[];
    return this;
  }

  where<K extends keyof T>(field: K, value: T[K]): this {
    this.query.where = { ...this.query.where, [field]: value };
    return this;
  }

  build(): string {
    // Build SQL query
    return 'SELECT ...';
  }
}

// Usage with full autocomplete
const query = new QueryBuilder<User>()
  .select('name', 'email')
  .where('isActive', true)
  .build();

2. Event Emitter with Typed Events

type EventMap = {
  login: { user: User; timestamp: Date };
  logout: { userId: string; reason?: string };
  purchase: { item: Product; amount: number };
};

class TypedEventEmitter<T extends Record<string, any>> {
  private listeners: { [K in keyof T]?: Set<(payload: T[K]) => void> } = {};

  on<K extends keyof T>(event: K, listener: (payload: T[K]) => void): () => void {
    if (!this.listeners[event]) this.listeners[event] = new Set();
    this.listeners[event]!.add(listener);
    return () => this.off(event, listener);
  }

  off<K extends keyof T>(event: K, listener: (payload: T[K]) => void): void {
    this.listeners[event]?.delete(listener);
  }

  emit<K extends keyof T>(event: K, payload: T[K]): void {
    this.listeners[event]?.forEach(listener => listener(payload));
  }
}

const events = new TypedEventEmitter<EventMap>();
events.on('login', ({ user, timestamp }) => {
  // Fully typed!
});

3. API Client with Endpoint Inference

interface Endpoints {
  '/users': { GET: User[]; POST: { body: CreateUserDto; response: User } };
  '/users/:id': { GET: User; PUT: { body: UpdateUserDto; response: User }; DELETE: void };
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

type EndpointConfig<T extends Endpoints, Path extends keyof T, M extends Method> = 
  T[Path] extends { [K in M]: infer R } ? R : never;

class ApiClient<T extends Endpoints> {
  request<Path extends keyof T, M extends Method>(
    path: Path,
    method: M,
    body?: EndpointConfig<T, Path, M> extends { body: infer B } ? B : never
  ): Promise<EndpointConfig<T, Path, M> extends { response: infer R } ? R : EndpointConfig<T, Path, M>> {
    // Implementation
    return Promise.resolve(null as any);
  }
}

const api = new ApiClient<Endpoints>();
const user = await api.request('/users/:id', 'GET'); // User
const newUser = await api.request('/users', 'POST', { name: 'John', email: 'john@example.com' }); // User

Performance Considerations

Type Instantiation Depth

Complex types can hit TypeScript's instantiation limits. Use // @ts-expect-error sparingly and simplify when possible.

Declaration Emission

Use declaration: true and declarationMap: true for library authors.

Migration Strategies

Incremental Adoption

1. Enable strict: true
2. Add types to new code
3. Gradually type existing code
4. Use // @ts-nocheck for untyped files

Common Fixes

- any, unknown, specific type
- Function, (...args: any[]) => any
- object, Record<string, any> or interface
- {} , Record<string, unknown>

Resources

- Type Challenges - Practice advanced types
- TypeScript Docs - Handbook and release notes
- Effective TypeScript - Dan Vanderkam's book
- Matt Pocock's Total TypeScript - Free interactive course

Conclusion

Advanced TypeScript isn't about using every feature, it's about choosing the right tool for the job. Start with generics and conditional types, then add template literals and mapped types as needed.

The goal: make invalid states unrepresentable.

What's your favorite TypeScript pattern? What tripped you up initially? Discuss below!`,
    coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=450&fit=crop',
    category: 'tech',
    authorId: 'author-4',
    author: null,
    publishedAt: '2024-02-20T13:00:00Z',
    updatedAt: '2024-02-20T13:00:00Z',
    readingTime: 14,
    likes: 289,
    bookmarks: 412,
    views: 5678,
    comments: [],
    tags: ['typescript', 'advanced', 'generics', 'type-system'],
    featured: false,
    status: 'published',
  },
  {
    id: 'post-8',
    title: 'Accessibility First: Building Inclusive Web Experiences',
    slug: 'accessibility-first-building-inclusive-web-experiences',
    excerpt: 'Learn practical accessibility techniques that improve experiences for everyone. WCAG guidelines, semantic HTML, ARIA patterns, and testing strategies.',
    content: `Accessibility First: Building Inclusive Web Experiences

Accessibility isn't a feature, it's a fundamental requirement. 15% of the world's population has some form of disability. Building accessibly makes better products for everyone.

Why Accessibility Matters

Legal & Business
- ADA, Section 508, EN 301 549 - Legal requirements
- Market size - $13T disposable income (disability market)
- SEO benefits - Semantic HTML = better indexing
- Brand reputation - Inclusion drives loyalty

Ethical
- Human right - UN Convention on Rights of Persons with Disabilities
- Universal design - Curb cuts help everyone
- Aging population - We all become disabled eventually

WCAG 2.1 Quick Reference

Four Principles (POUR)

| Principle | Guidelines | Key Criteria |
|-----------|------------|--------------|
| Perceivable | 1.1-1.4 | Alt text, captions, adaptable, distinguishable |
| Operable | 2.1-2.5 | Keyboard accessible, enough time, seizure safe, navigable |
| Understandable | 3.1-3.3 | Readable, predictable, input assistance |
| Robust | 4.1 | Compatible, parsing |

Conformance Levels

- A - Minimum (blocks access)
- AA - Standard (most regulations target this)
- AAA - Enhanced (specialized audiences)

Semantic HTML Foundation

Landmarks

<body>
  <header>Site header</header>
  <nav>Primary navigation</nav>
  <main>
    <article>
      <header>Article header</header>
      <section>Content section</section>
    </article>
    <aside>Sidebar</aside>
  </main>
  <footer>Site footer</footer>
</body>

Heading Hierarchy

<h1>Page Title</h1>
  <h2>Section</h2>
    <h3>Subsection</h3>
    <h3>Subsection</h3>
  <h2>Section</h2>

Rules:
- One <h1> per page
- No skipping levels
- Use for structure, not styling

Lists & Navigation

<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/blog">Blog</a></li>
  </ul>
</nav>

<ul>
  <li>Unordered list item</li>
</ul>

<ol>
  <li>Ordered step 1</li>
  <li>Ordered step 2</li>
</ol>

Images & Media

Alt Text Decision Tree

1. Decorative - alt="" (empty, not missing!)
2. Informative - Concise description
3. Functional (links/buttons) - Describe action
4. Complex (charts/infographics) - Summary + long description

<!-- Decorative -->
<img src="divider.png" alt="" role="presentation">

<!-- Informative -->
<img src="chart.png" alt="Bar chart showing 40% increase in Q3">

<!-- Functional -->
<a href="/settings"><img src="gear.svg" alt="Settings"></a>

<!-- Complex -->
<figure>
  <img src="complex-chart.png" alt="Revenue growth chart, detailed data in table below">
  <figcaption>Figure 1: Q3 Revenue Growth</figcaption>
</figure>
<table>...</table>

Video & Audio

<video controls>
  <source src="video.mp4" type="video/mp4">
  <track kind="captions" src="captions.vtt" srclang="en" label="English" default>
  <track kind="descriptions" src="descriptions.vtt" srclang="en" label="Audio Description">
</video>

<audio controls>
  <source src="podcast.mp3" type="audio/mpeg">
  <track kind="captions" src="transcript.vtt" srclang="en">
</audio>

Forms & Interactive Elements

Accessible Form Structure

<form>
  <div>
    <label for="email">Email Address</label>
    <input 
      type="email" 
      id="email" 
      name="email"
      required
      autocomplete="email"
      aria-describedby="email-hint"
    >
    <span id="email-hint">We'll never share your email</span>
  </div>
  
  <fieldset>
    <legend>Preferred Contact Method</legend>
    <label><input type="radio" name="contact" value="email"> Email</label>
    <label><input type="radio" name="contact" value="phone"> Phone</label>
  </fieldset>
  
  <button type="submit">Subscribe</button>
</form>

Error Handling

<div class="error" role="alert" aria-live="assertive">
  <p>Please fix the following errors:</p>
  <ul>
    <li><a href="#email">Email is required</a></li>
  </ul>
</div>

<input 
  id="email" 
  aria-invalid="true" 
  aria-describedby="email-error"
>
<span id="email-error" role="alert">Email is required</span>

ARIA Patterns (When HTML Isn't Enough)

ARIA Roles

<!-- Dialog -->
<div role="dialog" aria-modal="true" aria-labelledby="dialog-title">
  <h2 id="dialog-title">Confirm Delete</h2>
  <button aria-label="Close">X</button>
</div>

<!-- Tabs -->
<div role="tablist" aria-label="Product info">
  <button role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1">Description</button>
  <button role="tab" aria-selected="false" aria-controls="panel-2" id="tab-2">Specs</button>
</div>
<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">...</div>
<div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>...</div>

Live Regions

<!-- Polite: announces when user idle -->
<div aria-live="polite" aria-atomic="true">
  Saved successfully
</div>

<!-- Assertive: interrupts immediately -->
<div aria-live="assertive" role="alert">
  Error: Failed to save
</div>

Keyboard Navigation

Focus Management

/* Never remove outline without replacement */
:focus {
  outline: 2px solid #0ea5e9;
  outline-offset: 2px;
}

/* Custom focus visible */
:focus:not(:focus-visible) {
  outline: none;
}

:focus-visible {
  outline: 2px solid #0ea5e9;
  outline-offset: 2px;
}

Skip Links

<a href="#main" class="skip-link">Skip to main content</a>
<main id="main">...</main>

<style>
.skip-link {
  position: absolute;
  top: -100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 1rem;
  background: #0ea5e9;
  color: white;
  z-index: 1000;
}
.skip-link:focus {
  top: 1rem;
}
</style>

Focus Trapping (Modals)

function trapFocus(element) {
  const focusable = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  
  element.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
  
  first?.focus();
}

Testing Strategy

Automated Testing

# axe-core integration
npm install @axe-core/react

# In test
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

const { container } = render(<Component />);
const results = await axe(container);
expect(results).toHaveNoViolations();

Manual Testing Checklist

- Tab through entire page
- Screen reader (NVDA, JAWS, VoiceOver)
- Zoom to 200% (no horizontal scroll)
- High contrast mode
- Disable CSS (check reading order)
- Voice control (Dragon, macOS Voice Control)

Tools

| Tool | Purpose |
|------|---------|
| axe DevTools | Browser extension |
| Lighthouse | CI integration |
| WAVE | Visual annotation |
| Color Oracle | Color blindness simulation |
| Screen readers | NVDA (free), JAWS, VoiceOver |

React-Specific Patterns

Accessible Components

// Button with loading state
function Button({ children, loading, ...props }) {
  return (
    <button
      {...props}
      disabled={loading}
      aria-busy={loading}
      aria-disabled={loading}
    >
      {loading ? (
        <>
          <Spinner aria-hidden="true" />
          <span className="sr-only">Loading</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

// Modal with focus management
function Modal({ isOpen, onClose, title, children }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const previousActive = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (isOpen) {
      previousActive.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      // Focus trap logic
    } else {
      document.body.style.overflow = '';
      previousActive.current?.focus();
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div 
        ref={overlayRef}
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="modal-title"
        className="bg-white rounded-xl p-6 max-w-lg w-full mx-4"
      >
        <h2 id="modal-title">{title}</h2>
        {children}
      </div>
    </div>
  );
}

Screen Reader Only Text

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

Color & Contrast

Minimum Ratios (WCAG AA)

- Normal text: 4.5:1
- Large text (18pt+/14pt+ bold): 3:1
- UI components: 3:1
- AAA normal: 7:1
- AAA large: 4.5:1

Don't Rely on Color Alone

<!-- Bad -->
<span class="text-red-500">Error: Invalid input</span>

<!-- Good -->
<span class="text-red-500" role="alert">
  <svg aria-hidden="true"><use href="#alert-icon"></use></svg>
  Error: Invalid input
</span>

Inclusive Design Patterns

Progressive Enhancement

Base experience works everywhere. Enhance for capable browsers.

Responsive Text

html {
  font-size: 100%; /* Respects user preference */
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

@media (prefers-contrast: high) {
  :root {
    --border-color: currentColor;
    --focus-ring: 3px solid;
  }
}

Conclusion

Accessibility is a journey, not a destination. Start with:
1. Semantic HTML
2. Keyboard navigation
3. Color contrast
4. Alt text
5. Form labels

Then layer on ARIA, testing, and advanced patterns.

Every improvement helps real people. Ship accessible code today.

What accessibility challenges have you faced? What tools do you recommend? Share your experiences!`,
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
    category: 'design',
    authorId: 'author-2',
    author: null,
    publishedAt: '2024-02-25T10:00:00Z',
    updatedAt: '2024-02-25T10:00:00Z',
    readingTime: 13,
    likes: 178,
    bookmarks: 234,
    views: 2987,
    comments: [],
    tags: ['accessibility', 'a11y', 'wcag', 'inclusive-design'],
    featured: false,
    status: 'published',
  },
];

export const mockComments = [
  {
    id: 'comment-1',
    postId: 'post-1',
    authorId: 'author-2',
    author: null,
    content: 'Excellent breakdown! The container/presentational pattern has saved our team countless hours of refactoring. Would love to see a follow-up on state management patterns (Zustand vs Redux vs Context).',
    createdAt: '2024-01-16T08:30:00Z',
    likes: 23,
    replies: [],
  },
  {
    id: 'comment-2',
    postId: 'post-1',
    authorId: 'author-3',
    author: null,
    content: 'Great article! One thing I would add: consider using React Server Components for data fetching in Next.js 13+. It eliminates the need for client-side data fetching hooks entirely.',
    createdAt: '2024-01-16T14:22:00Z',
    likes: 18,
    replies: [
      {
        id: 'reply-1',
        postId: 'post-1',
        authorId: 'author-1',
        author: null,
        content: 'Absolutely! RSCs are a game-changer. I am planning a dedicated post on that topic soon. The mental model shift from client-side fetching to server components is significant but worth it.',
        createdAt: '2024-01-16T16:45:00Z',
        likes: 12,
        replies: [],
      },
    ],
  },
  {
    id: 'comment-3',
    postId: 'post-2',
    authorId: 'author-1',
    author: null,
    content: 'This is exactly what I needed for our design system initiative. The token structure example is perfect. Do you recommend Style Dictionary or Tokens Studio for token management?',
    createdAt: '2024-01-21T09:15:00Z',
    likes: 15,
    replies: [],
  },
  {
    id: 'comment-4',
    postId: 'post-3',
    authorId: 'author-4',
    author: null,
    content: 'The architectural intelligence section is spot on. We are already seeing tools that can analyze entire codebases and suggest refactoring. The next 5 years will be wild.',
    createdAt: '2024-01-26T11:00:00Z',
    likes: 34,
    replies: [],
  },
  {
    id: 'comment-5',
    postId: 'post-4',
    authorId: 'author-3',
    author: null,
    content: 'Used this exact framework last month and negotiated a 35% increase! The expand the pie section was crucial, got extra equity and a signing bonus on top of base increase.',
    createdAt: '2024-02-02T13:30:00Z',
    likes: 67,
    replies: [
      {
        id: 'reply-2',
        postId: 'post-4',
        authorId: 'author-4',
        author: null,
        content: 'That is amazing! Congratulations! The equity piece is often where the real money is in tech. Would you be willing to share more about how you approached the equity negotiation?',
        createdAt: '2024-02-02T15:00:00Z',
        likes: 8,
        replies: [],
      },
    ],
  },
];

export const initialData = {
  posts: generateMockPosts(),
  authors: mockAuthors,
  comments: mockComments,
};