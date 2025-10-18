import React from "react";

interface MenuArrowProps {
  size?: string;
  fill?: string;
}

const MenuArrow: React.FC<MenuArrowProps> = ({ size = "24", fill = "currentColor" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_71_10501)">
        <path
          d="M12.0054 15.532L18.207 9.20187C18.418 8.98656 18.6641 8.88249 18.9453 8.88967C19.2266 8.89685 19.4727 9.00809 19.6836 9.2234C19.8945 9.43871 20 9.68991 20 9.97699C20 10.2641 19.8945 10.5153 19.6836 10.7306L13.2078 17.3622C13.039 17.5344 12.8492 17.6636 12.6383 17.7497C12.4273 17.8358 12.2164 17.8789 12.0054 17.8789C11.7945 17.8789 11.5836 17.8358 11.3726 17.7497C11.1617 17.6636 10.9718 17.5344 10.8031 17.3622L4.3062 10.7306C4.09526 10.5153 3.99331 10.2605 4.00034 9.96623C4.00737 9.67197 4.11636 9.41718 4.32729 9.20187C4.53823 8.98656 4.78433 8.87891 5.06558 8.87891C5.34683 8.87891 5.59292 8.98656 5.80386 9.20187L12.0054 15.532Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_71_10501">
          <rect
            width={size}
            height={size}
            fill={fill}
            transform="translate(0 0.878906)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export { MenuArrow };
