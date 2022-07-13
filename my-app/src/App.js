import './App.css';
import parse from "html-react-parser"
import { CountOnTenFrames } from './components/questionTypes/countOneTenFrames/countontenframes';
import { MatchObjectsHorizontal } from './components/questionTypes/matchObjectHorizontal/typing/matchobjectshorizontal';
import { MatchObjectsHorizontalDragAndDrop } from './components/questionTypes/matchObjectHorizontal/dragAndDrop/matchObjectDragAndDrop';
import { ClickableOnPic } from './components/questionTypes/questiontextoptions/clickableOnPicture/clickableOnPicture';
import { ClickableOnYesNo } from './components/questionTypes/questiontextoptions/clickableOnYesNo/clickableOnYesNo';
import { DragByHtml } from './components/dragAndDropUsingHtmlApi/drag';


function App() {
  let dataCount = {"operation":"addition","type":"countontenframes","questionName":"How many fishes are there on the frame?","questionContent":"\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/WaterAnimals/Fish-Red.png\"\u003e","answerCount":"8","choices":["8","9","11","10"],"choiceType":"selectchoice","choiceCount":4,"solution":{"model":[{"val":"There are 10 fishes"}]}}
  let dataTyping = { "operation": "addition", "type": "matchobjectshorizontal", "rows": "1", "cols": "10", "questionName": "\u003cdiv\u003eIn the following, each letter represents a digit from 0 - 9. Can you work out which digit replaces each letter? Each digit can only be used once.\u003c/div\u003e\u003cdiv\u003eA + B = C\u0026nbsp; \u0026nbsp; \u0026nbsp; \u0026nbsp; \u0026nbsp; \u0026nbsp;D – E = F\u0026nbsp; \u0026nbsp; \u0026nbsp; \u0026nbsp; \u0026nbsp; \u0026nbsp;G x H = IJ\u003c/div\u003e", "questionContent": [[{ "row": 0, "col": 0, "imgvalue": "\u003cspan style=\"text-align: start;\"\u003eA\u003c/span\u003e", "numvalue": "7", "isMissed": "true" }, { "row": 0, "col": 1, "imgvalue": "\u003cspan style=\"text-align: start;\"\u003e\u0026nbsp;B\u003c/span\u003e", "numvalue": "1", "isMissed": "true" }, { "row": 0, "col": 2, "imgvalue": "\u003cspan style=\"text-align: start;\"\u003eC\u003c/span\u003e", "numvalue": "8", "isMissed": "true" }, { "row": 0, "col": 3, "imgvalue": "\u003cspan style=\"text-align: start;\"\u003eD\u003c/span\u003e", "numvalue": "9", "isMissed": "true" }, { "row": 0, "col": 4, "imgvalue": "\u003cspan style=\"text-align: start;\"\u003eE\u003c/span\u003e", "numvalue": "6", "isMissed": "true" }, { "row": 0, "col": 5, "imgvalue": "\u003cspan style=\"text-align: start;\"\u003eF\u0026nbsp;\u003c/span\u003e", "numvalue": "3", "isMissed": "true" }, { "row": 0, "col": 6, "imgvalue": "\u003cspan style=\"text-align: start;\"\u003eG\u0026nbsp;\u003c/span\u003e", "numvalue": "4", "isMissed": "true" }, { "row": 0, "col": 7, "imgvalue": "\u003cspan style=\"text-align: start;\"\u003eH\u003c/span\u003e", "numvalue": "5", "isMissed": "true" }, { "row": 0, "col": 8, "imgvalue": "\u003cspan style=\"text-align: start;\"\u003eI\u003c/span\u003e", "numvalue": "2", "isMissed": "true" }, { "row": 0, "col": 9, "imgvalue": "\u003cspan style=\"text-align: start;\"\u003eJ\u003c/span\u003e", "numvalue": "0", "isMissed": "true" }]], "solution": { "model": [{ "val": "\u003cdiv\u003e7 + 1 = 8 , 9 - 6 = 3 and 4 x 5 = 20\u003c/div\u003e\u003cdiv\u003e\u003cbr\u003e\u003c/div\u003e" }], "sidebyside": [], "srows": null, "scols": null }, "choices": ["5", "1", "4", "9", "8", "0", "2", "3", "6", "7"], "choiceType": "keying", "choiceCount": 10 }
  let dataDrag = {"operation":"addition","type":"matchobjectshorizontal","rows":"1","cols":"3","questionName":"Match the analog clock to the digital clock.","questionContent":[[{"row":0,"col":0,"imgvalue":"\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/Clock/CLK_20.png\"\u003e","numvalue":"07:00","isMissed":"true"},{"row":0,"col":1,"imgvalue":"\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/Clock/CLK_21.png\"\u003e","numvalue":"08:00","isMissed":"true"},{"row":0,"col":2,"imgvalue":"\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/Clock/CLK_22.png\"\u003e","numvalue":"09:00","isMissed":"true"}]],"solution":{"model":[{"val":"07:00,\u0026nbsp;08:00,\u0026nbsp;09:00"}],"sidebyside":[],"srows":null,"scols":null},"choices":["08:00","07:00","09:00"],"choiceType":"dragdrop","choiceCount":3}
  let dataClickableOnPicture = {"operation":"addition","type":"questiontextoptions","questionName":"Which picture shows 6?","row":1,"col":2,"questionContent":[[{"row":1,"col":1,"value":"\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/Animals/10-Camel.png\"\u003e","count":"6","selected":"true"},{"row":1,"col":2,"value":"\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/Animals/04-Zebra.png\"\u003e","count":"7","selected":"false"}]],"solution":{"model":[]},"arrangement":"regular","answerValue":"true"}
  let dataClickableYesNo = {"operation":"addition","type":"countofobjectsyesno","questionName":"There are 7 lollipops and 6 candies","row":1,"col":2,"answer":"yes","questionContent":[[{"row":1,"col":1,"img":"\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/CakesAndCandies/Rainbow%20Candy%20(lolipop).png\"\u003e","count":"12"},{"row":1,"col":2,"img":"\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/CakesAndCandies/41.png\"\u003e","count":"6"}]],"solution":{"model":[{"val":"Yes"}]}}
  //console.log(data);
  return (
    <div className="App">
      <h1>Hey</h1>
      <div style={{ width: "800px", height: "100%", border: "1px solid white",textAlign:'left',paddingLeft:"20px"}} >
        {/* <CountOnTenFrames data={dataCount}/> */}
        {/* <MatchObjectsHorizontal data={dataTyping} /> */}
        <MatchObjectsHorizontalDragAndDrop data={dataDrag} />
        {/* <ClickableOnPic data={dataClickableOnPicture}/> */}
        <ClickableOnYesNo data={dataClickableYesNo}/>
        {/* <DragByHtml/> */}
      </div>

    </div>
  );
}

export default App;
