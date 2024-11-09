import React, { useState, useRef, useMemo } from "react";
import { Box, Typography, Stack } from "@mui/material";
import TinderCard from "react-tinder-card";
import Confetti from "react-confetti";
import AnonymizedUserProfile from "./components/AnoymizedUserProfile";
import AnonymizedCompanyProfile from "./components/AnonymizedCompanyProfile"; // Import company profile component
import "./MatchingPage.css";
import { useSelector } from "react-redux";
import { RootState } from "@app/store/store";
import AppButton from "@features/ui/AppButton";
import { applicantProfiles, companyProfiles } from "./data";

export default function MatchingPage() {
  // Determine user type from Redux (either "applicant" or "company")
  const userType = useSelector((state: RootState) => state.auth.userType);

  // Choose profiles dataset and component based on user type
  const profiles = userType === "company" ? applicantProfiles : companyProfiles;
  const ProfileComponent =
    userType === "company" ? AnonymizedUserProfile : AnonymizedCompanyProfile;

  const [currentIndex, setCurrentIndex] = useState(profiles.length - 1);
  const [showConfetti, setShowConfetti] = useState(false);
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(profiles.length)
        .fill(0)
        .map(() => React.createRef<any>()),
    [profiles.length]
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canSwipe = currentIndex >= 0;

  const swiped = (direction: string, index: number) => {
    updateCurrentIndex(index - 1);
    if (direction === "right") {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000); // Show confetti for 3 seconds
    }
  };

  const swipe = async (dir: "left" | "right") => {
    if (canSwipe && currentIndex < profiles.length) {
      const card = childRefs[currentIndex].current;
      if (card) {
        await card.swipe(dir);
      }
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
              className="swipe"
              key={profile.name}
              onSwipe={(dir) => swiped(dir, index)}
              preventSwipe={["up", "down"]}
            >
              <div className="card">
                {/* Render ProfileComponent conditionally based on userType */}
                <ProfileComponent profile={profile} />
              </div>
            </TinderCard>
          ))}
        </div>
      ) : (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            No more matches. Come back soon
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          mb: 2,
        }}
      >
        {currentIndex >= 0 && (
          <Stack
            direction="row"
            sx={{
              justifyContent: "center",
              position: "fixed",
              bottom: 20,
              gap: 2,
              marginTop: 4,
            }}
          >
            <AppButton
              variant="contained"
              color="secondary"
              onClick={() => swipe("left")}
            >
              Doesn't match
            </AppButton>
            <AppButton
              variant="contained"
              color="primary"
              onClick={() => swipe("right")}
            >
              {userType === "company"
                ? "Match with Applicant"
                : "Apply to Company"}
            </AppButton>
          </Stack>
        )}
      </Box>
    </Box>
  );
}
