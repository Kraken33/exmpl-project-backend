import { StorageModel } from "../models";

let storage: any = () => {};

const createStorage = async (db: any) => {
  const { store = {} } = (await db.findOne({ name: "__STORE__" })) as any;

  return {
    set: (key: string, value: any) => (store[key] = value),
    get: (key: string) => store[key],
    saveStore: async () => {
      await db.updateOne({ name: "__STORE__" }, { store });
    },
  };
};

(async () => {
  storage = await createStorage(StorageModel);
})();

export { storage };
