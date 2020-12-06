import { createModel, createSchema } from "../util";
import { omit, map } from "lodash/fp";

import { schemes } from '../consts';

type PermissionDocument = {
  action: string;
  roles: number[];
};

const permissionSchema = createSchema(schemes.PERMISSION, {
  action: {
    type: String,
    unique: true,
    required: true,
  },
  roles: {
    type: [String],
    required: true,
  }
});

const PermissionModel = createModel(permissionSchema);

const create = async ({ roles, action }: PermissionDocument) => {
  const user = new PermissionModel({
    action,
    roles
  });

  return omit(["_id", "__v"])(await user.save());
};

const findByRole = async (role: number) => {
  const conditions = { roles: [role] };

  const accessActions: any = await PermissionModel.find(
    conditions
  ).lean();

  return map('action')(accessActions);
};

const Permission = {
  create,
  findByRole,
};

export { Permission, PermissionDocument };
