import makeFinalStore from 'alt-utils/lib/makeFinalStore';
export default function(alt, storage, storeName) {
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
