/**
 * TravelEase Main Entry Point
 * AI Orchestration Layer for MICE Corporate Travel
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({
    name: 'TravelEase API',
    version: '1.0.0',
    status: 'healthy',
    message: 'AI Orchestration Layer for MICE is active'
  });
});

/**
 * Endpoint for AI Context Extraction
 * POST /api/context/extract
 */
app.post('/api/context/extract', async (req, res) => {
  const { content, type } = req.body;
  const requestId = uuidv4();

  console.log(`[${requestId}] Processing context extraction for type: ${type}`);

  try {
    // This would normally call the Anthropic Claude API via LangChain
    // Placeholder response for MVP structure
    res.json({
      requestId,
      status: 'success',
      extractedData: {
        event: 'MICE Conference 2025',
        location: 'Barcelona',
        attendees: 50,
        dates: { start: '2025-06-15', end: '2025-06-17' }
      }
    });
  } catch (error) {
    res.status(500).json({ requestId, error: 'Failed to extract context' });
  }
});

/**
 * Endpoint for Policy Validation
 * POST /api/policy/validate
 */
app.post('/api/policy/validate', async (req, res) => {
  const { requestDetails, orgId } = req.body;
  
  // Logic to compare requestDetails against DB policies using AI reasoning
  res.json({
    compliant: true,
    reasoning: "Request matches corporate travel policy for standard employee role.",
    approvalRequired: false
  });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 TravelEase server running at http://localhost:${port}`);
});
