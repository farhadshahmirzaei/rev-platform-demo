export type Language = 'en' | 'fa' | 'id';

export interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  trustLevel: 'Observe' | 'Propose' | 'Act with approval' | 'Autonomous';
  schedule: string;
  status: 'active' | 'paused' | 'running';
  todayRuns: number;
  description: string;
}

export interface Lead {
  id: string;
  company: string;
  contactName: string;
  score: number;
  stage: 'New' | 'Qualified' | 'Meeting Booked' | 'Proposal' | 'Closed Won';
  source: string;
  lastTouch: string;
}

export interface TaskItem {
  id: string;
  title: string;
  owner: string;
  type: 'human' | 'agent';
  status: 'todo' | 'in_progress' | 'review' | 'done';
  dueDate: string;
}

export interface Invoice {
  id: string;
  client: string;
  amount: string;
  status: 'Paid' | 'Sent' | 'Overdue' | 'Draft';
  dueDate: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  content: string;
  seoKeywords: string[];
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}
