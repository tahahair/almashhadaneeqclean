
 
 

import "swiper/css";
import './globals.css';
 
 import EnhancedCallToActionar from './EnhancedCallToActionar';
import ChallengesPagear from './ChallengesPagear';
 
import InteractiveWorkflowar from './InteractiveWorkflowar';
import StatsVisualizationar from './StatsVisualizationar';
import FAQSectionar from './FAQSectionar';
import Firstcontentar from './firstcontentar';
const mainarbic = ({ elementRef }) => {

   
  return (


    <div dir="rtl">
<Firstcontentar />



     
  
    <ChallengesPagear />

    <StatsVisualizationar />
<InteractiveWorkflowar />

<EnhancedCallToActionar />
<FAQSectionar ref={elementRef} />
  </div>

  );
};

export default mainarbic;
