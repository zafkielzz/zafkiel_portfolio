import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BootSequence } from './components/BootSequence';
import { AmbientEffects } from './components/AmbientEffects';
import { Dock } from './components/Dock';
import { CommandPalette } from './components/CommandPalette';
import { FooterPanel } from './components/FooterPanel';

import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { PhotosPage } from './pages/PhotosPage';
import { PartnersPage } from './pages/PartnersPage';
import { LibraryPage } from './pages/LibraryPage';
import { ContactPage } from './pages/ContactPage';
import { PostDetailPage } from './pages/PostDetailPage';

export const App: React.FC = () => {
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  return (
    <BrowserRouter>
      {/* Cinematic Boot sequence loader */}
      <BootSequence />

      {/* Trailing glow cursor, scroll progress, back-to-top */}
      <AmbientEffects />

      {/* Floating dock navigation */}
      <Dock onOpenCommand={() => setIsCommandOpen(true)} />

      {/* Command Palette (Cmd + K) */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />

      {/* Page Routing */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<ProjectsPage />} />
        <Route path="/work/:slug" element={<ProjectDetailPage />} />
        <Route path="/photos" element={<PhotosPage />} />
        <Route path="/partners" element={<PartnersPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/posts/:slug" element={<PostDetailPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>

      {/* System Technical Footer Panel */}
      <FooterPanel />
    </BrowserRouter>
  );
};

export default App;
