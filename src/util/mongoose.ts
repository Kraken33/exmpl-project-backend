import { Schema, model } from 'mongoose';

const createSchema = (name: string, ...args: any[]): Schema=>{
    const schema: any = new Schema(...args);
    schema.name = name;

    return schema;
}

const createModel = (schema: any, ...args: any)=>{
    return model(schema.name, schema, ...args);
}

export { createSchema, createModel };