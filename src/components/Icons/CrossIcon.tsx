import { FC } from 'react';

interface CrossIconProps {
  width?: number,
  height?: number,
  color?: string;
  opacity?: number
}

const CrossIcon: FC<CrossIconProps> = ({
  width = 18,
  height = 18,
  color = 'currentColor',
  opacity = 0.25,

}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
    >
      <path
        fill={color}
        fillRule="evenodd"
        opacity={opacity}
        d="M16.97 0l2.122 2.121-7.425 7.425 7.425 7.425-2.121 2.12-7.425-7.424-7.425 7.425L0 16.97l7.425-7.425L0 2.121 2.121 0l7.425 7.425L16.971 0z"
      />
    </svg>
  );
};

export default CrossIcon;
