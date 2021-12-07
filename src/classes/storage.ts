export interface IStorageItem {
  key: number;
  text: string;
  timestamp: number;
}

export class StorageItem implements IStorageItem {
  key: number;
  text: string;
  timestamp: number;

  constructor(_key: number, _text: string, _timestamp: number) {
    this.key = _key;
    this.text = _text;
    this.timestamp = _timestamp;
  }
}

export function LoadData(): IStorageItem[] {
  return new Array<IStorageItem>();
}

export function SaveData(Store: IStorageItem[]): any {
  const json = JSON.stringify(Store);
  console.log(json);
}
