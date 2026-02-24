import { useState } from 'react';
import { useSiteSettings } from '@/contexts/SiteSettingsContext';
import type { CustomField } from '@/types';
import { generateId } from '@/lib/utils';
import { Plus, Trash2, Save, Settings } from 'lucide-react';
import toast from 'react-hot-toast';

const FIELD_TYPES: CustomField['type'][] = ['text', 'number', 'date', 'boolean', 'url'];

export function CustomFieldsEditor() {
    const { settings, updateSettings } = useSiteSettings();
    const [fields, setFields] = useState<CustomField[]>([...settings.customFields]);

    const addField = () => {
        setFields([
            ...fields,
            {
                id: generateId(),
                label: '',
                type: 'text',
                value: '',
                campaign: '',
            },
        ]);
    };

    const removeField = (id: string) => {
        setFields(fields.filter((f) => f.id !== id));
    };

    const updateField = (id: string, key: keyof CustomField, value: string) => {
        setFields(fields.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
    };

    const validate = (): boolean => {
        for (const field of fields) {
            if (!field.label.trim()) {
                toast.error('All custom fields must have a label.');
                return false;
            }
            if (!field.value.trim()) {
                toast.error(`Value for "${field.label}" is required.`);
                return false;
            }
        }
        return true;
    };

    const handleSave = () => {
        if (!validate()) return;
        updateSettings({ customFields: fields });
        toast.success('Custom fields saved successfully!');
    };

    // Group fields by campaign
    const campaigns = [...new Set(fields.map((f) => f.campaign).filter(Boolean))];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Custom Fields</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Add dynamic key-value fields for promotional campaigns—no code changes needed.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={addField}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        Add Field
                    </button>
                    <button
                        onClick={handleSave}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-400/20 hover:shadow-blue-400/40 transition-all hover:scale-[1.01] active:scale-[0.99]"
                    >
                        <Save className="w-4 h-4" />
                        Save All
                    </button>
                </div>
            </div>

            {/* Campaign Info */}
            {campaigns.length > 0 && (
                <div className="glass rounded-xl p-4">
                    <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Active Campaigns</h3>
                    <div className="flex flex-wrap gap-2">
                        {campaigns.map((campaign) => (
                            <span key={campaign} className="text-xs font-medium text-blue-400 bg-blue-400/ px-3 py-1 rounded-full">
                                {campaign} ({fields.filter((f) => f.campaign === campaign).length} fields)
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Fields */}
            <div className="space-y-3">
                {fields.map((field, index) => (
                    <div key={field.id} className="glass rounded-xl p-5">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Settings className="w-4 h-4 text-muted-foreground" />
                                <span className="text-xs font-medium text-muted-foreground">Field #{index + 1}</span>
                            </div>
                            <button
                                onClick={() => removeField(field.id)}
                                className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-muted-foreground mb-1">Label *</label>
                                <input
                                    type="text"
                                    value={field.label}
                                    onChange={(e) => updateField(field.id, 'label', e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="e.g. Promo Rate"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-muted-foreground mb-1">Type</label>
                                <select
                                    value={field.type}
                                    onChange={(e) => updateField(field.id, 'type', e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                >
                                    {FIELD_TYPES.map((type) => (
                                        <option key={type} value={type}>
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-muted-foreground mb-1">Value *</label>
                                <input
                                    type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
                                    value={field.value}
                                    onChange={(e) => updateField(field.id, 'value', e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="Field value"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-muted-foreground mb-1">Campaign</label>
                                <input
                                    type="text"
                                    value={field.campaign}
                                    onChange={(e) => updateField(field.id, 'campaign', e.target.value)}
                                    className="w-full px-3 py-2 rounded-lg bg-navy-light border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="e.g. Spring 2026"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {fields.length === 0 && (
                <div className="text-center py-12 glass rounded-xl">
                    <Settings className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground text-sm">No custom fields yet.</p>
                    <p className="text-muted-foreground text-xs mt-1">Add fields for promotional campaigns without changing code.</p>
                </div>
            )}
        </div>
    );
}
