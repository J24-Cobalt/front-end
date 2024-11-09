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
    autonomyControl: 3,
    autonomyIdeas: 3,
    autonomyFlexible: false,
    autonomyCareerGoals: "",
    competenceChallenge: 3,
    competenceTraining: false,
    competenceFeedback: "",
    competenceAchievement: 3,
    relatednessBelonging: 3,
    relatednessRespect: false,
    relatednessTeamBuilding: false,
    relatednessSupport: "",
    growthAlignment: 3,
    growthEncouragement: false,
    growthAdvancement: "",
    growthExpression: 3,
  });

  const handleSliderChange =
    (field: string) => (event: Event, newValue: number | number[]) => {
      setFormData({ ...formData, [field]: newValue });
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
    console.log("Submitted data:", formData);
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

          <Box sx={{ mb: 2 }}>
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
              valueLabelDisplay="auto"
            />
          </Box>

          <Box sx={{ mb: 2 }}>
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
              valueLabelDisplay="auto"
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

          <Box sx={{ mb: 2 }}>
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
              valueLabelDisplay="auto"
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

          <Box sx={{ mb: 2, mt: 2 }}>
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
              valueLabelDisplay="auto"
            />
          </Box>

          {/* Relatedness Support Section */}
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Relatedness Support
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Box sx={{ mb: 2 }}>
            <Typography>
              How often do you feel a sense of belonging within your team or
              organization?
            </Typography>
            <Slider
              value={formData.relatednessBelonging}
              onChange={handleSliderChange("relatednessBelonging")}
              min={1}
              max={5}
              step={1}
              marks
              valueLabelDisplay="auto"
            />
          </Box>

          <FormControlLabel
            control={
              <Checkbox
                checked={formData.relatednessRespect}
                onChange={handleCheckboxChange("relatednessRespect")}
              />
            }
            label="Do you feel respected and valued by your colleagues and superiors?"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={formData.relatednessTeamBuilding}
                onChange={handleCheckboxChange("relatednessTeamBuilding")}
              />
            }
            label="Are there opportunities for team-building and social activities that foster connection?"
          />

          <TextField
            label="How supportive are your colleagues when you need assistance or face challenges?"
            value={formData.relatednessSupport}
            onChange={handleInputChange("relatednessSupport")}
            fullWidth
            multiline
            sx={{ mt: 2 }}
          />

          {/* Growth and Personal Alignment Section */}
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Growth and Personal Alignment
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Box sx={{ mb: 2 }}>
            <Typography>
              How well does the company’s mission align with your personal
              values and career goals?
            </Typography>
            <Slider
              value={formData.growthAlignment}
              onChange={handleSliderChange("growthAlignment")}
              min={1}
              max={5}
              step={1}
              marks
              valueLabelDisplay="auto"
            />
          </Box>

          <FormControlLabel
            control={
              <Checkbox
                checked={formData.growthEncouragement}
                onChange={handleCheckboxChange("growthEncouragement")}
              />
            }
            label="Do you feel encouraged to learn new skills or pursue your interests within your role?"
          />

          <TextField
            label="Are there advancement opportunities that support your career growth within the company?"
            value={formData.growthAdvancement}
            onChange={handleInputChange("growthAdvancement")}
            fullWidth
            multiline
            sx={{ mt: 2 }}
          />

          <Box sx={{ mb: 2, mt: 2 }}>
            <Typography>
              How well does your current role allow you to express your
              strengths and passions?
            </Typography>
            <Slider
              value={formData.growthExpression}
              onChange={handleSliderChange("growthExpression")}
              min={1}
              max={5}
              step={1}
              marks
              valueLabelDisplay="auto"
            />
          </Box>

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
