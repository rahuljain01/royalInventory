export const ConvertDateToDisplayFormat = (date) => {
    let givenDate = new Date(date)
    return givenDate.toISOString().substr(0, 10);
  }