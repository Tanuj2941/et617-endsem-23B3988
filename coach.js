// Optional server-side AI educational feedback. Configure OPENAI_API_KEY in Vercel.
// When absent, the app still runs with a clearly labelled recorded fallback.
const fallback='Try changing just one variable. Hold length steady and change mass: the time period stays the same. Now change length. What happened? Revise your idea using this observation.';
module.exports=async function handler(req,res){
  res.setHeader('Content-Type','application/json; charset=utf-8');
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST')return res.status(405).json({error:'Use POST'});
  const b=req.body||{};
  if(!process.env.OPENAI_API_KEY)return res.status(200).json({mode:'fallback',feedback:fallback});
  const answer=String(b.answer||'').slice(0,500);
  const length=Number(b.experiment?.length);
  if(!answer||!Number.isFinite(length)||length<.3||length>2)return res.status(400).json({error:'Invalid data'});
  const system=`You are a kind, concise physics tutor for an anxious class 9 learner. Offer one short, supportive Socratic hint (under 55 words), not the final answer. Topic: ideal simple pendulum at small angles; T = 2π sqrt(L/g). Length increases period; bob mass has no effect; small-angle amplitude is approximately irrelevant. The learner may incorrectly believe heavier bobs swing faster or longer strings swing faster. Ground the hint in the supplied experiment. No unrelated content, no personal data requests. Do not pretend the simulation proves real-world precision.`;
  try{
    const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),6500);
    const response=await fetch('https://api.openai.com/v1/chat/completions',{method:'POST',signal:controller.signal,headers:{'Content-Type':'application/json','Authorization':`Bearer ${process.env.OPENAI_API_KEY}`},body:JSON.stringify({model:process.env.OPENAI_MODEL||'gpt-4o-mini',temperature:.2,max_tokens:105,messages:[{role:'system',content:system},{role:'user',content:JSON.stringify({answer,experiment:b.experiment,learner:'anxious repeat learner'})}]})});clearTimeout(timeout);
    if(!response.ok)throw Error('AI unavailable');const d=await response.json();
    const feedback=d.choices?.[0]?.message?.content?.trim();
    if(typeof feedback!=='string'||feedback.length<15||feedback.length>500||/https?:\/\/|api.?key|ignore (all|previous)|system prompt/i.test(feedback))throw Error('AI output failed safety/length checks');
    return res.status(200).json({mode:'live',feedback});
  }catch{return res.status(200).json({mode:'fallback',feedback:fallback});}
};
