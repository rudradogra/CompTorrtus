export interface PolicyItem {
  title?: string;
  content: string;
}

export interface PolicySection {
  title: string;
  type: 'list' | 'paragraph' | 'mixed';
  description?: string;
  content?: string;
  items?: PolicyItem[];
}

export interface PolicyData {
  title: string;
  lastUpdated: string;
  description: string;
  sections: PolicySection[];
}

export interface PoliciesConfig {
  [key: string]: PolicyData;
}