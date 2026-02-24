import { useState } from 'react';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import type { InterestRate } from '@/types';
import { generateId, formatRate } from '@/lib/utils';
import { Plus, Trash2, Save, Star } from 'lucide-react';
import toast from 'react-hot-toast';

export function RatesEditor() {
    const { settings, updateSettings } = useSiteSettings();
    const [rates, setRates] = useState<InterestRate[]>([...settings.interestRates]);

    const addRate = () => {
        setRates([
            ...rates,
            {
                id: generateId(),
                product: '',
                rate: 0,
                term: '',
                featured: false,
                description: '',
            },
        ]);
    };

    const removeRate = (id: string) => {
        setRates(rates.filter((r) => r.id !== id));
    };

    const updateRate = (id: string, field: keyof InterestRate, value: string | number | boolean) => {
        setRates(rates.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
    };

    const validate = (): boolean => {
        for (const rate of rates) {
            if (!rate.product.trim()) {
                toast.error('All products must have a name.');
                return false;
            }
            if (rate.rate <= 0 || rate.rate > 100) {
                toast.error(`Rate for "${rate.product}" must be between 0 and 100.`);
                return false;
            }
            if (!rate.term.trim()) {
                toast.error(`Term for "${rate.product}" is required.`);
                return false;
            }
        }
        return true;
    };

    const handleSave = () => {
        if (!validate()) return;
        updateSettings({ interestRates: rates });
        toast.success('Interest rates saved successfully!');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Interest Rates</h1>
                    <p className="text-sm text-muted-foreground mt-1">Manage lending product rates displayed on the public site.</p>
                </div>
                <button
                    onClick={handleSave}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-400/20 hover:shadow-blue-400/40 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                    <Save className="w-4 h-4" />
                    Save Changes
                </button>
            </div>

            <div className="space-y-4">
                {rates.map((rate, index) => (
                    <div key={rate.id} className="glass rounded-xl p-5">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-medium text-muted-foreground">Product #{index + 1}</span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => updateRate(rate.id, 'featured', !rate.featured)}
                                    className={`p-1.5 rounded-lg transition-colors ${rate.featured ? 'bg-blue-400/ text-blue-400' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}`}
                                    title="Toggle featured"
                                >
                                    <Star className="w-4 h-4" fill={rate.featured ? 'currentColor' : 'none'} />
                                </button>
                                <button
                                    onClick={() => removeRate(rate.id)}
                                    className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                                    title="Remove"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-muted-foreground mb-1">Product Name *</label>
                                <input
                                    type="text"
                                    value={rate.product}
                                    onChange={(e) => updateRate(rate.id, 'product', e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="e.g. Personal Loan"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-muted-foreground mb-1">Rate (%) *</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="100"
                                    value={rate.rate}
                                    onChange={(e) => updateRate(rate.id, 'rate', parseFloat(e.target.value) || 0)}
                                    className="w-full px-3 py-2 rounded-lg bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-muted-foreground mb-1">Term *</label>
                                <input
                                    type="text"
                                    value={rate.term}
                                    onChange={(e) => updateRate(rate.id, 'term', e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="e.g. 12–60 months"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-muted-foreground mb-1">Preview</label>
                                <div className="px-3 py-2 rounded-lg bg-navy-light border border-border text-primary text-sm font-bold">
                                    {formatRate(rate.rate)} APR
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-xs font-medium text-muted-foreground mb-1">Description</label>
                            <input
                                type="text"
                                value={rate.description}
                                onChange={(e) => updateRate(rate.id, 'description', e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="Brief description of this product"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={addRate}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all text-sm font-medium"
            >
                <Plus className="w-4 h-4" />
                Add New Rate Product
            </button>
        </div>
    );
}
