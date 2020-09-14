import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IRopryExamModernProps {
  description: string;
  context: WebPartContext;
}

export interface IRopryExamModernState {
  players: any[];
}
