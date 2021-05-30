export default function render(rootElement: HTMLElement, children: HTMLElement[] = []) {
  children.forEach((child) => {
    rootElement.appendChild(child);
  });
};