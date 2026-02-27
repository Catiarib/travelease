/**
 * TravelEase Main Entry Point
 * AI Orchestration Layer for MICE Corporate Travel
 */
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { AIOrchestrator } from './services/AIOrchestrator.js';
import db from './db/index.js';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const orchestrator = new AIOrchestrator();

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
    const extractedData = await orchestrator.extractMiceContext(content);
    
    // Log to DB for audit
    await db.query(
      'INSERT INTO ai_audit_logs (action_type, input_data, output_result) VALUES ($1, $2, $3)',
      ['context_extraction', JSON.stringify({ content, type }), JSON.stringify(extractedData)]
    );

    res.json({
      requestId,
      status: 'success',
      extractedData
    });
  } catch (error) {
    console.error('Extraction Error:', error);
    res.status(500).json({ requestId, error: 'Failed to extract context' });
  }
});

/**
 * Endpoint for Policy Validation
 * POST /api/policy/validate
 */
app.post('/api/policy/validate', async (req, res) => {
  const { requestDetails, orgId } = req.body;
  
  try {
    // Fetch policy from DB
    const policyResult = await db.query(
      'SELECT rules FROM policies WHERE org_id = $1 AND is_active = true LIMIT 1',
      [orgId]
    );

    if (policyResult.rows.length === 0) {
      return res.status(404).json({ error: 'No active policy found for this organization' });
    }

    const policyRules = policyResult.rows[0].rules;
    const validation = await orchestrator.validatePolicy(requestDetails, policyRules);

    res.json(validation);
  } catch (error) {
    console.error('Policy Validation Error:', error);
    res.status(500).json({ error: 'Failed to validate policy' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 TravelEase server running at http://localhost:${port}`);
});
