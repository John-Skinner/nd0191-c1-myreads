export function bookDisplayName(internalName) {
  if (internalName === WantToReadInternalName) {
      return WantToReadDisplayName;
  }
  if (internalName === ReadInternalName) {
      return ReadDisplayName;
  }
  if (internalName === CurrentlyReadingInternalName) {
      return CurrentlyReadingDisplayName;
  }
  if (internalName === NoneInternalName) {
      return NoneDisplayName;
  }
}
export const WantToReadDisplayName = 'Want to Read';
export const CurrentlyReadingDisplayName = 'Currently Reading';
export const ReadDisplayName = 'Read';
export const NoneDisplayName = 'None';

export const WantToReadInternalName = 'wantToRead';
export const ReadInternalName = 'read';
export const CurrentlyReadingInternalName = 'currentlyReading'
export const NoneInternalName = 'none';
