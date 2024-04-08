import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IClient extends Document {
  _id: string;
  name: string;
  email: string;
  cpf: string;
}

const clientSchema: Schema = new Schema({
	_id: { type: String, default: uuidv4 },
	name: { type: String, required: true },
	email: { type: String, required: true },
	cpf: { type: String, required: true },
}, { timestamps: true });

export const ClientModel = mongoose.model<IClient>('Client', clientSchema);
