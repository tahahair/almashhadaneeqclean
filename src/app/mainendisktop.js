
 
 
 

 
 
import "swiper/css";
import './globals.css';
 

 
import EnhancedCallToActionen from './EnhancedCallToActionen';
import StatsVisualizationen from './StatsVisualizationen';
import ChallengesPageen from './ChallengesPageen';
import FAQSectionen from './FAQSectionen';
import Firstcontenten from './firstcontenten';
 import InteractiveWorkflowen from './InteractiveWorkflowen';
const mainarbic = ({ elementRef }) => {

  return (


    <div>
 <Firstcontenten />


  

<ChallengesPageen />
<StatsVisualizationen />
<InteractiveWorkflowen />
<EnhancedCallToActionen />
<FAQSectionen ref={elementRef} />

  </div>

  );
};

export default mainarbic;
