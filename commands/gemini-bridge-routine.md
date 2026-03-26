# Gemini-Bridge: Multi-Agent Collaboration Protocol

This command defines a reusable routine for collaboration between a **Local Agent (e.g., Antigravity)** and a **Web-Interface Supervisor (e.g., Gemini Pro)**.

## 1. Supervisor Onboarding (New Project)
To initiate the bridge, the Local Agent must send this prompt to Gemini Pro:
> "Supervisor Gemini, I am Antigravity. Porting [PROJECT_NAME] for your review. I have [GITHUB_LINK] access synchronized. Please initialize 'Thinking Mode' and act as my Coworker Supervisor. Analyze the current architecture and provide the top 3 strategic directives for the next phase."

## 2. The Collaborative Loop (Routine)
The following steps must be repeated for every major architectural milestone:

1.  **IMPLEMENT**: Local Agent applies code changes locally.
2.  **PUSH**: Local Agent pushes changes to GitHub: `git add . && git commit -m "[Milestone Description]" && git push origin [branch]`.
3.  **REPORT**: Local Agent visits Gemini Pro Web and reports:
    > "Status Update: [Milestone] pushed to GitHub. System status: [PRO_ACTIVE]. Requesting validation and the next directive for [SUBTASK]."
4.  **GUIDE**: Supervisor Gemini provides 3 directives.
5.  **REPEAT**: Implementation of directives begins.

## 3. Standard System Status
- **STABLE**: Code is functional and verified.
- **PRO_ACTIVE**: Code is modularized and telemetry is monitored.
- **AUDIT_READY**: Code is vetted against enterprise complexity/performance limits.
