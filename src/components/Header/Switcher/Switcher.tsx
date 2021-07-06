import React, { ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { train, game } from '../../../actions/modeActions';
import './switcher.scss';

const Switcher = (): ReactElement => {
  const mode = useSelector((state) => state);

  const dispatch = useDispatch();
  return (
    <div
      role="presentation"
      className="switch-button"
      onClick={() => (mode === 'TRAIN' ? dispatch(train()) : dispatch(game()))}
    >
      <input id="switch" className="switch-button-checkbox" type="checkbox" />
      <label htmlFor="switch" className="switch-button-label">
        <span className="switch-button-label-span">Train</span>
      </label>
    </div>
  );
};

export default Switcher;
