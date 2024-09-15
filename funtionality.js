let activeCellId = null;
const activeCellElement = document.getElementById("active-cell");
const upload = document.getElementById("uploadbtn");

const form = document.querySelector(".form");
form.addEventListener("change", onChangeFormData);
const state = {};
var activeElem = null;
const defaultStyles = {
  // TODO:change it later
  fontFamily: "poppins-regular",
  fontSize: 16,
  isBold: false,
  isItalic: false,
  isUnderline: false,
  align: "left",
  textColor: "#000000",
  bgColor: "#EFE5E5",
  text: "",
};

function onChangeCellText(event) {
  const changeText = event.target.innerText;
  if (state[activeCellId]) {
    state[activeCellId].text = changeText;
  } else {
    state[activeCellId] = { ...defaultStyles, text: changeText };
  }
}

function onChangeFormData() {
  const options = {
    fontFamily: form.fontFamily.value,
    fontSize: form.fontSize.value,
    isBold: form.isBold.checked,
    isItalic: form.isItalic.checked,
    isUnderline: form.isUnderline.checked,
    align: form.align.value,
    textColor: form.textColor.value,
    bgColor: form.bgColor.value,
  };
  applyStyles(options);
}

function applyStyles(styles) {
  if (!activeCellId) {
    form.reset();
    alert("please select the cell");
    return;
  }

  activeElem.style.color = styles.textColor;
  activeElem.style.backgroundColor = styles.bgColor;
  activeElem.style.textAlign = styles.align;
  activeElem.style.fontWeight = styles.isBold ? "600" : "400";
  activeElem.style.fontFamily = styles.fontFamily;
  activeElem.style.fontSize = styles.fontSize + "px";
  activeElem.style.textDecoration = styles.isUnderline ? "underline" : "none";
  activeElem.style.fontStyle = styles.isItalic ? "italic" : "normal";

  state[activeCellId] = { ...styles, text: activeElem.innerText };
}

function onFocusCell(event) {
  activeElem = event.target;
  activeCellId = event.target.id;
  activeCellElement.innerText = activeCellId;


  if (state[activeCellId]) {
    resetForm(state[activeCellId]);
  } else {
    resetForm(defaultStyles);
  }
}

function resetForm(styles) {
  form.fontSize.value = styles.fontSize;
  form.fontFamily.value = styles.fontFamily;
  form.textColor.value = styles.textColor;
  form.bgColor.value = styles.bgColor;
  form.isBold.checked = styles.isBold;
  form.isItalic.checked = styles.isItalic;
  form.isUnderline.checked = styles.isUnderline;
  form.align.value = styles.align;
}

function exportData() {
  // TODO : export the file data and download it.

  const jsonData = JSON.stringify(state);
  const blob = new Blob([jsonData], { type: "text/plain" });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.download = "data.json";
  link.href = url;
  link.click();
}

upload.addEventListener("change",()=>{
  let file = upload.files[0];
  if(file.type === "text/plain"){
    let fileReader = new FileReader();
    fileReader.onload = function(event){
      console.log(event.target.result);
      activeElem.innerText = event.target.result;
    }
    fileReader.readAsText(file);
  }
  else{
    alert("please upload a text file");
  }
})

