
import { useState } from 'react';
import './App.css';
import QueueAnim from 'rc-queue-anim';

import TweenOne ,{TweenOneGroup} from 'rc-tween-one';
import Animate from 'rc-animate';
import ScrollAnim from 'rc-scroll-anim';
const ScrollOverPack = ScrollAnim.OverPack;


function App() {
  const [list, setList] = useState([])
  return (
    <div className="App">
        <TweenOneGroup 
  key="ul"
  enter={{
    y: '+=30',
    opacity: 1,
    type: 'from',
    ease: 'easeInOutQuad',
  }}
  leave={{ y: '+=30', opacity: 0, ease: 'easeInOutQuad' }}
 >
  <div key="0">demo</div>
</TweenOneGroup> 
      <header className="App-header" style={{height: 1000}}>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <ul>
          {list.map((ele) => {
            return <li>
              <p>序号: {ele.id}</p>
              <section>
                <header>{ele.name}</header>
                <atticle>{ele.content}</atticle>
              </section>
            </li>
          })}

        </ul>
        
      </header>
      <ScrollOverPack playScale={0.3}>
  <QueueAnim key='queueAnim'>
    <div key='a'>依次进入</div>
    <div key='b'>依次进入</div>
    <div key='c'>依次进入</div>
  </QueueAnim>
  <TweenOne
    key="ew"
      animation={{ 
        x: 80, 
        scale: 0.5, 
        rotate: 120, 
        yoyo: true, // demo 演示需要
       repeat: -1, // demo 演示需要
        duration: 1000
      }}
      paused={false}
      style={{ transform: 'translateX(-80px)' }}
      className="code-box-shape"
    />
  <Animate key='rc-animate' transitionName="fade"
    transitionAppear>
    <div key="rc-aaa">rc-animate 示例</div>
  </Animate>  

  
</ScrollOverPack>

<div style={{height: 300}}>打算减肥大法师打发是否</div>
    </div>

  );
}
export default App;
