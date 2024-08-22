export const areArraysEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((item, index) => {
    const track1 = item.track || {};
    const track2 = arr2[index]?.track || {};
    return (
      track1.title === track2.title && track1.popularity === track2.popularity
    );
  });
};
