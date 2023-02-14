export interface Config {
  maxZoom: number;
  aspectRatio: number;
}

export interface CallbackProps {
  file: File;
  error: any;
  response: any;
}

export interface UploadProps {
  type: "image" | "file";
  iconSrc: string;
  callback: (response: CallbackProps) => any;
  config: Config;
}

export interface CropperProps {
  src: string;
  name: string;
  onSave: (file: File) => void;
  config: Config;
}
