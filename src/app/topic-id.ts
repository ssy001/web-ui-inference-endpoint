export interface topicId {
    id: number;
    topic: string;
}

export interface topicIdState extends topicId {
    predicted: boolean;
}

export const topicIds: topicId[] = [
    { id: 0, topic: 'Accounts Billing T&C' },
    { id: 1, topic: 'Android Phones Tablets' },
    { id: 2, topic: 'Apple Watch' },
    { id: 3, topic: 'Apple iPhones iPads' },
    { id: 4, topic: 'Cancel Deactivation Moving' },
    { id: 5, topic: 'Financing Bank MC Cashback Business' },
    { id: 6, topic: 'Home Monitoring' },
    { id: 7, topic: 'Home Phone' },
    { id: 8, topic: 'Internet' },
    { id: 9, topic: 'Location Stores' },
    { id: 10, topic: 'Network Status Coverage' },
    { id: 11, topic: 'Other' },
    { id: 12, topic: 'Promotion Discounts Packages' },
    { id: 13, topic: 'Protection Plans' },
    { id: 14, topic: 'Returns & Recycle' },
    { id: 15, topic: 'SIM' },
    { id: 16, topic: 'Support' },
    { id: 17, topic: 'TV & Streaming' },
    { id: 18, topic: 'Technical Cyber-Security Emergency' },
    { id: 19, topic: 'Troubleshooting' },
    { id: 20, topic: 'Upgrade Pre-order Pre-owned Services Shipping' },
    { id: 21, topic: 'Wireless Roaming' }
]

export interface queryTopics {
    query: string,
    topics: string[]
}
  