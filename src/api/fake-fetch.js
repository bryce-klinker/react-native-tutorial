export function fakeFetch(url, requestInit) {
  return Promise.resolve({
    json: () => Promise.resolve([{name: 'Arsenal', position: 4}, {name: 'Chelsea', position: 3}])
  });
}