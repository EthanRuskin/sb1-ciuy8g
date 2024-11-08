import { Storage } from '@google-cloud/storage';
import config from '../config';

export class StorageService {
  private storage: Storage;
  private bucket: string;

  constructor() {
    this.storage = new Storage({
      projectId: config.googleCloudProjectId,
      keyFilename: config.googleApplicationCredentials
    });
    this.bucket = config.storageBucket;
  }

  async uploadFile(buffer: Buffer, filename: string, contentType: string): Promise<string> {
    const bucket = this.storage.bucket(this.bucket);
    const file = bucket.file(filename);

    await file.save(buffer, {
      contentType,
      metadata: {
        contentType
      }
    });

    await file.makePublic();

    return `https://storage.googleapis.com/${this.bucket}/${filename}`;
  }

  async deleteFile(url: string): Promise<void> {
    const filename = url.split('/').pop();
    if (!filename) return;

    const bucket = this.storage.bucket(this.bucket);
    const file = bucket.file(filename);

    await file.delete();
  }

  async generateSignedUrl(filename: string, expiresIn: number = 3600): Promise<string> {
    const bucket = this.storage.bucket(this.bucket);
    const file = bucket.file(filename);

    const [url] = await file.getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + expiresIn * 1000
    });

    return url;
  }
}