import React, { useState, useContext } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { INITIAL_NODES } from '../constants';
import { SpilnoNodeData, NodeCategory } from '../types';
import { LangContext } from '../contexts';
import { t } from '../i18n';
import Header from './Header';

const CAT_ACCENT: Record<NodeCategory, string> = {
  [NodeCategory.CENTER]:   'border-yellow-500 text-yellow-300',
  [NodeCategory.WHY]:      'border-blue-500 text-blue-400',
  [NodeCategory.WHAT]:     'border-indigo-500 text-indigo-400',
  [NodeCategory.REMEMBER]: 'border-sky-500 text-sky-400',
  [NodeCategory.COCREATE]: 'border-green-500 text-green-400',
  [NodeCategory.REBUILD]:  'border-amber-500 text-amber-400',
  [NodeCategory.WHO]:      'border-purple-500 text-purple-400',
  [NodeCategory.HOW]:      'border-pink-500 text-pink-400',
  [NodeCategory.WHERE]:    'border-cyan-500 text-cyan-400',
};

const MobileAccordion: React.FC = () => {
  const { lang } = useContext(LangContext);
  const [open, setOpen] = useState<string | null>(null);

  const depth1 = INITIAL_NODES.filter(n => n.data.depth === 1);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-auto">
      <div className="p-4 pt-0">
        <div className="pt-4 mb-6">
          <Header />
        </div>
        <div className="mt-36 px-1">
          <p className="text-xs text-slate-500 mb-4 text-center">{t('mobileNote', lang)}</p>
          <div className="space-y-2">
            {depth1.map(branch => {
              const acc = CAT_ACCENT[branch.data.category];
              const isOpen = open === branch.id;
              const leaves = INITIAL_NODES.filter(n => n.data.depth === 2 && n.data.branchId === branch.id);
              const subBranches = INITIAL_NODES.filter(n => n.data.depth === 1 && (
                (branch.id === 'what' && ['remember','cocreate','rebuild'].includes(n.id))
              ));
              const childItems = branch.id === 'what' ? subBranches : leaves;

              return (
                <div key={branch.id} className={`border border-slate-700 rounded-xl overflow-hidden`}>
                  <button
                    onClick={() => setOpen(isOpen ? null : branch.id)}
                    className="w-full flex items-center justify-between p-4 bg-slate-900/60 hover:bg-slate-800/60 transition-colors text-left"
                  >
                    <div>
                      <div className={`text-xs font-bold uppercase tracking-wider ${acc.split(' ')[1]}`}>
                        {branch.data.label[lang]}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">{branch.data.shortDesc[lang]}</div>
                    </div>
                    {isOpen
                      ? <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      : <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    }
                  </button>
                  {isOpen && (
                    <div className="border-t border-slate-700">
                      <div className="p-3 text-xs text-slate-300 leading-relaxed bg-slate-900/30">
                        {branch.data.inspectorSummary[lang]}
                      </div>
                      {childItems.length > 0 && (
                        <div className="border-t border-slate-800 divide-y divide-slate-800">
                          {childItems.map(child => (
                            <div key={child.id} className="p-3 bg-slate-900/50">
                              <div className={`text-[10px] font-semibold ${acc.split(' ')[1]} mb-0.5`}>
                                {child.data.label[lang]}
                              </div>
                              <div className="text-[10px] text-slate-400">{child.data.shortDesc[lang]}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAccordion;
