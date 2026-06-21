import React, { useState, useEffect } from 'react';
import * as Icons from './Icons';

interface FeatureContribution {
  name: string;
  value: number;
  direction: 'increase' | 'decrease';
  impact: string; // text description
}

export const ExplainablePlayground: React.FC = () => {
  // Input parameters
  const [weight, setWeight] = useState<number>(75); // kg
  const [height, setHeight] = useState<number>(172); // cm
  const [age, setAge] = useState<number>(24); // years
  const [activity, setActivity] = useState<number>(2); // 0: None, 1: Low, 2: Moderate, 3: High, 4: Athlete
  const [water, setWater] = useState<number>(2.5); // Liters/day

  // Model states
  const [riskLevel, setRiskLevel] = useState<string>('Normal Weight');
  const [riskColor, setRiskColor] = useState<string>('#10b981'); // green
  const [contributions, setContributions] = useState<FeatureContribution[]>([]);
  const [confidence, setConfidence] = useState<number>(94);
  const [modelType, setModelType] = useState<'XGBoost' | 'LightGBM' | 'CatBoost'>('XGBoost');

  const activityLabels = ['None (Sedentary)', 'Light (1-2 days/wk)', 'Moderate (3-4 days/wk)', 'Active (5-6 days/wk)', 'Super Active (Daily)'];

  useEffect(() => {
    // 1. Calculate BMI
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    // 2. Classify Risk Level
    let risk = 'Normal Weight';
    let color = '#10b981'; // emerald
    if (bmi < 18.5) {
      risk = 'Insufficient Weight (Underweight)';
      color = '#3b82f6'; // blue
    } else if (bmi >= 18.5 && bmi < 25) {
      risk = 'Normal Weight';
      color = '#10b981'; // green
    } else if (bmi >= 25 && bmi < 30) {
      risk = 'Overweight';
      color = '#f59e0b'; // amber
    } else if (bmi >= 30 && bmi < 35) {
      risk = 'Obesity Class I';
      color = '#f97316'; // orange
    } else if (bmi >= 35 && bmi < 40) {
      risk = 'Obesity Class II';
      color = '#ef4444'; // red
    } else {
      risk = 'Obesity Class III (Extreme)';
      color = '#b91c1c'; // dark red
    }
    setRiskLevel(risk);
    setRiskColor(color);

    // 3. Simulate LIME explainability calculations

    // Estimate relative feature impacts
    // Weight contribution is proportional to the difference from average weight for height
    const idealWeight = 21.7 * (heightInMeters * heightInMeters);
    const weightImpact = ((weight - idealWeight) / idealWeight) * 45;

    // Height impact (higher height reduces BMI, relative to an average height of 170cm)
    const heightImpact = ((170 - height) / 170) * 15;

    // Age impact (model learns a slight positive coefficient for age due to metabolic decline in dataset)
    const ageImpact = ((age - 25) / 60) * 8;

    // Activity impact (reduces risk, modeled with a negative coefficient)
    // Scale: 0 to 4. Normal physical activity reduces risk compared to sedentary.
    const activityImpact = -(activity - 1.5) * 12;

    // Water impact (hydration helps metabolism, too low water increases risk slightly)
    const waterImpact = -(water - 2.2) * 5;

    // Generate contribution objects
    const rawConts = [
      { name: 'Body Weight', val: weightImpact, type: 'Weight Factor' },
      { name: 'Height Metric', val: heightImpact, type: 'Stature Factor' },
      { name: 'Age Factor', val: ageImpact, type: 'Metabolic Baseline' },
      { name: 'Physical Activity', val: activityImpact, type: 'Caloric Expenditure' },
      { name: 'Water Consumption', val: waterImpact, type: 'Hydration Level' }
    ];

    // Compute total absolute impact for percentage normalization
    const totalAbs = rawConts.reduce((acc, c) => acc + Math.abs(c.val), 0) || 1;

    const normalizedConts: FeatureContribution[] = rawConts.map(c => {
      const percentage = (c.val / totalAbs) * 100;
      // Truncate to round values
      const rounded = Math.round(percentage * 10) / 10;
      return {
        name: c.name,
        value: rounded,
        direction: (rounded >= 0 ? 'increase' : 'decrease') as 'increase' | 'decrease',
        impact: `${Math.abs(rounded)}% ${rounded >= 0 ? 'increases' : 'decreases'} risk score`
      };
    }).sort((a, b) => Math.abs(b.value) - Math.abs(a.value)); // sort by absolute impact

    setContributions(normalizedConts);

    // Calculate simulated model confidence
    // High BMI or Low BMI are clear classifications (high confidence), borderline cases have slightly lower confidence.
    const distToBoundary = Math.min(
      Math.abs(bmi - 18.5),
      Math.abs(bmi - 25),
      Math.abs(bmi - 30),
      Math.abs(bmi - 35),
      Math.abs(bmi - 40)
    );
    const confidenceScore = Math.min(99, Math.round(85 + (distToBoundary * 8)));
    setConfidence(confidenceScore);

  }, [weight, height, age, activity, water]);

  return (
    <div className="xai-playground-card">
      <div className="xai-card-header">
        <div className="xai-title">
          <Icons.Activity className="text-secondary" size={22} />
          <div>
            <h3>Interactive LIME Explainer</h3>
            <p>Mock Model Interpreter (Based on Obesity Risk Project)</p>
          </div>
        </div>
        
        <div className="model-selector-pills">
          {(['XGBoost', 'LightGBM', 'CatBoost'] as const).map(model => (
            <button
              key={model}
              onClick={() => setModelType(model)}
              className={`model-pill ${modelType === model ? 'active' : ''}`}
            >
              {model}
            </button>
          ))}
        </div>
      </div>

      <div className="xai-layout">
        {/* Sliders Form */}
        <div className="xai-sliders-panel">
          <h4 className="panel-subheading">Feature Input Vector (X)</h4>
          
          <div className="slider-group">
            <div className="slider-label-row">
              <span>Weight</span>
              <span className="slider-value-badge">{weight} kg</span>
            </div>
            <input
              type="range"
              min="40"
              max="160"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="xai-range-slider"
            />
          </div>

          <div className="slider-group">
            <div className="slider-label-row">
              <span>Height</span>
              <span className="slider-value-badge">{height} cm</span>
            </div>
            <input
              type="range"
              min="120"
              max="210"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="xai-range-slider"
            />
          </div>

          <div className="slider-group">
            <div className="slider-label-row">
              <span>Age</span>
              <span className="slider-value-badge">{age} yrs</span>
            </div>
            <input
              type="range"
              min="15"
              max="80"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="xai-range-slider"
            />
          </div>

          <div className="slider-group">
            <div className="slider-label-row">
              <span>Physical Activity</span>
              <span className="slider-value-badge">{activityLabels[activity]}</span>
            </div>
            <input
              type="range"
              min="0"
              max="4"
              value={activity}
              onChange={(e) => setActivity(Number(e.target.value))}
              className="xai-range-slider"
            />
          </div>

          <div className="slider-group">
            <div className="slider-label-row">
              <span>Water Intake</span>
              <span className="slider-value-badge">{water} Liters</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="4.0"
              step="0.1"
              value={water}
              onChange={(e) => setWater(Number(e.target.value))}
              className="xai-range-slider"
            />
          </div>

          <div className="playground-stats-row">
            <div className="playground-stat-box">
              <span className="stat-label">Calculated BMI</span>
              <span className="stat-value">{(weight / ((height / 100) * (height / 100))).toFixed(1)}</span>
            </div>
            <div className="playground-stat-box">
              <span className="stat-label">Prediction Confidence</span>
              <span className="stat-value">{confidence}%</span>
            </div>
          </div>
        </div>

        {/* Predictions & Explanation Chart */}
        <div className="xai-charts-panel">
          <div className="prediction-box">
            <h4 className="panel-subheading">Model Prediction (Y)</h4>
            <div className="risk-display-container">
              <div className="risk-badge" style={{ backgroundColor: `${riskColor}22`, borderColor: riskColor, color: riskColor }}>
                <Icons.Sparkles size={16} />
                <span>{riskLevel}</span>
              </div>
            </div>
          </div>

          <div className="lime-explanation-container">
            <div className="explanation-header-row">
              <h4 className="panel-subheading">Local LIME Feature Contributions</h4>
              <span className="explanation-subtitle">How features perturbed the prediction</span>
            </div>

            <div className="lime-bars-list">
              {contributions.map((c, idx) => {
                const absVal = Math.abs(c.value);
                const isIncrease = c.direction === 'increase';
                
                return (
                  <div key={idx} className="lime-bar-wrapper">
                    <div className="lime-bar-label-row">
                      <span className="lime-feature-name">{c.name}</span>
                      <span className={`lime-percentage-label ${isIncrease ? 'text-danger' : 'text-success'}`}>
                        {isIncrease ? '+' : ''}{c.value}%
                      </span>
                    </div>

                    <div className="lime-track-bg">
                      <div className="lime-center-axis"></div>
                      
                      {/* Negative impact bar (green, grows to left) */}
                      {!isIncrease && (
                        <div 
                          className="lime-bar-fill fill-negative"
                          style={{
                            width: `${Math.min(50, absVal / 2)}%`,
                            right: '50%'
                          }}
                        ></div>
                      )}

                      {/* Positive impact bar (red, grows to right) */}
                      {isIncrease && (
                        <div 
                          className="lime-bar-fill fill-positive"
                          style={{
                            width: `${Math.min(50, absVal / 2)}%`,
                            left: '50%'
                          }}
                        ></div>
                      )}
                    </div>
                    
                    <span className="lime-impact-subtext">{c.impact}</span>
                  </div>
                );
              })}
            </div>

            <div className="lime-legend-row">
              <div className="legend-item">
                <span className="legend-dot bg-negative"></span>
                <span>Supports normal/lower risk</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot bg-positive"></span>
                <span>Pushes towards higher risk</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
