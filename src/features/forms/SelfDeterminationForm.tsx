import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Slider,
  Button,
  Container,
  Divider,
} from "@mui/material";

const SelfDeterminationForm = () => {
  const [formData, setFormData] = useState({
    autonomyControl: 1,
    autonomyIdeas: 1,
    autonomyFlexible: false,
    autonomyCareerGoals: "",
    competenceChallenge: 1,
    competenceTraining: false,
    competenceFeedback: "",
    competenceAchievement: 1,
    relatednessBelonging: 1,
    relatednessRespect: false,
    relatednessTeamBuilding: false,
    relatednessSupport: "",
    growthAlignment: 1,
    growthEncouragement: false,
    growthAdvancement: "",
    growthExpression: 1,
  });

  const [showValueLabel, setShowValueLabel] = useState({
    autonomyControl: false,
    autonomyIdeas: false,
    competenceChallenge: false,
    competenceAchievement: false,
    relatednessBelonging: false,
    growthAlignment: false,
    growthExpression: false,
  });

  const handleSliderChange =
    (field: string) => (event: Event, newValue: number | number[]) => {
      setFormData({ ...formData, [field]: newValue });
      console.log(event);

      // Show the value label temporarily
      setShowValueLabel((prev) => ({ ...prev, [field]: true }));
      setTimeout(() => {
        setShowValueLabel((prev) => ({ ...prev, [field]: false }));
      }, 3000); // Display the label for 3 seconds
    };

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: event.target.value });
    };

  const handleCheckboxChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: event.target.checked });
    };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Self-Determination Theory Questionnaire
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Autonomy Support Section */}
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Autonomy Support
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Box sx={{ mb: 4 }}>
            <Typography>
              How much control do you feel over your daily tasks and priorities?
            </Typography>
            <Slider
              value={formData.autonomyControl}
              onChange={handleSliderChange("autonomyControl")}
              min={1}
              max={5}
              step={1}
              marks
              valueLabelDisplay={showValueLabel.autonomyControl ? "on" : "off"}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography>
              How often are you given opportunities to contribute your ideas and
              opinions on projects?
            </Typography>
            <Slider
              value={formData.autonomyIdeas}
              onChange={handleSliderChange("autonomyIdeas")}
              min={1}
              max={5}
              step={1}
              marks
              valueLabelDisplay={showValueLabel.autonomyIdeas ? "on" : "off"}
            />
          </Box>

          <FormControlLabel
            control={
              <Checkbox
                checked={formData.autonomyFlexible}
                onChange={handleCheckboxChange("autonomyFlexible")}
              />
            }
            label="Does your workplace encourage flexible work schedules to fit your personal work style?"
          />

          <TextField
            label="Are you supported in pursuing personal career goals that align with your interests?"
            value={formData.autonomyCareerGoals}
            onChange={handleInputChange("autonomyCareerGoals")}
            fullWidth
            multiline
            sx={{ mt: 2 }}
          />

          {/* Competence Support Section */}
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Competence Support
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Box sx={{ mb: 4 }}>
            <Typography>
              How frequently are you given tasks that challenge your skills?
            </Typography>
            <Slider
              value={formData.competenceChallenge}
              onChange={handleSliderChange("competenceChallenge")}
              min={1}
              max={5}
              step={1}
              marks
              valueLabelDisplay={
                showValueLabel.competenceChallenge ? "on" : "off"
              }
            />
          </Box>

          <FormControlLabel
            control={
              <Checkbox
                checked={formData.competenceTraining}
                onChange={handleCheckboxChange("competenceTraining")}
              />
            }
            label="Does your organization offer training and development resources for skill enhancement?"
          />

          <TextField
            label="Do you receive regular, constructive feedback on your performance?"
            value={formData.competenceFeedback}
            onChange={handleInputChange("competenceFeedback")}
            fullWidth
            multiline
            sx={{ mt: 2 }}
          />

          <Box sx={{ mb: 4, mt: 2 }}>
            <Typography>
              How often do you feel a sense of achievement in your role?
            </Typography>
            <Slider
              value={formData.competenceAchievement}
              onChange={handleSliderChange("competenceAchievement")}
              min={1}
              max={5}
              step={1}
              marks
              valueLabelDisplay={
                showValueLabel.competenceAchievement ? "on" : "off"
              }
            />
          </Box>

          {/* Remaining sections would follow the same pattern as above... */}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 4 }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SelfDeterminationForm;
