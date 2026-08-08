/**
 * Provider-agnostic storage adapter interface.
 * Concrete implementations will be created when a storage provider is chosen.
 */
export interface StorageAdapter {
  upload(file: Buffer, key: string, contentType: string): Promise<string>;
  delete(key: string): Promise<void>;
  getPublicUrl(key: string): string;
}
