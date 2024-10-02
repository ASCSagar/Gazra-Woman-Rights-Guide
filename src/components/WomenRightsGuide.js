import React, { useState, useMemo } from "react";
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  ThemeProvider,
  createTheme,
  CssBaseline,
  TextField,
  InputAdornment,
  alpha,
} from "@mui/material";
import { ChevronDown, Search } from "lucide-react";
import logo from "../images/MCSLogo.png";
import backgroundImage from "../images/BG-Main.jpg";

import "@fontsource/halant";

const theme = createTheme({
  palette: {
    primary: {
      main: "#50352c", // Deep brown
      light: "#50352c",
      dark: "#50352c",
    },
    secondary: {
      main: "#50352c", // Soft brown
    },
    background: {
      default: "#FAF3DD", // Light cream
      paper: "#F8E9E9", // Very light pink
    },
    text: {
      primary: "#black", // Black
      secondary: "#black", // Black
    },
  },
  typography: {
    fontFamily: "Halant, serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          background-image: url(${backgroundImage});
          background-size: cover;
          background-attachment: fixed;
        }
      `,
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: alpha("#F8E9E9", 0.8),
          "&:before": {
            display: "none",
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          backgroundColor: alpha("#B176A8", 0.2),
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
  },
});

const lawsData = [
  {
    category: "Reporting and Legal Procedures",
    laws: [
      {
        title: "Right to Zero FIR",
        description:
          "Women can file an FIR at any police station, regardless of the jurisdiction where the crime occurred.",
      },
      {
        title: "Right to Virtual Complaints",
        description:
          "Women can file complaints via email or registered post if they can't visit a police station.",
      },
      {
        title: "Right to Free Legal Aid",
        description:
          "Women have the right to free legal aid under the Legal Services Authorities Act, 1987.",
      },
      {
        title: "Mandatory Registration of Marriage",
        description:
          "Several states have made marriage registration compulsory, which helps protect women's rights in matrimony.",
      },
      {
        title: "Protection of Women from Domestic Violence Act, 2005",
        description:
          "Provides protection against physical, sexual, verbal, emotional, and economic abuse in domestic relationships.",
      },
    ],
  },
  {
    category: "Workplace Rights",
    laws: [
      {
        title:
          "Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013",
        description:
          "Mandates employers to set up Internal Complaints Committees and take measures to prevent sexual harassment.",
      },
      {
        title: "Equal Remuneration Act, 1976",
        description: "Mandates equal pay for equal work, regardless of gender.",
      },
      {
        title: "Maternity Benefit (Amendment) Act, 2017",
        description:
          "Provides 26 weeks of paid maternity leave, including for adoptive and commissioning mothers.",
      },
      {
        title: "Factories Act, 1948",
        description:
          "Prohibits employment of women in certain dangerous operations and during night hours.",
      },
      {
        title: "Mines Act, 1952",
        description:
          "Prohibits employment of women in underground mines and in certain other hazardous areas.",
      },
    ],
  },
  {
    category: "Protection from Violence and Abuse",
    laws: [
      {
        title: "Protection of Children from Sexual Offences (POCSO) Act, 2012",
        description:
          "Provides protection to children from sexual abuse and exploitation.",
      },
      {
        title: "The Dowry Prohibition Act, 1961",
        description:
          "Prohibits giving or taking of dowry at or before or any time after the marriage.",
      },
      {
        title: "The Immoral Traffic (Prevention) Act, 1956",
        description:
          "Prevents trafficking of women and girls for prostitution.",
      },
      {
        title: "Indecent Representation of Women (Prohibition) Act, 1986",
        description:
          "Prohibits indecent representation of women in advertisements, publications, etc.",
      },
      {
        title: "The Criminal Law (Amendment) Act, 2013",
        description:
          "Strengthens laws against sexual violence, including expanded definitions of rape and new offenses like acid attacks.",
      },
    ],
  },
  {
    category: "Marriage and Family Rights",
    laws: [
      {
        title: "Prohibition of Child Marriage Act, 2006",
        description:
          "Prohibits child marriages and protects girls from being married before the age of 18.",
      },
      {
        title: "Hindu Succession (Amendment) Act, 2005",
        description:
          "Gives daughters equal inheritance rights in ancestral property.",
      },
      {
        title: "Guardians and Wards Act, 1890",
        description:
          "Mothers can be natural guardians of minor children in the absence of fathers.",
      },
      {
        title: "The Muslim Women (Protection of Rights on Marriage) Act, 2019",
        description: "Prohibits the practice of instant triple talaq.",
      },
      {
        title: "Special Marriage Act, 1954",
        description:
          "Provides a special form of marriage for people of India and all Indian nationals in foreign countries, irrespective of religion or faith followed by either party.",
      },
    ],
  },
  {
    category: "Health and Reproductive Rights",
    laws: [
      {
        title: "Medical Termination of Pregnancy Act, 1971 (Amended in 2021)",
        description:
          "Allows abortion up to 24 weeks of pregnancy under certain circumstances.",
      },
      {
        title: "Pre-Conception and Pre-Natal Diagnostic Techniques Act, 1994",
        description: "Prohibits sex selection before or after conception.",
      },
      {
        title: "The Surrogacy (Regulation) Act, 2021",
        description:
          "Regulates surrogacy in India, prohibiting commercial surrogacy and protecting the rights of surrogate mothers.",
      },
      {
        title: "HIV and AIDS (Prevention and Control) Act, 2017",
        description:
          "Prohibits discrimination against HIV-positive persons and provides for informed consent and confidentiality in HIV testing, treatment, and research.",
      },
      {
        title: "Mental Healthcare Act, 2017",
        description:
          "Protects rights of persons with mental illness and promotes access to mental health care.",
      },
    ],
  },
  {
    category: "Political and Civil Rights",
    laws: [
      {
        title: "The Constitution of India",
        description:
          "Article 14 ensures equality before law, Article 15 prohibits discrimination on grounds of religion, race, caste, sex or place of birth.",
      },
      {
        title: "The Representation of the People Act, 1951",
        description:
          "Provides for reservation of seats for women in Panchayats and Municipalities.",
      },
      {
        title: "Right to Information Act, 2005",
        description:
          "Empowers all citizens, including women, to seek information from public authorities.",
      },
      {
        title: "National Commission for Women Act, 1990",
        description:
          "Established a statutory body to review legal and constitutional safeguards for women.",
      },
      {
        title: "The Citizenship Act, 1955",
        description:
          "Provides equal citizenship rights to women, including the right to pass on citizenship to their children.",
      },
    ],
  },
];

const WomenRightsGuide = () => {
  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const filteredLawsData = useMemo(() => {
    if (!searchTerm) return lawsData;
    return lawsData
      .map((category) => ({
        ...category,
        laws: category.laws.filter(
          (law) =>
            law.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            law.description.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      }))
      .filter((category) => category.laws.length > 0);
  }, [searchTerm]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 4,
            backgroundSize: "cover",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          }}
        >
          <Box
            mb={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="h4"
              gutterBottom
              component="h1"
              color="primary"
              fontWeight="bold"
            >
              Empower: Indian Women's Rights Guide
            </Typography>
            <Box>
              <img
                src={logo}
                alt="SHRI MAHARANI CHIMNABAI STREE UDYOGALAYA"
                style={{
                  width: "100px",
                  height: "auto",
                  transition: "width 0.3s ease",
                }}
              />
            </Box>
          </Box>
          <Typography variant="subtitle1" gutterBottom color="text.secondary">
            Know Your Rights: A Comprehensive Guide to Laws Protecting Women in
            India
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for laws..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              my: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 4,
                backgroundColor: alpha(theme.palette.background.paper, 0.8),
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color={theme.palette.primary.main} />
                </InputAdornment>
              ),
            }}
          />
          <Divider sx={{ my: 2, borderColor: theme.palette.primary.light }} />
          {filteredLawsData.map((category, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}` || searchTerm !== ""}
              onChange={handleChange(`panel${index}`)}
              sx={{
                mb: 2,
                borderRadius: 2,
                "&:first-of-type": {
                  borderTopLeftRadius: 2,
                  borderTopRightRadius: 2,
                },
                "&:last-of-type": {
                  borderBottomLeftRadius: 2,
                  borderBottomRightRadius: 2,
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ChevronDown color={theme.palette.primary.main} />}
                aria-controls={`panel${index}bh-content`}
                id={`panel${index}bh-header`}
              >
                <Typography variant="h6" fontWeight="bold" color="primary">
                  {category.category}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {category.laws.map((law, lawIndex) => (
                    <ListItem key={lawIndex} alignItems="flex-start">
                      <ListItemText
                        primary={
                          <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            color="secondary"
                          >
                            {law.title}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {law.description}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default WomenRightsGuide;
