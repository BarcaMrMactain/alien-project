export interface ContentItem {
  headline?: string;
  text: string;
}

export interface Content {
  id: number;
  name: string;
  img: string;
  paragraph: string;
  content: ContentItem[];
}