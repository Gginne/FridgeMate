export const getDaysDiff = (exp) => {
    const currentDate = new Date();
    const expirationDate = new Date(exp.seconds * 1000);

    const timeDifference = expirationDate.getTime() - currentDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference
  }