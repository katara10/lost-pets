import { AdCard } from './AdCard';
import type { Ad } from './types';

interface AdListProps {
  ads: Ad[];
}

export const AdList = ({ ads }: AdListProps) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '24px',
      marginTop: '16px'
    }}>
      {ads.map((ad) => (
        <AdCard key={ad.id} ad={ad} />
      ))}
    </div>
  );
};