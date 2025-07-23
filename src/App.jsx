import React from 'react';
import { ScrollTrigger,SplitText } from 'gsap/all';
import gsap from 'gsap';
gsap.registerPlugin(ScrollTrigger,SplitText)
const App = () => {
  return (
    <div>
      <h1 class="text-3xl text-indigo-300 font-bold flex-center h-[100vh]">
    Hello world!
  </h1>
    </div>
  );
}

export default App;
