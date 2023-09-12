export const getConversationByCustomerId = async (customerId: string, apiURI: string) => {
  try {
    const response = await fetch(`${apiURI}/customers/${customerId}/conversations`);
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getCustomerServices = async (customerId: string, apiURI: string) => {
  try {
    const response = await fetch(`${apiURI}/customers/${customerId}/services?unlimited=true`);
    return await response.json();
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

export const getCustomerInsurances = async (customerId: string, apiURI: string) => {
  try {
    const response = await fetch(`${apiURI}/customers/${customerId}/insurances?unlimited=true`);
    return await response.json();
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

export const getCustomerVehicles = async (customerId: string, apiURI: string) => {
  try {
    const response = await fetch(`${apiURI}/customers/${customerId}/vehicles?unlimited=true`);
    return await response.json();
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

export const getCustomerActivities = async (customerId: string, apiURI: string) => {
  try {
    const response = await fetch(`${apiURI}/customers/${customerId}/activities?unlimited=true`);
    return await response.json();
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

export const lunchCampaignToCustomers = async (
  customerIds: string[],
  prompt: string,
  apiURI: string,
) => {
  try {
    const response = await fetch(`${apiURI}/customers/launch`, {
      method: 'POST',
      body: JSON.stringify({
        customerIds: customerIds,
        context: prompt,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

export const lunchCampaignToAllCustomers = async (prompt: string, apiURI: string) => {
  try {
    const response = await fetch(`${apiURI}/customers/launch-all`, {
      method: 'POST',
      body: JSON.stringify({
        context: prompt,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};
