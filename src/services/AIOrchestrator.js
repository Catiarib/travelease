import { ChatAnthropic } from "@langchain/anthropic";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { z } from "zod";

/**
 * AIOrchestrator Service
 * Handles core LLM logic for TravelEase
 */
export class AIOrchestrator {
  constructor() {
    this.model = new ChatAnthropic({
      modelName: "claude-3-5-sonnet-20240620",
      temperature: 0,
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  /**
   * Extract MICE context from raw text or documents
   */
  async extractMiceContext(content) {
    const parser = StructuredOutputParser.fromZodSchema(
      z.object({
        eventName: z.string().describe("Name of the MICE event"),
        location: z.string().describe("City and country of the event"),
        attendeesCount: z.number().describe("Estimated number of attendees"),
        startDate: z.string().describe("ISO format start date"),
        endDate: z.string().describe("ISO format end date"),
        specialRequirements: z.array(z.string()).describe("List of dietary or accessibility needs"),
      })
    );

    const prompt = new PromptTemplate({
      template:
        "Extract structured MICE event information from the following content:
{format_instructions}
{content}",
      inputVariables: ["content"],
      partialVariables: { format_instructions: parser.getFormatInstructions() },
    });

    const chain = RunnableSequence.from([prompt, this.model, parser]);

    return await chain.invoke({ content });
  }

  /**
   * Validate travel request against policy
   */
  async validatePolicy(requestDetails, policyRules) {
    const prompt = PromptTemplate.fromTemplate(`
      You are a corporate travel policy auditor.
      
      Policy Rules: {policyRules}
      Travel Request: {requestDetails}
      
      Determine if the request is compliant. Provide a clear reasoning and flag any violations.
      Respond in JSON format: { "compliant": boolean, "reasoning": string, "violations": string[] }
    `);

    const chain = prompt.pipe(this.model);
    
    const response = await chain.invoke({
      policyRules: JSON.stringify(policyRules),
      requestDetails: JSON.stringify(requestDetails),
    });

    return JSON.parse(response.content);
  }
}
