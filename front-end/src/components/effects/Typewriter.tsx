import { useEffect, useRef, useState } from "react";

interface Props {
  /** Phrases cycled through, typed then deleted. */
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  /** Pause once a phrase is fully typed, in ms. */
  pause?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Cycles through phrases with a typing + deleting effect and a blinking
 * caret — used to make AI prompt surfaces feel live. Falls back to the
 * first phrase for reduced-motion users.
 */
export default function Typewriter({
  phrases,
  typingSpeed = 55,
  deletingSpeed = 30,
  pause = 1600,
  className,
  style,
}: Props) {
  const [text, setText] = useState("");
  const [reduce, setReduce] = useState(false);
  const state = useRef({ index: 0, sub: 0, deleting: false });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduce(true);
      setText(phrases[0] ?? "");
      return;
    }

    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      const s = state.current;
      const full = phrases[s.index % phrases.length];

      if (!s.deleting) {
        s.sub++;
        setText(full.slice(0, s.sub));
        if (s.sub === full.length) {
          s.deleting = true;
          timer = setTimeout(step, pause);
          return;
        }
      } else {
        s.sub--;
        setText(full.slice(0, s.sub));
        if (s.sub === 0) {
          s.deleting = false;
          s.index++;
        }
      }
      timer = setTimeout(step, s.deleting ? deletingSpeed : typingSpeed);
    };
    timer = setTimeout(step, typingSpeed);
    return () => clearTimeout(timer);
  }, [phrases, typingSpeed, deletingSpeed, pause]);

  return (
    <span className={className} style={style}>
      {text}
      {!reduce && (
        <span
          className="animate-pulse-soft"
          style={{
            display: "inline-block",
            width: 2,
            height: "1em",
            marginLeft: 2,
            verticalAlign: "text-bottom",
            background: "#818cf8",
          }}
        />
      )}
    </span>
  );
}
