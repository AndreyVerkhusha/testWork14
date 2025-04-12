import React from 'react';
import styles from './Spinner.module.scss';

interface SpinnerProps {
  top?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ top = 120 }) => {
  return (
    <div className={styles.spinnerContainer} style={{ top: `${top}px` }}>
      <div className={`spinner-border ${styles.spinner}`} role="status" />
    </div>
  );
};

export default Spinner;
