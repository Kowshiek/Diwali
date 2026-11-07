import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BackgroundEffects from './components/BackgroundEffects';
import MusicPlayer from './components/MusicPlayer';
import NavigationDots from './components/NavigationDots';
import IntroScreen from './components/IntroScreen';
import WelcomeScreen from './components/WelcomeScreen';
import CouplePoster from './components/CouplePoster';
import LoveLetter from './components/LoveLetter';
import PromiseScreen from './components/PromiseScreen';
import FinalSurprise from './components/FinalSurprise';
import { diwaliAudio } from './utils/audioEngine';

export default function App() {
  // Step tracker (1 to 6)
  const [currentScreen, setCurrentScreen] = useState(() => {
    const saved = localStorage.getItem('km_current_screen');
    const parsed = parseInt(saved, 10);
    return parsed >= 1 && parsed <= 6 ? parsed : 1;
  });

  const [hasStarted, setHasStarted] = useState(() => {
    return currentScreen > 1;
  });

  // Save progress so refresh doesn't break her experience
  useEffect(() => {
    localStorage.setItem('km_current_screen', currentScreen.toString());
  }, [currentScreen]);

  const handleOpenSurprise = () => {
    setHasStarted(true);
    setCurrentScreen(2);
  };

  const handleNextScreen = () => {
    setCurrentScreen((prev) => Math.min(prev + 1, 6));
  };

  const handleRestart = () => {
    diwaliAudio.playRomanticChime();
    setCurrentScreen(1);
    setHasStarted(false);
    localStorage.setItem('km_current_screen', '1');
  };

  const handleSelectStep = (step) => {
    diwaliAudio.playRomanticChime();
    setCurrentScreen(step);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#270811] text-[#FFF4DF] overflow-x-hidden selection:bg-[#D4AF37] selection:text-[#270811]">
      {/* Background Animated Golden Particles & Rose Petals */}
      <BackgroundEffects showPetals={true} />

      {/* Floating Romantic Music Player */}
      <MusicPlayer />

      {/* Main Screen Transition Container */}
      <main className="relative z-10 w-full min-h-screen flex flex-col justify-center items-center pb-12">
        <AnimatePresence mode="wait">
          {currentScreen === 1 && (
            <motion.div
              key="screen-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <IntroScreen onOpenSurprise={handleOpenSurprise} />
            </motion.div>
          )}

          {currentScreen === 2 && (
            <motion.div
              key="screen-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <WelcomeScreen onNext={handleNextScreen} />
            </motion.div>
          )}

          {currentScreen === 3 && (
            <motion.div
              key="screen-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <CouplePoster onNext={handleNextScreen} />
            </motion.div>
          )}

          {currentScreen === 4 && (
            <motion.div
              key="screen-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <LoveLetter onNext={handleNextScreen} />
            </motion.div>
          )}

          {currentScreen === 5 && (
            <motion.div
              key="screen-5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <PromiseScreen onNext={handleNextScreen} />
            </motion.div>
          )}

          {currentScreen === 6 && (
            <motion.div
              key="screen-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <FinalSurprise
                onRestart={handleRestart}
                onGoToPoster={() => handleSelectStep(3)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Floating Navigation Dots */}
      <NavigationDots
        currentStep={currentScreen}
        onSelectStep={handleSelectStep}
        unlocked={hasStarted}
      />
    </div>
  );
}
