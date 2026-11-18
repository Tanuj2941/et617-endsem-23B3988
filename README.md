# Pendulum Explorer — ET617 End-Sem 2026

**Exam card:** P5 Inquiry-based Virtual Laboratory · T1 Simple Pendulum · L5 Anxious repeat learner · C3 Mobile-first one-handed. **Identity:** 23B3988.

## Deploy on Vercel
1. Upload `index.html` to your repository root, and `api/coach.js` to the `api` folder.
2. Open https://vercel.com/new and import `Tanuj2941/et617-endsem-23B3988`.
3. Set Framework Preset to **Other**, Root Directory to `./`, and deploy.
4. In Project Settings → Domains, add `et617-23b3988.vercel.app` if available (or another hostname), then redeploy/check.
5. Optional real AI: add `OPENAI_API_KEY` as a Vercel Environment Variable, and redeploy. Never put the key in GitHub or the browser.

The app works without a key and labels a *recorded AI fallback*. Review the serverless AI request/response specification in `api/coach.js`.

## Learning flow
Welcome → Concept → Hypothesis → Experiment → Interpret/revise → 5-question assessment → Summary. About screen and identity footer are available throughout. Learner interactions and progress are stored in browser localStorage and downloadable as JSON.

## Physics assumption
The simulation models an ideal pendulum with T = 2π√(L/g), g = 9.81 m/s², for amplitude 5–25°. A note explains the approximation is less accurate at large angles. Actual periods differ with friction and physical setup.

## Viva walkthrough
**Correct path:** Predict longer length → longer period; run experiment; observe period increases; explain; answer quiz.
**Misconception path:** Predict longer length → shorter period; run experiment; see discrepancy and guiding question; compare lengths; revise; answer quiz. Another misconception is heavier bob → faster swing: adjust mass with fixed length to check.

## AI disclosure
Generative AI was used to draft the app and educational content; it must be included in the AI-use log and reflection. Optional server-side AI generates a Socratic hint from the learner answer and controlled simulation parameters. We check length/relevance/suspicious output patterns before displaying; if unavailable or rejected, a recorded hint is returned and explicitly labelled.
