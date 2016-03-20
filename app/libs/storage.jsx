// @flow
export default {
  get(k: string): ?string {
    try {
      let val = localStorage.getItem(k);
      if(
        typeof val !== 'undefined'
        &&
        val !== null
      )  {
        return JSON.parse(val);
      } else {
        return null;
      }
    } catch(e) {
      return null;
    }
  },
  set(k: string, v: string): void {
    localStorage.setItem(k, JSON.stringify(v));
  },
};
