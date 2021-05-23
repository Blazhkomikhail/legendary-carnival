export function render(rootElement: HTMLElement, children: HTMLElement[] = []) {
  children.forEach((child) => {
    rootElement.appendChild(child);
  })
}