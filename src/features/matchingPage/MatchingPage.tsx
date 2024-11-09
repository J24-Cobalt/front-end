import React, { useState, useRef, useMemo } from 'react';
import { Box, Button, Typography } from '@mui/material';
import TinderCard from 'react-tinder-card';
import Confetti from 'react-confetti';
import AnonymizedUserProfile from './components/AnoymizedUserProfile';
import './MatchingPage.css';

const profiles = [
  {
    name: 'John Doe',
    title: 'Senior Software Engineer',
    priorities: 'Deliver high-quality code, mentor team members, and improve software performance.',
    experience: 'Over 8 years of experience in full-stack development, focusing on React, Node.js, and cloud solutions.',
    skills: 'JavaScript, React, Node.js, TypeScript, AWS, Docker, GraphQL, and CI/CD practices.',
    education: 'Bachelor’s Degree in Computer Science from XYZ University, with a specialization in software engineering.',
  },
  {
    name: 'Jane Smith',
    title: 'Product Manager',
    priorities: 'Lead product development, ensure customer satisfaction, and drive innovation.',
    experience: 'Over 5 years of experience in product management, focusing on agile methodologies and user-centered design.',
    skills: 'Product Management, Agile, Scrum, UX/UI Design, Market Research, and Data Analysis.',
    education: 'Master’s Degree in Business Administration from ABC University, with a specialization in product management.',
  },
  // Add more profiles here if needed
];

export default function MatchingPage() {
  const [currentIndex, setCurrentIndex] = useState(profiles.length - 1);
  const [lastDirection, setLastDirection] = useState<string | undefined>();
  const [showConfetti, setShowConfetti] = useState(false);
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(profiles.length)
        .fill(0)
        .map(() => React.createRef<any>()),
    []
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < profiles.length - 1;
  const canSwipe = currentIndex >= 0;

  const swiped = (direction: string, nameToDelete: string, index: number) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    if (direction === 'right') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); // Show confetti for 3 seconds
    }
  };

  const outOfFrame = (name: string, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    currentIndexRef.current >= idx && (childRefs[idx].current as any)?.restoreCard?.();
  };

  const swipe = async (dir: 'left' | 'right') => {
    if (canSwipe && currentIndex < profiles.length) {
      const card = childRefs[currentIndex].current;
      if (card && typeof card === 'object' && 'swipe' in card) {
        await (card as any).swipe(dir);
      } else {
        console.error('Swipe method not found on TinderCard');
      }
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    if (childRefs[newIndex].current) {
      if (childRefs[newIndex].current && typeof childRefs[newIndex].current === 'object' && 'restoreCard' in childRefs[newIndex].current) {
        await (childRefs[newIndex].current as any).restoreCard();
      } else {
        console.error('RestoreCard method not found on TinderCard');
      }
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 1200,
        margin: 'auto',
        padding: 4,
        bgcolor: '#f9f9f9',
        boxShadow: 3,
        borderRadius: 2,
        position: 'relative',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}
    >
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={100}
          recycle={false}
          className="fade-out"
        />
      )}
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', maxHeight: '80vh' }}>
        {currentIndex >= 0 ? (
          <div className="cardContainer">
            {profiles.map((profile, index) => (
              <TinderCard
                ref={childRefs[index]}
                className="swipe stackedCard"
                key={profile.name}
                onSwipe={(dir) => swiped(dir, profile.name, index)}
                onCardLeftScreen={() => outOfFrame(profile.name, index)}
                preventSwipe={['up', 'down']}
              >
                <div className="card">
                  <AnonymizedUserProfile profile={profile} />
                </div>
              </TinderCard>
            ))}
          </div>
        ) : (
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            No more profiles
          </Typography>
        )}
      </Box>
      {currentIndex >= 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, position: 'absolute', bottom: 0, width: '100%', maxHeight: '80hv' }}>
          <Button variant="contained" color="secondary" onClick={() => swipe('left')} sx={{ mr: 2 }}>
            Not interested
          </Button>
          <Button variant="contained" color="primary" onClick={() => swipe('right')}>
            Apply
          </Button>
        </Box>
      )}
    </Box>
  );
}
