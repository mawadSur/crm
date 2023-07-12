import mongoose, { Connection, Mongoose } from 'mongoose';

export class Database {
  private readonly url: string;
  private connection: Connection | null;
  private mongooseInstance: Mongoose;

  constructor(url: string) {
    this.url = url;
    this.connection = null;
    this.mongooseInstance = mongoose;
  }

  public connect(): void {
    this.mongooseInstance
      .connect(this.url)
      .then((res) => {
        console.log('📌 [SERVER]: Database Connected');
        return res;
      })
      .catch((error) => {
        console.log('🧨 Connection database error', error);
      });

    this.connection = this.mongooseInstance.connection;
    this.connection.on('error', this.handleConnectionError.bind(this));
  }

  public close(): void {
    this.mongooseInstance.connection.close();
  }

  private handleConnectionError(error: Error): void {
    console.log('🧨 Connection database error', error);
  }
}
