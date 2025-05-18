import { CommandInput } from '@/design-system/components/ui/command';
import React from 'react';

type SearchCommandInputProps = {
  query: string;
  setQuery: (q: string) => void;
};

export const SearchCommandInput: React.FC<SearchCommandInputProps> = ({ query, setQuery }) => (
  <CommandInput
    placeholder="Type a command or search notes..."
    value={query}
    onValueChange={setQuery}
    autoFocus
  />
);
