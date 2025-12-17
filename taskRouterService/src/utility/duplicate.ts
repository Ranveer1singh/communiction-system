const processedMessageIds = new Set<string>();

export const isDuplicate = (messageId: string): boolean => {
  return processedMessageIds.has(messageId);
};

export const markProcessed = (messageId: string): void => {
  processedMessageIds.add(messageId);
};
