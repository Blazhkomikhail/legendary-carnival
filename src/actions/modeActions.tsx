type StateType = {
  type: string;
};

export const train = (): StateType => {
  return {
    type: 'TRAIN',
  };
};

export const game = (): StateType => {
  return {
    type: 'GAME',
  };
};
