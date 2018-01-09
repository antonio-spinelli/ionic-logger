export interface FileSystem {
  documentsDirectory: string
  checkDir(path: string, directory: string): Promise<boolean>
  createDir(path: string, directory: string, replace?: boolean): Promise<any>
  readAsText(path: string, file: string): Promise<string>
  writeFile(path: string, file: string, data: string | Blob | ArrayBuffer, replace?: boolean): Promise<any>
}
