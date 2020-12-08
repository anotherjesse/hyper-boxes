const drive = beaker.hyperdrive.drive();

export const loadFile = path => drive.readFile(path);

export const subscribeFile = (path, cb) => {
  const readCB = () => drive.readFile(path).then(cb);
  return drive.watch(path, readCB);
};

export const updateFile = (path, content) => drive.writeFile(path, content);
