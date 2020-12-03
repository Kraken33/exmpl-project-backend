import { createModel, createSchema } from "../util";
import { schemes } from '../consts';

const storageSchema = createSchema(schemes.STORAGE, {
  name: String,
  store: {}
}, { timestamps: { createdAt: 'created_at' } });

const StorageModel = createModel(storageSchema);

export { StorageModel };
