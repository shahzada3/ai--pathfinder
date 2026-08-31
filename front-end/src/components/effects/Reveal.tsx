import { ElementType, ReactNode, useEffect, useRef, useState } from "react";

interface Props {
  children: ReactNode;
  /** Stagger delay in ms before the reveal transition runs. */
  delay?: number;
  className?: string;
  /** Render as a different element if needed (default div). */
  as?: ElementType;
  style?: React.CSSProperties;
}

/**
 * Fades + slides its children into place the first time they enter the
 * viewport. Pairs with the `.reveal` / `.is-visible` CSS in index.css.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
  style,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const Tag = as as any;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ ...style, "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
