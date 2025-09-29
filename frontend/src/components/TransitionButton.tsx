import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEventHandler,
  type ReactNode,
} from "react";

// helper component to support loading and error states
// Given how we're running on localhost, we won't really get to see these states unless we throttle speeds of the backend.
// But we're implementing this because the specification mentions we should gracefully handle loading states and errors.
function TransitionButton({
  children,
  onClick,
  disabled,
  isPending,
  isError,
  isSuccess,
  style,
}: {
  children: ReactNode;
  onClick: MouseEventHandler;
  disabled: boolean;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  style?: CSSProperties;
}) {
  const timeout = useRef<ReturnType<typeof setTimeout>>(null);
  const [showSuccess, setShowSuccess] = useState(isSuccess);
  useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      timeout.current = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  }, [isSuccess]);

  return (
    <button onClick={onClick} disabled={disabled} style={style}>
      <>
        {children}
        {isPending && "⏳"}
        {isError && "❌"}
        {showSuccess && "✅"}
      </>
    </button>
  );
}

export default TransitionButton;
