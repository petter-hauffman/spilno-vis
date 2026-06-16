import React, { useState, useContext } from 'react';
import { X, Plus, CheckCircle } from 'lucide-react';
import { LangContext, AuthContext } from '../contexts';
import { t } from '../i18n';
import { addProposal } from '../services/consortiumService';
import { PartnerCategory } from '../types';

interface Props {
  onClose: () => void;
  onSubmitted: () => void;
}

const CATEGORIES: { value: PartnerCategory; labelEn: string }[] = [
  { value: PartnerCategory.LEAD,      labelEn: 'Lead & Coordination' },
  { value: PartnerCategory.TECHNICAL, labelEn: 'Technology' },
  { value: PartnerCategory.FINANCING, labelEn: 'Financing' },
  { value: PartnerCategory.PUBLIC,    labelEn: 'Public Sector' },
  { value: PartnerCategory.CIVIL,     labelEn: 'Civil Society & Academia' },
];

const ProposalForm: React.FC<Props> = ({ onClose, onSubmitted }) => {
  const { lang } = useContext(LangContext);
  const { user } = useContext(AuthContext);
  const [nameEn, setNameEn] = useState('');
  const [nameUk, setNameUk] = useState('');
  const [descEn, setDescEn] = useState('');
  const [category, setCategory] = useState<PartnerCategory>(PartnerCategory.TECHNICAL);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!user || !nameEn.trim()) return;
    setLoading(true);
    setError('');
    try {
      await addProposal({
        submitterId: user.id,
        submitterName: user.name,
        submitterOrg: user.organisation,
        nameEn: nameEn.trim(),
        nameUk: nameUk.trim() || nameEn.trim(),
        descriptionEn: descEn.trim(),
        descriptionUk: '',
        category,
        proposedStatus: 'proposed',
      }, user);
      setSubmitted(true);
      setTimeout(onSubmitted, 1500);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error submitting proposal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <Plus className="w-4 h-4 text-blue-400" />
            <h2 className="font-bold text-white text-sm">{t('proposePartner', lang)}</h2>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <p className="text-sm font-semibold text-white">{t('proposalSent', lang)}</p>
            <p className="text-xs text-slate-400 mt-1">The coordination team will review your proposal.</p>
          </div>
        ) : (
          <div className="p-5 space-y-4">
            {/* Organisation name EN */}
            <div>
              <label className="text-xs text-slate-400 mb-1 block">{t('proposalName', lang)} (EN) *</label>
              <input
                type="text"
                value={nameEn}
                onChange={e => setNameEn(e.target.value)}
                placeholder="Organisation name in English"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Name UK */}
            <div>
              <label className="text-xs text-slate-400 mb-1 block">{t('proposalNameUk', lang)}</label>
              <input
                type="text"
                value={nameUk}
                onChange={e => setNameUk(e.target.value)}
                placeholder="Назва організації українською"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-xs text-slate-400 mb-1 block">{t('proposalCategory', lang)}</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as PartnerCategory)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              >
                {CATEGORIES.map(c => (
                  <option key={c.value} value={c.value}>{c.labelEn}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="text-xs text-slate-400 mb-1 block">{t('proposalDesc', lang)}</label>
              <textarea
                value={descEn}
                onChange={e => setDescEn(e.target.value)}
                placeholder="What value would this partner bring to the consortium?"
                rows={3}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
              />
            </div>

            {error && <p className="text-xs text-red-400">{error}</p>}

            {/* Submitter info */}
            <div className="text-xs text-slate-500 border-t border-slate-700/50 pt-3">
              Submitted by: <span className="text-slate-300">{user?.name}</span>
              {user?.organisation && <span> · {user.organisation}</span>}
            </div>

            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="flex-1 p-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 text-sm transition-colors"
              >
                {t('cancel', lang)}
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading || !nameEn.trim()}
                className="flex-1 p-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? '…' : t('proposalSubmit', lang)}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalForm;
