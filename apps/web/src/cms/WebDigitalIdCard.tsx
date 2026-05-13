import React from 'react';
import InsuranceCard from '../components/InsuranceCard';

export const WebDigitalIdCard = ({ context }: { context?: any }) => {
  const { member, memberLoading, plan, planLoading } = context || {};
  const isLoading = memberLoading || planLoading || !member;

  return (
    <div className={!isLoading ? '_fadeUp' : ''} style={{ animationDelay: '0.06s', height: '100%' }}>
      <InsuranceCard
        member={member!}
        plan={plan}
        isLoading={isLoading}
      />
    </div>
  );
};
