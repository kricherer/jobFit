export function extractTextFromElement(elementClass: string): string {
  if (!elementClass || elementClass === '') return '';

  const element = document.querySelector(elementClass);
  if (!element) return '';
  let textContent = element.textContent || '';
  textContent = textContent.replace('About the job', '').trim();
  return textContent;
}
