import React, { useState, useRef, useMemo } from "react";
import { Box, Typography, Stack } from "@mui/material";
import TinderCard from "react-tinder-card";
import Confetti from "react-confetti";
import AnonymizedUserProfile from "./components/AnoymizedUserProfile";
import AnonymizedCompanyProfile from "./components/AnonymizedCompanyProfile";
import "./MatchingPage.css";
import { useSelector } from "react-redux";
import { RootState } from "@app/store/store";
import AppButton from "@features/ui/AppButton";
import { applicantProfiles, companyProfiles } from "./data";

// Define interfaces for Profile and CompanyProfile
interface Profile {
  name: string;
  title: string;
  priorities: string;
  experience: string;
  skills: string;
  education: string;
}

interface CompanyProfile {
  sdt_profile: {
    autonomy_support: number;
    competence_support: number;
    relatedness_support: number;
    growth_and_personal_alignment: number;
  };
  title: string;
  description: string;
}

export default function MatchingPage() {
  const userType = useSelector((state: RootState) => state.auth.userType);

  // Use type-specific profiles based on userType
  const profiles: (Profile | CompanyProfile)[] =
    userType === "company" ? applicantProfiles : companyProfiles;


  const [currentIndex, setCurrentIndex] = useState(profiles.length - 1);
  const [showConfetti, setShowConfetti] = useState(false);
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(profiles.length)
        .fill(0)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
              key={index}
              onSwipe={(dir) => swiped(dir, index)}
              preventSwipe={["up", "down"]}
            >
              <div className="card">
                {userType === "company" ? (
                  <AnonymizedUserProfile profile={profile as Profile} />
                ) : (
                  <AnonymizedCompanyProfile
                    profile={profile as CompanyProfile}
                  />
                )}
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
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              color: "black",
              fontWeight: "bold",
              mt: 4,
              textShadow: "1px 1px 6px rgba(0, 128, 0, 0.1)",
            }}
          >
            All caught up. Check back soon!
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
