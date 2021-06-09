import Component from '../components/base-component';

export const paginationButtonsDisable = (
  prevBtn: Component, 
  nextBtn: Component, 
  carsCount: string, 
  currentPage: number
  ) => {
  const pageCarsLimit = 7;
    const lastPageNum = Math.ceil(Number(carsCount) / pageCarsLimit);
    if (Number(carsCount) <= pageCarsLimit) {
      (prevBtn.element as HTMLButtonElement).disabled = true;
      (nextBtn.element as HTMLButtonElement).disabled = true;
    } else if (currentPage < 2) { 
      (prevBtn.element as HTMLButtonElement).disabled = true;
    } else if (lastPageNum === currentPage) { 
      (nextBtn.element as HTMLButtonElement).disabled = true;
    }
}