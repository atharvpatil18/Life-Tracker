import React, { useState, useEffect } from 'react';
import { Bot, Send, Sparkles, AlertCircle, RefreshCw, MessageSquare } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function AICoach({ state }) {
  const apiKey = state.settings.geminiApiKey;
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: `Hello Atharv. I am your Gemini-powered personal growth coach. I have indexed your current academics (10.0 CGPA), LeetCode count (${state.dsaMetrics.solvedCount} solved), project portfolios (CrowdSense progress at ${state.projects.find(p=>p.id==='p2')?.progress}%), and habit streaks. How can I guide your focus today?` 
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);

  // Auto-generate weekly recap on load if connected
  const generateAutomaticRecap = async () => {
    if (!apiKey) return;
    
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `
        You are the personal AI Coach inside AtharvOS, a comprehensive life tracking app for Atharv Patil, an SRM CSE engineering student.
        Here is his active database state:
        - Academics: CGPA ${state.academicMetrics.cgpa}, Target ${state.academicMetrics.targetCgpa}. Subjects: ${JSON.stringify(state.academicMetrics.subjects)}
        - DSA Solved: ${state.dsaMetrics.solvedCount} total (Easy: ${state.dsaMetrics.solvedEasy}, Medium: ${state.dsaMetrics.solvedMedium}, Hard: ${state.dsaMetrics.solvedHard}). Topic masteries: ${JSON.stringify(state.dsaMetrics.topicMastery)}
        - Research: Papers Read ${state.aimlMetrics.papersReadCount}, Models Built ${state.aimlMetrics.modelsBuilt}, Datasets Cleaned ${state.aimlMetrics.datasetsExplored}, Current Focus: "${state.aimlMetrics.currentFocus}"
        - Career: Resume Score ${state.careerMetrics.resumeScore}%, Open Source PRs: ${state.careerMetrics.openSourcePrs}, LinkedIn posts this week: ${state.careerMetrics.linkedinPostsThisWeek}
        - Leadership: conducting ${state.leadershipMetrics.eventsConducted} events at SRM ACM SIGCHI Chapter, impacting ${state.leadershipMetrics.participantsImpacted}+ students.
        - Core Habits Streaks: ${JSON.stringify(state.habits.map(h => ({ name: h.name, streak: h.streak })))}
        - Recent Journal Logs: ${JSON.stringify(state.journal.slice(0, 3).map(j => ({ content: j.content, date: j.date })))}
        - Decisions pending outcome: ${JSON.stringify(state.decisions.filter(d => !d.checked))}
        
        Write a concise, high-impact growth recap. 
        Structure it in 3 short sections:
        1. WINS THIS WEEK (e.g. highlight coding streaks, paper counts, completed projects).
        2. VULNERABILITIES & SLUMPS (e.g. point out subjects below 80% health like ML or OS, sleep slips, or lagging research model exploration).
        3. DACTYL ACTION ITEMS FOR NEXT WEEK (provide 3 hyper-specific, actionable recommendations to balance his career and life).
        
        Keep the tone highly professional, encouraging, analytical, and hacker-cybernetic. Do not use generic filler words. Speak directly to Atharv.
      `;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: text }
      ]);
    } catch (e) {
      console.error(e);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "Failed to generate weekly recap. Check your Gemini API connection." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg = inputVal;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInputVal('');
    setLoading(true);

    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        // Build prompt with complete context parameters
        const prompt = `
          You are the personal AI Coach inside AtharvOS for Atharv Patil, a CSE SRM student.
          Here is his current OS state parameters:
          - CGPA: ${state.academicMetrics.cgpa}
          - LeetCode Solved: ${state.dsaMetrics.solvedCount}
          - CrowdSense Progress: ${state.projects.find(p=>p.id==='p2')?.progress}%
          - Habits Streaks: ${JSON.stringify(state.habits.map(h => ({ name: h.name, streak: h.streak })))}
          
          The user asks: "${userMsg}"
          
          Respond directly to him. Provide highly data-driven, personal advice based on his state parameters if relevant. Keep it under 150 words. Be concise and sharp.
        `;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        setMessages(prev => [...prev, { role: 'assistant', content: text }]);
      } catch (err) {
        console.error(err);
        setMessages(prev => [...prev, { role: 'assistant', content: "Error processing query with Gemini core. Review your API key validity in Settings." }]);
      } finally {
        setLoading(false);
      }
    } else {
      // Local simulated response fallback engine
      setTimeout(() => {
        let reply = "I am currently running in Local Simulation Mode. Please enter your Gemini API Key in the Settings tab to activate true machine learning reasoning! \n\nBased on your database, your LeetCode solved count is outstanding, but Operating Systems lecture attendance (68%) is a critical node. Prioritize attendance this week.";
        
        if (userMsg.toLowerCase().includes('dsa') || userMsg.toLowerCase().includes('leetcode')) {
          reply = `You have solved ${state.dsaMetrics.solvedCount} questions. Your DP mastery is currently at 45% while Arrays are at 90%. I suggest focusing your next 3 LeetCode sessions on Dynamic Programming on LeetCode to balance your profile.`;
        } else if (userMsg.toLowerCase().includes('research') || userMsg.toLowerCase().includes('paper')) {
          reply = `Your CrowdSense ML research project is at ${state.projects.find(p=>p.id==='p2')?.progress}% progress. You have read ${state.aimlMetrics.papersReadCount} papers. Try allocating two distinct 2-hour blocks this week to finalize the model compilation layers.`;
        }

        setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="animate-pop-up" style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: 'calc(100vh - 100px)' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bot size={28} color="var(--area-research)" /> AI Coach & Insights
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
            Leverage Gemini 1.5/2.5 intelligence grids to parse your habits, completed tasks, and reflection journal.
          </p>
        </div>

        {apiKey && (
          <button 
            onClick={generateAutomaticRecap} 
            disabled={loading}
            className="cyber-btn"
            style={{ fontSize: '0.85rem', padding: '8px 16px' }}
          >
            <Sparkles size={16} color="var(--area-research)" /> Generate Growth Review Recap
          </button>
        )}
      </div>

      {/* API Key warning alert */}
      {!apiKey && (
        <div className="glass-panel" style={{ padding: '12px 16px', display: 'flex', gap: '10px', alignItems: 'center', borderColor: 'rgba(245, 158, 11, 0.3)', background: 'rgba(245, 158, 11, 0.03)' }}>
          <AlertCircle size={18} color="#f59e0b" style={{ flexShrink: 0 }} />
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
            <strong>Local Simulator Mode Active:</strong> Add your <strong>Gemini API Key</strong> in the <strong>Settings & APIs</strong> tab to empower your coach with live model summaries and customized Q&A.
          </p>
        </div>
      )}

      {/* Chat View Box */}
      <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* Messages pane */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              style={{ 
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                background: msg.role === 'user' ? 'rgba(194, 65, 12, 0.05)' : 'rgba(124, 58, 237, 0.05)',
                border: msg.role === 'user' ? '1px solid rgba(194, 65, 12, 0.15)' : '1px solid rgba(124, 58, 237, 0.15)',
                color: 'var(--color-text-primary)',
                padding: '12px 16px',
                borderRadius: msg.role === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
                fontSize: '0.9rem',
                lineHeight: '1.5',
                whiteSpace: 'pre-wrap',
                fontFamily: msg.role === 'user' ? 'var(--font-sans)' : 'var(--font-sans)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.65rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', tracking: '0.05em', marginBottom: '6px' }}>
                {msg.role === 'user' ? "Atharv" : "Gemini Coach"}
              </div>
              {msg.content}
            </div>
          ))}
          
          {loading && (
            <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--color-text-secondary)', padding: '12px 16px', background: 'var(--color-bg-base)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              <RefreshCw size={14} className="animate-float" /> Gemini model is analyzing life parameters...
            </div>
          )}
        </div>

        {/* Input box */}
        <form onSubmit={handleSendMessage} style={{ padding: '16px', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '12px', background: 'rgba(0, 0, 0, 0.01)' }}>
          <input 
            type="text" 
            placeholder="Ask your coach anything (e.g. How can I balance LeetCode prep with research?)..." 
            className="cyber-input"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            disabled={loading}
          />
          <button 
            type="submit" 
            className="cyber-btn cyber-btn-primary"
            style={{ padding: '12px 20px' }}
            disabled={loading}
          >
            <Send size={16} /> Send
          </button>
        </form>

      </div>

    </div>
  );
}
