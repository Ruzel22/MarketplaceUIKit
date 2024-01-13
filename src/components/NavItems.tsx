'use client';

import { PRODUCT_CATEGORIES } from '@/config';
import React from 'react';
import { useState } from 'react';
import NavItem from './NavItem';
import { useOnClickOutside } from '@/hooks/on-click-hoock';

const NavItems = () => {
  const [activeIndex, setActiveIndex] = React.useState<null | number>(null);
  const isAnyOpen = activeIndex !== null;
  const navRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const keyboardHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveIndex(null);
      }
    };

    document.addEventListener('keydown', keyboardHandler);
    return () => {
      document.removeEventListener('keydown', keyboardHandler);
    };
  }, []);

  useOnClickOutside(navRef, () => setActiveIndex(null));

  return (
    <div className="flex gap-4 h-full" ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, i) => {
        const handleOpen = () => {
          if (activeIndex === i) {
            setActiveIndex(null);
          } else {
            setActiveIndex(i);
          }
        };

        const isOpen = i === activeIndex;
        return (
          <NavItem
            category={category}
            handleOpen={handleOpen}
            isOpen={isOpen}
            key={category.value}
            isAnyOpen={isAnyOpen}
          />
        );
      })}
    </div>
  );
};

export default NavItems;
