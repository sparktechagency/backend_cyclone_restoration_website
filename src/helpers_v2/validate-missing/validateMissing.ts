type parameterOneType = {
  name: string;
  naturalName: string;
}[];

export const validateMissing = (datas: parameterOneType, body: any) => {
  const missingFields: string[] = [];
  for (let i = 0; i < datas.length; i++) {
    const singleData = datas[i];
    const { name, naturalName } = singleData;
    const bodyData = body[name];
    if (!bodyData) {
      missingFields.push(naturalName);
    }
  }
  if (missingFields.length > 0) {
    let errorMessage = ``;
    for (let i = 0; i < missingFields.length; i++) {
      let singleMissingFieldName = missingFields[i];
      const isCommaApplicable = i !== missingFields.length - 1;
      console.log({ isCommaApplicable });
      if (isCommaApplicable) {
        singleMissingFieldName = `${singleMissingFieldName}, `;
      }
      errorMessage = errorMessage + singleMissingFieldName;
    }
    errorMessage =
      errorMessage + ` ${missingFields.length > 1 ? 'are' : 'is'} missing`;
    throw new Error(errorMessage);
  }
};
