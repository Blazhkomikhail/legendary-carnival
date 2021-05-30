export default function render (
  rootElement: HTMLElement,
  children: HTMLElement[] = []
  ): void {
  children.forEach((child) => {
    rootElement.appendChild(child);
  });
}
