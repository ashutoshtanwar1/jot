import React from 'react';
import ExplorerLayout from '../layouts/ExplorerLayout';

export const Explorer: React.FC<{ isSkeleton?: boolean }> = ({ isSkeleton }) => {
  return <ExplorerLayout isSkeleton={isSkeleton} />;
};
