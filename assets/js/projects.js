/* ==========================================================================
   PROJECT DATA — this is the main file you will edit.
   Add, remove, or reorder objects in the PROJECTS array and both the home page
   and the projects page update automatically.

   Fields
     title     (string)   Project name.
     category  (string)   One of: ai | security | cloud | devops | homelab
                          These drive the filter buttons on projects.html.
                          Adding a new one? Add it to CATEGORY_LABELS below
                          AND add a matching button in projects.html.
     summary   (string)   2-4 sentences. Lead with what it does and the
                          outcome, not a list of tools.
     tags      (string[]) Technologies. Keep to ~5 so cards stay readable.
     repo      (string)   GitHub URL, or "" to hide the Code button.
     link      (string)   Writeup URL — a Medium post or a local
                          writeups/*.html page. "" to hide.
     linkLabel (string)   Text for the `link` button. Defaults to "Read writeup".
     status    ("live" | "wip" | "")  Renders a badge. "" shows nothing.
     starter   (boolean)  true = shows a dashed "write-up in progress" badge.
                          Delete the flag once the entry is genuinely yours.
     featured  (boolean)  true = also shown in Featured strip on index.html.
                          Keep this to 3-4 projects.
   ========================================================================== */

const PROJECTS = [
  {
    title: "VibeMatch AI Concierge — Agentic Music Recommender",
    category: "ai",
    summary:
      "Capstone for CodePath AI-110 (Foundations of AI Engineering), extending my Module 3 recommender into a full applied AI system. A plan → act → check → explain agent: Claude turns a plain-English request into a structured taste profile against a JSON schema whose genre and mood enums are built from the live catalog, a guardrail clamps energy and nulls anything the catalog doesn't contain, and a deterministic engine does the ranking. The LLM never decides which song wins — it only handles language. Ships with an evaluation harness (8/8 checks) and a first-class fallback path, so it runs and passes tests with no API key at all.",
    tags: ["Python", "Claude API", "Structured outputs", "Guardrails", "pytest"],
    repo: "https://github.com/abdurahim50/applied-ai-music-recommender",
    link: "writeups/the-guardrail-that-invented-a-genre.html",
    linkLabel: "Read writeup",
    status: "live",
    featured: true
  },
  {
    title: "Kubernetes Cluster Autoscaler on EKS",
    category: "cloud",
    summary:
      "Terraform-provisioned EKS cluster with the Cluster Autoscaler deployed via Helm, then load-tested with a sample workload to watch nodes actually come and go. Covers the IAM/OIDC service-account wiring that trips most people up, and the CloudWatch signals worth alerting on.",
    tags: ["EKS", "Terraform", "Helm", "CloudWatch", "IAM"],
    repo: "https://github.com/abdurahim50/my-eks-module",
    link: "https://yonghoabdurahim.medium.com/kubernetes-cluster-autoscaler-deployed-on-eks-cluster-4b3a1c2791e5",
    linkLabel: "Read on Medium",
    status: "live",
    featured: true
  },
  {
    title: "HumanGov — Multi-Tenant SaaS on AWS",
    category: "cloud",
    summary:
      "Reusable multi-tenant AWS infrastructure for a state-government SaaS scenario, provisioned end to end with Terraform modules. One module set provisions an isolated stack per tenant — S3, DynamoDB, and compute — so onboarding a new state is a variable change rather than a new codebase.",
    tags: ["Terraform", "AWS", "S3", "DynamoDB", "Multi-tenancy"],
    repo: "https://github.com/abdurahim50",
    link: "https://yonghoabdurahim.medium.com/humangov-deployment-of-a-reusable-saas-multi-tenant-aws-infrastructure-using-terraform-modules-722de6698760",
    linkLabel: "Read on Medium",
    status: "live",
    featured: true
  },
  {
    title: "CI/CD to EKS with Jenkins and AWS CodePipeline",
    category: "devops",
    summary:
      "Automated build-and-deploy path onto EKS using CodePipeline, CodeCommit, and Docker, with Jenkins handling the build stage. Security checks run inside the pipeline rather than alongside it, so a failing scan stops the deploy instead of filing a report nobody reads.",
    tags: ["Jenkins", "CodePipeline", "Docker", "EKS", "Git"],
    repo: "https://github.com/abdurahim50/jenkins_training_docker",
    link: "https://yonghoabdurahim.medium.com/deploy-a-sample-application-onto-eks-cluster-utilizing-aws-ci-cd-code-pipeline-codecommit-aws-81b1b2ea5cde",
    linkLabel: "Read on Medium",
    status: "live",
    featured: false
  },
  {
    title: "AKS + Jenkins + Argo CD GitOps",
    category: "devops",
    summary:
      "Azure Kubernetes Service provisioned with Terraform, images pushed to ACR by Jenkins, and deployments reconciled declaratively by Argo CD. Proves the same GitOps pattern transfers across clouds — the pipeline changes, the delivery model doesn't.",
    tags: ["AKS", "ACR", "Jenkins", "Argo CD", "Terraform"],
    repo: "https://github.com/abdurahim50",
    link: "https://yonghoabdurahim.medium.com/provision-aks-cluster-using-terraform-and-push-the-image-to-acr-using-jenkins-and-use-argocd-cli-36cf3844a979",
    linkLabel: "Read on Medium",
    status: "live",
    featured: false
  },
  {
    title: "Django Real-Estate App on DigitalOcean Kubernetes",
    category: "devops",
    summary:
      "End-to-end deployment of a containerised Django application to a managed DOKS cluster: GitHub Actions for CI, Helm charts for release management, and persistent storage plus managed Postgres behind it.",
    tags: ["DOKS", "GitHub Actions", "Helm", "Django", "Docker"],
    repo: "https://github.com/abdurahim50",
    link: "https://yonghoabdurahim.medium.com/deploy-a-containerized-django-web-based-real-estate-app-to-digital-ocean-kubernetes-cluster-1bf4201c34a2",
    linkLabel: "Read on Medium",
    status: "live",
    featured: false
  },
];

