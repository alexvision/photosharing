const parser = (content) => JSON.parse(content, (_key, v) => {
  if (
    v !== null &&
    typeof v === 'object' &&
    'type' in v &&
    v.type === 'Buffer' &&
    'data' in v &&
    Array.isArray(v.data)) {
    return URL.createObjectURL(
      new Blob([new Buffer(v.data)], {
        type: "image/jpeg"
      }));
  }
  return v;
});

export default parser;
