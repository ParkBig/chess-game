import { Column } from "../types/interface";

const stringColToNum = (boardColumn: Column | string) => {
  const changeColToNumber = [];
  if (boardColumn === "a") {
    changeColToNumber.push(1);
  };
  if (boardColumn === "b") {
    changeColToNumber.push(2);
  };
  if (boardColumn === "c") {
    changeColToNumber.push(3);
  };
  if (boardColumn === "d") {
    changeColToNumber.push(4);
  };
  if (boardColumn === "e") {
    changeColToNumber.push(5);
  };
  if (boardColumn === "f") {
    changeColToNumber.push(6);
  };
  if (boardColumn === "g") {
    changeColToNumber.push(7);
  };
  if (boardColumn === "h") {
    changeColToNumber.push(8);
  };
  return changeColToNumber;
};

export default stringColToNum;
