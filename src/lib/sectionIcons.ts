import { createElement } from 'react';
import {
    Award, BarChart3, Banknote, BookOpen, Briefcase, Building, Building2, Calculator, Calendar, CheckCircle2, Clock,
    Coffee, Cog, DollarSign, Droplets, Factory, FileCheck, FileText, Flame, Globe, GraduationCap, Handshake,
    Heart, HeartHandshake, HelpCircle, Landmark, Laptop, Layers, Leaf, Lightbulb, Lock, Mail, MapPin, Package,
    Phone, PiggyBank, Recycle, Rocket, Scale, Settings, ShieldCheck, Sparkles, Star, Sun, Target, Thermometer,
    TrendingUp, Truck, Users, Wallet, Wheat, Wind, Wrench, Zap, type LucideIcon, type LucideProps,
} from 'lucide-react';

export const SECTION_ICONS: Record<string, LucideIcon> = {
    Award, BarChart3, Banknote, BookOpen, Briefcase, Building, Building2, Calculator, Calendar, CheckCircle2, Clock,
    Coffee, Cog, DollarSign, Droplets, Factory, FileCheck, FileText, Flame, Globe, GraduationCap, Handshake,
    Heart, HeartHandshake, HelpCircle, Landmark, Laptop, Layers, Leaf, Lightbulb, Lock, Mail, MapPin, Package,
    Phone, PiggyBank, Recycle, Rocket, Scale, Settings, ShieldCheck, Sparkles, Star, Sun, Target, Thermometer,
    TrendingUp, Truck, Users, Wallet, Wheat, Wind, Wrench, Zap,
};

export const SECTION_ICON_NAMES = Object.keys(SECTION_ICONS);

export function getSectionIcon(name: string | undefined, fallback: LucideIcon = Sparkles): LucideIcon {
    return (name && SECTION_ICONS[name]) || fallback;
}

export function SectionIcon({ name, ...props }: LucideProps & { name?: string }) {
    return createElement(getSectionIcon(name), props);
}
