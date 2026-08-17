import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Hero from '@/screens/Hero';
import TeamHub from '@/screens/TeamHub';
import MemberPage from '@/screens/MemberPage';

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Hero />} />
        <Route path="/team" element={<TeamHub />} />
        <Route path="/member/:id" element={<MemberPage />} />
      </Routes>
    </AnimatePresence>
  );
}
