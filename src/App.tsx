import { ExplorerProvider } from './components/explorer/explorer-context';
import { MainAppLayout } from './components/layouts/MainAppLayout';
import { SearchCommandModal } from './components/SearchCommandModal';
import { ThemeProvider } from './components/theme/theme-provider';

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <ExplorerProvider>
        <MainAppLayout />
        <SearchCommandModal />
      </ExplorerProvider>
    </ThemeProvider>
  );
}

export default App;
