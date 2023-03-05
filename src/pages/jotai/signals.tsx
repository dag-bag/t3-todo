/** @jsxImportSource jotai-signal */

import { atom } from "jotai";
import { useAtom, useSetAtom } from "jotai";
import { $, createElement, atomSignal } from "jotai-signal";

const countAtom = atom(0);

const CounterWithSignal = () => {
  const wow = atomSignal("", "", () => "");
  return (
    <div>
      <h1>With $(atom)</h1>
      {/* // eslint-disable-next-line @typescript-eslint/no-unsafe-call */}
      Count: {$(countAtom)} ({Math.random()})
    </div>
  );
};

const Counter = () => {
  const [count] = useAtom(countAtom);
  return (
    <div>
      <h1>With useAtom(atom)</h1>
      Count: {count} ({Math.random()})
    </div>
  );
};

const Controls = () => {
  const setCount = useSetAtom(countAtom);
  return (
    <div>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        Increment
      </button>
    </div>
  );
};

const App = () => (
  <>
    <Controls />
    <CounterWithSignal />
    <Counter />
  </>
);

export default App;
