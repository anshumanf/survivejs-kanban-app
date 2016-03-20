// @flow
import makeFinalStore from 'alt-utils/lib/makeFinalStore';

type StorageType = {
  get: (k: string) => ?string,
  set: (k: string, v: string) => void,
}

export default function(alt: any, storage: StorageType, storeName: string) {
  const finalStore = makeFinalStore(alt);
  try {
    alt.bootstrap(storage.get(storeName));
  } catch(e) {
    /* eslint-disable no-console */
    console.error('Failed to bootstrap data', e);
    /* eslint-enable no-console */
  }
  finalStore.listen(() => {
    if(!storage.get('debug')) {
      storage.set(storeName, alt.takeSnapshot());
    }
  });
}
