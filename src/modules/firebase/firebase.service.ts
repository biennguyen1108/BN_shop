import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  async createUser(email: string) {
    try {
      const userRecord = await admin.auth().createUser({
        email,
      });
      return userRecord.uid;
    } catch (error) {
      throw error;
    }
  }
}

