import { Target, Users, Award, Lightbulb } from 'lucide-react';

const values = [
    {
        icon: Target,
        title: 'Precision',
        description: 'Every financial decision is backed by rigorous analysis and market intelligence.',
    },
    {
        icon: Users,
        title: 'Client-First',
        description: 'Your success is our benchmark. We build lasting relationships, not just transactions.',
    },
    {
        icon: Award,
        title: 'Excellence',
        description: '16 years of delivering best-in-class financial products and advisory services.',
    },
    {
        icon: Lightbulb,
        title: 'Innovation',
        description: 'Leveraging technology to provide faster approvals and smarter lending solutions.',
    },
];

export function AboutSection() {
    return (
        <section id="about" className="py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-navy-light/20 to-background" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        Why Choose <span className="text-gradient">Agile Assets</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        We combine decades of financial expertise with cutting-edge technology
                        to deliver unmatched value to our clients and investors.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value, index) => (
                        <div
                            key={value.title}
                            className="group glass rounded-2xl p-6 text-center hover:bg-white/[0.06] transition-all duration-300 hover:scale-[1.02]"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                                <value.icon className="w-7 h-7 text-gold" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
