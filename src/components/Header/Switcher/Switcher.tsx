import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { train, game } from '../../../actions/modeActions'; 
import './switcher.scss';

const Switcher = () => {
  const mode = useSelector(state => state);

  const dispatch = useDispatch();
  return (
    <div className="switch-button"
    onClick={() => ( mode === 'TRAIN' ? dispatch(train()) : dispatch(game()) )}
    >
      <input className="switch-button-checkbox" type="checkbox"/>
      <label className="switch-button-label">
        <span className="switch-button-label-span">Train</span>
      </label>
    </div>
  )
}

export default Switcher;