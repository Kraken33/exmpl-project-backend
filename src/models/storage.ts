import { createModel, createSchema } from "../util";

const storageSchema = createSchema("Storage", {
  name: String,
  store: {}
}, { timestamps: { createdAt: 'created_at' } });

const StorageModel = createModel(storageSchema);

export { StorageModel };
