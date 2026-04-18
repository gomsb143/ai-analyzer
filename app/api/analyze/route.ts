import { NextResponse } from 'next/server';

// ─── Types ────────────────────────────────────────────────────────────────────

interface BusinessImpact {
  time_savings: string;
  efficiency: string;
  cost_reduction: string;
  impact: string;
}

interface AnalysisPayload {
  classification: string;
  reasoning: string;
  opportunities: string[];
  implementation_plan: string[];
  business_impact: BusinessImpact;
  mode: string;
}

// ─── Keyword Matchers ─────────────────────────────────────────────────────────

const AI_KEYWORDS =
  /\b(predict|generate|recommend|summarize|insight|nlp|llm|gpt|gemini|chatbot|chat|vision|ml|machine learning|deep learning|neural|classify|detect|analyze documents?|intelligent|ai idea|language model)\b/i;

const AUTO_KEYWORDS =
  /\b(transfer|download|email|copy|paste|move|sync|api|integration|webhook|trigger|workflow|automate|schedule|cron|rpa|zapier|make|n8n|pipeline|etl|batch)\b/i;

// ─── Scenario Definitions ─────────────────────────────────────────────────────

const SCENARIOS: Record<string, Record<string, AnalysisPayload>> = {
  process: {
    ai: {
      classification: 'AI Transformation',
      reasoning:
        'Your process involves tasks requiring cognitive reasoning, pattern recognition, or content generation — ideal for an LLM or ML solution rather than simple rule-based automation.',
      opportunities: [
        'Extract unstructured data automatically using LLM vision/text models.',
        'Generate automated insights and summaries, eliminating manual review.',
        'Implement an intelligent triage system to categorize incoming requests.',
        'Reduce manual human-in-the-loop dependencies by up to 80%.',
        'Enable continuous learning: the model improves with every data cycle.',
      ],
      implementation_plan: [
        'Week 1 – Analysis & Setup: Define AI model parameters, select a foundation model (GPT-4 / Gemini), and establish secure, compliant data pipelines.',
        'Week 2 – Prototype: Build a proof-of-concept AI agent to handle a representative subset of the process; benchmark output quality against manual results.',
        'Week 3 – Integration: Connect the AI service to existing ERP/CRM via secure APIs; add human-in-the-loop guardrails for low-confidence outputs.',
        'Week 4 – Deployment: Roll out to a pilot team, set up accuracy dashboards, collect feedback, and prepare a scaling roadmap.',
      ],
      business_impact: {
        time_savings: '15-20 hrs / week',
        efficiency: '+300% throughput',
        cost_reduction: '$40k–$60k / year',
        impact:
          'Transforms a manual bottleneck into an intelligent, scalable automated workflow with minimal human intervention.',
      },
    },
    automation: {
      classification: 'Workflow Automation',
      reasoning:
        'Your process is highly repetitive and structured. It does not require AI — a robust rules-based integration (Zapier, Make, or a custom API script) will move data between systems reliably and at a fraction of the cost.',
      opportunities: [
        'Eliminate manual data entry and "swivel-chair" processes entirely.',
        'Establish real-time data sync between email, spreadsheets, and ERP.',
        'Standardise data formats at the point of capture to prevent human errors.',
        'Create automated exception alerts that route edge cases to a human reviewer.',
        'Achieve 24/7 operation without adding headcount.',
      ],
      implementation_plan: [
        'Week 1 – Analysis & Setup: Map every data field in scope; audit the API capabilities of each software system involved.',
        'Week 2 – Prototype: Build the first end-to-end automated flow from trigger (e.g., email arrival) to the destination system using no-code or light-code tools.',
        'Week 3 – Integration: Add error handling, retry logic, detailed logging, and edge-case coverage; conduct parallel-run testing against the manual process.',
        'Week 4 – Deployment: Decommission the manual process; train the team on exception handling; monitor for 2 weeks before sign-off.',
      ],
      business_impact: {
        time_savings: '10-15 hrs / week',
        efficiency: '+150% throughput',
        cost_reduction: '$20k–$30k / year',
        impact:
          'Removes tedious data entry, dramatically reduces human error, and frees staff for higher-value strategic tasks.',
      },
    },
    optimize: {
      classification: 'Process Optimisation',
      reasoning:
        'Before applying automation or AI, the core workflow needs to be streamlined. The current steps are disjointed or lack standardisation, which would make any automation brittle and expensive to maintain.',
      opportunities: [
        'Standardise intake forms to enforce consistent, clean data from the start.',
        'Remove redundant approval steps that add delay without adding value.',
        'Consolidate multiple disjointed tools into a single source of truth.',
        'Create clear Standard Operating Procedures (SOPs) and ownership definitions.',
        'Implement basic KPI tracking to establish a baseline before further improvement.',
      ],
      implementation_plan: [
        'Week 1 – Analysis & Setup: Conduct stakeholder interviews; map the as-is value stream and highlight all waste (delays, duplications, handoffs).',
        'Week 2 – Redesign: Design the to-be process flow; identify the minimum policy or tool changes required to implement it.',
        'Week 3 – Configuration: Update internal documentation, intake forms, and tool configurations to support the new workflow.',
        'Week 4 – Deployment: Train the team; run the optimised process in production; measure against the baseline for 30 days.',
      ],
      business_impact: {
        time_savings: '5-10 hrs / week',
        efficiency: '+50% throughput',
        cost_reduction: '$10k–$15k / year',
        impact:
          'Creates a leaner, faster baseline workflow that is ready for future automation or AI scaling.',
      },
    },
  },
  idea: {
    ai: {
      classification: 'AI Transformation – Validated',
      reasoning:
        'Your idea fundamentally relies on generative or predictive capabilities. This is a highly valid use case for modern AI architectures such as LLMs or Retrieval-Augmented Generation (RAG).',
      opportunities: [
        'High Feasibility: Core LLM technology is commercially available and mature.',
        'Data Dependency Risk: Clean, well-structured internal knowledge bases are essential — audit your data estate first.',
        'Security Risk: Implement strict data-privacy guardrails and access controls before any production deployment.',
        'Recommended Architecture: RAG pipeline (document ingestion → vector store → LLM → response).',
        'Quick Win Path: Start with a single high-value document corpus to prove ROI in week 2.',
      ],
      implementation_plan: [
        'Week 1 – Audit & Setup: Inventory available data sources; select cloud AI provider (Azure OpenAI / Google Vertex); establish security boundaries.',
        'Week 2 – Prototype: Build a minimal RAG pipeline on a small document subset; evaluate retrieval accuracy with sample questions.',
        'Week 3 – Integration: Develop the user-facing interface; connect to the AI backend; add feedback mechanisms (👍 / 👎) to capture quality signals.',
        'Week 4 – Beta Deployment: Release to a controlled group of power users; refine retrieval and prompts based on real usage; define the scaling roadmap.',
      ],
      business_impact: {
        time_savings: 'Varies by query volume',
        efficiency: 'Instant knowledge access',
        cost_reduction: 'High ROI potential',
        impact:
          'Empowers every employee with instant, accurate answers — drastically cutting time spent searching for information and reducing dependence on subject-matter experts.',
      },
    },
    automation: {
      classification: 'Workflow Automation (No AI Needed)',
      reasoning:
        'Although framed as an AI idea, this solution is better achieved using standard API integrations and rules-based logic — cheaper, faster to deploy, and easier to maintain than a non-deterministic AI system.',
      opportunities: [
        'High Feasibility: Standard APIs already exist for all required systems.',
        'Cost Risk: Avoid paying per-token AI costs when deterministic logic delivers the same outcome.',
        'Reliability Advantage: Rules-based systems are 100% predictable and easier to debug.',
        'Recommended Architecture: Event-driven serverless functions or an iPaaS platform (Zapier / Make / n8n).',
        'Time to Value: A working prototype can be live within days, not months.',
      ],
      implementation_plan: [
        'Week 1 – Analysis & Setup: Document every trigger, condition, and action in the desired workflow; map the APIs of all involved systems.',
        'Week 2 – Prototype: Build a webhook-based integration connecting the primary systems; validate the happy path end-to-end.',
        'Week 3 – Integration: Implement business rules, data-transformation scripts, error handling, and alerting.',
        'Week 4 – Deployment: Run in parallel with the manual process for one week; validate output parity; then cut over fully.',
      ],
      business_impact: {
        time_savings: 'Predictable & scalable',
        efficiency: 'Near-zero latency',
        cost_reduction: 'Low implementation cost',
        impact:
          'Delivers the exact desired outcome with higher reliability and lower long-term maintenance costs than an equivalent AI solution.',
      },
    },
    optimize: {
      classification: 'Optimisation & Tooling',
      reasoning:
        'The idea describes a need for better software tooling or improved process design — not AI or complex automation. An off-the-shelf SaaS solution or a focused process redesign is the right first move.',
      opportunities: [
        'Feasibility: Extremely high — the problem is well-understood and solved by existing products.',
        'Build vs Buy Risk: Do NOT build custom software; procure an existing, proven solution.',
        'Adoption Risk: Change management and user training are the critical success factors — not technology.',
        'Recommended Approach: Conduct a vendor evaluation (2–3 shortlisted tools) before committing.',
        'Quick Win: Identify the single highest-pain feature and solve only that in the first 30 days.',
      ],
      implementation_plan: [
        'Week 1 – Discovery: Gather precise feature requirements from end-users via workshops; rank them by impact and frequency.',
        'Week 2 – Vendor Evaluation: Demo 2–3 shortlisted SaaS vendors; score against requirements; make a purchase decision.',
        'Week 3 – Configuration & Migration: Configure the selected platform to company standards; migrate initial data; set up SSO/security.',
        'Week 4 – Go-Live & Training: Run company-wide onboarding sessions; establish a help-desk channel; measure adoption at day 30.',
      ],
      business_impact: {
        time_savings: 'Immediate from day 1',
        efficiency: 'Standardised workflow',
        cost_reduction: 'Avoids custom dev costs',
        impact:
          'Delivers a robust, vendor-supported solution rapidly — without accumulating technical debt or internal maintenance burden.',
      },
    },
  },
};

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { mode, input_text } = body as { mode?: string; input_text?: string };

    // Validate inputs
    if (!input_text || typeof input_text !== 'string' || input_text.trim() === '') {
      return NextResponse.json({ error: 'input_text is required and must be a non-empty string.' }, { status: 400 });
    }

    const normalizedMode = mode === 'idea' ? 'idea' : 'process';

    // Classify by keywords (AI keywords take priority over auto keywords)
    let scenarioKey: 'ai' | 'automation' | 'optimize';

    if (AI_KEYWORDS.test(input_text)) {
      scenarioKey = 'ai';
    } else if (AUTO_KEYWORDS.test(input_text)) {
      scenarioKey = 'automation';
    } else {
      scenarioKey = 'optimize';
    }

    const payload: AnalysisPayload = {
      ...SCENARIOS[normalizedMode][scenarioKey],
      mode: normalizedMode,
    };

    return NextResponse.json(payload);
  } catch (error) {
    console.error('[/api/analyze] Unhandled error:', error);
    return NextResponse.json({ error: 'Internal server error. Please try again.' }, { status: 500 });
  }
}
