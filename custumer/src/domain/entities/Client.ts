import mongoose, { Schema, Document } from 'mongoose';

export interface IClient extends Document {
  name: string;
  email: string;
  cpf: string;
}

const clientSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  cpf: { type: String, required: true },
});

export const ClientModel = mongoose.model<IClient>('Client', clientSchema);