/* --------------------------------------------------------------------------
   Rendering — you normally do not need to touch anything below this line.
   -------------------------------------------------------------------------- */

const CATEGORY_LABELS = {
  ai: "Applied AI",
  security: "Security",
  cloud: "Cloud",
  devops: "DevOps",
  homelab: "Homelab"
};

const ICON_GITHUB =
  '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" width="15" height="15"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>';

const ICON_ARROW =
  '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="15" height="15"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';

/* Pages inside writeups/ set window.PATH_PREFIX = "../" before loading this
   file so relative links keep working from any folder depth. */
const PREFIX = window.PATH_PREFIX || "";

function esc(s) {
  return String(s).replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
  });
}

function projectCard(p) {
  const tags = p.tags.map(function (t) { return '<li class="tag">' + esc(t) + "</li>"; }).join("");

  const badges = [];
  if (p.status) {
    badges.push(
      '<span class="status status--' + p.status + '">' +
      (p.status === "live" ? "Live" : "In progress") + "</span>"
    );
  }
  if (p.starter) {
    badges.push('<span class="status status--starter">write-up in progress</span>');
  }

  const links = [];
  if (p.repo) {
    links.push('<a class="btn btn--ghost" href="' + p.repo + '" rel="noopener">' + ICON_GITHUB + " Code</a>");
  }
  if (p.link) {
    const external = /^https?:/.test(p.link);
    const href = external ? p.link : PREFIX + p.link;
    links.push(
      '<a class="btn btn--ghost" href="' + href + '"' + (external ? ' rel="noopener"' : "") + ">" +
      esc(p.linkLabel || "Read writeup") + " " + ICON_ARROW + "</a>"
    );
  }

  return [
    '<article class="card" data-category="' + p.category + '">',
    '  <div class="card__top">',
    '    <span class="card__cat">' + (CATEGORY_LABELS[p.category] || p.category) + "</span>",
    '    <span style="display:flex;gap:.35rem;flex-wrap:wrap;justify-content:flex-end">' + badges.join("") + "</span>",
    "  </div>",
    "  <h3>" + esc(p.title) + "</h3>",
    "  <p>" + esc(p.summary) + "</p>",
    '  <ul class="tags">' + tags + "</ul>",
    links.length
      ? '  <div class="card__foot"><div class="btn-row" style="margin:0">' + links.join("") + "</div></div>"
      : ""
  ].join("\n") + "\n</article>";
}

function renderProjects() {
  // Featured strip on the home page
  const featuredEl = document.getElementById("featured-projects");
  if (featuredEl) {
    featuredEl.innerHTML = PROJECTS.filter(function (p) { return p.featured; })
      .map(projectCard)
      .join("");
  }

  // Full grid on the projects page
  const gridEl = document.getElementById("project-grid");
  if (!gridEl) return;

  gridEl.innerHTML = PROJECTS.map(projectCard).join("");

  const countEl = document.getElementById("project-count");
  const emptyEl = document.getElementById("project-empty");
  const buttons = document.querySelectorAll("[data-filter]");

  function apply(filter) {
    let shown = 0;
    gridEl.querySelectorAll(".card").forEach(function (card) {
      const match = filter === "all" || card.dataset.category === filter;
      card.hidden = !match;
      if (match) shown++;
    });
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.filter === filter));
    });
    if (countEl) countEl.textContent = shown + " project" + (shown === 1 ? "" : "s");
    if (emptyEl) emptyEl.hidden = shown !== 0;
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      apply(b.dataset.filter);
      history.replaceState(
        null,
        "",
        b.dataset.filter === "all" ? location.pathname : "?filter=" + b.dataset.filter
      );
    });
  });

  // Respect ?filter=cloud in the URL so filtered views are shareable
  const initial = new URLSearchParams(location.search).get("filter");
  apply(initial && CATEGORY_LABELS[initial] ? initial : "all");
}

document.addEventListener("DOMContentLoaded", renderProjects);
