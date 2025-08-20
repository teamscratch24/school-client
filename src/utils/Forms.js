const AppendForm =  (Data) => {
  const Form = new FormData();
  for (let key in Data) {
    if (Data.hasOwnProperty(key)) {
      Form.append(key, Data[key]);
    }
  }



  return Form;
};

export default AppendForm;
