# 🌤️ Personalized Environmental Safety Through Multisource Data and User-Centric Web Integration

> **🏆 Best Algorithm / Software / Hardware — InT@UCLA Biohackathon 2025**  
> Awarded May 3rd, 2025 by the InT@UCLA Biohackathon Team, sponsored by New England Biolabs

[![JavaScript](https://img.shields.io/badge/JavaScript-88%25-yellow?style=for-the-badge&logo=javascript)](https://github.com/TanmayJDesai/WeatherActivityRecommendationProject)
[![CSS](https://img.shields.io/badge/CSS-8%25-blue?style=for-the-badge&logo=css3)](https://github.com/TanmayJDesai/WeatherActivityRecommendationProject)
[![HTML](https://img.shields.io/badge/HTML-4%25-orange?style=for-the-badge&logo=html5)](https://github.com/TanmayJDesai/WeatherActivityRecommendationProject)

---

## 🎖️ Award

This project won **Best Algorithm / Software / Hardware** at the **InT@UCLA Biohackathon 2025** — a competitive interdisciplinary hackathon focused on innovation at the intersection of technology and health sciences.

| | |
|---|---|
| ![Research Poster](docs/poster.jpg) | ![Certificate of Achievement](docs/certificate.jpg) |
| *Research poster presented at UCLA* | *Certificate awarded May 3rd, 2025* |

> **Note for setup:** Add `poster.jpg` and `certificate.jpg` into a `/docs` folder in this repo to display the images above.

---

## 🧠 Motivation

The **2025 Eaton and Palisades wildfires** devastated communities across greater Los Angeles, blanketing the region in hazardous concentrations of fine particulate matter (PM2.5) and toxic aerosols. But the danger didn't stop at the evacuation zone boundaries — millions of residents living *just outside* those perimeters remained exposed to dangerous atmospheric conditions with little to no actionable guidance.

Existing public health communication during the crisis was insufficiently personalized. Broad "evacuate or stay" advisories failed to account for an individual's health profile, location-specific air quality, or daily activity patterns. For those with respiratory conditions like asthma or COPD, this gap between public warning and personal guidance was not just inconvenient — it was dangerous.

**We built this system to change that.** The goal: give vulnerable individuals the real-time, personalized environmental intelligence they need to make safer decisions during air quality emergencies.

---

## 🎯 Problem Statement

> *Personalized health guidance when "evacuate or stay" isn't enough — helping vulnerable people make safer decisions during air quality emergencies.*

Standard AQI broadcasts treat all residents identically. This system goes further by integrating a user's health profile, location, and planned activities to generate **tailored risk assessments and actionable health advisories** in real time.

---

## 🔬 How It Works

At the core of this project is a **custom Network Flow Model** that pipelines multisource environmental data through a layered computational architecture:

```
INPUT DATA → THRESHOLD ANALYSIS → COMPUTATIONAL LOGIC → RECOMMENDATION ENGINE → RISK ASSESSMENT
```

### Network Flow Architecture

1. **Input Layer** — Ingests real-time data across multiple environmental signals: temperature, AQI (PM2.5), humidity, wind conditions, and user-defined activity classification (indoor/outdoor/moderate/strenuous).

2. **Threshold Analysis** — Each input is evaluated against EPA-defined AQI categories (Good → Moderate → Unhealthy for Sensitive Groups → Unhealthy → Very Unhealthy → Hazardous) and domain-specific health thresholds.

3. **Computational Logic** — A multi-node processing layer applies weighted risk scoring based on the user's health sensitivity profile and real-time environmental readings.

4. **Recommendation Engine** — Synthesizes risk signals into ranked primary and secondary recommendations (e.g., "Apply SPF 30+ sunscreen and reapply every 2 hours", "Wear UV-protective sunglasses", "Take breaks in shade", "Drink water regularly").

5. **Output Layer** — Delivers a personalized risk classification and a prioritized action plan through a clean, user-centric web interface.

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript (React) |
| Backend | Node.js, Express (`server.js`) |
| Data Sources | Real-time weather APIs, EPA AQI data |
| Deployment | Vercel |
| Architecture | Custom Network Flow Model |

---

## 📊 Results

Temperature forecast error analysis across a broad set of global cities revealed consistent, low-variance prediction performance, validating the reliability of the underlying environmental data pipeline. The system demonstrated robust threshold detection across a wide range of climate conditions — from temperate urban metros to high-heat regions — with most forecasts maintaining sub-2°F error margins.

Key findings:
- **The Eaton and Palisades wildfires** significantly elevated PM2.5 and toxic aerosol concentrations across greater Los Angeles, confirming the critical need for localized, real-time air quality guidance.
- **The network flow model** successfully integrates multisource environmental inputs for real-time risk analysis and health advisories, demonstrating end-to-end viability as a public health tool.

---

## ⚠️ Limitations & Future Directions

### Current Limitations
- Limited support for less common respiratory conditions beyond asthma and COPD
- Input data is restricted to standard weather metrics, excluding localized toxic aerosol indicators

### Future Directions
- **Biometric integration** — incorporate user-provided biometric inputs (e.g., lung function scores, SpO₂ levels) and pollutant-specific thresholds for enhanced personalization
- **Expanded action set** — broaden system capabilities to recommend indoor air filtration strategies and optimal evacuation timing windows
- **Real-time aerosol sensing** — integrate sensor networks capturing localized PM2.5 and VOC readings beyond standard weather station data

---

## 🚀 Getting Started

### Prerequisites
- Node.js v16+
- npm

### Installation

```bash
git clone https://github.com/TanmayJDesai/WeatherActivityRecommendationProject.git
cd WeatherActivityRecommendationProject
npm install
node server.js
```

Open your browser to `http://localhost:3000`

### Live Deployment
The app is live at: **[environmentalsafetyadvisor.vercel.app](https://environmentalsafetyadvisor.vercel.app)**

---

## 👥 Contributors

- **Tanmay Desai** — UCLA B.S. Computer Science & Engineering, M.S. Data Science (in progress)
- **Suraj Kulkarni**
- **Joshua Lee**

---

## 📄 License

This project was developed for the InT@UCLA Biohackathon 2025. See [LICENSE](LICENSE) for details.

---

*Built with urgency, purpose, and a lot of coffee during the 2025 InT@UCLA Biohackathon.*
