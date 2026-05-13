import React from 'react';

export const WebHraHero = () => {
  return (
    <section className="mb-12 bg-primary text-white p-12 rounded-3xl relative overflow-hidden">
      <div className="relative z-10">
        <h1 className="font-headline text-5xl font-extrabold tracking-tight mb-4">
          Health Risk Assessment
        </h1>
        <p className="text-xl opacity-90 max-w-2xl leading-relaxed">
          Complete your annual assessment to help us personalize your care plan and identify potential health risks early.
        </p>
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
    </section>
  );
};

export const WebHraAssessmentForm = () => {
  return (
    <div className="bg-white p-10 rounded-3xl border border-outline-variant/30 shadow-sm">
      <h3 className="text-2xl font-bold text-primary mb-8">2026 Annual Assessment</h3>
      
      <div className="space-y-10">
        <div className="space-y-4">
          <p className="text-lg font-bold text-on-surface">1. How would you describe your overall health?</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Excellent', 'Very Good', 'Good', 'Fair'].map(option => (
              <button key={option} className="py-4 px-6 border-2 border-outline-variant/30 rounded-xl hover:border-primary hover:bg-primary/5 transition-all font-bold text-primary">
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-lg font-bold text-on-surface">2. Do you have any difficulty with daily activities?</p>
          <div className="flex gap-4">
            {['Yes', 'No'].map(option => (
              <button key={option} className="py-4 px-12 border-2 border-outline-variant/30 rounded-xl hover:border-primary hover:bg-primary/5 transition-all font-bold text-primary">
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-outline-variant/30">
          <button className="bg-primary text-white px-12 py-5 rounded-2xl font-bold text-xl hover:shadow-xl transition-all">
            Submit Assessment
          </button>
        </div>
      </div>
    </div>
  );
};
