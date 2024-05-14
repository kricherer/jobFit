import { CV_Text, GUIDELINES, INSTRUCTIONS } from './constants';

export function getQuery(jobDescription: string) {
  return `${INSTRUCTIONS}
  ${jobDescription}
  
  and here is the CV:
  ${CV_Text}
  
  ${GUIDELINES}
  
  Improved CV:
  `;
}
