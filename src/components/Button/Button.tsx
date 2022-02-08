import { FC, memo } from 'react';

import styles from './Button.module.css';

interface ButtonProps {
  title: string,
  fontSize: number,
  isDissabled?: boolean,
  isTransparent?: boolean,
  isShadow?: boolean,
  isDark?: boolean,
  onClickHandler: () => void;
}

const Button: FC<ButtonProps> = ({
  title,
  fontSize,
  isDissabled = false,
  isTransparent = true,
  isShadow = false,
  isDark = false,
  onClickHandler,
}) => {
  return (
    <button
      className={styles.btn}
      style={{ fontSize: fontSize }}
      disabled={isDissabled}
      data-is-transparent={isTransparent}
      data-is-shadow={isShadow}
      data-is-dark={isDark}
      onClick={(e) => {
        e.currentTarget.blur();
        onClickHandler();
      }}
    >
      {title}
    </button>
  );
};

export const MemoizedButton = memo(Button);
