import React, { useState, useRef, useMemo } from 'react';
import { Box, Button, Typography } from '@mui/material';
import TinderCard from 'react-tinder-card';
import Confetti from 'react-confetti';
import AnonymizedUserProfile from './components/AnoymizedUserProfile';
import './MatchingPage.css';
import { styled } from '@mui/system';

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  fontSize: '1rem',
  fontWeight: 'bold',
  textTransform: 'none',
}));

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
      bgcolor: '#f9f9f9',
      boxShadow: 3,
      borderRadius: 2,
      margin: '2px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      overflow: 'hidden',
      flex: 1,
      }}
    >
      {showConfetti && (
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={100}
        recycle={false}
        className="fade-out"
        gravity={0.2}
      />
      )}
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
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h4" sx={{ textAlign: 'center' }}>
          No more profiles
        </Typography>
        </Box>
      )}
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        mb: 2,
      }}
      >
      {currentIndex >= 0 && (
        <>
        <Box
          sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          marginTop: 4,
          }}
        >
          <StyledButton
          variant="outlined"
          color="primary"
          onClick={() => swipe('left')}
          sx={{
            borderColor: 'primary.main',
            color: 'primary.main',
            '&:hover': {
            backgroundColor: 'primary.light',
            borderColor: 'primary.dark',
            mr: 2
            },
          }}
          >
          Doesn't match
          </StyledButton>
          <StyledButton
          variant="contained"
          color="primary"
          onClick={() => swipe('right')}
          sx={{
            backgroundColor: 'primary.main',
            '&:hover': {
            backgroundColor: 'primary.dark',
            },
          }}
          >
          Apply to Company
          </StyledButton>
        </Box>
        </>
      )}
      </Box>
    </Box>
  );
}
