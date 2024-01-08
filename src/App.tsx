import { h, JSX } from "preact";
import { useComputed, useSignal } from "@preact/signals";

import styles from "style.module.scss";

interface AppProps {
  initialText: string;
}

export const App = (props: AppProps) => {
  const text = useSignal(props.initialText);

  const codeUnitCount = useComputed(() => text.value.length);
  const wordCount = useComputed(() => text.value.split(" ").length);

  const onTextAreaKeyDown = (e: JSX.TargetedEvent<HTMLTextAreaElement, Event>) => {
    text.value = e.currentTarget.value;
  };

  return (
    <div>
      <textarea value={text} onKeyDown={onTextAreaKeyDown}></textarea>
      {/*
       * `styles.codeUnits` will refer to the mangled name of the `.codeUnits` style.
       * The mangling is nifty because it means CSS classes declared with the same name in different
       * `.css` files won't conflict.
       */}
      <div className={styles.codeUnits}>Code units: {codeUnitCount}</div>
      <div>Words: {wordCount}</div>
      <div>
        <a href="/ACKNOWLEDGMENTS.txt">Copyright Acknowledgments</a>
      </div>
    </div>
  );
};
