
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GLOSSARY_TERMS } from './constants';
import { GlossaryTerm, AIResponse, Category } from './types';
import TermCard from './components/TermCard';
import DefinitionView from './components/DefinitionView';
import { TherapeuticBackground } from './components/TherapeuticBackground';
import { getIFSExplanation } from './services/geminiService';
import { Search, Menu, X, Star, Sparkles, Info, BookOpen, Layers } from 'lucide-react';

const App: React.FC = () => {
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm>(() => {
    const hash = window.location.hash.substring(1);
    const termFromHash = GLOSSARY_TERMS.find(t => t.slug === hash);
    return termFromHash || GLOSSARY_TERMS[0];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<Category>('All');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleResearch = () => {
    if (!searchTerm.trim()) return;
    const customTerm: GlossaryTerm = {
      id: `custom-${Date.now()}`,
      term: searchTerm,
      category: 'Concepts' as Category,
      shortDescription: `AI-powered research for "${searchTerm}"`,
      slug: encodeURIComponent(searchTerm.toLowerCase().replace(/\s+/g, '-')),
      isCustom: true
    };
    setSelectedTerm(customTerm);
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };
  
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('ifs_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [aiResponse, setAiResponse] = useState<AIResponse>({
    definition: '',
    sources: [],
    isLoading: true
  });

  const categories: Category[] = ['All', 'Favorites', 'Core', 'Protectors', 'Wounded', 'Concepts'];

  useEffect(() => {
    localStorage.setItem('ifs_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter(item => {
      const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = 
        filterCategory === 'All' ? true :
        filterCategory === 'Favorites' ? favorites.includes(item.id) :
        item.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, filterCategory, favorites]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      const termFromHash = GLOSSARY_TERMS.find(t => t.slug === hash);
      if (termFromHash && termFromHash.id !== selectedTerm.id) {
        setSelectedTerm(termFromHash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [selectedTerm.id]);

  useEffect(() => {
    let isMounted = true;
    window.location.hash = selectedTerm.slug;

    const fetchDefinition = async () => {
      setAiResponse(prev => ({ ...prev, isLoading: true, error: undefined }));
      const result = await getIFSExplanation(selectedTerm.term);
      if (isMounted) {
        setAiResponse(result);
      }
    };

    fetchDefinition();

    return () => {
      isMounted = false;
    };
  }, [selectedTerm]);

  return (
    <div className="flex h-screen bg-transparent overflow-hidden font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <TherapeuticBackground />

      {/* Mobile Sidebar Toggle */}
      {!isSidebarOpen && (
          <motion.button 
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSidebarOpen(true)}
            className="fixed bottom-8 right-8 z-50 p-5 bg-indigo-600 text-white rounded-[28px] shadow-2xl md:hidden hover:bg-indigo-700 transition-all flex items-center space-x-2"
          >
            <Layers className="w-6 h-6" />
            <span className="text-xs font-bold uppercase tracking-widest">Index</span>
          </motion.button>
      )}

      {/* Sidebar Navigation */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside 
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed md:relative inset-y-0 left-0 z-40 w-80 md:w-96 bg-white/70 backdrop-blur-3xl border-r border-indigo-100/30 flex flex-col shadow-[20px_0_40px_rgba(0,0,0,0.02)]"
          >
            <div className="p-10 pb-6 flex justify-between items-start">
              <div>
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-2 mb-1"
                >
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                  <p className="text-[9px] text-indigo-500 font-black uppercase tracking-[0.4em]">Systemic Index</p>
                </motion.div>
                <h2 className="text-4xl font-serif font-bold text-slate-900 tracking-tighter">Harmony</h2>
              </div>
              <button 
                onClick={() => setIsSidebarOpen(false)} 
                className="md:hidden p-2 text-slate-400 hover:text-indigo-600 transition-colors bg-slate-50 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-8 py-4 space-y-8">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Query internal parts..."
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border-2 border-transparent rounded-2xl text-sm font-medium focus:outline-none focus:bg-white focus:border-indigo-400 transition-all shadow-inner placeholder:text-slate-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleResearch()}
                />
                {searchTerm.trim() && (
                  <button 
                    onClick={handleResearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                    title="Research this concept"
                  >
                    <Sparkles className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all flex items-center space-x-2 ${
                      filterCategory === cat 
                        ? 'bg-slate-900 text-white shadow-xl shadow-slate-200 scale-105' 
                        : 'bg-white/50 text-slate-400 hover:bg-white border border-slate-100'
                    }`}
                  >
                    {cat === 'Favorites' && <Star className={`w-3 h-3 ${filterCategory === 'Favorites' ? 'fill-white' : ''}`} />}
                    <span>{cat}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-8 pb-10 space-y-4 custom-scrollbar">
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredTerms.length > 0 ? (
                  filteredTerms.map((term, i) => (
                    <motion.div
                      key={term.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <TermCard
                        term={term}
                        isActive={selectedTerm.id === term.id}
                        isFavorite={favorites.includes(term.id)}
                        onClick={() => {
                          setSelectedTerm(term);
                          if (window.innerWidth < 768) setIsSidebarOpen(false);
                        }}
                        onToggleFavorite={(e) => toggleFavorite(term.id, e)}
                      />
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-24 px-6 bg-slate-50/50 rounded-[40px] border border-dashed border-slate-200"
                  >
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                      <Search className="w-8 h-8 text-slate-200" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 mb-2">No Parts Found</h4>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-[200px] mx-auto mb-6">This concept hasn't been indexed in the primary glossary yet.</p>
                    {searchTerm.trim() && (
                      <button 
                        onClick={handleResearch}
                        className="w-full px-6 py-4 bg-indigo-600 text-white rounded-2xl text-xs font-bold hover:bg-indigo-700 transition-all flex items-center justify-center space-x-2 shadow-xl shadow-indigo-100"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>AI Research "{searchTerm}"</span>
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="p-8 border-t border-indigo-50/50 bg-white/40 sticky bottom-0">
              <button 
                onClick={() => {
                  const randomTerm = GLOSSARY_TERMS[Math.floor(Math.random() * GLOSSARY_TERMS.length)];
                  setSelectedTerm(randomTerm);
                }}
                className="w-full py-4 px-6 bg-white border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:border-indigo-500 hover:text-indigo-600 transition-all flex items-center justify-center space-x-3 shadow-sm group active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-indigo-400 group-hover:text-indigo-600 transition-all group-hover:rotate-12" />
                <span>Random Access</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative custom-scrollbar">
        <div className="max-w-4xl mx-auto px-8 py-16 md:px-20 md:py-32 min-h-full flex flex-col">
          <div className="flex-1">
            <DefinitionView term={selectedTerm} aiData={aiResponse} />
          </div>

          {/* Footer Info */}
          <footer className="mt-32 pt-16 border-t border-indigo-100/50 text-center relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 bg-slate-50/50 backdrop-blur-sm">
                <div className="flex items-center space-x-4 opacity-30">
                  <BookOpen className="w-3.5 h-3.5" />
                  <div className="h-[1px] w-8 bg-slate-400" />
                  <Sparkles className="w-3.5 h-3.5" />
                  <div className="h-[1px] w-8 bg-slate-400" />
                  <Info className="w-3.5 h-3.5" />
                </div>
            </div>
            <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.4em] mb-2 opacity-60">
              Internal Harmony &bull; IFS Systemic Index &bull; Est. 2026
            </p>
            <p className="text-[8px] text-slate-300 font-bold uppercase tracking-widest italic">
              "All Parts Are Welcome"
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default App;
