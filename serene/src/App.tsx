import { Hero } from './components/Hero';
import { QuoteSection } from './components/QuoteSection';

export function App() {
  return (
    <div className="w-full min-h-screen bg-[#0a0608]">
      <Hero />
      <QuoteSection />
    </div>
  );
}

export default App;
