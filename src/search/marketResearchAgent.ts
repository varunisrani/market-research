import { MetaSearchAgentType } from './metaSearchAgent';
import { marketResearchPrompt, marketResearchQueryPrompt } from '../prompts/marketResearch';
import { BaseMessage } from '@langchain/core/messages';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { Embeddings } from '@langchain/core/embeddings';
import eventEmitter from 'events';

const marketResearchAgent: MetaSearchAgentType = {
  searchAndAnswer: async (
    message: string,
    history: BaseMessage[],
    llm: BaseChatModel,
    embeddings: Embeddings,
    optimizationMode: 'speed' | 'balanced' | 'quality',
    fileIds: string[],
  ): Promise<eventEmitter> => {
    // Create an event emitter to stream results
    const emitter = new eventEmitter();

    try {
      // Use the market research prompts
      const response = await llm.invoke(marketResearchPrompt);
      
      // Stream the response
      emitter.emit('data', JSON.stringify({
        type: 'response',
        data: response.content
      }));

      // End the stream
      emitter.emit('end');

    } catch (error) {
      emitter.emit('error', JSON.stringify({
        type: 'error',
        data: 'Failed to process market research query'
      }));
    }

    return emitter;
  }
};

export default marketResearchAgent; 