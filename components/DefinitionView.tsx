
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AIResponse, GlossaryTerm } from '../types';
import { Share2, Check, ExternalLink, Search, Loader2, AlertCircle, Link as LinkIcon, Info, Sparkles, Activity } from 'lucide-react';
import { GLOSSARY_TERMS } from '../constants';
import { SelfLeadershipChart } from './SelfLeadershipChart';
import { SystemDynamicsChart } from './SystemDynamicsChart';

interface DefinitionViewProps {
  term: GlossaryTerm;
  aiData: AIResponse;
}

const DefinitionView: React.FC<DefinitionViewProps> = ({ term, aiData }) => {
  const { definition, sources, isLoading, error } = aiData;
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

  const relatedTermsData = useMemo(() => {
    if (!term.relatedTerms) return [];
    return term.relatedTerms
      .map(slugOrId => GLOSSARY_TERMS.find(t => t.slug === slugOrId || t.id === slugOrId))
      .filter((t): t is GlossaryTerm => !!t);
  }, [term.relatedTerms]);

  const showSelfChart = useMemo(() => {
    const selfTerms = ['the-self', '8-cs', '8-cs-detail', 'self-leadership'];
    return selfTerms.includes(term.slug);
  }, [term.slug]);

  const showDynamicsChart = useMemo(() => {
    const dynamicTerms = ['internal-system', 'self-leadership', 'unburdening', 'polarization'];
    return dynamicTerms.includes(term.slug);
  }, [term.slug]);

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareTitle = `Internal Harmony: ${term.term}`;
    const shareText = `Learn about "${term.term}" in Internal Family Systems (IFS) therapy.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (err) {
        console.error("Could not share using Web Share API:", err);
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch (err) {
      console.error("Failed to copy URL to clipboard:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-12">
        <header className="space-y-6 animate-pulse">
          <div className="flex items-center space-x-3">
            <div className="h-6 bg-slate-200 rounded-full w-24"></div>
            <div className="h-4 bg-slate-100 rounded w-32"></div>
          </div>
          <div className="h-20 bg-slate-200 rounded-3xl w-2/3"></div>
          <div className="h-1.5 bg-indigo-100 rounded-full w-24"></div>
        </header>
        
        <div className="space-y-6 animate-pulse pt-8 flex-1">
          <div className="h-4 bg-slate-200 rounded w-full"></div>
          <div className="h-4 bg-slate-200 rounded w-full"></div>
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          <div className="h-4 bg-slate-200 rounded w-full"></div>
          <div className="h-4 bg-slate-200 rounded w-2/3"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pt-12 flex flex-col items-center justify-center text-slate-400 group"
        >
          <div className="relative mb-6">
             <Loader2 className="w-16 h-16 animate-spin text-indigo-500 opacity-20" />
             <Sparkles className="w-8 h-8 text-indigo-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <p className="italic text-sm font-bold tracking-tight text-indigo-900/40">Unfolding Systemic Wisdom...</p>
          <p className="text-[10px] mt-2 uppercase tracking-widest opacity-40">Powered by Gemini Search Grounding</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-rose-50/50 backdrop-blur-md border border-rose-200 text-rose-700 p-8 rounded-[32px] flex items-start space-x-4 shadow-xl shadow-rose-900/5"
      >
        <AlertCircle className="w-8 h-8 mt-1 flex-shrink-0 text-rose-500" />
        <div>
          <h4 className="font-serif font-bold text-2xl mb-3 tracking-tight">System Interruption</h4>
          <p className="text-rose-600/80 leading-relaxed text-lg">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-white border border-rose-200 hover:bg-rose-50 rounded-2xl text-sm font-bold transition-all shadow-sm hover:shadow-md flex items-center space-x-2"
          >
            <Loader2 className="w-4 h-4" />
            <span>Restore Internal Connection</span>
          </button>
        </div>
      </motion.div>
    );
  }

  const formatText = (text: string) => {
    return text.split('\n').filter(p => p.trim()).map((para, i) => (
      <motion.p 
        key={i}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 + (i * 0.1), duration: 0.6 }}
        className="mb-8 text-slate-700 leading-relaxed text-lg md:text-xl font-light"
      >
        {para}
      </motion.p>
    ));
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={term.id}
        initial={{ opacity: 0, x: 10, filter: 'blur(10px)' }}
        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, x: -10, filter: 'blur(10px)' }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="space-y-12"
      >
        <header>
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm ${term.isCustom ? 'bg-amber-500 text-white' : 'bg-indigo-600 text-white'}`}>
              {term.isCustom ? 'AI Research' : term.category}
            </span>
            <span className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] opacity-60">
              {term.isCustom ? 'Deep Search Exploration' : 'IFS Systemic Index'}
            </span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
            <h1 className="text-5xl md:text-8xl font-serif font-bold text-slate-900 tracking-tighter leading-[0.9]">
              {term.term}
            </h1>
            <button 
              onClick={handleShare}
              className="relative flex-shrink-0 flex items-center justify-center w-full md:w-36 h-14 px-4 text-xs font-bold border-2 rounded-2xl transition-all duration-500 overflow-hidden bg-white border-slate-100 text-slate-500 hover:border-indigo-500 hover:text-indigo-600 group shadow-sm hover:shadow-indigo-500/10"
            >
              <div className={`flex items-center transition-all duration-500 transform ${copyStatus === 'copied' ? '-translate-y-14' : 'translate-y-0'}`}>
                <Share2 className="w-4 h-4 mr-2 opacity-50 group-hover:opacity-100" />
                <span>EXPORT</span>
              </div>
              <div className={`absolute inset-0 flex items-center justify-center bg-indigo-600 text-white transition-all duration-500 transform ${copyStatus === 'copied' ? 'translate-y-0' : 'translate-y-14'}`}>
                <Check className="w-4 h-4 mr-2" />
                <span>SHARED</span>
              </div>
            </button>
          </div>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="h-px bg-gradient-to-r from-indigo-500 via-indigo-200 to-transparent rounded-full opacity-50"
          />
        </header>

        {showSelfChart && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="my-12"
          >
            <SelfLeadershipChart />
          </motion.div>
        )}

        {showDynamicsChart && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="my-12"
          >
            <SystemDynamicsChart />
          </motion.div>
        )}

        <section className="prose prose-slate max-w-none prose-headings:font-serif prose-p:leading-relaxed">
          {formatText(definition)}
        </section>

        {sources.length > 0 && (
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="border-t border-slate-200/60 pt-12 mt-20"
          >
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 flex items-center opacity-60">
              <Search className="w-3.5 h-3.5 mr-3 text-indigo-400" />
              Intelligence Sources & Lineage
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {sources.map((source, idx) => (
                <motion.a 
                  key={idx}
                  href={source.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group flex items-center p-5 rounded-3xl border border-slate-100 bg-white/50 backdrop-blur-sm hover:border-indigo-200 hover:bg-white transition-all shadow-sm hover:shadow-xl hover:shadow-indigo-500/5"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 truncate mb-1">
                      {source.title || 'Therapeutic Resource'}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate font-mono opacity-60 italic">{source.uri}</p>
                  </div>
                  <div className="ml-4 p-2.5 bg-slate-50 rounded-xl group-hover:bg-indigo-50 transition-colors">
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500" />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.section>
        )}

        {relatedTermsData.length > 0 && (
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="border-t border-slate-200/60 pt-12 mt-12"
          >
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 flex items-center opacity-60">
              <LinkIcon className="w-3.5 h-3.5 mr-3 text-indigo-400" />
              Conceptual Constellation
            </h4>
            <div className="flex flex-wrap gap-4">
              {relatedTermsData.map((related) => (
                <motion.a 
                  key={related.id}
                  href={`#${related.slug}`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white border border-slate-100 rounded-2xl text-xs font-bold text-slate-600 hover:border-indigo-500 hover:text-indigo-600 hover:shadow-lg hover:shadow-indigo-500/5 transition-all flex items-center space-x-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-200 group-hover:bg-indigo-500" />
                  <span>{related.term}</span>
                </motion.a>
              ))}
            </div>
          </motion.section>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default DefinitionView;
