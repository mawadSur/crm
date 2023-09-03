import { ENV_VARIABLES } from '../../config/environment.js';

export const getConversationByCustomerId = async (customerId: string) => {
  try {
    const response = await fetch(`${ENV_VARIABLES.API_URL}/customers/${customerId}/conversations`);
    return await response.json();
  } catch (error) {
    console.log('error', error);
    return [];
  }
};
