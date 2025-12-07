declare module "@google/generative-ai" {
  interface Part {
    text: string;
  }

  interface SystemInstruction {
    role: "system";
    parts: Part[];
  }

  interface Content {
    role: "user" | "assistant";
    parts: Part[];
  }

  interface GenerateContentOptions {
    systemInstruction?: SystemInstruction;
    contents: Content[];
    generationConfig?: {
      temperature?: number;
      topK?: number;
      topP?: number;
    };
  }

  interface GenerativeModel {
    generateContent(options: GenerateContentOptions): Promise<{
      response: { text(): string };
    }>;
  }

  class GoogleGenerativeAI {
    constructor(apiKey: string);
    getGenerativeModel(opts: { model: string }): GenerativeModel;
  }

  export { GoogleGenerativeAI };
}
