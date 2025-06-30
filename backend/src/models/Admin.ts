import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IAdmin extends Document {
  username: string;
  password: string;
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const AdminSchema = new mongoose.Schema<IAdmin>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Password hash'leme middleware
AdminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password doğrulama metodu
AdminSchema.methods.comparePassword = async function(this: IAdmin, candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const Admin = mongoose.model<IAdmin>('Admin', AdminSchema); 