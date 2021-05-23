export function render (rootElement: HTMLElement, children: HTMLElement[] | HTMLElement) {
  if (Array.isArray(children)) {
    children.forEach((child: HTMLElement) => {
      this.rootElement.appendChild(child);
    })
  } else {
    this.rootElement.appendChild(children);
  }
}